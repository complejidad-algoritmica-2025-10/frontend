<script setup lang="ts">
import { ref } from "vue";
import { Network } from "vis-network";
import { DataSet } from "vis-data";
import "vis-network/styles/vis-network.css";
import { fetchBipartiteGraph } from "../services/bipartite.service";
import { Button, Dropdown } from "primevue";
import LegendComponent from "./legend.component.vue";

const nodes = ref<any[]>([]);
const edges = ref<any[]>([]);

const professionGenderCount = ref<Record<string, Record<string, number>>>({});

const loading = ref(false);
const selectedCluster = ref(0);
const networkContainer = ref<HTMLElement | null>(null);
let network: Network | null = null;
const updateCounts = () => {
  const rawCounts: Record<string, Record<string, number>> = {};

  edges.value.forEach((edge) => {
    const { source, target, category } = edge;

    const sourceNode = nodes.value.find(
      (n) => n.id === source && n.type === "person"
    );
    const targetNode = nodes.value.find(
      (n) => n.id === target && n.type === "person"
    );

    [sourceNode, targetNode].forEach((person) => {
      if (!person) return;

      const gender = person.gender || "U";
      const role = category || "unknown";

      if (!rawCounts[role]) rawCounts[role] = {};
      if (!rawCounts[role][gender]) rawCounts[role][gender] = 0;

      rawCounts[role][gender] += 1;
    });
  });

  // Convertir a porcentajes
  const percentages: Record<string, Record<string, number>> = {};

  for (const role in rawCounts) {
    const total = Object.values(rawCounts[role]).reduce((a, b) => a + b, 0);
    percentages[role] = {};

    for (const gender in rawCounts[role]) {
      percentages[role][gender] = parseFloat(
        ((rawCounts[role][gender] / total) * 100).toFixed(1)
      );
    }
  }

  professionGenderCount.value = percentages;
};


const options = {
  layout: {
    improvedLayout: false,
  },
  nodes: {
    shape: "dot",
  },
  edges: {
    smooth: true,
    arrows: { to: false },
    color: "#ccc",
  },
  physics: {
    enabled: true,
    solver: "repulsion",
    repulsion: {
      nodeDistance: 500,
    },
  },
};

const clusterOptions = Array.from({ length: 27 }, (_, i) => ({
  label: `Cluster de película ${i}`,
  value: i,
}));

clusterOptions[0].label = "Grafo completo";

const loadBipartite = async () => {
  if (selectedCluster.value === null) {
    alert("Selecciona un cluster válido");
    return;
  }
  loading.value = true;
  try {
    const data = await fetchBipartiteGraph();
    if (data.clusters && data.clusters.length > selectedCluster.value) {
      nodes.value = data.clusters[selectedCluster.value].nodes;
      edges.value = data.clusters[selectedCluster.value].edges;
      renderNetwork();
      updateCounts();
    } else {
      nodes.value = [];
      edges.value = [];
      console.warn("Cluster no encontrado");
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const categoryColors = {
  director: "green",
  producer: "orange",
  actor: "royalblue",
  actress: "hotpink",
  writer: "purple",
  cinematographer: "brown",
  default: "#999",
};

const renderNetwork = () => {
  if (!networkContainer.value) return;

  const visNodes = new DataSet(
    nodes.value.map((n) => ({
      id: n.id,
      color:
        n.gender === "F"
          ? "hotpink"
          : n.gender === "M"
          ? "royalblue"
          : n.gender === "U"
          ? "mediumorchid"
          : "yellow",
      label: n.name,
    }))
  );

  const visEdges = new DataSet(
    edges.value.map((e, i) => ({
      id: `edge-${i}`,
      from: e.source,
      to: e.target,
      width: Math.min(e.weight, 8),
      color: {
        color: categoryColors[e.category] || categoryColors.default,
      },
      dashes: e.category === "director" ? [5, 5] : false,
    }))
  );

  if (network) {
    network.setData({ nodes: visNodes, edges: visEdges });
  } else {
    network = new Network(
      networkContainer.value,
      { nodes: visNodes, edges: visEdges },
      options
    );
  }
};
</script>

<template>
  <div>
    <h2>Grafo Bipartito</h2>

    <div
      style="
        display: flex;
        align-items: flex-start;
        gap: 20px;
        margin-bottom: 20px;
      "
    >
      <!-- Contenedor del grafo -->
      <div style="flex: 1; max-width: 1000px">
        <div
          ref="networkContainer"
          style="width: 100%; height: 600px; border: 1px solid #ccc"
        />
        <div
          v-if="loading || (!loading && !nodes.length)"
          style="margin-top: 10px"
        >
          <p v-if="loading">Cargando grafo bipartito...</p>
          <p v-else>No hay datos para este cluster.</p>
        </div>
      </div>

      <!-- Controles y leyenda -->
      <div style="width: 450px">
        <label>Número de Cluster:</label>
        <Dropdown
          v-model="selectedCluster"
          :options="clusterOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Selecciona un cluster"
          style="width: 100%; margin-bottom: 10px"
          class="mi-dropdown"
        />
        <Button @click="loadBipartite" label="Mostrar" style="width: 100%" />

        <div style="margin-top: 20px">
          <h3 style="margin-bottom: 10px">Descripción</h3>
          <p style="line-height: 1.6; font-size: 14px; color: #555">
            Este grafo bipartito representa la interacción entre distintos
            participantes del clúster seleccionado. Cada nodo representa una
            persona, y los colores indican género o categoría. Las aristas
            indican co-participación, ponderadas por la cantidad de relaciones
            entre ellos.
          </p>
        </div>
        <div style="margin-top: 20px; justify-items: center">
          <LegendComponent />
        </div>
      </div>
    </div>
    <div style="margin-top: 20px; width: 95%; margin-left: 40px;">
      <h3 style="margin-bottom: 10px">Conteo por profesión y género</h3>
      <div
        style="
          font-size: 14px;
          color: #333;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        "
      >
        <div
          v-for="(genders, profession) in professionGenderCount"
          :key="profession"
          style="
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 6px;
            background-color: #f9f9f9;
          "
        >
          <strong style="display: block; margin-bottom: 6px; color: #6b21a8">
            {{ profession }}
          </strong>
          <div>
            <div
              v-for="(count, gender) in genders"
              :key="gender"
              style="margin-bottom: 4px"
            >
              <span style="color: #555">
                {{
                  gender === "M"
                    ? "Masculino"
                    : gender === "F"
                    ? "Femenino"
                    : "Desconocido"
                }}:
              </span>
              <span style="font-weight: bold">{{ count }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
