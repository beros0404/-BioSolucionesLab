import Header from "@/components/header"
import Hero from "@/components/hero"
import Features from "@/components/features"
import Values from "@/components/values"
import About from "@/components/about"
import Services from "@/components/services"
import QuoteForm from "@/components/quote-form"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background" id="inicio">
      <Header />
      <Hero />
      <Features />
      <Values />
      <Services />
      <About />
      <QuoteForm />
      <Footer />
    </main>
  )
}
