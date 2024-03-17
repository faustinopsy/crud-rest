class ApiService {
    constructor(baseUrl) {
      this.baseUrl = baseUrl;
    }
  
    async login(email, senha) {
      const response = await fetch(`${this.baseUrl}/login?action=login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });
      return response.json();
    }
  
    async inserirUsuario(nome, email, senha) {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha })
      });
      return response.json();
    }
  
    async buscarUsuarios(id) {
      const url = id ? `${this.baseUrl}/?id=${id}` : this.baseUrl;
      const response = await fetch(url);
      return response.json();
    }
  
    async atualizarUsuario(id, nome, email, senha) {
      const response = await fetch(this.baseUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario_id: id, nome, email, senha })
      });
      return response.json();
    }
  
    async excluirUsuario(id) {
      const response = await fetch(`${this.baseUrl}/?id=${id}`, {
        method: 'DELETE',
      });
      return response.json();
    }
  
    criarUsuarioFake() {
      const vowels = ['a', 'e', 'i', 'o', 'u'];
      const consonants = ['b', 'c', 'd', 'f', 'g'];
      const numbers = ['0', '1', '2', '3', '4'];
  
      const randomName = Array.from({ length: 5 }, () => consonants[Math.floor(Math.random() * consonants.length)] + vowels[Math.floor(Math.random() * vowels.length)]).join('');
      const randomEmail = `${randomName}@gmail.com`;
      const randomPassword = Array.from({ length: 5 }, () => numbers[Math.floor(Math.random() * numbers.length)]).join('');
  
      return { nome: randomName, email: randomEmail, senha: randomPassword };
    }
    async atualizarLista() {
      this.buscarUsuarios().then(users => {
        const usersList = document.getElementById('usersList');
        usersList.innerHTML = users.map(user => `<li>${user.nome} - ${user.email}</li>`).join('');
      }).catch(error => console.error('Erro ao atualizar a lista de usuários:', error));
    }
    
    attachEventListeners() {
      document.getElementById('loginBtn').addEventListener('click', () => {
        const { email, senha } = this.criarUsuarioFake();
        this.login(email, senha).then(console.log);
      });
  
      document.getElementById('criarUsuario').addEventListener('click', () => {
        const { nome, email, senha } = this.criarUsuarioFake();
        this.inserirUsuario(nome, email, senha).then(console.log).then(() => this.atualizarLista());
      });
  
      document.getElementById('buscarsuario').addEventListener('click', () => {
        this.buscarUsuarios().then(users => {
          const usersList = document.getElementById('usersList');
          usersList.innerHTML = users.map(user => `<li>${user.nome} - ${user.email}</li>`).join('');
        });
      });
  
      document.getElementById('atualizarUsuario').addEventListener('click', () => {
        this.buscarUsuarios().then(users => {
          if (users.length > 0) {
            const { nome, email } = this.criarUsuarioFake();
            const userId = users[0].usuario_id; 
            this.atualizarUsuario(userId, nome, email, 'novaSenha123').then(console.log).then(() => this.atualizarLista());
            
          }
        });
      });

      document.getElementById('excluirUsuario').addEventListener('click', () => {
        this.buscarUsuarios().then(users => {
          if (users.length > 0) {
            const userId = users[0].usuario_id;
            this.excluirUsuario(userId)
              .then(() => this.atualizarLista()) 
              .then(() => alert('Usuário deletado com sucesso!'));
          }
        });
      });
    }
  }
  