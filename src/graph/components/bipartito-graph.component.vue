<script setup lang="ts">

import { ref } from 'vue'
import { fetchBipartiteGraph } from '../services/bipartite.service'
import { Button, InputNumber } from 'primevue'
import BipartiteGraphCanvasComponent from './bipartite-graph-canvas.component.vue'

const nodes = ref([])
const edges = ref([])
const loading = ref(false)
const movieLimit = ref(10)

const loadBipartite = async () => {
  loading.value = true
  try {
    const data = await fetchBipartiteGraph(movieLimit.value)
    nodes.value = data.nodes
    edges.value = data.edges
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }

}
</script>

<template>
  <div >
    <h2>Grafo Bipartito</h2>
    <InputNumber v-model="movieLimit" :min="1" :max="100" />
    <Button @click="loadBipartite">Mostrar</Button>
    <BipartiteGraphCanvasComponent
      v-if="!loading"
      :nodes="nodes"
      :edges="edges"
    />
    <p v-else>Cargando grafo bipartito...</p>
  </div>
</template>