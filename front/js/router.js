import FormAluno from './components/FormAluno.js';
import ListaProfessor from './components/ListaProfessor.js';
import PainelAdmin from './components/PainelAdmin.js';
import Login from './components/Login.js';

const routes = [
    { path: '/', component: Login },
    { path: '/form-aluno', component: FormAluno, meta: { precisaDeAutenticacao: false, tipoUsuario: 'aluno' } },
    { path: '/lista-professor', component: ListaProfessor, meta: { precisaDeAutenticacao: true, tipoUsuario: 'professor' } },
    { path: '/painel-admin', component: PainelAdmin, meta: { precisaDeAutenticacao: true, tipoUsuario: 'administrador' } }
];

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
