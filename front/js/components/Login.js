export default {
    data() {
        return {
            usuario: {
                email: null,
                senha: null
            },
            loginUrl: 'http://localhost:8080/login'
        };
    },
    methods: {
        login() {
           const {email, senha} = this.usuario;
            fetch(this.loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha })
            })
            .then(response => response.json())
            .then(data => {
                if (data.usuario) {
                    localStorage.setItem('usuario', JSON.stringify(data.usuario.tipo));
                    localStorage.setItem('token', data.usuario.token);
                    this.redirecionarUsuario(data.usuario.tipo);
                    location.reload()
                } else {
                    alert("Falha no login. Verifique suas credenciais.");
                }
            })
            .catch(error => console.error('Erro no login:', error));
        },
        redirecionarUsuario(tipo) {
            switch(tipo) {
                case 'aluno':
                    this.$router.push('/form-aluno');
                    break;
                case 'professor':
                    this.$router.push('/lista-professor');
                    break;
                case 'administrador':
                    this.$router.push('/painel-admin');
                    break;
                default:
                    console.error("Tipo de usuário inválido");
            }
        }
    },
    template: `
        <div>
            <h2>Login</h2>
            <form @submit.prevent="login">
                <input type="email" v-model="usuario.email" placeholder="Email" required>
                <input type="password" v-model="usuario.senha" placeholder="Senha" required>
                <button type="submit">Entrar</button>
            </form>
        </div>
    `
};
