import type { RouteRecordRaw } from 'vue-router';
import { useAuth } from 'src/stores/auth';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/IndexPage', component: () => import('pages/IndexPage.vue') },
      {
        path: '/AreaPersonal',
        component: () => import('pages/AreaPersonal.vue'),
        beforeEnter: () => {
          const { user } = useAuth();
          if (!user.value) {
            return '/Acceder';
          }
        },
      },
      { path: '/TestNivel', component: () => import('pages/TestNivel.vue') },
      { path: '/ClasesGrupales', component: () => import('pages/ClasesGrupales.vue') },
      { path: '/ClasesIndividuales', component: () => import('pages/ClasesIndividuales.vue') },
      { path: '/Contacto', component: () => import('pages/ContactoForm.vue') },
      { path: '/EjerciciosEspañol', component: () => import('pages/EjerciciosEspañol.vue') },
      { path: '/ServiciosNook', component: () => import('pages/ServiciosNook.vue') },
      { path: '/SobreSpanish', component: () => import('pages/SobreSpanish.vue') },
      { path: '/Acceder', component: () => import('pages/Acceder.vue') },
      { path: '/Registro', component: () => import('pages/Registro.vue') },
      { path: '/AuthCallback', component: () => import('pages/AuthCallback.vue') },
      { path: 'Cookies', component: () => import('pages/legalCookies.vue') },
      { path: 'Privacidad', component: () => import('pages/legalPrivacidad.vue') },
      { path: 'Aviso', component: () => import('pages/legalAviso.vue') },
    ],
  },
  {
    path: '/CheckEmail',
    component: () => import('src/layouts/EmptyLayout.vue'),
    children: [{ path: '', component: () => import('pages/CheckEmail.vue') }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
