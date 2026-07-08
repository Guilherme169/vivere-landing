import { Hero } from '@/components/Hero/Hero'
import { QuickLinks } from '@/components/QuickLinks/QuickLinks'
import { FeaturedMeals } from '@/components/FeaturedMeals/FeaturedMeals'
import { Gallery } from '@/components/Gallery/Gallery'
import { HowItWorks } from '@/components/HowItWorks/HowItWorks'
import { CardapioCTA } from '@/components/HowItWorks/CardapioCTA'
import { PersonalizedDiet } from '@/components/HowItWorks/PersonalizedDiet'
import { Stats } from '@/components/Stats/Stats'
import { Testimonials } from '@/components/Testimonials/Testimonials'
import { InstagramCTA } from '@/components/Instagram/InstagramCTA'
import { Footer } from '@/components/Footer/Footer'
import { FloatingCTA } from '@/components/FloatingCTA/FloatingCTA'

export function Home() {
  return (
    <main className="relative mx-auto min-h-screen max-w-[480px] bg-cream shadow-[0_0_40px_rgba(0,0,0,0.06)] sm:max-w-3xl">
      <Hero />
      <QuickLinks />
      <FeaturedMeals />
      <Gallery />
      <CardapioCTA />
      <HowItWorks />
      <PersonalizedDiet />
      <Stats />
      <Testimonials />
      <InstagramCTA />
      <Footer />
      <FloatingCTA />
    </main>
  )
}
