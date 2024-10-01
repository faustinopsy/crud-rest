export default {
    props: ['apiBaseUrl'], 
    data() {
      return {
        usuarioId: '',
        user: {
          nome: '',
          email: '',
          senha: ''
        }
      };
    },
    methods: {
      atualizarUser() {
        fetch(`${this.apiBaseUrl}/users/${this.usuarioId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.user)
        })
          .then(response => response.json())
          .then(data => {
            alert('Usuário atualizado com sucesso!');
            this.usuarioId = ''; 
            this.user.nome = '';
            this.user.email = '';
            this.user.senha = '';
          })
          .catch(error => console.error('Erro ao atualizar:', error));
      }
    },
    template: `
      <div>
        <h2>Atualizar Usuário</h2>
        <input v-model="usuarioId" placeholder="ID do usuário">
        <input v-model="user.nome" placeholder="Nome atualizado">
        <input v-model="user.email" placeholder="Email atualizado">
        <input v-model="user.senha" placeholder="Senha atualizado">
        <button @click="atualizarUser">Atualizar</button>
      </div>
    `
  };
  