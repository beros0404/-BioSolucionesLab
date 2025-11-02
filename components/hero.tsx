"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  const handleQuoteClick = () => {
    const quoteSection = document.getElementById('cotizacion')
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleServicesClick = () => {
    const servicesSection = document.getElementById('services')
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-transparent py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-4 inline-block rounded-full bg-secondary/10 px-3 py-1">
            <span className="text-sm font-medium text-primary">✓ Precisión. Velocidad. Confidencialidad.</span>
          </div>

          <h1 className="mb-6 text-balance text-4xl font-bold sm:text-5xl lg:text-6xl text-foreground">
            Soluciones Avanzadas en Diagnóstico Molecular y Bioinformática
          </h1>

          <p className="mb-8 text-balance text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto leading-relaxed">
            BIOSOLUCIONES LAB ofrece soluciones científicas de alta calidad para investigadores, empresas, instituciones
            y laboratorios. Desde diagnóstico molecular hasta análisis bioinformático completo, garantizamos precisión y
            confidencialidad en cada paso.
          </p>

          <div className="flex flex-col gap-4 justify-center sm:flex-row">
            <Button 
              size="lg" 
              className="gap-2 bg-primary hover:bg-primary/90"
              onClick={handleQuoteClick}
            >
              Solicitar Cotización
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={handleServicesClick}
            >
              Explorar Servicios
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}