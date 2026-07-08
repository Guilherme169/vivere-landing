import { Star } from 'lucide-react'
import { Eyebrow } from '@/components/ui/Badge'
import { TESTIMONIALS } from '@/lib/testimonials'

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
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

export function Testimonials() {
  return (
    <section className="bg-white px-5 py-8 sm:px-10">
      <Eyebrow>Quem já pediu</Eyebrow>
      <h2 className="text-[clamp(1.5rem,6vw,1.9rem)] font-extrabold leading-tight tracking-tight">
        O que dizem <em className="font-serif not-italic italic text-orange">nossos clientes</em>
      </h2>

      <div className="no-scrollbar -mx-5 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:-mx-10 sm:px-10">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.name}
            className="w-[254px] flex-none snap-start rounded-2xl border border-black/5 bg-cream p-4"
          >
            <div className="flex items-center gap-2.5">
              <img src={t.photo} alt={t.name} className="h-[38px] w-[38px] flex-shrink-0 rounded-full object-cover" />
              <div>
                <p className="text-xs font-bold leading-tight">{t.name}</p>
                <div className="mt-0.5 flex gap-0.5 text-[#FBBC04]">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={10} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-2.5 text-[11.5px] leading-relaxed text-neutral">&ldquo;{t.text}&rdquo;</p>
          </div>
        ))}
      </div>

      <div className="mt-3.5 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-neutral">
        <GoogleIcon />
        5,0 · 5 avaliações no Google
      </div>
    </section>
  )
}
