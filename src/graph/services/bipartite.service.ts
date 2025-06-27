

export async function fetchBipartiteGraph(limit: any) {
  const response = await fetch(`http://localhost:8000/bipartite-graph?limit=${limit}`)
  if (!response.ok) {
    throw new Error(`Error al obtener el grafo bipartito: ${response.statusText}`)
  }
  return await response.json()
}