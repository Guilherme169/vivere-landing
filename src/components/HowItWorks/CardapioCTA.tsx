import { Clock, UtensilsCrossed } from 'lucide-react'
import { OrderLink } from '@/components/ui/OrderLink'
import { BEST_UNIT_PRICE, UNIT_PRICE_NOTE } from '@/lib/combos'
import { formatBRL } from '@/lib/meals'

export function CardapioCTA() {
  return (
    <section className="bg-cream pb-14 sm:pb-20">
      <div className="shell">
        <div
          id="cardapio-cta"
          className="flex scroll-mt-6 flex-col lg:scroll-mt-24 items-center gap-5 rounded-3xl bg-gradient-to-br from-green to-green-dark px-6 py-10 text-center text-white shadow-lift sm:px-12 sm:py-14"
        >
          <h2 className="balance font-serif text-[clamp(1.9rem,5.5vw,3rem)] leading-[1.05]">
            Bora montar seu pedido?
          </h2>
          <p className="max-w-prose text-[14.5px] leading-relaxed text-white/85">
            Cardápio completo, com foto, peso e composição de cada marmita. Combos a partir de R${' '}
            {formatBRL(BEST_UNIT_PRICE)}
            <sup className="ml-0.5 text-[11px] font-semibold">*</sup> por unidade, com entrega
            grátis.
          </p>

          <OrderLink
            source="cta-principal"
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-white px-8 py-4 text-[15px] font-bold text-green-forest shadow-lg shadow-black/10 transition-colors hover:bg-cream sm:w-auto"
          >
            <UtensilsCrossed size={18} aria-hidden="true" />
            Abrir o cardápio online
          </OrderLink>

          <p className="flex items-center gap-2 text-[12px] text-white/75">
            <Clock size={13} aria-hidden="true" />
            Pedidos 24h por dia · você agenda a data da entrega
          </p>

          <p className="max-w-prose text-[11px] leading-relaxed text-white/60">
            * {UNIT_PRICE_NOTE}
          </p>
        </div>
      </div>
    </section>
  )
}
