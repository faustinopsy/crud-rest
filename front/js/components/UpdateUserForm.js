class UpdateUserForm {
    constructor(fetchService, refreshUsersList) {
        this.fetchService = fetchService;
        this.refreshUsersList = refreshUsersList;
        this.modal = null;
        this.form = null;
    }
    render() {
        return `
            <div id="updateUserModal" class="modal" style="display: none;">
                <div class="modal-content">
                    <span id="closeModal" class="close">&times;</span>
                    <h4>Atualizar Usuário</h4>
                    <form id="updateForm">
                        <label>ID:</label>
                        <input type="text" name="id" readonly><br>
                        <label>Nome:</label>
                        <input type="text" name="nome"><br>
                        <label>Email:</label>
                        <input type="text" name="email"><br>
                        <label>Senha:</label>
                        <input type="password" name="senha"><br>
                        <button type="submit">Atualizar Usuário</button>
                    </form>
                </div>
            </div>
        `;
    }

    afterRender() {
        this.modal = document.getElementById('updateUserModal');
        this.form = document.getElementById('updateForm');
        this.form.addEventListener('submit', (e) => this.updateUser(e));
        document.getElementById('closeModal').addEventListener('click', () => this.closeModal());
    }

    open(user) {
        this.form.elements['id'].value = user.usuario_id;
        this.form.elements['nome'].value = user.nome;
        this.form.elements['email'].value = user.email;
        this.form.elements['senha'].value = ''; 
        this.modal.style.display = 'block';
    }

    closeModal() {
        this.modal.style.display = 'none';
        this.form.reset(); 
    }

    async updateUser(event) {
        event.preventDefault();
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());
        const id = data.id;
        delete data.id; 

        if (!data.nome || !data.email) {
            alert('Nome e Email são obrigatórios.');
            return;
        }
        const jsonData = JSON.stringify(data);
        await this.fetchService.fetch(`/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: jsonData,
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
