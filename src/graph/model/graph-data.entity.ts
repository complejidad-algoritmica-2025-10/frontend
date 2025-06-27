import type { Edge } from "./edge.entity"
import type { Node } from "./node.entity"

export interface GraphData {
  nodes: Node[]
  edges: Edge[]
}