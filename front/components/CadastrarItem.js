export default {
    props: ['apiBaseUrl'], 
    data() {
      return {
        user: {
          nome: '',
          email: '',
          senha: ''
        }
      };
    },
    methods: {
      cadastrarItem() {
        fetch(`${this.apiBaseUrl}/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.user)
        })
          .then(response => response.json())
          .then(data => {
            alert('Usuário cadastrado com sucesso!');
            this.user.nome = ''; 
            this.user.email = '';
            this.user.senha = '';
          })
          .catch(error => console.error('Erro ao cadastrar:', error));
      }
    },
    template: `
      <div>
        <h2>Cadastrar Usuário</h2>
        <input v-model="user.nome" placeholder="Nome do usuário">
        <input v-model="user.email" placeholder="Email do usuário">
        <input v-model="user.senha" placeholder="Senha do usuário">
        <button @click="cadastrarItem">Cadastrar</button>
      </div>
    `
  };
  