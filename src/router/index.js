import { createRouter, createWebHistory } from 'vue-router'
import componenteHome from '../components/cHome.vue'
import componenteLista from '../components/cVerLista.vue'
import formulario from '../components/cFormulario.vue'
import componenteVerAnuncio from '../components/cVerAnuncio.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: componenteHome
    },
    {
      path: '/verLista',
      name: 'verLista',
      component: componenteLista
    },
    {
      path: '/verLista/:localidad',
      name: 'verListaLocalidad',
      component: componenteLista
    },
    {
      path: '/formulario',
      name: 'Formulario',
      component: formulario
    },
    {
      path: '/verAnuncio/:id',
      name: 'VerAnuncio',
      component: componenteVerAnuncio
    }
    /*{
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
    */
  ]
})

export default router
