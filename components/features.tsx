"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Zap, Shield, BarChart3 } from "lucide-react"

const features = [
  {
    icon: CheckCircle2,
    title: "Precisión Excepcional",
    description:
      "Equipos de última generación y protocolos validados aseguran resultados fiables y precisos en todos tus diagnósticos moleculares.",
  },
  {
    icon: Zap,
    title: "Entrega Rápida",
    description:
      "Procesamiento ágil sin comprometer la calidad. Obtén tus resultados rápidamente para acelerar tu investigación y toma de decisiones.",
  },
  {
    icon: Shield,
    title: "Confidencialidad Total",
    description:
      "Manejo seguro de todas las muestras y datos con protocolos de confidencialidad estrictos que cumplen con estándares internacionales.",
  },
  {
    icon: BarChart3,
    title: "Análisis Experto",
    description:
      "Análisis bioinformático avanzado y consultoría de especialistas en biología molecular con amplia experiencia.",
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
                <CardHeader>
                  <div className="mb-4 inline-flex rounded-lg bg-secondary/10 p-3">
                    <Icon className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
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
