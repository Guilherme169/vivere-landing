import { MessageCircle } from 'lucide-react'
import { LinkButton } from '@/components/ui/Button'
import { DISHES } from '@/lib/meals'
import { WHATSAPP_LINK } from '@/lib/constants'
import { useCarousel } from '@/hooks/useCarousel'
import { cn } from '@/lib/cn'

export function Hero() {
  const { trackRef, activeIndex, scrollTo } = useCarousel({
    itemCount: DISHES.length,
    autoplayMs: 4200,
  })

  return (
    <section id="inicio" className="relative h-[78vh] min-h-[460px] max-h-[640px] w-full overflow-hidden">
      <div
        ref={trackRef}
        className="no-scrollbar flex h-full snap-x snap-mandatory overflow-x-auto scroll-smooth"
      >
        {DISHES.map((dish, i) => (
          <div key={dish.id} className="h-full w-full flex-none snap-start">
            <img
              src={dish.image}
              alt={dish.name}
              loading={i === 0 ? 'eager' : 'lazy'}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-transparent via-30% to-black/85" />

      <div className="absolute bottom-32 left-0 right-0 z-10 flex justify-center gap-1.5">
        {DISHES.map((dish, i) => (
          <button
            key={dish.id}
            aria-label={`Ir para foto de ${dish.name}`}
            onClick={() => scrollTo(i)}
            className={cn(
              'h-1.5 rounded-full bg-white/45 transition-all duration-300',
              i === activeIndex ? 'w-4 bg-white' : 'w-1.5',
            )}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-7 text-white sm:px-10">
        <span className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wide backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-green" />
          Pedido online · Entrega em casa
        </span>

        <h1 className="text-[clamp(1.9rem,8vw,2.75rem)] font-extrabold leading-[1.08] tracking-tight">
          Sua rotina{' '}
          <em className="font-serif not-italic italic text-[#a8e6ae]">merece</em>
          <br />
          comida de verdade
        </h1>

        <p className="mt-2 max-w-sm text-[13.5px] leading-relaxed text-white/85">
          Feitas para quem quer comer bem, ganhar tempo e manter uma rotina mais saudável — prontas em 5
          minutos.
        </p>

        <div className="mt-4 flex gap-2">
          <LinkButton href="#cardapio-cta" target="_self" size="md" className="flex-1">
            Montar meu pedido
          </LinkButton>
          <LinkButton
            href={WHATSAPP_LINK}
            variant="ghost"
            size="md"
            aria-label="Chamar no WhatsApp"
            className="gap-2 px-4"
          >
            <MessageCircle size={16} strokeWidth={2.5} />
            <span className="text-[11px] font-semibold">WhatsApp</span>
          </LinkButton>
        </div>
      </div>
    </section>
  )
}
