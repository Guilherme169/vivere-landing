import { Plus } from 'lucide-react'
import { Eyebrow, Badge } from '@/components/ui/Badge'
import { FEATURED_DISHES } from '@/lib/meals'
import { CARDAPIO_LINK, AUTOMATIC_BENEFITS } from '@/lib/constants'

export function FeaturedMeals() {
  return (
    <section className="rounded-t-[28px] bg-white px-5 py-8 sm:px-10">
      <Eyebrow>Promoções da semana</Eyebrow>
      <h2 className="text-[clamp(1.5rem,6vw,1.9rem)] font-extrabold leading-tight tracking-tight">
        Descontos <em className="font-serif not-italic italic text-orange">automáticos</em>, direto no
        carrinho
      </h2>

      <div className="my-5 rounded-2xl border border-green/15 bg-gradient-to-br from-green/[0.08] to-orange/[0.08] p-4">
        {AUTOMATIC_BENEFITS.map((b, i) => (
          <div
            key={b.label}
            className={
              i < AUTOMATIC_BENEFITS.length - 1
                ? 'flex items-center gap-2.5 border-b border-dashed border-black/10 py-1.5'
                : 'flex items-center gap-2.5 py-1.5'
            }
          >
            <span className="w-5 flex-shrink-0 text-center text-base">{b.icon}</span>
            <p className="text-xs font-semibold text-ink">{b.label}</p>
          </div>
        ))}
      </div>

      <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:-mx-10 sm:px-10">
        {FEATURED_DISHES.map((dish) => (
          <article
            key={dish.id}
            className="w-[218px] flex-none snap-start overflow-hidden rounded-[20px] border border-black/5 bg-white shadow-sm"
          >
            <div className="relative h-[140px] bg-cream">
              <img src={dish.image} alt={dish.name} loading="lazy" className="h-full w-full object-cover" />
              <Badge tone="orange" className="absolute left-2 top-2">
                Novidade
              </Badge>
            </div>
            <div className="p-3">
              <h3 className="text-[13px] font-bold leading-tight">{dish.name}</h3>
              <p className="mt-1 min-h-[42px] text-[10.5px] leading-relaxed text-neutral">
                {dish.description}
              </p>
              <div className="mt-2.5 flex items-center justify-between">
                <span className="text-sm font-extrabold text-green-dark">
                  R$ {dish.price?.toFixed(2).replace('.', ',')}
                  <small className="ml-1 text-[9.5px] font-semibold text-neutral">/ {dish.weight}</small>
                </span>
                <a
                  href={CARDAPIO_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 rounded-full bg-ink px-3 py-1.5 text-[10.5px] font-bold text-white"
                >
                  <Plus size={11} /> Pedir
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
