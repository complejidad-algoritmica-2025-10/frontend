<template>
  <div>
    <h2>Grafo de Coactuación</h2>

    <!-- Contenedor horizontal -->
    <div
      style="
        display: flex;
        align-items: flex-start;
        gap: 20px;
        margin-bottom: 20px;
      "
    >
      <!-- Grafo reducido y alineado a la izquierda -->
      <div style="flex: 1; max-width: 1000px">
        <GraphCanvasComponent
          v-if="!loading && nodes.length"
          :nodes="nodes"
          :edges="edges"
        />
        <p v-else-if="loading">Cargando...</p>
        <p v-else>No hay datos para este cluster.</p>
      </div>

      <!-- Controles al costado derecho -->
      <div style="width: 450px">
        <label>Número de Cluster:</label>
        <Dropdown
          v-model="clusterInput"
          :options="clusterOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Selecciona un cluster"
          style="width: 100%; margin-bottom: 10px"
          class="mi-dropdown"
        />
        <Button @click="loadGraph" label="Mostrar" :disabled="clusterInput === null" style="width: 100%" />
        <div style="margin-top: 20px">
          <h3 style="margin-bottom: 10px">Descripción</h3>
          <p style="line-height: 1.6; font-size: 14px; color: #555">
           Este grafo de coactuación representa las relaciones entre actores y actrices que han participado 
           juntos en producciones cinematográficas dentro del clúster seleccionado. Cada nodo representa a una
            persona, y cada arista indica que ambos compartieron créditos en una o más películas.
             La visualización permite identificar comunidades de colaboración, patrones recurrentes 
             y posibles figuras centrales dentro del ámbito actoral.

          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { fetchGraph } from "../services/projected.service.ts";
import type { Node } from "../model/node.entity";
import type { Edge } from "../model/edge.entity";
import GraphCanvasComponent from "./graph-canvas.component.vue";
import { Button, Dropdown } from "primevue";

// Estado reactivo
const nodes = ref<Node[]>([]);
const edges = ref<Edge[]>([]);
const loading = ref(false);
const clusterInput = ref<number | null>(null);
const allClusters = ref<{ nodes: Node[]; edges: Edge[] }[]>([])


//8, 9, 10, 17 (dropdown)
const clusterOptions = [
  { label: `Cluster Promedio`, value: 4 },
  { label: `Cluster 8`, value: 8 },
  { label: `Cluster 9`, value: 9 },
  { label: `Cluster 10`, value: 10 },
  { label: `Cluster 17`, value: 17 },
];

// Cargar todos los datos al montar
const initGraphData = async () => {
  loading.value = true
  try {
    const data = await fetchGraph()
    allClusters.value = data.clusters || []
    updateSelectedCluster()
  } catch (error) {
    console.error('Error al cargar los clusters:', error)
  } finally {
    loading.value = false
  }
}

// Cargar el cluster seleccionado desde memoria local
const updateSelectedCluster = () => {
  if (clusterInput.value === null || clusterInput.value < 1) {
    nodes.value = []
    edges.value = []
    return
  }

  const index = clusterInput.value - 1
  if (allClusters.value.length > index) {
    nodes.value = allClusters.value[index].nodes
    edges.value = allClusters.value[index].edges
  } else {
    nodes.value = []
    edges.value = []
    console.warn(`Cluster ${clusterInput.value} no encontrado.`)
  }
}


// Método expuesto al botón (por si lo necesitas)
const loadGraph = () => {
  updateSelectedCluster()
}

// Cargar una vez al montar
onMounted(initGraphData)

</script>

<style scoped>
.mi-dropdown {
  background-color: #1a1818 !important;
  border: 2px solid #000000 !important;
  border-radius: 8px !important;
  font-size: 16px !important;
  color: #333 !important;
  padding: 0.5rem !important;
}

.mi-dropdown .p-dropdown-label {
  padding: 0.5rem !important;
  font-weight: 500 !important;
}
</style>
