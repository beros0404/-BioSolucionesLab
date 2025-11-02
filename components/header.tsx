"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Inicio", href: "#inicio" },
  { name: "Acerca de", href: "#about" },
  { name: "Valores", href: "#values" },
  { name: "Servicios", href: "#services" },
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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center">
            <svg viewBox="0 0 200 200" className="h-12 w-12" xmlns="http://www.w3.org/2000/svg">
              {/* Blue diagonal lines */}
              <line x1="30" y1="30" x2="50" y2="10" stroke="#1E5A8E" strokeWidth="8" strokeLinecap="round" />
              <line x1="50" y1="50" x2="70" y2="30" stroke="#1E5A8E" strokeWidth="8" strokeLinecap="round" />
              {/* Green house/checkmark shape */}
              <path
                d="M 80 40 L 120 80 L 140 60 L 140 140 L 80 140 L 80 100 L 100 80 L 80 60 Z"
                fill="none"
                stroke="#7BC043"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-xl font-bold text-foreground">BIOSOLUCIONES LAB</span>
        </Link>

        {/* Desktop Navigation */}
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
          <Button className="hidden sm:inline-flex" size="sm">
            Solicitar Cotización
          </Button>

          {/* Mobile menu button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="inline-flex md:hidden">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
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
            <Button className="mt-4 w-full" size="sm">
              Solicitar Cotización
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
