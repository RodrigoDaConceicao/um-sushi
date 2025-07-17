"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"   
import { ShoppingCart, Menu, X } from "lucide-react"
import styles from "./Header.module.css"

export interface HeaderProps {
  cartCount?: number
  onCartClick?: () => void
  links?: Array<{ href: string; label: string }>
  brandName?: string
  brandHref?: string
}

export default function Header({
  cartCount = 0,
  onCartClick,
  links = [
    { href: "/", label: "Início" },
    { href: "/cardapio", label: "Cardápio" },
    { href: "/promocoes", label: "Promoções" },
    { href: "/sobre", label: "Sobre Nós" },
  ],
  brandName = "Sushi Delícia",
  brandHref = "/",
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => setIsMobileMenuOpen((v) => !v)

  return (
    <header className={styles.headerRoot}>
      <div className={styles.inner}>
        {/* Brand */}
        <Link href={brandHref} className={styles.brand}>
          <span className={styles.brandCircle}>
            <Image
              src="/logoUmSushi.svg"      // arquivo em /public
              alt="Logo Um Sushi"
              width={40}
              height={40}
              className={styles.brandLogo}
              priority                    // carrega logo cedo
            />
          </span>
          <span className={styles.brandName}>{brandName}</span>
        </Link>

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
          <button
            type="button"
            aria-label="Abrir carrinho"
            onClick={onCartClick}
            className={styles.iconButton}
          >
            <ShoppingCart size={24} strokeWidth={2} />
            {cartCount > 0 && (
              <span className={styles.badge}>{cartCount}</span>
            )}
          </button>

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
