import { Eyebrow } from '@/components/ui/Badge'
import { DISHES } from '@/lib/meals'

export function Gallery() {
  return (
    <section className="bg-white px-5 py-8 sm:px-10">
      <Eyebrow>Cardápio</Eyebrow>
      <h2 className="text-[clamp(1.5rem,6vw,1.9rem)] font-extrabold leading-tight tracking-tight">
        Sabores que <em className="font-serif not-italic italic text-orange">dão água na boca</em>
      </h2>
      <p className="mt-2 text-[13.5px] leading-relaxed text-neutral">
        Uma prévia do que te espera — o cardápio completo, com todos os sabores e preços, está a um toque
        de distância.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {DISHES.map((dish) => (
          <div key={dish.id} className="relative aspect-square overflow-hidden rounded-2xl bg-cream">
            <img src={dish.image} alt={dish.name} loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2.5 text-white">
              <p className="text-[10.5px] font-bold leading-tight">{dish.name}</p>
              {dish.price ? (
                <p className="mt-0.5 text-[9.5px] font-semibold text-[#a8e6ae]">
                  R$ {dish.price.toFixed(2).replace('.', ',')}
                </p>
              ) : (
                <p className="mt-0.5 text-[9.5px] italic text-white/65">Ver no cardápio</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
