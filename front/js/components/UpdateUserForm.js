class UpdateUserForm {
    constructor(fetchService, refreshUsersList) {
        this.fetchService = fetchService;
        this.refreshUsersList = refreshUsersList;
    }

    render() {
        return `
            <div id="updateUserModal" class="modal" style="display: none;">
                <div class="modal-content">
                    <span id="closeModal" class="close">&times;</span>
                    <h4>Atualizar Usuário</h4>
                    <label>ID:</label>
                    <input type="text" id="updateId" readonly><br>
                    <label>Nome:</label>
                    <input type="text" id="updateNome"><br>
                    <label>Email:</label>
                    <input type="text" id="updateEmail"><br>
                    <label>Senha:</label>
                    <input type="password" id="updateSenha"><br>
                    <button id="updateButton">Atualizar Usuário</button>
                </div>
            </div>
        `;
    }

    afterRender() {
        document.getElementById('updateButton').addEventListener('click', () => this.updateUser());
        document.getElementById('closeModal').addEventListener('click', () => this.closeModal());
    }

    open(user) {
        document.getElementById('updateId').value = user.usuario_id;
        document.getElementById('updateNome').value = user.nome;
        document.getElementById('updateEmail').value = user.email;
        document.getElementById('updateSenha').value = '';
        document.getElementById('updateUserModal').style.display = 'block';
    }

    closeModal() {
        document.getElementById('updateUserModal').style.display = 'none';
    }

    async updateUser() {
        const id = document.getElementById('updateId').value;
        const nome = document.getElementById('updateNome').value;
        const email = document.getElementById('updateEmail').value;
        const senha = document.getElementById('updateSenha').value;

        await this.fetchService.fetch(`/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha }),
        });

        alert('Usuário atualizado com sucesso.');
        this.closeModal();
        this.refreshUsersList(); 
    }

    async deleteUser(id) {
        await this.fetchService.fetch(`/users/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        alert('Usuário deletado com sucesso.');
        this.refreshUsersList(); 
    }
}

export default UpdateUserForm;
