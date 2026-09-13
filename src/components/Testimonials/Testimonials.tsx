import { Star } from 'lucide-react'
import { SectionTitle } from '@/components/ui/Badge'
import { TESTIMONIALS } from '@/lib/testimonials'

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" focusable="false">
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
    <section className="bg-white py-14 sm:py-20">
      <div className="shell flex flex-col gap-7">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <SectionTitle
            eyebrow="Quem já pediu"
            title={
              <>
                O que dizem <em className="text-orange-dark">nossos clientes</em>
              </>
            }
          />
          <p className="flex items-center gap-2 text-[13px] font-semibold text-neutral">
            <GoogleIcon />
            Nota 5,0 no Google
          </p>
        </div>

        <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <li
              key={testimonial.name}
              className="flex w-[268px] flex-none snap-start flex-col gap-3 rounded-2xl border border-black/[.06] bg-cream p-5 sm:w-auto"
            >
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.photo}
                  alt=""
                  width={40}
                  height={40}
                  loading="lazy"
                  decoding="async"
                  className="h-10 w-10 flex-none rounded-full object-cover"
                />
                <div>
                  <p className="text-[13px] font-bold leading-tight">{testimonial.name}</p>
                  <div
                    className="mt-1 flex gap-0.5 text-[#FBBC04]"
                    aria-label={`${testimonial.stars} de 5 estrelas`}
                  >
                    {Array.from({ length: testimonial.stars }).map((_, index) => (
                      <Star key={index} size={11} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-[12.5px] leading-relaxed text-neutral">
                &ldquo;{testimonial.text}&rdquo;
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
