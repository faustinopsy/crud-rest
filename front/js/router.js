import FormAluno from './components/FormAluno.js';
import ListaProfessor from './components/ListaProfessor.js';
import PainelAdmin from './components/PainelAdmin.js';
import Login from './components/Login.js';

function getRotaDinamica() {
    const paginasPermitidas = JSON.parse(localStorage.getItem('paginasPermitidas')) || [];
    const rotaDinamica = [];

    paginasPermitidas.forEach(page => {
        switch (page.path) {
            case '/form-aluno':
                rotaDinamica.push({ path: page.path, component: FormAluno });
                break;
            case '/lista-professor':
                rotaDinamica.push({ path: page.path, component: ListaProfessor });
                break;
            case '/painel-admin':
                rotaDinamica.push({ path: page.path, component: PainelAdmin });
                break;
            default:
                console.warn("Página desconhecida:", page.path);
        }
    });

    return rotaDinamica;
}

const routes = [
    { path: '/', component: Login }
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

    if (to.matched.some(record => record.meta.precisaDeAutenticacao)) {
        if (!usuario) {
            next('/');
        } else {
            const tipoUsuario = to.meta.tipoUsuario;
            if (tipoUsuario && (usuario.tipo === tipoUsuario || usuario.tipo === 'administrador')) {
                next();
            } else {
                alert("Acesso negado: Você não tem permissão para acessar esta página.");
                next('/'); 
            }
        }
    } else {
        next();
    }
});

export default router;