import { useEffect, useMemo, useState } from 'react'
import { Star } from 'lucide-react'
import { Eyebrow } from '@/components/ui/Badge'
import { TESTIMONIALS } from '@/lib/testimonials'
import { cn } from '@/lib/cn'

const INTERVAL = 7500

function GoogleIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

/**
 * Uma citação por vez, em corpo grande e serifado, com os rostos servindo de
 * seletor. Com cinco depoimentos, mostrar um de cada vez lê como curadoria;
 * mostrar os cinco em cartõezinhos lê como "só temos cinco".
 */
export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [pausado, setPausado] = useState(false)
  const [manual, setManual] = useState(false)

  const reduced = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  useEffect(() => {
    if (reduced || manual || pausado || TESTIMONIALS.length < 2) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % TESTIMONIALS.length)
    }, INTERVAL)
    return () => window.clearInterval(id)
  }, [reduced, manual, pausado])

  const active = TESTIMONIALS[index]

  return (
    <section id="depoimentos" className="scroll-mt-4 bg-sand/70 py-14 sm:py-20 lg:scroll-mt-20">
      <div className="shell grid gap-9 lg:grid-cols-[.78fr_1.22fr] lg:items-center lg:gap-16">
        <div className="flex flex-col items-start gap-4">
          <Eyebrow tone="gold">Quem já pediu</Eyebrow>
          <h2 className="balance font-serif text-[clamp(1.85rem,5.2vw,2.9rem)] leading-[1.04] tracking-[-.015em]">
            O que dizem <em className="text-orange-dark">nossos clientes</em>
          </h2>

          <div className="mt-1 flex items-center gap-3 rounded-full border border-ink/[.08] bg-white px-4 py-2.5">
            <GoogleIcon size={18} />
            <span className="tnum text-[15px] font-bold leading-none">5,0</span>
            <span
              className="flex gap-0.5 text-[#FBBC04]"
              aria-label="Nota cinco de cinco no Google"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            <span className="text-[12px] text-neutral">no Google</span>
          </div>
        </div>

        <div
          className="flex flex-col gap-7"
          onPointerEnter={() => setPausado(true)}
          onPointerLeave={() => setPausado(false)}
          onFocusCapture={() => setPausado(true)}
          onBlurCapture={() => setPausado(false)}
        >
          <figure className="relative rounded-[26px] border border-gold/25 bg-white px-6 py-8 shadow-card sm:px-10 sm:py-10">
            <span
              aria-hidden="true"
              className="absolute left-5 top-1 select-none font-serif text-[5rem] leading-none text-gold/25 sm:left-8"
            >
              &ldquo;
            </span>

            <blockquote
              key={active.name}
              className="animate-fade-up relative font-serif text-[clamp(1.15rem,3.4vw,1.6rem)] leading-[1.45] tracking-[-.005em] text-ink"
            >
              {active.text}
            </blockquote>

            <figcaption className="mt-7 flex items-center gap-3.5 border-t border-gold/20 pt-5">
              <img
                src={active.photo}
                alt=""
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
                className="h-12 w-12 flex-none rounded-full object-cover ring-2 ring-gold/30 ring-offset-2 ring-offset-white"
              />
              <div className="min-w-0">
                <p className="text-[14px] font-bold leading-tight">{active.name}</p>
                <div
                  className="mt-1 flex gap-0.5 text-[#FBBC04]"
                  aria-label={`${active.stars} de 5 estrelas`}
                >
                  {Array.from({ length: active.stars }).map((_, i) => (
                    <Star key={i} size={11} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
              </div>
            </figcaption>
          </figure>

          <div className="flex items-center gap-3" role="tablist" aria-label="Depoimentos">
            {TESTIMONIALS.map((testimonial, i) => (
              <button
                key={testimonial.name}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Depoimento de ${testimonial.name}`}
                onClick={() => {
                  setIndex(i)
                  setManual(true)
                }}
                className={cn(
                  'flex-none rounded-full transition-all duration-300',
                  i === index
                    ? 'ring-2 ring-green ring-offset-2 ring-offset-sand'
                    : 'opacity-55 hover:opacity-100',
                )}
              >
                <img
                  src={testimonial.photo}
                  alt=""
                  width={40}
                  height={40}
                  loading="lazy"
                  decoding="async"
                  className={cn(
                    'rounded-full object-cover transition-all duration-300',
                    i === index ? 'h-11 w-11' : 'h-9 w-9 grayscale',
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
