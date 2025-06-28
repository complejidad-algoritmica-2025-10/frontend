<template>
  <div ref="graphContainer" style="height: 600px; border: 1px solid #ccc;"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { Network } from 'vis-network'
import type { Node } from '../model/node.entity';
import type { Edge } from '../model/edge.entity';

const props = defineProps<{
  nodes: Node[]
  edges: Edge[]
}>()

const graphContainer = ref<HTMLDivElement | null>(null)

onMounted(() => {
  renderGraph()
})

watch(() => [props.nodes, props.edges], () => {
  renderGraph()
})

function renderGraph() {
  if (!graphContainer.value) return

  const nodes = props.nodes.map(n => ({
    id: n.id,
    label: n.id,
    color: n.gender === 'F' ? 'hotpink' : n.gender === 'M' ? 'royalblue' : 'mediumorchid',
    size: 15
  }))

  const edges = props.edges.map(e => ({
    from: e.source,
    to: e.target,
    width: Math.min(e.weight, 8),
    color: '#999'
  }))

  const data = { nodes, edges }

  const options = {
    nodes: {
      shape: 'dot',
      scaling: { min: 1000, max: 2000 }
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
        nodeDistance: 250,  // SÚBELO MÁS para más separación
        damping: 0.1
      }
    }
  }

  new Network(graphContainer.value, data, options)
}
</script>
