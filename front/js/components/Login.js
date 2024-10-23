class Login {
    constructor(fetchService) {
        this.fetchService = fetchService;
    }

    render() {
        return `
            <div>
                <h2>Login</h2>
                <form id="loginForm">
                    <input type="email" id="email" placeholder="E-mail" required><br>
                    <input type="password" id="senha" placeholder="Senha" required><br>
                    <button type="submit">Entrar</button>
                </form>
            </div>
        `;
    }

    afterRender() {
        const loginForm = document.getElementById('loginForm');
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            try {
                const response = await this.fetchService.fetch('/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, senha })
                });

                localStorage.setItem('token', response.usuario.token);
                localStorage.setItem('tipo', response.usuario.tipo);
                window.location.href = '/painel-admin'; // Redireciona após o login
            } catch (error) {
                alert('Falha no login. Verifique suas credenciais.');
            }
        });
    }
}
export default Login;
