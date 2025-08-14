import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/IndexPage', component: () => import('pages/IndexPage.vue') },
      { path: '/AreaPersonal', component: () => import('pages/AreaPersonal.vue') },
      { path: '/NuevoRegistro', component: () => import('pages/NuevoRegistro.vue') },
      { path: '/TestNivel', component: () => import('pages/TestNivel.vue') },
      { path: '/ClasesGrupales', component: () => import('pages/ClasesGrupales.vue') },
      { path: '/ClasesIndividuales', component: () => import('pages/ClasesIndividuales.vue') },
      { path: '/Contacto', component: () => import('pages/ContactoForm.vue') },
      { path: '/EjerciciosEspañol', component: () => import('pages/EjerciciosEspañol.vue') },
      { path: '/ServiciosNook', component: () => import('pages/ServiciosNook.vue') },
      { path: '/SobreSpanish', component: () => import('pages/SobreSpanish.vue') },
      { path: '/Login', component: () => import('pages/Login.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
