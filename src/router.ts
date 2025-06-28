import { createRouter, createWebHistory } from 'vue-router'

import graphViewComponent from './graph/components/graph-view.component.vue'
import BipartitoGraphComponent from './graph/components/bipartito-graph.component.vue'

const routes = [
  {
    path: '/',
    redirect: '/about'  // ruta por defecto
  },
  {
    path: '/collaborations',
    name: 'Coactuación',
    component: graphViewComponent
  },
  {
    path: '/movie-staff',
    name: 'Bipartito',
    component: BipartitoGraphComponent
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
