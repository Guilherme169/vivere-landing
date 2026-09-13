import { MapPin, MessageCircle, Truck } from 'lucide-react'
import { WhatsAppLink } from '@/components/ui/OrderLink'
import { whatsappLink } from '@/lib/constants'
import { ALL_DELIVERY_CITIES, DELIVERY_CITIES, DELIVERY_ON_REQUEST, FREIGHT } from '@/lib/delivery'
import { cn } from '@/lib/cn'

const SCHEDULE_LINK = whatsappLink(
  'Olá! Quero fazer um pedido e combinar a data de entrega na minha cidade.',
)

const ON_REQUEST_LABEL = DELIVERY_ON_REQUEST.join(', ').replace(/, ([^,]*)$/, ' e $1')

/**
 * Primeira dúvida de quem chega de anúncio: "vocês entregam aqui?".
 * Fica logo abaixo do hero, antes de qualquer preço.
 */
export function DeliveryBar() {
  return (
    <section id="entregas" className="scroll-mt-4 lg:scroll-mt-20 bg-sand/70 py-9 sm:py-12">
      <div className="shell flex flex-col gap-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 className="font-serif text-[1.55rem] leading-tight tracking-tight sm:text-[1.9rem]">
            Entregamos em {ALL_DELIVERY_CITIES.length} cidades
          </h2>
          <p className="flex items-center gap-2 text-[12.5px] font-medium text-neutral">
            <Truck size={15} className="text-green-dark" aria-hidden="true" />
            Frete R$ {FREIGHT.price},00 · grátis acima de R$ {FREIGHT.freeFrom}
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-2.5 lg:grid-cols-5">
          {DELIVERY_CITIES.map((city) => (
            <li
              key={city.city}
              className={cn(
                'flex items-start gap-2.5 rounded-2xl border p-3.5 sm:p-4',
                city.isBase
                  ? 'border-green/25 bg-green/[.07]'
                  : 'border-ink/[.06] bg-white shadow-card',
              )}
            >
              <MapPin
                size={16}
                className="mt-0.5 flex-shrink-0 text-green-dark"
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="text-[13px] font-bold leading-tight">{city.city}</p>
                <p className="mt-1 text-[12px] leading-tight text-neutral">
                  {city.days}
                  <span className="block text-[11px] text-neutral/75">{city.period}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3.5 rounded-2xl border border-dashed border-green/30 bg-white/70 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-start gap-2.5">
            <MessageCircle
              size={16}
              className="mt-0.5 flex-shrink-0 text-green-dark"
              aria-hidden="true"
            />
            <div>
              <p className="text-[13px] font-bold leading-tight">{ON_REQUEST_LABEL}</p>
              <p className="mt-1 max-w-prose text-[12px] leading-relaxed text-neutral">
                Também atendemos essas cidades. Faça o pedido normalmente e combine a data de
                entrega com a gente no WhatsApp logo depois.
              </p>
            </div>
          </div>
          <WhatsAppLink
            source="entregas-combinar"
            href={SCHEDULE_LINK}
            className="inline-flex flex-none items-center justify-center gap-2 rounded-full border border-green-forest/25 px-5 py-2.5 text-[13px] font-semibold text-green-forest transition-colors hover:bg-green-forest/5"
          >
            Combinar entrega
          </WhatsAppLink>
        </div>

        <p className="text-[12px] leading-relaxed text-neutral">
          Nas cidades com dia fixo, você escolhe a data no momento da compra, dentro do cardápio
          online.
        </p>
      </div>
    </section>
  )
}
