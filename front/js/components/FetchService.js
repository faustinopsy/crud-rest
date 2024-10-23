class FetchService {
    constructor(apiBaseUrl) {
        this.apiBaseUrl = apiBaseUrl;
    }

    async fetch(url, options = {}) {
        const token = localStorage.getItem('token');
        if (!options.headers) {
            options.headers = {};
        }
        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }
        const response = await fetch(`${this.apiBaseUrl}${url}`, options);
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Não autorizado. Verifique suas credenciais.");
            } else if (response.status === 403) {
                throw new Error("Acesso proibido. Você não tem permissão para acessar esses dados.");
            } else if (response.status === 404) {
                throw new Error("Endpoint não encontrado. Verifique a URL.");
            } else if (response.status === 500) {
                throw new Error("Erro interno do servidor. Tente novamente mais tarde.");
            } else {
                throw new Error("Erro ao listar usuários: " + response.statusText);
            }
        }
        return response.json();
    }
}
export default FetchService;
