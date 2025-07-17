"use client"

import { Phone, Mail, Clock } from "lucide-react"
import styles from "./Footer.module.css"

/**
 * Dados do footer. Você pode puxar de config ou .env depois.
 */
export interface FooterInfo {
  brandName?: string
  brandTagline?: string
  phone?: string
  email?: string
  weekdayHours?: string
  weekendHours?: string
  year?: number
}

export default function Footer({
  brandName = "Um Sushi",
  brandTagline = "Os melhores sushis da cidade, preparados com ingredientes frescos e selecionados.",
  phone = "(71) 98765-4321",
  email = "contato@umsushi.com.br",
  weekdayHours = "Segunda a Sexta: 11h - 23h",
  weekendHours = "Sábado e Domingo: 12h - 00h",
  year = new Date().getFullYear(),
}: FooterInfo) {
  return (
    <footer className={styles.footerRoot}>
      <div className={styles.inner}>
        {/* Coluna 1 – Marca */}
        <div>
          <h3 className={styles.colTitle}>{brandName}</h3>
          <p className={styles.brandText}>{brandTagline}</p>
        </div>

        {/* Coluna 2 – Horários */}
        <div>
          <h3 className={styles.colTitle}>
            <Clock size={20} className={styles.icon} />
            Horário de Funcionamento
          </h3>
          <p className={styles.hoursLine}>{weekdayHours}</p>
          <p className={styles.hoursLine}>{weekendHours}</p>
        </div>

        {/* Coluna 3 – Contato */}
        <div>
          <h3 className={styles.colTitle}>Contato</h3>
          <p className={styles.contactLine}>
            <Phone size={16} className={styles.icon} />
            <a className={styles.linkPlain} href="tel:+551112345678">
              {phone}
            </a>
          </p>
          <p className={styles.contactLine}>
            <Mail size={16} className={styles.icon} />
            <a className={styles.linkPlain} href={`mailto:${email}`}>
              {email}
            </a>
          </p>
        </div>
      </div>

      <div className={styles.copyWrap}>
        <p>
          &copy; {year} {brandName}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
