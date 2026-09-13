import { Check, Truck } from 'lucide-react'
import { Badge, SectionTitle } from '@/components/ui/Badge'
import { OrderLink } from '@/components/ui/OrderLink'
import { COMBOS, UNIT_PRICE_NOTE, savings, unitPrice } from '@/lib/combos'
import { AUTOMATIC_BENEFITS } from '@/lib/constants'
import { formatBRL } from '@/lib/meals'
import { cn } from '@/lib/cn'

/**
 * Oferta principal da página. Cada card mostra o preço por marmita e a
 * economia em reais contra a mesma quantidade comprada avulsa — um único
 * preço de referência para os três, para que dê pra comparar entre eles.
 */
export function Combos() {
  return (
    <section id="combos" className="scroll-mt-4 lg:scroll-mt-20 bg-green-forest py-14 text-white sm:py-20">
      <div className="shell flex flex-col gap-9">
        <SectionTitle
          eyebrow="Combos"
          tone="light"
          title={
            <>
              Abasteça o freezer e{' '}
              <em className="text-green-moss">pague menos por marmita</em>
            </>
          }
          description="Você escolhe os sabores um a um até completar o combo. Pode misturar tudo do cardápio — o preço promocional vale para qualquer combinação, e a entrega sai de graça."
        />

        <ul className="grid gap-4 md:grid-cols-3">
          {COMBOS.map((combo) => {
            const perUnit = unitPrice(combo)
            const saved = savings(combo)
            return (
              <li
                key={combo.id}
                className={cn(
                  'flex flex-col gap-5 rounded-3xl border p-6',
                  combo.highlight
                    ? 'border-green-moss/45 bg-white text-ink shadow-2xl shadow-black/25 md:-my-3 md:py-9'
                    : 'border-white/12 bg-white/[.06]',
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3
                      className={cn(
                        'font-serif text-[1.65rem] leading-none',
                        combo.highlight ? 'text-green-forest' : 'text-white',
                      )}
                    >
                      {combo.title}
                    </h3>
                    <p
                      className={cn(
                        'mt-1.5 text-[12.5px] leading-snug',
                        combo.highlight ? 'text-neutral' : 'text-white/60',
                      )}
                    >
                      {combo.subtitle}
                    </p>
                  </div>
                  {combo.tag ? (
                    <Badge tone={combo.highlight ? 'green' : 'light'} className="flex-shrink-0">
                      {combo.tag}
                    </Badge>
                  ) : null}
                </div>

                <div>
                  <p
                    className={cn(
                      'text-[10.5px] font-bold uppercase tracking-[.09em]',
                      combo.highlight ? 'text-green-dark' : 'text-green-moss',
                    )}
                  >
                    A partir de
                  </p>
                  <p className="tnum flex items-baseline gap-2">
                    <span
                      className={cn(
                        'font-serif text-[2.6rem] leading-none',
                        combo.highlight ? 'text-green-forest' : 'text-white',
                      )}
                    >
                      R$ {formatBRL(perUnit)}
                      <sup
                        className={cn(
                          'ml-0.5 font-sans text-[14px] font-semibold',
                          combo.highlight ? 'text-green-dark' : 'text-green-moss',
                        )}
                      >
                        *
                      </sup>
                    </span>
                    <span
                      className={cn(
                        'text-[12px] font-semibold',
                        combo.highlight ? 'text-neutral' : 'text-white/60',
                      )}
                    >
                      / marmita
                    </span>
                  </p>
                  <p
                    className={cn(
                      'tnum mt-2 text-[13.5px]',
                      combo.highlight ? 'text-ink' : 'text-white/80',
                    )}
                  >
                    <strong className="font-semibold">
                      {combo.units} marmitas por R$ {formatBRL(combo.price)}
                    </strong>
                  </p>
                </div>

                <ul
                  className={cn(
                    'flex flex-col gap-2 border-t pt-4 text-[12.5px]',
                    combo.highlight ? 'border-black/[.08]' : 'border-white/12',
                  )}
                >
                  <li className="tnum flex items-center gap-2">
                    <Check
                      size={14}
                      className={combo.highlight ? 'text-green-dark' : 'text-green-moss'}
                      aria-hidden="true"
                    />
                    <span className={combo.highlight ? 'text-ink' : 'text-white/80'}>
                      Economia de <strong>R$ {formatBRL(saved)}</strong>
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Truck
                      size={14}
                      className={combo.highlight ? 'text-green-dark' : 'text-green-moss'}
                      aria-hidden="true"
                    />
                    <span className={combo.highlight ? 'text-ink' : 'text-white/80'}>
                      Entrega grátis
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check
                      size={14}
                      className={combo.highlight ? 'text-green-dark' : 'text-green-moss'}
                      aria-hidden="true"
                    />
                    <span className={combo.highlight ? 'text-ink' : 'text-white/80'}>
                      Sabores à sua escolha
                    </span>
                  </li>
                </ul>

                <OrderLink
                  source={`combo-${combo.units}`}
                  productId={combo.productId}
                  combo={{ id: combo.id, value: combo.price }}
                  className={cn(
                    'mt-auto inline-flex items-center justify-center rounded-full px-5 py-3.5 text-[14px] font-semibold transition-colors',
                    combo.highlight
                      ? 'bg-green text-white hover:bg-green-dark'
                      : 'border border-white/25 text-white hover:bg-white/10',
                  )}
                >
                  Montar o {combo.title}
                </OrderLink>
              </li>
            )
          })}
        </ul>

        <p className="max-w-prose text-[12px] leading-relaxed text-white/55">
          * {UNIT_PRICE_NOTE}
        </p>

        <div className="rounded-2xl border border-white/12 bg-white/[.04] p-5 sm:p-6">
          <p className="text-[10.5px] font-bold uppercase tracking-[.09em] text-green-moss">
            Não quer combo? O desconto vem assim mesmo
          </p>
          <p className="mt-2 max-w-prose text-[13.5px] leading-relaxed text-white/70">
            Comprando avulso, os cupons entram sozinhos no carrinho conforme o valor do pedido. Você
            não precisa digitar nada.
          </p>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-3">
            {AUTOMATIC_BENEFITS.map((benefit) => (
              <li
                key={benefit.value}
                className="flex flex-col gap-0.5 rounded-xl border border-white/10 bg-white/[.04] px-4 py-3"
              >
                <strong className="text-[14px] font-bold text-white">{benefit.value}</strong>
                <span className="text-[12px] text-white/60">{benefit.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
