import ListarItems from './components/ListarItems.js';
import CadastrarItem from './components/CadastrarItem.js';
import AtualizarItem from './components/AtualizarItem.js';
import DeletarItem from './components/DeletarItem.js';

const apiBaseUrl = 'http://localhost:8080';

const app = Vue.createApp({
  template: `
    <div>
      <listar-items :api-base-url="apiBaseUrl"></listar-items>
      <cadastrar-item :api-base-url="apiBaseUrl"></cadastrar-item>
      <atualizar-item :api-base-url="apiBaseUrl"></atualizar-item>
      <deletar-item :api-base-url="apiBaseUrl"></deletar-item>
    </div>
  `,
  data() {
    return {
      apiBaseUrl: apiBaseUrl
    };
  }
});

app.component('listar-items', ListarItems);
app.component('cadastrar-item', CadastrarItem);
app.component('atualizar-item', AtualizarItem);
app.component('deletar-item', DeletarItem);

app.mount('#app');
