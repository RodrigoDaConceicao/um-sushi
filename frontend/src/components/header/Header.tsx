"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { ShoppingCart, Menu, X, ArrowLeft } from "lucide-react"
import styles from "./Header.module.css"
import { useCart } from "@/context/cart-context"


export interface HeaderProps {
  links?: Array<{ href: string; label: string }>
  brandName?: string
  brandHref?: string
}

export default function Header({
  links = [
    { href: "/", label: "Início" },
    { href: "/cardapio", label: "Cardápio" },
    { href: "/promocoes", label: "Promoções" },
    { href: "/sobre", label: "Sobre Nós" },
  ],
  brandName = "Um Sushi",
  brandHref = "/",
}: HeaderProps) {
  const { getTotalCount } = useCart()
  const cartQty = getTotalCount()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const toggleMobileMenu = () => setIsMobileMenuOpen((v) => !v)

  // --- lógica do botão voltar ---
  const pathname = usePathname()
  const router = useRouter()
  const showBack = pathname !== "/"
  // -------------------------------

  return (
    <header className={styles.headerRoot}>
      <div className={styles.inner}>
        {/* Grupo esquerdo: back (condicional) + brand */}
        <div className={styles.leftGroup}>
          {showBack && (
            <button
              type="button"
              aria-label="Voltar"
              onClick={() => router.back()}
              className={styles.backButton}
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <Link href={brandHref} className={styles.brand}>
            <span className={styles.brandCircle}>
              <Image
                src="/logoUmSushi.svg"
                alt="Logo Um Sushi"
                width={40}
                height={40}
                className={styles.brandLogo}
                priority
              />
            </span>
            <span className={styles.brandName}>{brandName}</span>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className={styles.navDesktop} aria-label="Navegação principal">
          <ul className={styles.navList}>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={styles.navLink}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          <Link
            href="/carrinho"
            aria-label="Ir para o carrinho"
            className={styles.iconButton}
          >
            <ShoppingCart size={24} strokeWidth={2} />
            {cartQty > 0 && <span className={styles.badge}>{cartQty}</span>}
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label="Abrir menu"
            onClick={toggleMobileMenu}
            className={`${styles.iconButton} ${styles.mobileToggle}`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-nav"
        className={
          isMobileMenuOpen
            ? `${styles.mobileMenu} ${styles.mobileMenuOpen}`
            : styles.mobileMenu
        }
      >
        <nav className={styles.mobileNav} aria-label="Navegação móvel">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={styles.mobileLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
