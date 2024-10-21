import FormAluno from './components/FormAluno.js';
import ListaProfessor from './components/ListaProfessor.js';
import PainelAdmin from './components/PainelAdmin.js';
import Login from './components/Login.js';

function getRotaDinamica() {
    const paginasPermitidas = JSON.parse(localStorage.getItem('paginasPermitidas')) || [];
    const rotaDinamica = [];
    const adminChildren = [];

    paginasPermitidas.forEach(page => {
        switch (page.path) {
            case '/form-aluno':
                rotaDinamica.push({ path: page.path, component: FormAluno, meta: { precisaDeAutenticacao: true, tipoUsuario: 'aluno' } });
                break;
            case '/lista-professor':
                adminChildren.push({ path: 'lista-professor', component: ListaProfessor, meta: { precisaDeAutenticacao: true, tipoUsuario: 'professor' } });
                rotaDinamica.push({ path: page.path, component: ListaProfessor, meta: { precisaDeAutenticacao: true, tipoUsuario: 'professor' } });
                break;
            case '/painel-admin':
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
            console.log()
            return next({ path: '/' });
        }

        const tipoUsuario = to.meta.tipoUsuario;
        if (usuario.tipo === tipoUsuario || usuario.tipo === 'administrador') {
            return next();
        }

        alert("Acesso negado: Você não tem permissão para acessar esta página.");
        return next({ path: '/' });
    }
    return next();
});

export default router;
