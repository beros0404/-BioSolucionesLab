"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

const services = {
  research: {
    title: "Investigación Científica",
    description: "Innovación, desarrollo metodológico y asesoramiento técnico en biología molecular y bioinformática",
    subcategories: {
      design: {
        title: "Diseño y Asesoría",
        services: [
          {
            name: "Diseño de cebadores y sondas",
            specs: [
              "Cebadores para PCR convencional",
              "Cebadores para PCR en tiempo real",
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
              "Asesoría en preparación de librerías de amplicones y enriquecimiento para tecnología Illumina",
            ],
          },
        ],
      },
      bioinformatics: {
        title: "Análisis Bioinformático",
        services: [
          {
            name: "Análisis Bioinformático Avanzado",
            specs: [
              "Análisis de posibles amplificaciones cruzadas",
              "Predicción de temperatura de fusión y parámetros de diseño óptimo",
              "Limpieza y ensamblado de cromatogramas",
              "Comparación con bases de datos",
              "Anotación y alineamiento de secuencias",
              "Análisis de variación genética (SNPs, indeles)",
              "Filogenia y relaciones evolutivas",
              "Generación de reportes técnicos y visualizaciones",
              "Identificación de taxones presentes",
            ],
          },
        ],
      },
      special: {
        title: "Servicios Especiales",
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
      arbovirosis: {
        title: "Diagnóstico de Arbovirosis",
        services: [
          {
            name: "Diagnóstico de arbovirosis",
            specs: [
              "Detección de dengue (DENV) – serotipado opcional",
              "Detección de chikungunya (CHIKV)",
              "Detección de zika (ZIKV)",
              "Panel combinado de arbovirus (detección múltiple)",
            ],
          },
        ],
      },
    },
  },
  production: {
    title: "Animales de Producción",
    description: "Diagnóstico molecular en especies de interés productivo terrestre y acuático",
    subcategories: {
      swine: {
        title: "Patógenos Porcinos",
        services: [
          {
            name: "Diagnóstico de patógenos porcinos",
            specs: [
              "PRRS – Síndrome Reproductivo y Respiratorio Porcino (PRRSV)",
              "Circovirus Porcino Tipo 2 (PCV-2)",
              "Circovirus Porcino Tipo 3 (PCV-3)",
              "Parvovirus Porcino (PPV)",
              "Pseudorabies Virus (PRV, Aujeszky)",
              "Swine Influenza A Virus (SIV)",
              "PCR en tiempo real para detección de Lawsonia intracellularis, Clostridium perfringens, Salmonella spp., Brachyspira hyodisenteriae y Brachyspira pilosicoli",
              "PCR en tiempo real para detección de patógenos respiratorios porcinos (Actinobacillus pleuropneumoniae, Streptococcus suis, Glaesserella parasuis, Pasteurella multocida y Mycoplasma spp.)",
              "PCR en tiempo real para detección y cuantificación de Mycoplasma hyopneumoniae y Mycoplasma hyorhinis",
            ],
          },
        ],
      },
      avian: {
        title: "Diagnóstico Aviar",
        services: [
          {
            name: "Diagnóstico aviar",
            specs: [
              "PCR en tiempo real para detección y cuantificación de Mycoplasma gallisepticum (cepa F vacunal y salvaje) y Mycoplasma synoviae",
              "PCR múltiplex para detección de Escherichia coli aviar patógena (APEC) y caracterización de 14 factores de virulencia asociados",
              "PCR en tiempo real para detección de genes toxigénicos de Clostridium perfringens (6 genes)",
            ],
          },
        ],
      },
      endosymbionts: {
        title: "Endosimbiontes",
        services: [
          {
            name: "Diagnóstico molecular de endosimbiontes",
            specs: [
              "Detección de Wolbachia spp. (wsp, PCR en tiempo real)",
              "Detección de Cardinium spp. (16S rDNA, PCR en tiempo real)",
              "Detección de Arsenophonus spp. (16S rDNA, PCR en tiempo real)",
              "Detección de Spiroplasma spp. (rpoB, PCR en tiempo real)",
            ],
          },
        ],
      },
      aquaculture: {
        title: "Diagnóstico Acuícola",
        services: [
          {
            name: "Diagnóstico acuícola (Camarones)",
            specs: [
              "Virus del Síndrome de la Mancha Blanca (WSSV) – PCR Cuantitativa en tiempo real",
              "Virus del Síndrome de Taura (TSV) – PCR Cuantitativa en tiempo real",
              "Virus de la Necrosis Hipodérmica y Hematopoyética Infecciosa (IHHNV) – PCR Cuantitativa en tiempo real",
              "Necrosis Hepatopancreática Aguda / Síndrome de Mortalidad Temprana (AHPND/EMS – Vibrio parahaemolyticus) – PCR Cuantitativa en tiempo real",
              "Hepatopancreatitis Microsporidial (EHP – Enterocytozoon hepatopenaei) – PCR Cuantitativa en tiempo real",
            ],
          },
        ],
      },
    },
  },
  industry: {
    title: "Pruebas para la Industria",
    description: "Control de calidad, bioseguridad y diagnóstico microbiológico en productos biotecnológicos y laboratorios de producción",
    subcategories: {
      sterility: {
        title: "Pruebas de Esterilidad",
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
        ],
      },
      identification: {
        title: "Identificación Microbiológica",
        services: [
          {
            name: "Identificación de microorganismos",
            specs: [
              "Identificación bacteriana por secuenciación Sanger 16S rRNA",
              "Identificación de hongos por secuenciación Sanger ITS",
            ],
          },
        ],
      },
    },
  },
}

const scrollToContact = (service: string, subservice: string) => {
  const quoteSection = document.getElementById('cotizacion')
  if (quoteSection) {
    sessionStorage.setItem('quoteService', service)
    sessionStorage.setItem('quoteSubservice', subservice)
    
    quoteSection.scrollIntoView({ behavior: 'smooth' })
    
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('quoteRequest', { 
        detail: { service, subservice } 
      }))
    }, 500)
  }
}

export default function Services() {
  const [activeTab, setActiveTab] = useState("research")

  useEffect(() => {
    const savedTab = sessionStorage.getItem('activeServiceTab')
    if (savedTab) {
      setActiveTab(savedTab)
      sessionStorage.removeItem('activeServiceTab')
    }

    const handleServiceTabChange = (event: CustomEvent) => {
      const { mainTab } = event.detail
      setActiveTab(mainTab)
    }

    window.addEventListener('serviceTabChange', handleServiceTabChange as EventListener)
    
    return () => {
      window.removeEventListener('serviceTabChange', handleServiceTabChange as EventListener)
    }
  }, [])

  return (
    <section id="services" className="py-20 sm:py-28 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl mb-4">Portafolio de Servicios</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Soluciones integrales en diagnóstico molecular, secuenciación y análisis bioinformático
          </p>
        </div>

        <Tabs defaultValue="research" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8 h-auto">
            {Object.entries(services).map(([key, service]) => (
              <TabsTrigger 
                key={key} 
                value={key} 
                className="text-sm sm:text-base py-3 data-[state=active]:bg-secondary data-[state=active]:text-white transition-all duration-300"
              >
                {service.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(services).map(([categoryKey, category]) => (
            <TabsContent key={categoryKey} value={categoryKey} className="focus:outline-none">
              <div className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-foreground">{category.title}</h3>
                  <p className="text-muted-foreground mt-2 text-lg">{category.description}</p>
                </div>

                <Tabs 
                  defaultValue={Object.keys(category.subcategories)[0]} 
                  className="w-full"
                >
                  <TabsList className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-8 h-auto p-1 bg-muted/50 rounded-lg">
                    {Object.entries(category.subcategories).map(([subKey, subcategory]) => (
                      <TabsTrigger 
                        key={subKey} 
                        value={subKey} 
                        className="text-xs sm:text-sm py-2 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-300"
                      >
                        {subcategory.title}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {Object.entries(category.subcategories).map(([subKey, subcategory]) => (
                    <TabsContent key={subKey} value={subKey} className="focus:outline-none">
                      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                        {subcategory.services.map((svc, index) => (
                          <Card key={index} className="border-l-4 border-l-secondary flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-lg text-foreground">{svc.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                              <ul className="space-y-2 mb-4">
                                {svc.specs.map((spec, specIndex) => (
                                  <li key={specIndex} className="flex gap-3 items-start">
                                    <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-foreground leading-relaxed">{spec}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                            <div className="p-6 pt-0 mt-auto">
                              <Button 
                                className="w-full bg-secondary hover:bg-secondary/90"
                                onClick={() => scrollToContact(category.title, svc.name)}
                              >
                                Solicitar Cotización
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}