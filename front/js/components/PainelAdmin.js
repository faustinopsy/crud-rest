export default {
    data() {
        return {
            usuarios: [],
            usuario: {
                usuario_id: null,
                nome: '',
                email: '',
                senha: ''
            },
            editando: false,
            url: 'http://localhost:8080/users'
        };
    },
    methods: {
        listarUsuarios() {
            fetch(this.url)
                .then(response => response.json())
                .then(data => {
                    this.usuarios = data;
                })
                .catch(error => console.error('Erro ao listar usuários:', error));
        },
        salvarUsuario() {
            if (this.editando) {
                this.atualizarUsuario();
            } else {
                this.criarUsuario();
            }
        },
        criarUsuario() {
            fetch(this.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.usuario),
            })
            .then(response => response.json())
            .then(data => {
                this.usuarios.push(data);
                this.resetarFormulario();
            })
            .catch(error => console.error('Erro ao criar usuário:', error));
        },
        editarUsuario(user) {
            this.usuario = { ...user };
            this.editando = true;
        },
        atualizarUsuario() {
            fetch(`${this.url}/${this.usuario.usuario_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.usuario),
            })
            .then(response => response.json())
            .then(data => {
                const index = this.usuarios.findIndex(u => u.usuario_id === data.usuario_id);
                this.usuarios.splice(index, 1, data);
                this.resetarFormulario();
            })
            .catch(error => console.error('Erro ao atualizar usuário:', error));
        },
        deletarUsuario(user) {
            if (confirm(`Tem certeza de que deseja excluir ${user.nome}?`)) {
                fetch(`${this.url}/${user.usuario_id}`, {
                    method: 'DELETE',
                })
                .then(() => {
                    this.usuarios = this.usuarios.filter(u => u.usuario_id !== user.usuario_id);
                })
                .catch(error => console.error('Erro ao deletar usuário:', error));
            }
        },
        resetarFormulario() {
            this.usuario = {
                usuario_id: null,
                nome: '',
                email: '',
                senha: ''
            };
            this.editando = false;
            location.reload()
        }
    },
    mounted() {
        this.listarUsuarios();
    },
    template: `
        <div>
            <h2>Painel de Administração - Administrador</h2>
            <form @submit.prevent="salvarUsuario">
                <div>
                    <label for="nome">Nome:</label>
                    <input type="text" v-model="usuario.nome" id="nome" placeholder="Nome" required>
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input type="email" v-model="usuario.email" id="email" placeholder="Email" required>
                </div>
                <div>
                    <label for="senha">Senha:</label>
                    <input type="password" v-model="usuario.senha" id="senha" placeholder="Senha" required>
                </div>
                <button type="submit">{{ editando ? 'Atualizar' : 'Adicionar' }}</button>
                <button type="button" @click="resetarFormulario" v-if="editando">Cancelar</button>
            </form>

            <ul>
                <li v-for="user in usuarios" :key="user.usuario_id">
                    {{ user.nome }} - {{ user.email }}
                    <button @click="editarUsuario(user)">Editar</button>
                    <button @click="deletarUsuario(user)">Excluir</button>
                </li>
            </ul>
        </div>
    `
};
