"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const navigation = [
  { name: "Inicio", href: "#inicio" },
  { name: "Acerca de", href: "#about" },
  { name: "Valores", href: "#values" },
  { name: "Portafolio de Servicios", href: "#services" },
  { name: "Por qué elegirnos", href: "#features" },
  { name: "Contacto", href: "#contact" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavClick = (href: string) => {
    if (href === "#inicio") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
    setMobileMenuOpen(false)
  }

  const handleQuoteClick = () => {
    const quoteSection = document.getElementById('cotizacion')
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="BIOSOLUCIONES LAB"
              width={180}
              height={50}
              className="h-12 w-auto object-contain"
              priority
            />
          </div>
        </Link>

        <div className="hidden gap-1 md:flex">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.href)}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary/10 hover:text-primary"
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Button 
            className="hidden sm:inline-flex" 
            size="sm"
            onClick={handleQuoteClick}
          >
            Solicitar Cotización
          </Button>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="inline-flex md:hidden">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-border md:hidden">
          <div className="space-y-1 px-4 py-4">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-foreground hover:bg-secondary/10"
              >
                {item.name}
              </button>
            ))}
            <Button 
              className="mt-4 w-full" 
              size="sm"
              onClick={handleQuoteClick}
            >
              Solicitar Cotización
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}