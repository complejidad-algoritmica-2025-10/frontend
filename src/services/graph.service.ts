///import { Network } from 'vis-network'
import httpInstance from "./http.instance.ts";

const BIPARTITE_ENDPOINT = import.meta.env.VITE_BIPARTITE_GRAPH_ENDPOINT_PATH;
const PROJECTED_ENDPOINT = import.meta.env.VITE_PROJECTED_GRAPH_ENDPOINT_PATH;

export async function  getBipartite(): Promise<any> {
    return httpInstance.get(BIPARTITE_ENDPOINT)
}

export async function getProjected(): Promise<any> {
    return httpInstance.get(PROJECTED_ENDPOINT)
}

