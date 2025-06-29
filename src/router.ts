import { createRouter, createWebHistory } from 'vue-router'

import graphViewComponent from './graph/components/graph-view.component.vue'
import BipartitoGraphComponent from './graph/components/bipartito-graph.component.vue'
import AboutComponent from "./graph/components/about.component.vue";
import DevelopersComponent from "./graph/components/developers.component.vue";

const routes = [
  {
    path: '/',
    redirect: '/about'  // ruta por defecto
  },
  {
    path: '/about',
    name: 'About',
    component: AboutComponent
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
  },
  {
    path: '/developers',
    name: 'Developers',
    component: DevelopersComponent
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
