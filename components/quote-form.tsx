"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

const serviceSubServices = {
  Diagnósticos: [
    "Pruebas de esterilidad - Esterilidad en cultivos celulares",
    "Pruebas de esterilidad - Esterilidad en productos biotecnológicos",
    "Pruebas de esterilidad - Esterilidad en medios de cultivo y soluciones tampón",
    "Detección de Mycoplasma por PCR",
    "Identificación de microorganismos - Bacteriana por secuenciación 16S rRNA",
    "Identificación de microorganismos - Fúngica por secuenciación ITS",
    "Diagnóstico de arbovirosis - Dengue (DENV)",
    "Diagnóstico de arbovirosis - Chikungunya (CHIKV)",
    "Diagnóstico de arbovirosis - Zika (ZIKV)",
    "Diagnóstico de arbovirosis - Panel combinado",
    "Diagnóstico de patógenos porcinos - PRRS",
    "Diagnóstico de patógenos porcinos - Circovirus Porcino Tipo 2",
    "Diagnóstico de patógenos porcinos - Circovirus Porcino Tipo 3",
    "Diagnóstico de patógenos porcinos - Parvovirus Porcino",
    "Diagnóstico de patógenos porcinos - Pseudorabies Virus",
    "Diagnóstico de patógenos porcinos - Swine Influenza Virus",
  ],
  "Diseño y Consultoría": [
    "Diseño de cebadores y sondas - PCR convencional",
    "Diseño de cebadores y sondas - PCR en tiempo real (qPCR)",
    "Diseño de cebadores y sondas - Secuenciación Sanger",
    "Diseño de cebadores y sondas - Amplificación de genes completos",
    "Asesoramiento en diseño experimental - Planificación de experimentos",
    "Asesoramiento en diseño experimental - Optimización de condiciones",
    "Asesoramiento en diseño experimental - Validación de controles",
    "Asesoramiento en diseño experimental - Sensibilidad y especificidad",
    "Asesoramiento en diseño experimental - Expresión génica",
  ],
  Secuenciación: [
    "Secuenciación Sanger - Productos de PCR",
    "Secuenciación Sanger - Plásmidos y vectores",
    "Secuenciación Sanger - Mutaciones puntuales",
    "Secuenciación Sanger - Inserciones y deleciones",
    "Secuenciación Sanger - Clones bacterianos",
    "Secuenciación NGS - Genomas completos",
    "Secuenciación NGS - Transcriptomas (RNA-Seq)",
    "Secuenciación NGS - Amplícones (16S/ITS)",
    "Secuenciación NGS - Paneles personalizados",
  ],
  Bioinformática: [
    "Evaluación bioinformática de cebadores - Alineamiento contra bases de datos",
    "Evaluación bioinformática de cebadores - Amplificaciones cruzadas",
    "Evaluación bioinformática de cebadores - Temperatura de fusión",
    "Análisis de secuencias Sanger - Limpieza y ensamblaje",
    "Análisis de secuencias Sanger - Comparación con bases de datos",
    "Análisis de secuencias Sanger - Anotación y lineamiento",
    "Análisis terciairo de datos NGS - SNPs e índeles",
    "Análisis terciairo de datos NGS - Filogenia y relaciones evolutivas",
    "Análisis terciairo de datos NGS - Reportes técnicos",
    "Bioinformática aplicada a microbiomas - Identificación de taxones",
    "Bioinformática aplicada a microbiomas - Diversidad alfa y beta",
    "Bioinformática aplicada a microbiomas - Predicción funcional",
  ],
  "Servicios Especiales": [
    "Servicios bajo demanda - Validación y estandarización de protocolos",
    "Servicios bajo demanda - Capacitación en técnicas",
    "Servicios bajo demanda - Desarrollo de kits diagnósticos",
    "Servicios bajo demanda - Consultoría para NGS",
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
    <section id="contact" className="py-20 sm:py-28">
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
                    <label className="block text-sm font-medium">Servicio *</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Selecciona un servicio</option>
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
                    <label className="block text-sm font-medium">Subservicio *</label>
                    <select
                      name="subservice"
                      value={formData.subservice}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Selecciona un subservicio</option>
                      {availableSubservices.map((subservice) => (
                        <option key={subservice} value={subservice}>
                          {subservice}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Mensaje *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Cuéntanos sobre tu proyecto, muestras y requisitos específicos..."
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
