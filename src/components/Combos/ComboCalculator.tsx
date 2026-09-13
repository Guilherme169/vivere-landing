import { useId, useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { SectionTitle } from '@/components/ui/Badge'
import { OrderLink } from '@/components/ui/OrderLink'
import { BASE_UNIT_PRICE, COMBOS, UNIT_PRICE_NOTE_SHORT, unitPrice } from '@/lib/combos'
import { formatBRL } from '@/lib/meals'
import { cn } from '@/lib/cn'

const WEEKS_PER_MONTH = 4.33
/** Acima disso o combo vira estoque parado no freezer em vez de economia. */
const MAX_WEEKS_OF_STOCK = 8

/**
 * Traduz o preço por marmita em decisão de rotina: quantas semanas cada combo
 * dura para quem come N por semana, e quanto isso economiza por mês.
 */
export function ComboCalculator() {
  const [perWeek, setPerWeek] = useState(5)
  const inputId = useId()

  const { perMonth, recommended, monthlySavings } = useMemo(() => {
    const month = Math.round(perWeek * WEEKS_PER_MONTH)
    const fits = COMBOS.filter((combo) => combo.units / perWeek <= MAX_WEEKS_OF_STOCK)
    const pick = fits.length ? fits[fits.length - 1] : COMBOS[0]
    return {
      perMonth: month,
      recommended: pick,
      monthlySavings: month * (BASE_UNIT_PRICE - unitPrice(pick)),
    }
  }, [perWeek])

  return (
    <section id="calculadora" className="scroll-mt-4 lg:scroll-mt-20 bg-cream py-14 sm:py-20">
      <div className="shell grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-14">
        <SectionTitle
          eyebrow="Quanto dura"
          title={
            <>
              Qual combo <em className="text-orange-dark">faz sentido pra você</em>
            </>
          }
          description="Diga quantas marmitas você come por semana e veja quanto tempo cada combo dura no seu freezer."
        />

        <div className="flex flex-col gap-6 rounded-3xl border border-black/[.06] bg-white p-6 shadow-card sm:p-8">
          <div className="flex flex-col gap-3">
            <label htmlFor={inputId} className="text-[14px] font-semibold">
              Marmitas por semana
            </label>
            <div className="flex items-center gap-4">
              <input
                id={inputId}
                type="range"
                min={1}
                max={14}
                step={1}
                value={perWeek}
                onChange={(event) => setPerWeek(Number(event.target.value))}
                className="h-1.5 w-full flex-1 cursor-pointer appearance-none rounded-full bg-sand accent-green"
                aria-describedby={`${inputId}-out`}
              />
              <output
                id={`${inputId}-out`}
                htmlFor={inputId}
                className="tnum w-14 flex-none text-right font-serif text-[1.9rem] leading-none text-green-forest"
              >
                {perWeek}
              </output>
            </div>
            <p className="tnum text-[12.5px] text-neutral">
              Dá cerca de <strong className="font-semibold text-ink">{perMonth} marmitas</strong> por
              mês.
            </p>
          </div>

          <ul className="flex flex-col gap-1.5 border-t border-black/[.07] pt-5">
            {COMBOS.map((combo) => {
              const weeks = combo.units / perWeek
              const isPick = combo.id === recommended.id
              return (
                <li
                  key={combo.id}
                  className={cn(
                    'flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-[13px]',
                    isPick ? 'bg-green/10 font-semibold text-green-forest' : 'text-neutral',
                  )}
                >
                  <span>{combo.title}</span>
                  <span className="tnum flex-none">
                    dura{' '}
                    <strong className={cn('font-semibold', !isPick && 'text-ink')}>
                      {weeks < 1.5 ? '1 semana' : `${Math.round(weeks)} semanas`}
                    </strong>
                  </span>
                </li>
              )
            })}
          </ul>

          <div className="flex flex-col gap-4 rounded-2xl bg-green-forest p-5 text-white">
            <div>
              <p className="text-[10.5px] font-bold uppercase tracking-[.09em] text-green-moss">
                Melhor encaixe
              </p>
              <p className="mt-1 font-serif text-[1.7rem] leading-none">{recommended.title}</p>
              <p className="tnum mt-2 text-[13.5px] text-white/80">
                A partir de R$ {formatBRL(unitPrice(recommended))}
                <sup className="ml-0.5 text-[10px] font-semibold text-green-moss">*</sup> por
                marmita. Economia de{' '}
                <strong className="font-semibold text-white">
                  cerca de R$ {formatBRL(monthlySavings)}
                </strong>{' '}
                por mês.
              </p>
            </div>

            <OrderLink
              source={`calculadora-${recommended.units}`}
              productId={recommended.productId}
              combo={{ id: recommended.id, value: recommended.price }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-green px-6 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-green-dark"
            >
              Montar o {recommended.title}
              <ArrowRight size={16} aria-hidden="true" />
            </OrderLink>
          </div>

          <p className="text-[11.5px] leading-relaxed text-neutral">
            * Valor {UNIT_PRICE_NOTE_SHORT}. A economia é calculada contra o preço avulso de R${' '}
            {formatBRL(BASE_UNIT_PRICE)}.
          </p>
        </div>
      </div>
    </section>
  )
}
