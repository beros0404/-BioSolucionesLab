"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Microscope, Lightbulb, Shield, Zap, Users } from "lucide-react"

const values = [
  {
    icon: Microscope,
    title: "Precisión científica",
    description: "Aplicamos protocolos rigurosos y métodos validados internacionalmente.",
  },
  {
    icon: Lightbulb,
    title: "Innovación constante",
    description: "Incorporamos las últimas tecnologías en diagnóstico molecular y bioinformática.",
  },
  {
    icon: Shield,
    title: "Compromiso ético",
    description: "Garantizamos confidencialidad, integridad y transparencia.",
  },
  {
    icon: Zap,
    title: "Agilidad y cercanía",
    description: "Nos adaptamos a tus necesidades y tiempos de entrega.",
  },
  {
    icon: Users,
    title: "Colaboración",
    description: "Trabajamos como un aliado estratégico, no solo como un proveedor.",
  },
]

export default function Values() {
  return (
    <section id="values" className="py-20 sm:py-28 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">Nuestros Valores</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Los principios que guían nuestro trabajo y compromiso con la excelencia científica
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <Card key={index} className="border border-border hover:border-secondary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="mb-4 inline-flex rounded-lg bg-secondary/10 p-3">
                    <Icon className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
