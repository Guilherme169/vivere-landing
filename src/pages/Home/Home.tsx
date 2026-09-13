import { StickyHeader } from '@/components/Layout/StickyHeader'
import { MenuJsonLd } from '@/components/Seo/MenuJsonLd'
import { Hero } from '@/components/Hero/Hero'
import { DeliveryBar } from '@/components/Delivery/DeliveryBar'
import { Combos } from '@/components/Combos/Combos'
import { ComboCalculator } from '@/components/Combos/ComboCalculator'
import { Menu } from '@/components/Menu/Menu'
import { CardapioCTA } from '@/components/HowItWorks/CardapioCTA'
import { HowItWorks } from '@/components/HowItWorks/HowItWorks'
import { PersonalizedDiet } from '@/components/HowItWorks/PersonalizedDiet'
import { Brand } from '@/components/Brand/Brand'
import { Testimonials } from '@/components/Testimonials/Testimonials'
import { NutricionalCTA } from '@/components/NutricionalCTA/NutricionalCTA'
import { FAQ } from '@/components/FAQ/FAQ'
import { InstagramCTA } from '@/components/Instagram/InstagramCTA'
import { Footer } from '@/components/Footer/Footer'
import { FloatingCTA } from '@/components/FloatingCTA/FloatingCTA'

export function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <MenuJsonLd />
      <StickyHeader />
      <Hero />
      <DeliveryBar />
      <Combos />
      <ComboCalculator />
      <Testimonials />
      <Menu />
      <HowItWorks />
      <CardapioCTA />
      <PersonalizedDiet />
      <Brand />
      <NutricionalCTA />
      <FAQ />
      <InstagramCTA />
      <Footer />
      <FloatingCTA />
    </main>
  )
}
