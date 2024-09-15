import FetchService from './components/FetchService.js';
import UserForm from './components/UserForm.js';
import UpdateUserForm from './components/UpdateUserForm.js';
import UsersList from './components/UsersList.js';

class App {
    constructor(apiBaseUrl) {
        this.apiBaseUrl = apiBaseUrl;
        this.appElement = document.getElementById('app');
        this.fetchService = new FetchService(this.apiBaseUrl);

        this.refreshUsersList = this.renderUsersList.bind(this);

        this.updateUserForm = new UpdateUserForm(this.fetchService, this.refreshUsersList);
        this.userForm = new UserForm(this.fetchService, this.refreshUsersList);
        this.usersList = new UsersList(this.fetchService, this.updateUserForm, this.refreshUsersList);

        this.render();
    }

    async render() {
        this.appElement.innerHTML = `
            <div class="panel">
                <h1>Gerenciador de Usuários</h1>
                <div id="userFormContainer"></div>
                <button id="fetchUsersButton">Buscar Todos os Usuários</button>
                <div id="usersListContainer"></div>
                <div id="updateUserFormContainer"></div>
            </div>
        `;

        document.getElementById('userFormContainer').innerHTML = this.userForm.render();
        this.userForm.afterRender();

        document.getElementById('updateUserFormContainer').innerHTML = this.updateUserForm.render();
        this.updateUserForm.afterRender();

        document.getElementById('fetchUsersButton').addEventListener('click', async () => {
            await this.renderUsersList();
        });

        await this.renderUsersList();
    }

    async renderUsersList() {
        const usersListHtml = await this.usersList.render();
        document.getElementById('usersListContainer').innerHTML = usersListHtml;
        this.usersList.afterRender();
    }
}

const apiBaseUrl = 'http://localhost:8080'; 
new App(apiBaseUrl);
