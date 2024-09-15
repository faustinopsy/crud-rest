class UserForm {
    constructor(fetchService, renderCallback) {
        this.fetchService = fetchService;
        this.refreshUsersList = renderCallback;
    }

    render() {
        return `
            <form id="addForm">
                Nome: <input type="text" id="nome"><br>
                E-mail: <input type="text" id="email"><br>
                Senha: <input type="password"  id="senha"><br>
                <button type="submit">Adicionar Usuário</button>
            </form>
        `;
    }

    afterRender() {
        document.getElementById('addForm').addEventListener('submit', (e) => this.addItem(e));
    }
    async addItem(event) {
        event.preventDefault();
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        if(!nome || !email || !senha){
            alert('Campos vazios');
            return
        }
        await this.fetchService.fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha }),
        });

        alert('usuário adicionado com sucesso.');
        document.getElementById('nome').value = '';
        document.getElementById('email').value = '';
        document.getElementById('senha').value = '';
        this.refreshUsersList();
    }
}
export default UserForm;