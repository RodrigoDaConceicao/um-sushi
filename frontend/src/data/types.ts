// src/data/types.ts
export type Categoria = "sushi" | "bebida" | "sobremesa" | "combo"

export interface Produto {
  id: number
  nome: string
  descricao: string
  preco: number
  imagem: string
  categoria: Categoria[]
  ingredientes: string[]
}
