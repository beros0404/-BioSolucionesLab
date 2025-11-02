"use client"

import Link from "next/link"
import { Linkedin, Twitter, Mail } from "lucide-react"

const footerSections = [
  {
    title: "Empresa",
    links: [
      { name: "Acerca de nosotros", href: "#about" },
      { name: "Servicios", href: "#services" },
      { name: "Valores", href: "#values" },
      { name: "Contacto", href: "#about" },
    ],
  },
  {
    title: "Servicios",
    links: [
      { name: "Diagnósticos", href: "#services" },
      { name: "Secuenciación", href: "#services" },
      { name: "Bioinformática", href: "#services" },
      { name: "Consultoría", href: "#services" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { name: "Documentación", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Preguntas Frecuentes", href: "#" },
      { name: "Soporte", href: "#" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-5 mb-12">
          {/* Brand section */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center">
                <svg viewBox="0 0 200 200" className="h-10 w-10" xmlns="http://www.w3.org/2000/svg">
                  <line x1="30" y1="30" x2="50" y2="10" stroke="#1E5A8E" strokeWidth="8" strokeLinecap="round" />
                  <line x1="50" y1="50" x2="70" y2="30" stroke="#1E5A8E" strokeWidth="8" strokeLinecap="round" />
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
              <span className="text-lg font-bold text-foreground">BIOSOLUCIONES LAB</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Avanzando en diagnóstico molecular y análisis bioinformático con precisión y experiencia.
            </p>
            <div className="mt-6 space-y-3 text-xs text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">Correo electrónico</span>
                <br />
                <a href="mailto:contacto@biosolucioneslab.com" className="hover:text-secondary transition-colors">
                  contacto@biosolucioneslab.com
                </a>
              </p>
              <p>
                <span className="font-semibold text-foreground">Horario de atención</span>
                <br />
                Lunes a viernes. Respondemos a la brevedad.
              </p>
            </div>
          </div>

          {/* Links sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2025 BIOSOLUCIONES LAB. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Correo</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
