import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context"

import Header from "../components/header/Header"
import Footer from "../components/footer/Footer"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Um Sushi",
  description: "Cardápio e pedidos online de sushi.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <CartProvider>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <Header />
          {children}
          <Footer />
        </body>
      </CartProvider>
    </html>
  )
}