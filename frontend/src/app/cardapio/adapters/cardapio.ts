import { Produto } from "@/data/types"

export async function getMenu(): Promise<Produto[]> {
    const res = await fetch('/api/menu', { method: 'GET' })
    return await res.json()
}