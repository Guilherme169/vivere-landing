import { useEffect, useRef, useState, type ReactNode } from 'react'
import { MealImage } from '@/components/ui/MealImage'
import { MEALS, formatBRL } from '@/lib/meals'
import type { Meal } from '@/types'
import { cn } from '@/lib/cn'

/**
 * Ordem escolhida a dedo, e a quantidade também.
 *
 * Os três quadros avançam sempre para o próximo prato da lista, então em
 * qualquer instante eles mostram três posições seguidas daqui — por isso
 * nenhum vizinho repete a cor dominante nem a textura.
 *
 * A lista tem 10 pratos de propósito: como 10 não é múltiplo de 3, cada
 * quadro passa por todos eles ao longo do tempo. Com 9, o quadro grande
 * ficaria preso em três pratos fixos para sempre.
 */
const VITRINE_IDS = [
  'frango-caseiro',
  'penne-queijo-bacon',
  'bolonhesa-da-casa',
  'feijoada-completa',
  'lasanha-bolonhesa',
  'tradicional-brasileiro',
  'sobrecoxa-massa-legumes',
  'risoto-carne-panela',
  'escondidinho',
  'massa-carne-desfiada',
]

const VITRINE: Meal[] = VITRINE_IDS.map((id) => MEALS.find((m) => m.id === id)).filter(
  (m): m is Meal => Boolean(m),
)

/** Um dos três quadros troca a cada intervalo — nunca os três juntos. */
const PASSO = 2600
/** Espera antes de montar os quadros menores, para não disputar com o LCP. */
const ATRASO_MONTAGEM = 1200

interface QuadroProps {
  meal: Meal
  className: string
  sizes: string
  eager?: boolean
  /** O primeiro quadro do primeiro paint não anima: ele é o LCP. */
  semAnimacao?: boolean
}

/**
 * Uma foto que se troca por cima da anterior. A foto que sai fica embaixo,
 * parada, e a que entra aparece por cima com fade e uma deriva lenta de
 * escala — é isso que dá a sensação de vitrine viva em vez de carrossel.
 */
function Quadro({ meal, className, sizes, eager, semAnimacao }: QuadroProps) {
  const atual = useRef(meal)
  const anterior = useRef<Meal | null>(null)

  if (atual.current.id !== meal.id) {
    anterior.current = atual.current
    atual.current = meal
  }

  const saindo = anterior.current

  return (
    <div className={cn('relative overflow-hidden bg-green-deep', className)}>
      {saindo && (
        <MealImage
          key={`base-${saindo.id}`}
          meal={saindo}
          sizes={sizes}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <MealImage
        key={meal.id}
        meal={meal}
        eager={eager}
        sizes={sizes}
        className={cn(
          'absolute inset-0 h-full w-full object-cover',
          semAnimacao ? undefined : 'foto-vitrine',
        )}
      />
    </div>
  )
}

interface HeroGalleryProps {
  /** Selo opcional no canto superior do quadro em destaque (a âncora de preço). */
  selo?: ReactNode
}

/**
 * Vitrine do hero: um prato grande e dois menores, trocando em momentos
 * diferentes. Mostra a variedade do cardápio já na primeira tela — e como
 * nenhuma foto passa do tamanho original (700 px), todas ficam nítidas.
 */
export function HeroGallery({ selo }: HeroGalleryProps) {
  const [slots, setSlots] = useState([0, 1, 2])
  const [montado, setMontado] = useState(false)
  const [pausado, setPausado] = useState(false)
  /** Depois de escolher uma foto na mão, a troca automática não volta. */
  const [manual, setManual] = useState(false)

  const proximo = useRef(3)
  const alvo = useRef(0)

  useEffect(() => {
    const t = window.setTimeout(() => setMontado(true), ATRASO_MONTAGEM)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!montado || manual || pausado || VITRINE.length < 4) return
    const reduzido = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduzido) return

    const id = window.setInterval(() => {
      setSlots((atuais) => {
        const novos = [...atuais]
        novos[alvo.current] = proximo.current
        proximo.current = (proximo.current + 1) % VITRINE.length
        alvo.current = (alvo.current + 1) % novos.length
        return novos
      })
    }, PASSO)

    return () => window.clearInterval(id)
  }, [montado, manual, pausado])

  /** Clicar num quadro menor traz aquele prato para o lugar de destaque. */
  function destacar(posicao: number) {
    setSlots((atuais) => {
      const novos = [...atuais]
      ;[novos[0], novos[posicao]] = [novos[posicao], novos[0]]
      return novos
    })
    setManual(true)
  }

  const destaque = VITRINE[slots[0]]

  return (
    <div
      className="grid grid-cols-2 gap-2.5 lg:h-[26.5rem] lg:grid-cols-[1.5fr_1fr] lg:grid-rows-2 xl:h-[28.5rem]"
      onPointerEnter={() => setPausado(true)}
      onPointerLeave={() => setPausado(false)}
      onFocusCapture={() => setPausado(true)}
      onBlurCapture={() => setPausado(false)}
    >
      <div className="relative col-span-2 aspect-[16/10] lg:col-span-1 lg:row-span-2 lg:aspect-auto lg:h-full">
        <Quadro
          meal={destaque}
          eager
          semAnimacao={slots[0] === 0}
          sizes="(min-width: 1024px) 380px, 92vw"
          className="h-full w-full rounded-[22px] shadow-2xl shadow-black/35 ring-1 ring-gold/20"
        />

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 rounded-b-[22px] bg-gradient-to-t from-green-deep/90 via-green-deep/45 to-transparent"
          aria-hidden="true"
        />

        {selo && <div className="absolute bottom-4 right-4">{selo}</div>}

        <p
          key={destaque.id}
          className="animate-fade-up absolute bottom-0 left-0 max-w-[57%] p-4 sm:max-w-[70%] sm:p-5 lg:max-w-[85%]"
        >
          <span className="block font-serif text-[1.15rem] leading-tight text-white sm:text-[1.35rem]">
            {destaque.cardName ?? destaque.name}
          </span>
          <span className="tnum mt-1 block text-[12.5px] font-medium text-green-moss">
            R$ {formatBRL(destaque.price)} · {destaque.weight}
          </span>
        </p>
      </div>

      {[1, 2].map((posicao) => {
        const meal = VITRINE[slots[posicao]]
        const classe =
          'h-full w-full rounded-[18px] ring-1 ring-white/10 transition-[transform,box-shadow] duration-500 group-hover:scale-[1.03] group-hover:ring-gold/35'

        if (!montado) {
          return (
            <div
              key={posicao}
              className="aspect-[4/3] rounded-[18px] bg-green-deep/70 ring-1 ring-white/10 lg:aspect-auto lg:h-full"
              aria-hidden="true"
            />
          )
        }

        return (
          <button
            key={posicao}
            type="button"
            onClick={() => destacar(posicao)}
            aria-label={`Ver ${meal.cardName ?? meal.name} em destaque`}
            className="group relative aspect-[4/3] overflow-hidden rounded-[18px] lg:aspect-auto lg:h-full"
          >
            <Quadro meal={meal} sizes="(min-width: 1024px) 180px, 46vw" className={classe} />
            <span
              className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 rounded-b-[18px] bg-gradient-to-t from-green-deep/85 to-transparent transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100"
              aria-hidden="true"
            />
            <span className="pointer-events-none absolute bottom-2.5 left-3 right-3 text-left text-[11.5px] font-semibold leading-tight text-white transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100">
              {meal.cardName ?? meal.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}
