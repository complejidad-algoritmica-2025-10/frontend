import type { GraphData } from "../model/graph-data.entity"

export async function fetchGraph(limit: any): Promise<GraphData> {
  const res = await fetch(`http://127.0.0.1:8000/graph?limit=${limit}`)

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Error HTTP ${res.status}: ${errorText}`)
  }

  return res.json()
}