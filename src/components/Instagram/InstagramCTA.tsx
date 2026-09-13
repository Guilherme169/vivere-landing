import { Instagram } from 'lucide-react'
import { MealImage } from '@/components/ui/MealImage'
import { INSTAGRAM_HANDLE, INSTAGRAM_LINK } from '@/lib/constants'
import { MEALS_WITH_PHOTO } from '@/lib/meals'

const PREVIEW = MEALS_WITH_PHOTO.slice(0, 6)

export function InstagramCTA() {
  return (
    <section className="bg-white pb-14 sm:pb-20">
      <div className="shell">
        <div className="grid gap-7 rounded-3xl bg-ink p-6 text-white sm:p-9 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
          <div className="flex flex-col items-start gap-4">
            <Instagram size={24} aria-hidden="true" className="text-green-moss" />
            <h2 className="font-serif text-[clamp(1.75rem,4.5vw,2.5rem)] leading-[1.05]">
              Bastidores, novidades e promoções em primeira mão
            </h2>
            <p className="max-w-prose text-[14px] leading-relaxed text-white/65">
              É no Instagram que os pratos novos aparecem primeiro — e onde avisamos quando um
              combo entra em promoção.
            </p>
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14.5px] font-semibold text-ink transition-colors hover:bg-cream"
            >
              <Instagram size={17} aria-hidden="true" />
              Seguir {INSTAGRAM_HANDLE}
            </a>
          </div>

          <ul className="grid grid-cols-3 gap-2 overflow-hidden rounded-2xl">
            {PREVIEW.map((meal) => (
              <li key={meal.id} className="overflow-hidden rounded-xl">
                <MealImage
                  meal={meal}
                  sizes="(min-width: 1024px) 180px, 30vw"
                  className="aspect-square w-full object-cover"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
