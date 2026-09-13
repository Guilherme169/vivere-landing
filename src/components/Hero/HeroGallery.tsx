import { useEffect, useMemo, useState } from 'react'
import { MealImage } from '@/components/ui/MealImage'
import { MEALS, formatBRL } from '@/lib/meals'
import type { Meal } from '@/types'
import { cn } from '@/lib/cn'

/** Ordem escolhida a dedo: cores e texturas bem diferentes entre um e outro. */
const HERO_IDS = [
  'frango-caseiro',
  'feijoada-completa',
  'lasanha-bolonhesa',
  'penne-queijo-bacon',
  'escondidinho',
]

const HERO_MEALS: Meal[] = HERO_IDS.map((id) => MEALS.find((m) => m.id === id)).filter(
  (m): m is Meal => Boolean(m),
)

const INTERVAL = 4800

/**
 * Galeria do hero: troca lenta com fade longo e um leve movimento de escala,
 * em vez de carrossel deslizante. Só a primeira foto entra no HTML inicial —
 * as outras montam depois do primeiro paint, para não disputar com o LCP.
 */
export function HeroGallery() {
  const [index, setIndex] = useState(0)
  const [ready, setReady] = useState(false)

  const reduced = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 1200)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!ready || reduced || HERO_MEALS.length < 2) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % HERO_MEALS.length)
    }, INTERVAL)
    return () => window.clearInterval(id)
  }, [ready, reduced])

  const active = HERO_MEALS[index]

  return (
    <div className="relative">
      <div className="relative aspect-[5/4] overflow-hidden rounded-[28px] bg-green-deep shadow-2xl shadow-black/30 ring-1 ring-gold/20 sm:aspect-square">
        {HERO_MEALS.map((meal, i) => {
          const isActive = i === index
          if (i > 0 && !ready) return null
          return (
            <MealImage
              key={meal.id}
              meal={meal}
              eager={i === 0}
              sizes="(min-width: 1024px) 520px, 100vw"
              className={cn(
                'hero-photo absolute inset-0 h-full w-full object-cover',
                isActive ? 'scale-100 opacity-100' : 'scale-[1.05] opacity-0',
              )}
            />
          )
        })}

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-green-deep/75 to-transparent"
          aria-hidden="true"
        />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3.5">
          <p
            key={active.id}
            className="animate-fade-up rounded-full border border-white/15 bg-green-deep/70 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md"
          >
            {active.cardName ?? active.name}
            <span className="tnum ml-1.5 font-normal text-green-moss">
              R$ {formatBRL(active.price)}
            </span>
          </p>

          <div className="flex flex-none gap-1.5 pt-2" role="tablist" aria-label="Fotos do cardápio">
            {HERO_MEALS.map((meal, i) => (
              <button
                key={meal.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={meal.cardName ?? meal.name}
                onClick={() => setIndex(i)}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-500',
                  i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/45 hover:bg-white/70',
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
