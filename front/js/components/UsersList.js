class UsersList {
    constructor(fetchService, updateUserForm, refreshUsersList) {
        this.fetchService = fetchService;
        this.updateUserForm = updateUserForm;
        this.refreshUsersList = refreshUsersList;
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
                        <button class="button update" data-id="${user.usuario_id}">Editar</button>
                        <button class="button delete" data-id="${user.usuario_id}">Deletar</button>
                    </div>
                </div>
            `;
        });
        usersHtml += '</div>';
        return usersHtml;
    }

    afterRender() {
        const editButtons = document.querySelectorAll('.update');
        editButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                const id = e.target.getAttribute('data-id');
                const user = await this.fetchService.fetch(`/users/${id}`);
                this.updateUserForm.open(user);
            });
        });

        const deleteButtons = document.querySelectorAll('.delete');
        deleteButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                const id = e.target.getAttribute('data-id');
                if (confirm('Tem certeza que deseja deletar este usuário?')) {
                    await this.updateUserForm.deleteUser(id);
                }
            });
        });
    }
}

export default UsersList;
