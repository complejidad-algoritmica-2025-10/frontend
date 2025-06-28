<template>
  <div>
    <h2>Grafo de Coactuación</h2>

    <div style="margin-bottom: 20px;">
      <label>Número de Cluster:</label>
      <InputNumber
          v-model="clusterInput"
          :min="0"
          placeholder="0, 1, 2, ..."
      />
    </div>

    <Button @click="loadGraph">Mostrar</Button>

    <GraphCanvasComponent
        v-if="!loading && nodes.length"
        :nodes="nodes"
        :edges="edges"
    />

    <p v-else-if="loading">Cargando...</p>
    <p v-else>No hay datos para este cluster.</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { fetchGraph } from '../services/projected.service.ts'
import type { Node } from '../model/node.entity'
import type { Edge } from '../model/edge.entity'
import GraphCanvasComponent from './graph-canvas.component.vue'
import { Button, InputNumber } from 'primevue'

// Estado reactivo
const nodes = ref<Node[]>([])
const edges = ref<Edge[]>([])
const loading = ref(false)
const clusterInput = ref<number>(0) // Por defecto cluster 0

// Función para cargar y mostrar solo el cluster elegido
const loadGraph = async () => {
  if (clusterInput.value < 0) {
    alert('El número de cluster debe ser 0 o mayor')
    return
  }

  loading.value = true
  try {
    // Llamada a tu backend (no necesita parámetros)
    const data = await fetchGraph()

    // Validar y seleccionar el cluster deseado
    if (data.clusters && data.clusters.length > clusterInput.value) {
      nodes.value = data.clusters[clusterInput.value].nodes
      edges.value = data.clusters[clusterInput.value].edges
    } else {
      nodes.value = []
      edges.value = []
      console.warn('Cluster no encontrado')
      alert(`No existe el cluster ${clusterInput.value}. Por favor elige un número válido.`)
    }
  } catch (error) {
    console.error('Error al cargar el grafo:', error)
  } finally {
    loading.value = false
  }
}
</script>
