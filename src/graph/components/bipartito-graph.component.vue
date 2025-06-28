<script setup lang="ts">
import { ref } from 'vue'
import { fetchBipartiteGraph } from '../services/bipartite.service'
import { Button, InputNumber } from 'primevue'
import BipartiteGraphCanvasComponent from './bipartite-graph-canvas.component.vue'

// Estado
const nodes = ref([])
const edges = ref([])
const loading = ref(false)

// Esto será el número de cluster que el usuario elige
const selectedCluster = ref(0) // Por ejemplo, 0 para el primer cluster

const loadBipartite = async () => {
  loading.value = true
  try {
    const data = await fetchBipartiteGraph()
    if (data.clusters && data.clusters.length > selectedCluster.value) {
      nodes.value = data.clusters[selectedCluster.value].nodes
      edges.value = data.clusters[selectedCluster.value].edges
    } else {
      nodes.value = []
      edges.value = []
      console.warn('Cluster no encontrado')
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <h2>Grafo Bipartito</h2>

    <label>Selecciona Cluster:</label>
    <InputNumber v-model="selectedCluster" :min="0" />

    <Button @click="loadBipartite">Cargar Cluster</Button>

    <BipartiteGraphCanvasComponent
        v-if="!loading && nodes.length"
        :nodes="nodes"
        :edges="edges"
    />

    <p v-else-if="loading">Cargando grafo bipartito...</p>
    <p v-else>No hay datos para este cluster.</p>
  </div>
</template>
