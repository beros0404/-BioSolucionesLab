"use client"

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl mb-6">Quiénes somos</h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed text-lg max-w-3xl mx-auto">
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
      </div>
    </section>
  )
}