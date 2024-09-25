new Vue({
    el: '#app',
    data: {
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
    },
    computed: {
        usuariosFiltrados() {
            return this.usuarios.filter(usuario => {
                return usuario.nome.toLowerCase().includes(this.busca.toLowerCase());
            });
        }
    },
    created() {
        this.listarUsuarios();
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
          this.usuario =  user;
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
              const index = this.usuarios.findIndex(u => u.id === data.id);
              this.$set(this.usuarios, index, data);
              this.resetarFormulario();
            })
            .catch(error => console.error('Erro ao atualizar usuário:', error));
        },
        deletarUsuario(user) {
          this.usuario =  user;
          fetch(`${this.url}/${this.usuario.usuario_id}`, {
            method: 'DELETE',
          })
            .then(() => {
              this.usuarios = this.usuarios.filter(u => u.id !== id);
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
});
