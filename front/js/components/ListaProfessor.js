export default {
    data() {
        return {
            usuarios: [],
            busca: '',
            url: 'http://localhost:8080/users'
        };
    },
    computed: {
        usuariosFiltrados() {
            if (!this.usuarios || this.usuarios.length === 0) {
                return [];
            }
            return this.usuarios.filter(usuario => {
                return usuario.nome && usuario.nome.toLowerCase().includes(this.busca.toLowerCase());
            });
        }
    },
    methods: {
        listarUsuarios() {
            fetch(this.url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error("Não autorizado. Verifique suas credenciais.");
                    } else if (response.status === 403) {
                        throw new Error("Acesso proibido. Você não tem permissão para acessar esses dados.");
                    } else if (response.status === 404) {
                        throw new Error("Endpoint não encontrado. Verifique a URL.");
                    } else if (response.status === 500) {
                        throw new Error("Erro interno do servidor. Tente novamente mais tarde.");
                    } else {
                        throw new Error("Erro ao listar usuários: " + response.statusText);
                    }
                }
                return response.json();
            })
            .then(data => {
                this.usuarios = data;
            })
            .catch(error => {
                console.error('Erro ao listar usuários:', error);
                alert(error.message || "Ocorreu um erro ao listar usuários. Tente novamente.");
            });
        }
        
    },
    mounted() {
        this.listarUsuarios();
    },
    template: `
        <div>
            <h2>Lista de Usuários - Professor</h2>
            <input type="text" v-model="busca" placeholder="Buscar usuário...">
            <ul>
                <li v-for="user in usuariosFiltrados" :key="user.usuario_id">
                    {{ user.nome.toUpperCase() }} - {{ user.email }}
                </li>
            </ul>
        </div>
    `
};
