class UserForm {
    constructor(fetchService, renderCallback) {
        this.fetchService = fetchService;
        this.refreshUsersList = renderCallback;
        this.form = null;
    }
    render() {
        return `
            <form id="addForm">
                Nome: <input type="text" name="nome"><br>
                E-mail: <input type="text" name="email"><br>
                Senha: <input type="password" name="senha"><br>
                <button type="submit">Adicionar Usuário</button>
            </form>
        `;
    }

    afterRender() {
        this.form = document.getElementById('addForm');
        this.form.addEventListener('submit', (e) => this.addItem(e));
    }

    async addItem(event) {
        event.preventDefault();
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());

        if (!data.nome || !data.email || !data.senha) {
            alert('Todos os campos são obrigatórios.');
            return;
        }
        await this.fetchService.fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        alert('Usuário adicionado com sucesso.');
        this.form.reset();
        this.refreshUsersList();
    }
}

export default UserForm;
