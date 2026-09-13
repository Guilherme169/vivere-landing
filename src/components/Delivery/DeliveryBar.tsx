import { ArrowUpRight, CalendarClock, MapPin, MessageCircle, Truck } from 'lucide-react'
import { WhatsAppLink } from '@/components/ui/OrderLink'
import { whatsappLink } from '@/lib/constants'
import { CITIES } from '@/lib/cities'
import { ALL_DELIVERY_CITIES, DELIVERY_CITIES, DELIVERY_ON_REQUEST, FREIGHT } from '@/lib/delivery'
import { entregaCurta, proximaEntrega } from '@/lib/proximaEntrega'
import { cn } from '@/lib/cn'

const SCHEDULE_LINK = whatsappLink(
  'Olá! Quero fazer um pedido e combinar a data de entrega na minha cidade.',
)

const ON_REQUEST = CITIES.filter((city) => city.onRequest)
const ON_REQUEST_LABEL = DELIVERY_ON_REQUEST.join(', ').replace(/, ([^,]*)$/, ' e $1')

/**
 * Primeira dúvida de quem chega de anúncio: "vocês entregam aqui?".
 * Fica logo abaixo do hero, antes de qualquer preço.
 *
 * Cada cidade leva para a própria página (`/osorio`, `/capao-da-canoa`…), que
 * é o que faz o Google encontrá-las e o que responde a quem busca com o nome
 * da cidade junto.
 */
export function DeliveryBar() {
  return (
    <section id="entregas" className="scroll-mt-4 bg-sand/70 py-9 sm:py-12 lg:scroll-mt-20">
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
          {DELIVERY_CITIES.map((city) => {
            const proxima = proximaEntrega(city.weekdays)
            return (
              <li key={city.slug} className="flex">
                <a
                  href={`/${city.slug}`}
                  className={cn(
                    'group flex w-full items-start gap-2.5 rounded-2xl border p-3.5 transition-shadow sm:p-4',
                    city.isBase
                      ? 'border-green/25 bg-green/[.07] hover:shadow-card'
                      : 'border-ink/[.06] bg-white shadow-card hover:shadow-lift',
                  )}
                >
                  <MapPin
                    size={16}
                    className="mt-0.5 flex-shrink-0 text-green-dark"
                    aria-hidden="true"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="flex items-start gap-1 text-[13px] font-bold leading-tight">
                      <span className="flex-1">{city.name}</span>
                      <ArrowUpRight
                        size={13}
                        aria-hidden="true"
                        className="mt-px flex-none text-neutral/50 transition-colors group-hover:text-green-dark"
                      />
                    </p>
                    <p className="mt-1 text-[11.5px] leading-snug text-neutral">
                      {city.days} · {city.period.replace(/^pela /, '')}
                    </p>
                    {proxima ? (
                      <p className="mt-1.5 flex items-center gap-1 whitespace-nowrap text-[11.5px] font-bold leading-tight text-green-dark">
                        <CalendarClock size={12} className="flex-none" aria-hidden="true" />
                        <span className="sr-only">Próxima entrega: </span>
                        {entregaCurta(proxima)}
                      </p>
                    ) : null}
                  </div>
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-green/30 bg-white/70 p-4 sm:p-5">
          <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between">
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

          {/* Estas três cidades não têm dia fixo, então o passo útil aqui é
              falar com o atendimento — não abrir mais uma página. Cada botão
              já abre o WhatsApp com a cidade escrita na mensagem. */}
          <div className="flex flex-wrap gap-2 border-t border-dashed border-green/20 pt-3.5">
            {ON_REQUEST.map((city) => (
              <WhatsAppLink
                key={city.slug}
                source={`entregas-${city.slug}`}
                href={whatsappLink(`Olá! Gostaria de saber mais sobre a entrega ${city.inName}.`)}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink/[.09] bg-white px-3.5 py-1.5 text-[12px] font-medium text-neutral transition-colors hover:border-green/40 hover:text-green-forest"
              >
                <MessageCircle size={12} className="text-green-dark" aria-hidden="true" />
                Entrega em {city.name}
              </WhatsAppLink>
            ))}
          </div>
        </div>

        <p className="text-[12px] leading-relaxed text-neutral">
          As datas acima são as próximas passagens da nossa rota. Você escolhe a que preferir no
          momento da compra, dentro do cardápio online.
        </p>
      </div>
    </section>
  )
}
