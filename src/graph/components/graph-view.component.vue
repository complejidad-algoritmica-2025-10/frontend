<template>
   <div>
    <h2>Grafo de Coactuación</h2>
    <InputText v-model="limit" type="number" placeholder="Cantidad de películas (1-50)" style="margin-bottom: 20px;"></InputText>
    <Button @click="loadGraph">Mostrar</Button>

    <GraphCanvasComponent v-if="!loading && nodes.length" :nodes="nodes" :edges="edges"  />
    <p v-else-if="loading">Cargando...</p>
  </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue'
import { fetchGraph } from '../services/graph.service'
import type { Node } from '../model/node.entity'
import type { Edge } from '../model/edge.entity'
import GraphCanvasComponent from './graph-canvas.component.vue'
import { Button, InputText } from 'primevue'

const nodes = ref<Node[]>([])
const edges = ref<Edge[]>([])
const loading = ref(false)
const limit = ref<string>('10')


const loadGraph = async () => {
  const parsedLimit = parseInt(limit.value)
  if (isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 50) {
    alert('El límite debe estar entre 1 y 50')
    return
  }

  loading.value = true
  try {
    const data = await fetchGraph(parsedLimit)
    nodes.value = data.nodes
    edges.value = data.edges
  } catch (error) {
    console.error('Error al cargar el grafo:', error)
  } finally {
    loading.value = false
  }
}

</script>