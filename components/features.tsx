"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Zap, Shield, BarChart3 } from "lucide-react"

const features = [
  {
    icon: CheckCircle2,
    title: "Servicio integral",
    description:
      "Acompañamos todo el proceso: desde el diseño experimental hasta la interpretación final de resultados. Una solución completa, orientada a resultados reales y decisiones informadas.",
  },
  {
    icon: Zap,
    title: "Resultados rápidos y accionables",
    description:
      "Entregamos reportes claros, precisos y listos para publicación o para una toma de decisiones oportuna y fundamentada.",
  },
  {
    icon: Shield,
    title: "Experiencia que guía, juventud que impulsa",
    description:
      "Combinamos la energía, creatividad y visión fresca de un equipo joven con la solidez, rigurosidad y eficacia de metodologías probadas. Esta sinergia nos permite innovar con propósito, ejecutar con precisión y adaptarnos con agilidad a los retos del entorno actual.",
  },
  {
    icon: BarChart3,
    title: "Atención personalizada",
    description:
      "Tratamos cada proyecto como lo que es: único. Escuchamos, entendemos y adaptamos nuestras soluciones para responder con precisión a las necesidades específicas de cada cliente.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">¿Por qué elegir BIOSOLUCIONES LAB?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Combinamos tecnología de punta con conocimiento experto para entregar resultados superiores
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="border border-border hover:border-secondary/50 transition-colors">
                <CardHeader className="flex flex-row items-start space-x-4 space-y-0">
                  <div className="rounded-lg bg-secondary/10 p-3">
                    <Icon className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-lg mt-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}