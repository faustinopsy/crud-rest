class UserForm {
    constructor(fetchService, tipoUser) {
        this.fetchService = fetchService;
        this.tipoUser = tipoUser;
        this.form = null;
    }

    render() {
        if (this.tipoUser === 'professor' || this.tipoUser === 'administrador') {
            return `
                <form id="addForm">
                    Nome: <input type="text" name="nome"><br>
                    E-mail: <input type="text" name="email"><br>
                    Senha: <input type="password" name="senha"><br>
                    <button type="submit">Adicionar Usuário</button>
                </form>
            `;
        }
        return `<p>Você não tem permissão para adicionar usuários.</p>`;
    }

    afterRender() {
        if (this.tipoUser === 'professor' || this.tipoUser === 'administrador') {
            this.form = document.getElementById('addForm');
            this.form.addEventListener('submit', (e) => this.addItem(e));
        }
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
    }
}

export default UserForm;
