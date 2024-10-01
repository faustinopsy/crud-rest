const app = Vue.createApp({
  data() {
    return {
      usuarios: [],
      busca: '',
      usuario: {
        usuario_id: null,
        nome: '',
        email: '',
        senha: '',
      },
      editando: false,
      url: 'http://localhost:8080/users',
    };
  },
  computed: {
    usuariosFiltrados() {
      if (!this.usuarios || this.usuarios.length === 0) {
        return [];
      }

      return this.usuarios.filter(usuario => {
        return usuario.nome && usuario.nome.toLowerCase().includes(this.busca.toLowerCase());
      });
    }
  },
  methods: {
    listarUsuarios() {
      fetch(this.url)
        .then(response => response.json())
        .then(data => {
          this.usuarios = data;
        })
        .catch(error => console.error('Erro ao listar usuários:', error));
    },
    salvarUsuario() {
      if (this.editando) {
        this.atualizarUsuario();
      } else {
        this.criarUsuario();
      }
    },
    criarUsuario() {
      fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.usuario),
      })
        .then(response => response.json())
        .then(data => {
          this.usuarios.push(data);
          this.resetarFormulario();
        })
        .catch(error => console.error('Erro ao criar usuário:', error));
    },
    editarUsuario(user) {
      this.usuario = { ...user };
      this.editando = true;
    },
    atualizarUsuario() {
      fetch(`${this.url}/${this.usuario.usuario_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.usuario),
      })
        .then(response => response.json())
        .then(data => {
          const index = this.usuarios.findIndex(u => u.usuario_id === data.usuario_id);
          this.usuarios.splice(index, 1, data); 
          this.resetarFormulario();
        })
        .catch(error => console.error('Erro ao atualizar usuário:', error));
    },
    deletarUsuario(user) {
      fetch(`${this.url}/${user.usuario_id}`, {
        method: 'DELETE',
      })
        .then(() => {
          this.usuarios = this.usuarios.filter(u => u.usuario_id !== user.usuario_id);
        })
        .catch(error => console.error('Erro ao deletar usuário:', error));
    },
    resetarFormulario() {
      this.usuario = {
        usuario_id: null,
        nome: '',
        email: '',
        senha: '',
      };
      this.editando = false;
    },
  },
  mounted() {
    this.listarUsuarios();
  },
  template: `
    <div>
      <form @submit.prevent="salvarUsuario">
        <input type="text" v-model="usuario.nome" placeholder="Nome" required>
        <input type="email" v-model="usuario.email" placeholder="Email" required>
        <input type="password" v-model="usuario.senha" placeholder="Senha" required>
        <button type="submit">{{ editando ? 'Atualizar' : 'Adicionar' }} Usuário</button>
      </form>

      <h1>Usuários Disponíveis</h1>
      <input type="text" v-model="busca" placeholder="Buscar usuário...">

      <ul class="user-item">
        <li v-for="user in usuariosFiltrados" :key="user.usuario_id">
          {{ user.nome.toUpperCase() }} - {{ user.email }}
          <button @click="editarUsuario(user)">Editar</button>
          <button @click="deletarUsuario(user)">Excluir</button>
        </li>
      </ul>
    </div>
  `
});

app.mount('#app');