<template>
  <div>
    <h2>Grafo de Coactuación</h2>

    <div style="margin-bottom: 20px;">
      <label>Número de Cluster:</label>
      <Dropdown
        v-model="clusterInput"
        :options="clusterOptions"
        optionLabel="label"
        optionValue="value"
        placeholder="Selecciona un cluster"
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
import { Button, Dropdown } from 'primevue'

// Estado reactivo
const nodes = ref<Node[]>([])
const edges = ref<Edge[]>([])
const loading = ref(false)
const clusterInput = ref<number | null>(null) // Por defecto cluster 0

//8, 9, 10, 17 (dropdown)

const clusterOptions = Array.from({ length: 27 }, (_, i) => ({
  label: `Cluster ${i + 1}`,
  value: i + 1,
}))

// Función para cargar y mostrar solo el cluster elegido
const loadGraph = async () => {
  if (clusterInput.value === null || clusterInput.value < 1 ) {
    alert('El número de cluster debe ser 0 o mayor')
    return
  }

  
  loading.value = true
  try {
    // Llamada a tu backend (no necesita parámetros)
    const data = await fetchGraph()
    console.log("DATOS")
    console.log(data);


    const index = clusterInput.value - 1
    // Validar y seleccionar el cluster deseado
    if (data.clusters && data.clusters.length > index) {
      nodes.value = data.clusters[index].nodes
      edges.value = data.clusters[index].edges
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
