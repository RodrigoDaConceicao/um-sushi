"use client"

import React, { createContext, useContext, useMemo, useState, ReactNode } from "react"
import type { Produto } from "@/data/types"

/**
 * Representa os itens do carrinho: mapa idProduto -> quantidade
 */
export type CartItems = Record<number, number>

interface CartContextValue {
  items: CartItems
  addItem: (produto: Produto, qty?: number) => void
  removeItem: (produtoId: number, qty?: number) => void
  setItemQty: (produtoId: number, qty: number) => void
  clear: () => void
  getQty: (produtoId: number) => number
  getTotalCount: () => number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItems>({})

  const addItem = (produto: Produto, qty: number = 1) => {
    setItems((curr) => {
      const next = { ...curr }
      next[produto.id] = (next[produto.id] ?? 0) + qty
      return next
    })
  }

  const removeItem = (produtoId: number, qty: number = 1) => {
    setItems((curr) => {
      const currQty = curr[produtoId] ?? 0
      if (currQty <= qty) {
        const { [produtoId]: _, ...rest } = curr
        return rest
      }
      return { ...curr, [produtoId]: currQty - qty }
    })
  }

  const setItemQty = (produtoId: number, qty: number) => {
    setItems((curr) => {
      if (qty <= 0) {
        const { [produtoId]: _, ...rest } = curr
        return rest
      }
      return { ...curr, [produtoId]: qty }
    })
  }

  const clear = () => setItems({})

  const getQty = (produtoId: number) => items[produtoId] ?? 0

  const getTotalCount = () =>
    Object.values(items).reduce((sum, q) => sum + q, 0)

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem,
      removeItem,
      setItemQty,
      clear,
      getQty,
      getTotalCount,
    }),
    [items]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return ctx
}
