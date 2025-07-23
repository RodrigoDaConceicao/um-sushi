'use client'
import { useCart } from "@/context/cart-context"
import { Produto } from "@/data/types"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { useMemo } from "react"
import { getMenu } from "../cardapio/adapters/cardapio"
import styles from "./carrinho.module.css"

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
        Carrinho de Compras Um Sushi
      </h1>
      <p style={{ fontSize: "1.1rem", maxWidth: 600, margin: "0 auto" }}>
        Confirme, altere e envio o seu pedido!
      </p>
    </section>
  )
}
export default function CarrinhoPage() {
    const { addItem, removeItem, getQty, getTotalCount, items } = useCart()
    const {data: produtos, isLoading, isFetching} = useQuery({
        queryKey: ["produtos"],
        queryFn: () => getMenu(),
    })

    const filtered = useMemo(() => {
        const selectedItensId = Object.keys(items)
        if (!selectedItensId) return []
        return produtos?.filter((p) => selectedItensId.includes(p.id.toString()))
    }, [items, produtos])

    console.log(filtered)
    
    return (
        <div className={styles.pageRoot}>
            <Hero />
            <div className={styles.cartHeader}>
                <h2>Itens ({getTotalCount()})</h2>
            </div>
            { getTotalCount() == 0 ?
                <div className={styles.emptyCart}>
                    <h3>Carrinho vazio! Escolha seus pratos favoritos e volte aqui para enviar o seu pedido.</h3>
                </div> :
                <>
                <div className={styles.cartItems}>
                    {filtered?.map((p) => (
                        <CartItens
                            key={p.id}
                            produto={p}
                            qty={getQty(p.id)}
                            onAdd={() => addItem(p, 1)}
                            onRemove={() => removeItem(p.id, 1)} />
                    ))}
                </div>
                <div className={styles.cartSummary}>
                    <div className={styles.summaryRow}>
                        <span>Total</span>
                        <span>{fmtBRL.format(filtered?.map((p) => p.preco * getQty(p.id)).reduce((a, b) => a + b, 0) ?? 0)}</span>
                    </div>
                    <button className={styles.checkoutBtn}>Finalizar Compra</button>
                </div>
                </>
            }
        </div>
    )
}

const fmtBRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
})

function CartItens({ produto, qty, onAdd, onRemove }: {
    produto: Produto
    qty: number
    onAdd: () => void
    onRemove: () => void;
}) {
    return (
    <div className={styles.cartItem}>
        <Image src={produto.imagem} alt="Produto 1" className={styles.productImage} width={150} height={150}/>
        <div className={styles.productInfo}>
            <h3 className={styles.productName}>{produto.nome}</h3>
            <div className={styles.quantityControl}>
                <button className={styles.quantityBtn} onClick={onRemove}>-</button>
                <span className={styles.quantityInput}>{qty}</span>
                <button className={styles.quantityBtn} onClick={onAdd}>+</button>
            </div>
        </div>
        <div className={styles.productPrice}>{fmtBRL.format(produto.preco)}</div>
    </div>
    )
}