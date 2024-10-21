import router from './router.js';
const mainApp = Vue.createApp({
    data() {
        return {
            usuario: null
        };
    },
    created() {
        this.usuario = JSON.parse(localStorage.getItem('usuario'));
    },
    methods: {
        logout() {
            localStorage.removeItem("usuario");
            localStorage.removeItem("paginasPermitidas");
            this.usuario = null;
            this.$router.push('/');
        }
    },
    computed: {
        isAdmin() {
            return this.usuario && this.usuario.tipo === 'administrador';
        },
        isTeacher() {
            return this.usuario && this.usuario.tipo === 'professor';
        }
    },
    template: `
        <div>
            <nav v-if="isAdmin" class="navbar">
                <ul>
                    <li><router-link to="/painel-admin">Painel Admin</router-link></li>
                    <li><router-link to="/lista-professor">Lista Professor</router-link></li>
                    <li><a href="#" @click="logout">Logout</a></li>
                </ul>
            </nav>
            <nav v-else-if="isTeacher" class="navbar">
                <ul>
                    <li><router-link to="/form-aluno">Form Aluno</router-link></li>
                    <li><router-link to="/lista-professor">Lista Professor</router-link></li>
                    <li><a href="#" @click="logout">Logout</a></li>
                </ul>
            </nav>
            <router-view></router-view>
        </div>
    `,
});

mainApp.use(router);
mainApp.mount('#app');
