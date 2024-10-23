import FetchService from './components/FetchService.js';
import UserForm from './components/UserForm.js';
import UsersList from './components/UsersList.js';
import Login from './components/Login.js';

class App {
    constructor(apiBaseUrl) {
        this.apiBaseUrl = apiBaseUrl;
        this.appElement = document.getElementById('app');
        this.fetchService = new FetchService(this.apiBaseUrl);
        this.tipoUser = localStorage.getItem('tipo');
        this.render();
    }

    async render() {
        if (!this.tipoUser) {
            this.renderLogin();
        } else {
            this.renderApp();
        }
    }

    renderLogin() {
        const login = new Login(this.fetchService);
        this.appElement.innerHTML = login.render();
        login.afterRender(() => {
            this.tipoUser = localStorage.getItem('tipo');
            this.renderApp();
        });
    }

    async renderApp() {
        this.appElement.innerHTML = `
            <nav>
                <ul>
                    ${this.tipoUser === 'administrador' ? `<li><a href="#/painel-admin">Painel Admin</a></li>` : ''}
                    ${['administrador', 'professor'].includes(this.tipoUser) ? `<li><a href="#/lista-professor">Lista Professores</a></li>` : ''}
                    ${['administrador', 'professor', 'aluno'].includes(this.tipoUser) ? `<li><a href="#/form-aluno">Painel Alunos</a></li>` : ''}
                    <li><a href="#" id="logout">Logout</a></li>
                </ul>
            </nav>
            <div id="content"></div>
        `;

        document.getElementById('logout').addEventListener('click', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('tipo');
            location.reload(); 
        });

        await this.verificaRota();
        window.addEventListener('hashchange', async () => await this.verificaRota());
    }

    async verificaRota() {
        const hash = window.location.hash.slice(1);
        const contentElement = document.getElementById('content');
    
        const routesMap = {
            '/painel-admin': {
                component: async () => {
                    const usersList = new UsersList(this.fetchService, this.tipoUser);
                    const html = await usersList.render();
                    contentElement.innerHTML = html;
                    usersList.afterRender();
                },
                tipoPermitido: ['administrador']
            },
            '/lista-professor': {
                component: async () => {
                    const usersList = new UsersList(this.fetchService, this.tipoUser);
                    const html = await usersList.render();
                    contentElement.innerHTML = html;
                    usersList.afterRender();
                },
                tipoPermitido: ['administrador', 'professor']
            },
            '/form-aluno': {
                component: async () => {
                    const userForm = new UserForm(this.fetchService, this.tipoUser);
                    const html = userForm.render();
                    contentElement.innerHTML = html;
                    userForm.afterRender();
                },
                tipoPermitido: ['administrador', 'professor', 'aluno']
            }
        };
    
        const route = routesMap[hash];
        if (route) {
            if (route.tipoPermitido.includes(this.tipoUser)) {
                try {
                    await route.component();
                } catch (error) {
                    console.error('Erro ao carregar a página:', error);
                    contentElement.innerHTML = '<p>Ocorreu um erro ao carregar a página. Tente novamente mais tarde.</p>';
                }
            } else {
                contentElement.innerHTML = '<p>Acesso negado: você não tem permissão para acessar esta página.</p>';
            }
        } else {
            contentElement.innerHTML = '<p>404 - Página não encontrada</p>';
        }
    }
}

const apiBaseUrl = 'http://localhost:8080';
new App(apiBaseUrl);
