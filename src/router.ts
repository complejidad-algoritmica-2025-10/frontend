import { createRouter, createWebHistory } from 'vue-router'

import graphViewComponent from './graph/components/graph-view.component.vue'
import BipartitoGraphComponent from './graph/components/bipartito-graph.component.vue'

const routes = [
  {
    path: '/',
    redirect: '/coactuacion'  // ruta por defecto
  },
  {
    path: '/coactuacion',
    name: 'Coactuación',
    component: graphViewComponent
  },
  {
    path: '/bipartito',
    name: 'Bipartito',
    component: BipartitoGraphComponent
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
