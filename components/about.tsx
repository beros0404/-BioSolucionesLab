"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          {/* About Text */}
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl mb-6">Quiénes somos</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                En BioSoluciones Lab somos un equipo joven, dinámico y apasionado por la biología molecular. Nacimos con
                la visión de acercar la ciencia de alto nivel a quienes necesitan resultados rápidos, confiables y
                útiles para la toma de decisiones.
              </p>
              <p>
                Nuestro trabajo abarca desde el diseño experimental hasta el análisis bioinformático, integrando
                tecnología de última generación con un trato cercano y flexible. Trabajamos con laboratorios,
                universidades, centros de investigación, clínicas y empresas de biotecnología, asegurando un alto
                estándar de calidad en cada servicio.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-6">Ponte en contacto</h3>

            <Card className="border border-border">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-secondary/10 p-3 flex-shrink-0">
                    <Mail className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Correo electrónico</h4>
                    <a
                      href="mailto:contacto@biosolucioneslab.com"
                      className="text-secondary hover:text-secondary/80 transition-colors"
                    >
                      contacto@biosolucioneslab.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-secondary/10 p-3 flex-shrink-0">
                    <Phone className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Teléfono</h4>
                    <p className="text-muted-foreground">Próximamente disponible</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-secondary/10 p-3 flex-shrink-0">
                    <MapPin className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Ubicación</h4>
                    <p className="text-muted-foreground">Información próximamente disponible</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-secondary/10 p-3 flex-shrink-0">
                    <Clock className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Horario de atención</h4>
                    <p className="text-muted-foreground text-sm">
                      Respondemos consultas de lunes a viernes. Nos pondremos en contacto contigo a la brevedad.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
