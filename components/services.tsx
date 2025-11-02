"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle } from "lucide-react"

const services = {
  diagnostics: {
    title: "Diagnósticos",
    description: "Análisis microbiológico integral y pruebas de esterilidad",
    services: [
      {
        name: "Pruebas de esterilidad",
        specs: [
          "Esterilidad en cultivos celulares (detección de bacterias y hongos)",
          "Esterilidad en productos biotecnológicos (biológicos, vacunas, kits, reactivos)",
          "Esterilidad en medios de cultivo y soluciones tampón",
          "Detección de Mycoplasma por PCR",
        ],
      },
      {
        name: "Identificación de microorganismos",
        specs: [
          "Identificación bacteriana por secuenciación 16S rRNA",
          "Identificación de hongos por secuenciación ITS",
        ],
      },
      {
        name: "Diagnóstico de arbovirosis",
        specs: [
          "Detección de dengue (DENV) – serotipado opcional",
          "Detección de chikungunya (CHIKV)",
          "Detección de zika (ZIKV)",
          "Panel combinado de arbovirus (detección múltiple)",
        ],
      },
      {
        name: "Diagnóstico de patógenos porcinos",
        specs: [
          "PRRS – Síndrome Reproductivo y Respiratorio Porcino (PRRSV)",
          "Circovirus Porcino Tipo 2 (PCV-2)",
          "Circovirus Porcino Tipo 3 (PCV-3)",
          "Parvovirus Porcino (PPV)",
          "Pseudorabies Virus (PRV, Aujeszky)",
          "Swine Influenza A Virus (SIV)",
        ],
      },
    ],
  },
  design: {
    title: "Diseño y Asesoría",
    description: "Servicios expertos de diseño de cebadores y optimización experimental",
    services: [
      {
        name: "Diseño de cebadores y sondas",
        specs: [
          "Cebadores para PCR convencional",
          "Cebadores para PCR en tiempo real (qPCR)",
          "Cebadores específicos para secuenciación Sanger",
          "Cebadores para amplificación de genes completos o fragmentos largos",
        ],
      },
      {
        name: "Asesoramiento en diseño experimental",
        specs: [
          "Planificación de experimentos de PCR/RT-PCR",
          "Optimización de condiciones de amplificación",
          "Selección y validación de controles positivos y negativos",
          "Estrategias para aumentar sensibilidad y especificidad",
          "Diseño de experimentos para estudios de expresión génica",
        ],
      },
    ],
  },
  sequencing: {
    title: "Secuenciación",
    description: "Secuenciación de ADN de alta calidad y análisis genómico",
    services: [
      {
        name: "Secuenciación Sanger",
        specs: [
          "Secuenciación directa de productos de PCR",
          "Secuenciación de plásmidos y vectores",
          "Confirmación de mutaciones puntuales",
          "Verificación de inserciones y deleciones",
          "Control de calidad de clones bacterianos",
        ],
      },
      {
        name: "Secuenciación NGS",
        specs: [
          "Secuenciación de genomas completos (bacterias, virus)",
          "Transcriptomas (RNA-Seq)",
          "Amplicones (16S/ITS)",
          "Metagenómica y paneles personalizados",
        ],
      },
    ],
  },
  bioinformatics: {
    title: "Bioinformática",
    description: "Análisis de datos avanzado e interpretación de resultados",
    services: [
      {
        name: "Evaluación bioinformática de cebadores",
        specs: [
          "Alineamiento contra bases de datos",
          "Análisis de posibles amplificaciones cruzadas",
          "Predicción de temperatura de fusión y parámetros de diseño óptimo",
        ],
      },
      {
        name: "Análisis de secuencias Sanger",
        specs: [
          "Limpieza y ensamblado de cromatogramas",
          "Comparación con bases de datos",
          "Anotación y alineamiento de secuencias",
        ],
      },
      {
        name: "Análisis terciario de datos NGS",
        specs: [
          "Análisis de variación genética (SNPs, indeles)",
          "Filogenia y relaciones evolutivas",
          "Generación de reportes técnicos y visualizaciones",
        ],
      },
      {
        name: "Bioinformática aplicada a microbiomas",
        specs: ["Identificación de taxones presentes", "Diversidad alfa y beta", "Predicción funcional"],
      },
    ],
  },
  special: {
    title: "Servicios Especiales",
    description: "Soluciones personalizadas bajo demanda para tu laboratorio",
    services: [
      {
        name: "Servicios bajo demanda",
        specs: [
          "Validación y estandarización de protocolos para laboratorios",
          "Capacitación en técnicas de biología molecular",
          "Desarrollo de kits de diagnóstico a medida",
          "Consultoría para implementación de NGS en laboratorios",
        ],
      },
    ],
  },
}

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-28 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">Nuestros Servicios</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Soluciones integrales en diagnóstico molecular, secuenciación y análisis bioinformático
          </p>
        </div>

        <Tabs defaultValue="diagnostics" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 h-auto">
            {Object.entries(services).map(([key, service]) => (
              <TabsTrigger key={key} value={key} className="text-xs sm:text-sm">
                {service.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(services).map(([key, service]) => (
            <TabsContent key={key} value={key}>
              <div className="space-y-4">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                  <p className="text-muted-foreground mt-2">{service.description}</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {service.services.map((svc, index) => (
                    <Card key={index} className="border-l-4 border-l-secondary">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{svc.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {svc.specs.map((spec, specIndex) => (
                            <li key={specIndex} className="flex gap-3 items-start">
                              <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-foreground">{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
