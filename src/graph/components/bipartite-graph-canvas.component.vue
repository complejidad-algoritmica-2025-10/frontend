<template>
  <div style="width: 80%; margin: auto;">
  <div ref="cyContainer" style="width: 100%; height: 500px; border: 1px solid #ccc;"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import cytoscape from 'cytoscape'

const props = defineProps<{
  nodes: { id: string; gender?: string; type?: string }[]
  edges: { source: string; target: string }[]
}>()

const cyContainer = ref<HTMLDivElement | null>(null)
let cy: cytoscape.Core | null = null

function renderGraph() {
  if (!cyContainer.value) return

  // Destruir el grafo anterior si existe
  if (cy) {
    cy.destroy()
  }

  cy = cytoscape({
    container: cyContainer.value,
    elements: [
      ...props.nodes.map(n => ({
        data: { id: n.id, label: n.id },
        classes: n.type,
        style: {
          backgroundColor:
            n.type === 'movie'
              ? 'orange'
              : n.gender === 'F'
                ? 'hotpink'
                : n.gender === 'M'
                  ? 'royalblue'
                  : 'mediumorchid'
        }
      })),
      ...props.edges.map(e => ({
        data: { source: e.source, target: e.target }
      }))
    ],
    style: [
      {
        selector: 'node',
        style: {
          label: 'data(label)',
          width: 12,
          height: 12,
          color: '#000',
          'text-valign': 'center',
          'text-halign': 'center',
          'font-size': 6
        }
      },
      {
        selector: 'edge',
        style: {
          width: 1,
          'line-color': '#ccc'
        }
      }
    ],
    layout: {
      name: 'breadthfirst', 
      directed: true,
      padding: 10,
      spacingFactor: 1.8,
      roots: props.nodes.filter(n => n.type === 'movie').map(n => n.id)
    },
    wheelSensitivity: 0.3
  })

   
  const layout = cy.layout({
    name: 'breadthfirst',
    directed: true,
    padding: 10,
    spacingFactor: 1.8,
    roots: props.nodes.filter(n => n.type === 'movie').map(n => n.id),
    animate: true
  })

  layout.run()

 
  setTimeout(() => {
    cy?.fit(undefined, 50)
    cy?.center()
  }, 300)
  
}



onMounted(renderGraph)
watch(() => [props.nodes, props.edges], renderGraph)
</script>
