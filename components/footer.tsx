"use client"

import Link from "next/link"
import { Linkedin, Instagram, Mail, MapPin, Phone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const footerSections = [
  {
    title: "Empresa",
    links: [
      { name: "Acerca de nosotros", href: "#about" },
      { name: "Valores", href: "#values" },
      { name: "Contacto", href: "#contact" },
    ],
  },
  {
    title: "Servicios",
    links: [
      { name: "Investigación Científica", href: "#services" },
      { name: "Animales de Producción", href: "#services" },
      { name: "Pruebas para la Industria", href: "#services" },
      { name: "Solicitar Cotización", href: "#cotizacion" },
    ],
  },
]

// Mapeo de servicios a keys del Tabs
const serviceKeys: { [key: string]: string } = {
  "Investigación Científica": "research",
  "Animales de Producción": "production", 
  "Pruebas para la Industria": "industry"
}

export default function Footer() {
  const handleQuoteClick = () => {
    const quoteSection = document.getElementById('cotizacion')
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleServiceClick = (serviceName: string) => {
    const servicesSection = document.getElementById('services')
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" })
      
      // Activar la pestaña específica después del scroll
      setTimeout(() => {
        const serviceKey = serviceKeys[serviceName]
        
        if (serviceKey) {
          // Guardar en sessionStorage para que el componente Services lo lea
          sessionStorage.setItem('activeServiceTab', serviceKey)
          
          // Disparar evento personalizado para que Services se actualice
          window.dispatchEvent(new CustomEvent('serviceTabChange', { 
            detail: { mainTab: serviceKey } 
          }))
        }
      }, 600)
    }
  }

  return (
    <footer className="border-t border-border bg-gradient-to-br from-slate-50 to-blue-50/30 w-full">
      <div className="w-full px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8 max-w-7xl mx-auto">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="BIOSOLUCIONES LAB"
                  width={160}
                  height={45}
                  className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
            
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Líderes en diagnóstico molecular y análisis bioinformático.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2 mb-4">
              <a
                href="https://linkedin.com/company/biosoluciones-lab"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                title="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/BiosolucionesLab1"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 text-white hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                title="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="mailto:administracion@biosolucioneslabo.com"
                className="p-2 rounded-lg bg-gradient-to-br from-secondary to-secondary/80 text-white hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                title="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>

            <Button 
              onClick={handleQuoteClick}
              className="w-full bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary transition-all duration-300 shadow hover:shadow-md text-sm"
              size="sm"
            >
              Solicitar Cotización
              <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </div>

          {/* Navigation Sections */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {footerSections.map((section, index) => (
              <div key={index} className="group">
                <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {section.title === "Servicios" && link.name !== "Solicitar Cotización" ? (
                        <button
                          onClick={() => handleServiceClick(link.name)}
                          className="text-xs text-muted-foreground hover:text-secondary transition-all duration-200 flex items-center gap-2 group/link w-full text-left"
                        >
                          <div className="w-1 h-1 bg-secondary rounded-full opacity-0 group-hover/link:opacity-100 transition-all duration-200"></div>
                          {link.name}
                        </button>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-xs text-muted-foreground hover:text-secondary transition-all duration-200 flex items-center gap-2 group/link"
                        >
                          <div className="w-1 h-1 bg-secondary rounded-full opacity-0 group-hover/link:opacity-100 transition-all duration-200"></div>
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
              Contacto
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2 group">
                <Mail className="h-3 w-3 text-secondary mt-1 flex-shrink-0" />
                <div>
                  <a 
                    href="mailto:administracion@biosolucioneslabo.com" 
                    className="text-xs text-muted-foreground hover:text-secondary transition-colors duration-200"
                  >
                    administracion@biosolucioneslabo.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-2 group">
                <Phone className="h-3 w-3 text-secondary mt-1 flex-shrink-0" />
                <div>
                  <a 
                    href="tel:+573206432957"
                    className="text-xs text-muted-foreground hover:text-secondary transition-colors duration-200"
                  >
                    +57 320 6432957
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-2 group">
                <MapPin className="h-3 w-3 text-secondary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">
                    Cra 55 Calle 64-73<br />
                    Local 233, Medellín
                  </p>
                </div>
              </div>
            </div>

            {/* Horario */}
            <div className="mt-4 p-3 rounded-lg bg-white/50 border border-white/50">
              <h4 className="font-medium text-foreground text-xs mb-1">Horario de Atención</h4>
              <p className="text-xs text-muted-foreground">
                Lun - Vie: 8:00 AM - 6:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 pt-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="text-center md:text-left">
              <p className="text-xs text-muted-foreground">
                © 2025 BIOSOLUCIONES LAB. Todos los derechos reservados.
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Link href="#" className="hover:text-secondary transition-colors duration-200">
                Términos
              </Link>
              <Link href="#" className="hover:text-secondary transition-colors duration-200">
                Privacidad
              </Link>
              <Link href="#" className="hover:text-secondary transition-colors duration-200">
                Legal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}