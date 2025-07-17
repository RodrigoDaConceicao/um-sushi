"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import styles from "./cardapio.module.css"
import { useCart } from "@/context/cart-context"
import type { Produto } from "@/data/types"
import dataRaw from "@/data/cardapio-temp.json"

/* ------------------------------------------------------------------
 * Config
 * ------------------------------------------------------------------*/
const CATEGORY_OPTIONS = [
  { id: "all",       label: "Todos" },
  { id: "sushi",     label: "Sushis" },
  { id: "bebida",    label: "Bebidas" },
  { id: "sobremesa", label: "Sobremesas" },
  { id: "combo",     label: "Combos" },
] as const

type CategoryId = (typeof CATEGORY_OPTIONS)[number]["id"]

// Produtos carregados do JSON
const PRODUTOS: Produto[] = dataRaw as unknown as Produto[]

/** Mapeia cada produto para uma categoria primária (sushi/bebida/sobremesa/combo).
 *  Se o produto tiver "combo", consideramos combo; senão pega a primeira categoria reconhecida.
 */
function getPrimaryCategory(p: Produto): Exclude<CategoryId, "all"> {
  if (p.categoria.includes("combo")) return "combo"
  if (p.categoria.includes("sushi")) return "sushi"
  if (p.categoria.includes("bebida")) return "bebida"
  if (p.categoria.includes("sobremesa")) return "sobremesa"
  // fallback: trata como sushi
  return "sushi"
}

/** Agrupa produtos por categoria primária. */
function groupByPrimaryCategory(produtos: Produto[]) {
  const groups: Record<Exclude<CategoryId, "all">, Produto[]> = {
    sushi: [],
    bebida: [],
    sobremesa: [],
    combo: [],
  }
  produtos.forEach((p) => {
    const cat = getPrimaryCategory(p)
    groups[cat].push(p)
  })
  return groups
}

const groupsStatic = groupByPrimaryCategory(PRODUTOS)

/** Formata preço em BRL. */
const fmtBRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
})

/* ------------------------------------------------------------------
 * Cardápio Page Component
 * ------------------------------------------------------------------*/
export default function CardapioPage() {
  const [activeCat, setActiveCat] = useState<CategoryId>("all")
  const { addItem, removeItem, getQty } = useCart()

  // Produtos filtrados quando categoria != all
  const filtered = useMemo(() => {
    if (activeCat === "all") return PRODUTOS
    return PRODUTOS.filter((p) => p.categoria.includes(activeCat))
  }, [activeCat])

  // Para modo "all" precisamos exibir seções
  const grouped = useMemo(() => {
    if (activeCat !== "all") return null
    return groupsStatic
  }, [activeCat])

  return (
    <div className={styles.pageRoot}>
      {/* Hero local da página */}
      <Hero />

      {/* Barra de filtros */}
      <FilterBar active={activeCat} onChange={setActiveCat} />

      {/* Conteúdo */}
      {activeCat === "all" && grouped
        ? (
          <>
            <CategorySection
              title="Sushis"
              produtos={grouped.sushi}
              getQty={getQty}
              addItem={addItem}
              removeItem={removeItem}
            />
            <CategorySection
              title="Bebidas"
              produtos={grouped.bebida}
              getQty={getQty}
              addItem={addItem}
              removeItem={removeItem}
            />
            <CategorySection
              title="Sobremesas"
              produtos={grouped.sobremesa}
              getQty={getQty}
              addItem={addItem}
              removeItem={removeItem}
            />
            <CategorySection
              title="Combos"
              produtos={grouped.combo}
              getQty={getQty}
              addItem={addItem}
              removeItem={removeItem}
            />
          </>
        )
        : (
          <CategorySection
            // Título dinâmico com base no filtro
            title={CATEGORY_OPTIONS.find((c) => c.id === activeCat)?.label ?? ""}
            produtos={filtered}
            getQty={getQty}
            addItem={addItem}
            removeItem={removeItem}
          />
        )}
    </div>
  )
}

/* ------------------------------------------------------------------
 * Hero da página Cardápio
 * ------------------------------------------------------------------*/
function Hero() {
  return (
    <section
      style={{
        background: "#ef4444",
        color: "#fff",
        textAlign: "center",
        padding: "4rem 1rem",
        marginBottom: "2.5rem",
        borderRadius: "0",
        marginTop: "64px"
      }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
        Cardápio Um Sushi
      </h1>
      <p style={{ fontSize: "1.1rem", maxWidth: 600, margin: "0 auto" }}>
        Escolha seus pratos favoritos e adicione ao carrinho!
      </p>
    </section>
  )
}

/* ------------------------------------------------------------------
 * Barra de filtros (chips)
 * ------------------------------------------------------------------*/
interface FilterBarProps {
  active: CategoryId
  onChange: (id: CategoryId) => void
}

function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className={styles.filters} role="toolbar" aria-label="Filtrar cardápio por categoria">
      {CATEGORY_OPTIONS.map((cat) => (
        <button
          key={cat.id}
          type="button"
          className={`${styles.filterBtn} ${active === cat.id ? styles.filterBtnActive : ""}`}
          aria-pressed={active === cat.id}
          onClick={() => onChange(cat.id)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------
 * Seção de categoria
 * ------------------------------------------------------------------*/
interface CategorySectionProps {
  title: string
  produtos: Produto[]
  getQty: (id: number) => number
  addItem: (p: Produto, qty?: number) => void
  removeItem: (id: number, qty?: number) => void
}

function CategorySection({
  title,
  produtos,
  getQty,
  addItem,
  removeItem,
}: CategorySectionProps) {
  if (!produtos.length) return null
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.grid}>
        {produtos.map((p) => (
          <ProdutoCard
            key={p.id}
            produto={p}
            qty={getQty(p.id)}
            onAdd={() => addItem(p, 1)}
            onRemove={() => removeItem(p.id, 1)}
          />
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
 * Card de produto
 * ------------------------------------------------------------------*/
interface ProdutoCardProps {
  produto: Produto
  qty: number
  onAdd: () => void
  onRemove: () => void
}

function ProdutoCard({ produto, qty, onAdd, onRemove }: ProdutoCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardImgWrap}>
        <Image
          src={produto.imagem}
          alt={produto.nome}
          fill
          sizes="(max-width: 600px) 100vw, 250px"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardName}>{produto.nome}</div>
        <div className={styles.cardDesc}>{produto.descricao}</div>
        <div className={styles.cardPrice}>{fmtBRL.format(produto.preco)}</div>

        <div className={styles.cardActions}>
          {qty === 0 ? (
            <button type="button" className={styles.addBtn} onClick={onAdd}>
              Adicionar
            </button>
          ) : (
            <>
              <button type="button" className={styles.qtyBtn} onClick={onRemove} aria-label="Remover 1">
                –
              </button>
              <span className={styles.qtyDisplay}>{qty}</span>
              <button type="button" className={styles.qtyBtn} onClick={onAdd} aria-label="Adicionar 1">
                +
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
