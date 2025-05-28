<template>
  <div id="graph" style="height: 600px;"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Network } from 'vis-network'
import {getBipartite, getProjected} from "../services/graph.service.ts";

const graphData = ref<Record<string, any>>({})
const selectedGraph = ref<'bipartite' | 'projected'>('bipartite')
let network: Network | null = null

function formatGraph(data: any) {
  const formattedNodes = data.nodes.map((n: any) => ({
    id: n.id,
    label: n.id,
    color:
        n.type === 'movie'
            ? 'orange'
            : n.gender === 'F'
                ? 'hotpink'
                : n.gender === 'M'
                    ? 'royalblue'
                    : 'mediumorchid',
    shape: 'dot',
  }))

  const formattedEdges = data.edges.map((e: any) => ({
    from: e.source,
    to: e.target,
  }))

  return { nodes: formattedNodes, edges: formattedEdges }
}

async function fetchGraphs() {
  const [bipartiteRes, projectedRes] = await Promise.all([
    getBipartite(),
    getProjected(),
  ])

  graphData.value = {
    bipartite: formatGraph(bipartiteRes.data),
    projected: formatGraph(projectedRes.data),
  }
}

function renderGraph() {
  const container = document.getElementById('graph')!
  const { nodes, edges } = graphData.value[selectedGraph.value]
  const data = { nodes, edges }
  const options = {
    nodes: { size: 10 },
    edges: { color: '#aaa' },
    physics: { stabilization: true },
  }

  if (network) {
    network.setData(data)
  } else {
    network = new Network(container, data, options)
  }
}

onMounted(async () => {
  await fetchGraphs()
  renderGraph()
})
</script>
