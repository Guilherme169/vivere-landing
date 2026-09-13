import { ArrowRight, Clock, UtensilsCrossed } from 'lucide-react'
import { OrderLink } from '@/components/ui/OrderLink'
import { BEST_UNIT_PRICE, UNIT_PRICE_NOTE_SHORT } from '@/lib/combos'
import { formatBRL } from '@/lib/meals'

/**
 * Chamada principal. Vem depois do passo a passo de propósito: o visitante já
 * entendeu como funciona quando chega aqui. O texto deixa explícito que o
 * pedido é fechado no cardápio online, não neste site.
 */
export function CardapioCTA() {
  return (
    <section className="bg-cream pb-14 sm:pb-20">
      <div className="shell">
        <div
          id="cardapio-cta"
          className="flex scroll-mt-6 flex-col items-center gap-5 rounded-3xl bg-gradient-to-br from-green to-green-dark px-6 py-10 text-center text-white shadow-lift sm:px-12 sm:py-14 lg:scroll-mt-24"
        >
          <h2 className="balance font-serif text-[clamp(1.9rem,5.5vw,3rem)] leading-[1.05]">
            Pronto pra montar seu combo?
          </h2>

          <p className="max-w-prose text-[14.5px] leading-relaxed text-white/85">
            O pedido é fechado no nosso <strong className="font-semibold">cardápio online</strong>:
            é lá que você escolhe cada sabor, fecha o combo, marca a data de entrega e paga. Aqui
            no site você conhece os pratos, as promoções e a marca — lá você finaliza.
          </p>

          <OrderLink
            source="cta-principal"
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-white px-8 py-4 text-[15px] font-bold text-green-forest shadow-lg shadow-black/10 transition-colors hover:bg-cream sm:w-auto"
          >
            <UtensilsCrossed size={18} aria-hidden="true" />
            Ir para o cardápio e montar meu pedido
            <ArrowRight size={17} aria-hidden="true" />
          </OrderLink>

          <div className="flex flex-col items-center gap-1.5">
            <p className="flex items-center gap-2 text-[12px] text-white/80">
              <Clock size={13} aria-hidden="true" />
              Pedidos 24h por dia · você agenda a data da entrega
            </p>
            <p className="tnum text-[12px] text-white/70">
              Combos a partir de R$ {formatBRL(BEST_UNIT_PRICE)}
              <sup className="ml-0.5 text-[10px] font-semibold">*</sup> por marmita, com entrega
              grátis <span className="text-white/60">(* {UNIT_PRICE_NOTE_SHORT})</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
