import { Instagram } from 'lucide-react'
import { LinkButton } from '@/components/ui/Button'
import { DISHES } from '@/lib/meals'
import { INSTAGRAM_LINK, INSTAGRAM_HANDLE } from '@/lib/constants'

export function InstagramCTA() {
  const preview = DISHES.slice(0, 4)

  return (
    <section className="px-5 py-8 sm:px-10">
      <div className="rounded-[22px] bg-ink p-5 text-center text-white">
        <div className="mx-auto grid max-w-[280px] grid-cols-4 gap-1.5 overflow-hidden rounded-2xl">
          {preview.map((dish) => (
            <img
              key={dish.id}
              src={dish.image}
              alt={dish.name}
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          ))}
        </div>

        <Instagram size={22} className="mx-auto mt-4" />
        <p className="mt-2 text-sm font-bold">{INSTAGRAM_HANDLE}</p>
        <p className="mt-1 text-[12.5px] leading-relaxed text-white/70">
          Bastidores, novidades do cardápio e promoções em primeira mão.
        </p>

        <LinkButton href={INSTAGRAM_LINK} variant="secondary" size="md" className="mt-4 w-full">
          <Instagram size={16} />
          Seguir no Instagram
        </LinkButton>
      </div>
    </section>
  )
}
