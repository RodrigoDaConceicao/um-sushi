import { CartProvider } from "@/context/cart-context";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ReactQueryProvider from "@/providers/ReactQuery";
import { ToastContainer } from "react-toastify";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";


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
      <ReactQueryProvider>
        <CartProvider>
          <ToastContainer />
          <body className={`${geistSans.variable} ${geistMono.variable}`}>
            <Header />
            {children}
            <Footer />
          </body>
        </CartProvider>
      </ReactQueryProvider>
    </html>
  )
}