"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

const serviceSubServices = {
  "Investigación Científica": [
    "Diseño de cebadores y sondas",
    "Asesoramiento en diseño experimental",
    "Sanger",
    "NGS",
    "Análisis Bioinformático Avanzado",
    "Servicios bajo demanda",
    "Diagnóstico de arbovirosis",
  ],
  "Animales de Producción": [
    "Diagnóstico de patógenos porcinos",
    "Diagnóstico aviar",
    "Diagnóstico molecular de endosimbiontes",
    "Diagnóstico acuícola (Camarones)",
  ],
  "Pruebas para la Industria": [
    "Pruebas de esterilidad",
    "Identificación de microorganismos",
  ],
}

const serviceOptions = Object.keys(serviceSubServices) as const

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    subservice: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const savedService = sessionStorage.getItem('quoteService')
    const savedSubservice = sessionStorage.getItem('quoteSubservice')
    
    if (savedService && savedSubservice) {
      setFormData(prev => ({
        ...prev,
        service: savedService,
        subservice: savedSubservice
      }))
      
      // Limpiar el sessionStorage después de leer
      sessionStorage.removeItem('quoteService')
      sessionStorage.removeItem('quoteSubservice')
    }

    // Escuchar eventos personalizados para actualizaciones en tiempo real
    const handleQuoteRequest = (event: CustomEvent) => {
      const { service, subservice } = event.detail
      setFormData(prev => ({
        ...prev,
        service,
        subservice
      }))
    }

    window.addEventListener('quoteRequest', handleQuoteRequest as EventListener)
    
    return () => {
      window.removeEventListener('quoteRequest', handleQuoteRequest as EventListener)
    }
  }, [])

  const availableSubservices = formData.service
    ? serviceSubServices[formData.service as keyof typeof serviceSubServices]
    : []

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === "service") {
      setFormData((prev) => ({ ...prev, [name]: value, subservice: "" }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", email: "", phone: "", service: "", subservice: "", message: "" })
    }, 3000)
  }

  return (
    <section id="cotizacion" className="py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">Solicitar Cotización</h2>
          <p className="text-muted-foreground text-lg">
            Cuéntanos sobre tu proyecto y te proporcionaremos una cotización personalizada
          </p>
        </div>

        <Card className="border border-border">
          <CardContent className="pt-6">
            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12">
                <CheckCircle className="h-16 w-16 text-secondary" />
                <h3 className="text-2xl font-bold">¡Gracias!</h3>
                <p className="text-muted-foreground text-center max-w-sm">
                  Hemos recibido tu solicitud y nos pondremos en contacto pronto con una cotización personalizada.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Nombre *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Correo Electrónico *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="tu.correo@example.com"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Teléfono</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Línea de Servicio *</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Selecciona una línea de servicio</option>
                      {serviceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {formData.service && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Servicio Específico *</label>
                    <select
                      name="subservice"
                      value={formData.subservice}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Selecciona un servicio específico</option>
                      {availableSubservices.map((subservice) => (
                        <option key={subservice} value={subservice}>
                          {subservice}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Detalles del Proyecto *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Cuéntanos sobre tu proyecto, tipo de muestras, requisitos específicos y cualquier información relevante..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                  Enviar Solicitud de Cotización
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}