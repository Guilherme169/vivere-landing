import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { SectionTitle } from '@/components/ui/Badge'
import { MealImage } from '@/components/ui/MealImage'
import { OrderLink } from '@/components/ui/OrderLink'
import { CATEGORY_LABELS, MEALS, TAG_LABELS, formatBRL } from '@/lib/meals'
import type { Meal, MealCategory } from '@/types'
import { cn } from '@/lib/cn'

type Filter = 'todos' | MealCategory

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'carnes', label: CATEGORY_LABELS.carnes },
  { id: 'frango', label: CATEGORY_LABELS.frango },
  { id: 'massas', label: CATEGORY_LABELS.massas },
  { id: 'lowcarb', label: CATEGORY_LABELS.lowcarb },
]

export function Menu() {
  const [filter, setFilter] = useState<Filter>('todos')

  const meals = useMemo(
    () => (filter === 'todos' ? MEALS : MEALS.filter((meal) => meal.category === filter)),
    [filter],
  )

  return (
    <section id="cardapio" className="scroll-mt-4 lg:scroll-mt-20 bg-cream py-14 sm:py-20">
      <div className="shell flex flex-col gap-7">
        <SectionTitle
          eyebrow={`Cardápio · ${MEALS.length} pratos`}
          title={
            <>
              Tudo que você pode <em className="text-orange-dark">montar no seu combo</em>
            </>
          }
          description="Preços e gramaturas exatamente como estão no cardápio online. Toque no prato para abrir a ficha dele direto, com composição e tabela."
        />

        <div
          className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0"
          role="group"
          aria-label="Filtrar cardápio por tipo"
        >
          {FILTERS.map((option) => {
            const isActive = option.id === filter
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setFilter(option.id)}
                aria-pressed={isActive}
                className={cn(
                  'flex-none rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors',
                  isActive
                    ? 'border-green-forest bg-green-forest text-white'
                    : 'border-ink/[.09] bg-white text-neutral hover:border-green/40 hover:text-green-forest',
                )}
              >
                {option.label}
              </button>
            )
          })}
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {meals.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </ul>

        <p className="text-[12px] leading-relaxed text-neutral">
          Cada prato abre a própria ficha no cardápio online, com a composição em gramas e o modo de
          preparo.
        </p>
      </div>
    </section>
  )
}

function MealCard({ meal }: { meal: Meal }) {
  const inner = (
    <>
      <div className="relative aspect-square overflow-hidden bg-sand">
        <MealImage
          meal={meal}
          sizes="(min-width: 1024px) 270px, (min-width: 640px) 32vw, 45vw"
          className={cn(
            'h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]',
            meal.soldOut && 'opacity-40 grayscale',
          )}
        />
        {meal.tag && !meal.soldOut ? (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-cream/95 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.12em] text-green-forest shadow-sm backdrop-blur-sm">
            {TAG_LABELS[meal.tag]}
          </span>
        ) : null}
        {meal.soldOut ? (
          <span className="absolute inset-x-2.5 top-2.5 rounded-full bg-ink/85 px-2.5 py-1 text-center text-[9px] font-bold uppercase tracking-[.12em] text-white backdrop-blur-sm">
            Esgotado
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3.5 sm:p-4">
        <div className="flex-1">
          <h3 className="text-[13.5px] font-semibold leading-tight tracking-[-.01em] sm:text-[14px]">
            {meal.cardName ?? meal.name}
          </h3>
          <p className="mt-1.5 text-[11px] leading-snug text-neutral sm:text-[11.5px]">
            {meal.description}
          </p>
        </div>

        <div className="flex items-end justify-between gap-2 border-t border-gold/25 pt-2.5">
          <p className="tnum leading-none">
            <span className="font-serif text-[19px] text-green-forest">
              R$ {formatBRL(meal.price)}
            </span>
            <span className="mt-1 block text-[9.5px] font-semibold uppercase tracking-[.14em] text-neutral">
              {meal.weight}
            </span>
          </p>
          {meal.soldOut ? (
            <span className="text-[10.5px] font-semibold text-neutral">Em falta</span>
          ) : (
            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-green-forest text-white transition-colors group-hover:bg-green">
              <Plus size={15} aria-hidden="true" />
            </span>
          )}
        </div>
      </div>
    </>
  )

  const shell =
    'group flex w-full flex-col overflow-hidden rounded-[22px] border border-ink/[.07] bg-white transition-shadow duration-300'

  if (meal.soldOut) {
    return (
      <li className="flex">
        <div className={cn(shell, 'opacity-80')}>{inner}</div>
      </li>
    )
  }

  return (
    <li className="flex">
      <OrderLink
        source={`prato-${meal.id}`}
        productId={meal.productId}
        aria-label={`Ver ${meal.name} no cardápio online`}
        className={cn(shell, 'hover:shadow-lift')}
      >
        {inner}
      </OrderLink>
    </li>
  )
}
