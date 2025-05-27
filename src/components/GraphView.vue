<template>
  <div id="graph" style="height: 600px;"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Network } from 'vis-network'
import axios from 'axios'

async function loadGraph() {
  const res = await axios.get('http://localhost:8000/api/graph/bipartite')
  const { nodes, edges } = res.data

  console.log(res.data)

  const formattedNodes = nodes.map((n: any) => ({
    id: n.id,
    label: n.id,
    color: n.type === 'movie' ? 'orange' : n.gender === 'F' ? 'hotpink' : 'royalblue',
    shape: 'dot',
  }))

  const formattedEdges = edges.map((e: any) => ({
    from: e.source,
    to: e.target,
  }))

  const container = document.getElementById('graph')!
  const data = { nodes: formattedNodes, edges: formattedEdges }
  const options = {
    nodes: { size: 10 },
    edges: { color: '#aaa' },
    physics: { stabilization: true },
  }

  new Network(container, data, options)
}

onMounted(() => {
  loadGraph()
})
</script>
