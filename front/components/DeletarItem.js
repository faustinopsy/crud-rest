export default {
    props: ['apiBaseUrl'], 
    data() {
      return {
        usuarioId: ''
      };
    },
    methods: {
      deletarItem() {
        fetch(`${this.apiBaseUrl}/users/${this.usuarioId}`, {
          method: 'DELETE'
        })
          .then(response => response.json())
          .then(data => {
            alert('Usuário deletado com sucesso!');
            this.usuarioId = ''; 
          })
          .catch(error => console.error('Erro ao deletar:', error));
      }
    },
    template: `
      <div>
        <h2>Deletar Usuário</h2>
        <input v-model="usuarioId" placeholder="ID do usuário">
        <button @click="deletarItem">Deletar</button>
      </div>
    `
  };
  