import { Toaster } from "@/components/ui/sonner"
import { SiteHeader } from "@/components/layout/site-header"
import { About } from "@/components/sections/about"
import { Contact } from "@/components/sections/contact"
import { Hero } from "@/components/sections/hero"
import { Reviews } from "@/components/sections/reviews"
import { Services } from "@/components/sections/services"
import { SiteFooter } from "@/components/sections/site-footer"

export function App() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Services />
        <Reviews />
        <Contact />
      </main>
      <SiteFooter />
      <Toaster />
    </>
  )
}

export default App
