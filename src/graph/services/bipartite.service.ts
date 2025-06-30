

export async function fetchBipartiteGraph() {
  const response = await fetch(`http://miappfastapi123.westus2.azurecontainer.io:8000/bipartite`)
  if (!response.ok) {
    throw new Error(`Error al obtener el grafo bipartito: ${response.statusText}`)
  }
  return await response.json()
}