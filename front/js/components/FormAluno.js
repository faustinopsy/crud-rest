export default {
    data() {
        return {
            aluno: {
                nome: '',
                email: '',
                senha: ''
            },
            urlCadastro: 'http://localhost:8080/users'
        };
    },
    methods: {
        inscreverAluno() {
            fetch(this.urlCadastro, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.aluno)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Inscrição realizada com sucesso!");
                    this.limparFormulario();
                } else {
                    alert("Erro ao realizar a inscrição. Tente novamente.");
                }
            })
            .catch(error => console.error('Erro ao inscrever aluno:', error));
        },
        limparFormulario() {
            this.aluno = {
                nome: '',
                email: '',
                senha: ''
            };
        }
    },
    template: `
        <div>
            <h2>Formulário de Inscrição - Aluno</h2>
            <form @submit.prevent="inscreverAluno">
                <div>
                    <label for="nome">Nome:</label>
                    <input type="text" v-model="aluno.nome" id="nome" placeholder="Digite seu nome" required>
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input type="email" v-model="aluno.email" id="email" placeholder="Digite seu email" required>
                </div>
                <div>
                    <label for="senha">Senha:</label>
                    <input type="password" v-model="aluno.senha" id="senha" placeholder="Digite sua senha" required>
                </div>
                <button type="submit">Inscrever</button>
                <button type="button" @click="limparFormulario">Limpar</button>
            </form>
        </div>
    `
};
