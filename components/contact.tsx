"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Clock, User, Users, Instagram, Linkedin, Send } from "lucide-react"

export default function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-28 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Contáctanos
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Estamos listos para colaborar en tu próximo proyecto. Hablemos sobre cómo podemos ayudarte.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Information - Elegant Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Header */}
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-semibold mb-3">Información de Contacto</h3>
              <p className="text-muted-foreground text-sm">
                Múltiples formas de ponerte en contacto con nuestro equipo especializado.
              </p>
            </div>

            {/* Contact Items */}
            <div className="space-y-4">
              {/* Email */}
              <div className="group flex items-start gap-4 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-md hover:border-secondary/20 transition-all duration-300">
                <div className="rounded-xl bg-gradient-to-br from-secondary to-secondary/80 p-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1 text-sm">Email</h4>
                  <a
                    href="mailto:administracion@biosolucioneslabo.com"
                    className="text-muted-foreground hover:text-secondary transition-colors text-sm"
                  >
                    administracion@biosolucioneslabo.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="group flex items-start gap-4 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-md hover:border-secondary/20 transition-all duration-300">
                <div className="rounded-xl bg-gradient-to-br from-secondary to-secondary/80 p-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1 text-sm">Teléfono</h4>
                  <a
                    href="tel:+573206432957"
                    className="text-muted-foreground hover:text-secondary transition-colors text-sm"
                  >
                    +57 320 6432957
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="group flex items-start gap-4 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-md hover:border-secondary/20 transition-all duration-300">
                <div className="rounded-xl bg-gradient-to-br from-secondary to-secondary/80 p-3 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1 text-sm">Dirección</h4>
                  <p className="text-muted-foreground text-sm">
                    Cra 55 Calle 64-73 Local 233<br />
                    Medellín, Colombia
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div className="group p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-md hover:border-secondary/20 transition-all duration-300">
                <div className="flex items-start gap-4 mb-3">
                  <div className="rounded-xl bg-gradient-to-br from-secondary to-secondary/80 p-3 flex-shrink-0">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">Síguenos</h4>
                  </div>
                </div>
                <div className="flex gap-3">
                  <a
                    href="https://instagram.com/BiosolucionesLab1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 p-2 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 text-white hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a
                    href="https://linkedin.com/company/biosoluciones-lab"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 p-2 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map and Team Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map */}
            <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="h-64 sm:h-80 bg-muted relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d-75.5695!3d6.2442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTQnMzkuMiJOIDc1wrAzNCcxMC4xIlc!5e0!3m2!1ses!2sco!4v1620000000000!5m2!1ses!2sco"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de BioSoluciones Lab"
                    className="absolute inset-0"
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-secondary flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-foreground text-sm">Nuestra ubicación</h4>
                          <p className="text-muted-foreground text-xs">
                            Cra 55 Calle 64-73 Local 233, Medellín
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team and Schedule */}
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Team */}
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-gradient-to-br from-white to-blue-50/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="rounded-xl bg-gradient-to-br from-secondary to-secondary/80 p-2">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground">Nuestro Equipo</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="p-3 rounded-xl bg-white/50 border border-white/50">
                      <h4 className="font-medium text-foreground text-sm mb-1">Enderson Murillo Ramos</h4>
                      <p className="text-muted-foreground text-xs">Director científico</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/50 border border-white/50">
                      <h4 className="font-medium text-foreground text-sm mb-1">Camilo Madera Miranda</h4>
                      <p className="text-muted-foreground text-xs">Coordinador de procesos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Schedule */}
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-gradient-to-br from-white to-green-50/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="rounded-xl bg-gradient-to-br from-secondary to-secondary/80 p-2">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground">Horario</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="text-center p-4 rounded-xl bg-white/50 border border-white/50">
                      <div className="text-2xl font-bold text-foreground mb-1">Lun - Vie</div>
                      <div className="text-muted-foreground text-sm">8:00 AM - 6:00 PM</div>
                    </div>
                    <p className="text-muted-foreground text-xs text-center">
                      Respondemos consultas en el menor tiempo posible
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}