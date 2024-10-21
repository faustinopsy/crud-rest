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
            fetch(this.url)
                .then(response => response.json())
                .then(data => {
                    this.usuarios = data;
                })
                .catch(error => console.error('Erro ao listar usuários:', error));
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
