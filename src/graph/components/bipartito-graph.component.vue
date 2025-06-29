<script setup lang="ts">
import { ref } from 'vue'
import { Network } from 'vis-network'
import { DataSet } from 'vis-data'
import 'vis-network/styles/vis-network.css'
import { fetchBipartiteGraph } from '../services/bipartite.service'
import { Button, InputNumber } from 'primevue'
import LegendComponent from "./legend.component.vue";

const nodes = ref<any[]>([])
const edges = ref<any[]>([])
const loading = ref(false)
const selectedCluster = ref(0)
const networkContainer = ref<HTMLElement | null>(null)
let network: Network | null = null

const options = {
  nodes: {
    shape: 'dot',
  },
  edges: {
    smooth: true,
    arrows: { to: false },
    color: '#ccc'
  },
  physics: {
    enabled: true,
    solver: 'repulsion',
    repulsion: {
      nodeDistance: 500
    }
  }
}

const loadBipartite = async () => {
  loading.value = true
  try {
    const data = await fetchBipartiteGraph()
    if (data.clusters && data.clusters.length > selectedCluster.value) {
      nodes.value = data.clusters[selectedCluster.value].nodes
      edges.value = data.clusters[selectedCluster.value].edges
      renderNetwork()
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

const categoryColors = {
  director: 'green',
  producer: 'orange',
  actor: 'royalblue',
  actress: 'hotpink',
  writer: 'purple',
  cinematographer: 'brown',
  default: '#999'
}

const renderNetwork = () => {
  if (!networkContainer.value) return

  const visNodes = new DataSet(
      nodes.value.map(n => ({
        id: n.id,
        color: n.gender === 'F' ? 'hotpink'
            : n.gender === 'M' ? 'royalblue'
                : n.gender === 'U' ? 'mediumorchid'
                    : 'yellow',
        label: n.name
      }))
  )

  const visEdges = new DataSet(
      edges.value.map((e, i) => ({
        id: `edge-${i}`,
        from: e.source,
        to: e.target,
        width: Math.min(e.weight, 8),
        color: {
          color: categoryColors[e.category] || categoryColors.default
        },
        dashes: e.category === 'director' ? [5, 5] : false
      }))
  )

  if (network) {
    network.setData({ nodes: visNodes, edges: visEdges })
  } else {
    network = new Network(networkContainer.value, { nodes: visNodes, edges: visEdges }, options)
  }
}
</script>

<template>
  <div>
    <h2>Grafo Bipartito</h2>

    <label>Selecciona Cluster:</label>
    <InputNumber v-model="selectedCluster" :min="0" />

    <Button @click="loadBipartite">Cargar Cluster</Button>

    <div
        ref="networkContainer"
        style="width: 100%; height: 600px; border: 1px solid #ccc; margin-top: 20px;"
    />

    <LegendComponent/>

    <p v-if="loading">Cargando grafo bipartito...</p>
    <p v-else-if="!loading && !nodes.length">No hay datos para este cluster.</p>
  </div>
</template>
