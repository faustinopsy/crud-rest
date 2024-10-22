import FormAluno from './components/FormAluno.js';
import ListaProfessor from './components/ListaProfessor.js';
import PainelAdmin from './components/PainelAdmin.js';
import Login from './components/Login.js';

function getRotaDinamica() {
    const token = localStorage.getItem('token');
    let payload = {};
    let paginasPermitidas = [];
    
    if (token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            payload = JSON.parse(atob(base64));
            
            if (payload.paginas) {
                paginasPermitidas = JSON.parse(payload.paginas);
            }
        } catch (e) {
            console.error('Erro ao decodificar o token:', e);
        }
    }
    
    const rotaDinamica = [];
    const adminChildren = [];
    
    console.log('Páginas Permitidas:', paginasPermitidas);

    paginasPermitidas.forEach(page => {
        console.log('Adicionando Página:', page);
        switch (page.path) {
            case "/lista-professor":
                adminChildren.push({ path: 'lista-professor', component: ListaProfessor, meta: { precisaDeAutenticacao: true, tipoUsuario: 'professor' } });
                rotaDinamica.push({ path: page.path, component: ListaProfessor, meta: { precisaDeAutenticacao: true, tipoUsuario: 'professor' } });
                break;
            case "/painel-admin":
                rotaDinamica.push({
                    path: page.path,
                    component: PainelAdmin,
                    meta: { precisaDeAutenticacao: true, tipoUsuario: 'administrador' },
                    children: adminChildren
                });
                break;
            default:
                rotaDinamica.push({ path: '/', component: Login, meta: { precisaDeAutenticacao: false } });
        }
    });

    return rotaDinamica;
}

const routes = [
    { path: '/', component: Login, meta: { precisaDeAutenticacao: false } },
    { path: '/form-aluno', component: FormAluno, meta: { precisaDeAutenticacao: false } },
    { path: '/:pathMatch(.*)*', redirect: '/' }
];

const rotaDinamica = getRotaDinamica();
routes.push(...rotaDinamica);

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    }
});

router.beforeEach((to, from, next) => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log('Navegando para:', to);
    console.log('Usuário Logado:', usuario);

    if (to.matched.some(record => record.meta.precisaDeAutenticacao)) {
        if (!usuario) {
            console.log("Usuário não autenticado, redirecionando para login.");
            return next({ path: '/' });
        }
        const tipoUsuario = to.meta.tipoUsuario;
        if (usuario === tipoUsuario || usuario === 'administrador') {
            return next();
        }

        alert("Acesso negado: Você não tem permissão para acessar esta página.");
        return next({ path: '/' });
    }

    return next();
});

export default router;
