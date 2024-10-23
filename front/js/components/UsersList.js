import UpdateUserForm from './UpdateUserForm.js';
class UsersList {
    constructor(fetchService, tipoUser) {
        this.fetchService = fetchService;
        this.tipoUser = tipoUser;
    }

    async render() {
        const users = await this.fetchService.fetch('/users');
        let usersHtml = '<h2>Usuários Disponíveis</h2>';
        usersHtml += '<div class="users-list">';
        users.forEach(user => {
            usersHtml += `
                <div class="user-item">
                    ${user.usuario_id} - ${user.nome} - ${user.email}
                    <div class="grupo"> 
                        ${this.tipoUser === 'administrador' ? `<button class="button update" data-id="${user.usuario_id}">Editar</button>` : ''}
                        ${this.tipoUser === 'administrador' ? `<button class="button delete" data-id="${user.usuario_id}">Deletar</button>` : ''}
                    </div>
                </div>
            `;
        });
        usersHtml += '</div>';
        return usersHtml;
    }

    afterRender() {
        this.appElement = document.getElementById('app');
        if (this.tipoUser === 'administrador') {
            const editButtons = document.querySelectorAll('.update');
            editButtons.forEach(button => {
                button.addEventListener('click', async (e) => {
                    const id = e.target.getAttribute('data-id');
                    const user = await this.fetchService.fetch(`/users/${id}`);
                    const updateForm = new UpdateUserForm(this.fetchService, () => this.refreshUsersList());
                    this.appElement.innerHTML = updateForm.render();
                    updateForm.afterRender();
                    updateForm.open(user);
                });
            });

            const deleteButtons = document.querySelectorAll('.delete');
            deleteButtons.forEach(button => {
                button.addEventListener('click', async (e) => {
                    const id = e.target.getAttribute('data-id');
                    if (confirm('Tem certeza que deseja deletar este usuário?')) {
                       
                        const updateForm = new UpdateUserForm(this.fetchService, () => this.refreshUsersList());
                        this.appElement.innerHTML = updateForm.render();
                        updateForm.afterRender();
                        await updateForm.deleteUser(id);
                    }
                });
            });
        }
    }

    refreshUsersList() {
        location.hash = '#/'
    }
}

export default UsersList;
