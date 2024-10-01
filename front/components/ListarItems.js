export default {
    props: ['apiBaseUrl'], 
    data() {
      return {
        usuarios: []
      };
    },
    created() {
      this.fetchUsuarios();
    },
    methods: {
      fetchUsuarios() {
        fetch(`${this.apiBaseUrl}/users`) 
          .then(response => response.json())
          .then(data => {
            this.usuarios = data;
          })
          .catch(error => console.error('Error:', error));
      }
    },
    template: `
      <div>
        <h2>Lista de Usuários</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in usuarios" :key="user.usuario_id">
              <td>{{ user.usuario_id }}</td>
              <td>{{ user.nome }}</td>
              <td>{{ user.email }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  };
  