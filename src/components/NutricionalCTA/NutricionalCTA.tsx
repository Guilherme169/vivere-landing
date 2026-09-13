import { ClipboardList } from 'lucide-react'
import { SectionTitle } from '@/components/ui/Badge'
import { MEALS } from '@/lib/meals'

const IDEAL_FOR = [
  'faz dieta',
  'tem acompanhamento nutricional',
  'pratica atividade física',
  'quer uma alimentação equilibrada',
]

const WITH_NUTRITION = MEALS.filter((meal) => meal.hasNutrition).length

export function NutricionalCTA() {
  return (
    <section className="bg-cream py-14 sm:py-20">
      <div className="shell grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-14">
        <div className="flex flex-col gap-5">
          <SectionTitle
            eyebrow="Nutrição"
            title={
              <>
                Informações <em className="text-orange-dark">nutricionais</em> completas
              </>
            }
            description="Calorias, proteínas, carboidratos, gorduras, sódio, ingredientes e alergênicos — exatamente como aparecem na embalagem, para você e seu nutricionista planejarem sem surpresa."
          />

          <a
            href="/nutricional"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-green px-6 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-green-dark"
          >
            <ClipboardList size={17} aria-hidden="true" />
            Consultar tabela nutricional
          </a>

          <p className="text-[12px] leading-relaxed text-neutral">
            {WITH_NUTRITION} pratos já com tabela publicada. Os demais estão em finalização e entram
            assim que ficarem prontos.
          </p>
        </div>

        <div className="rounded-2xl border border-black/[.06] bg-white p-6 shadow-card">
          <p className="text-[10.5px] font-bold uppercase tracking-[.09em] text-neutral">
            Ideal para quem
          </p>
          <ul className="mt-4 flex flex-col gap-3">
            {IDEAL_FOR.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span
                  className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-green/12 text-[10px] font-bold text-green-forest"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span className="text-[13.5px] font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
