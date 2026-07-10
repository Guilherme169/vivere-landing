import { ClipboardList } from 'lucide-react'
import { Eyebrow } from '@/components/ui/Badge'
import { LinkButton } from '@/components/ui/Button'

const IDEAL_FOR = [
  'faz dieta',
  'possui acompanhamento nutricional',
  'pratica atividade física',
  'busca alimentação equilibrada',
]

export function NutricionalCTA() {
  return (
    <section className="px-5 py-8 sm:px-10">
      <Eyebrow>Nutrição</Eyebrow>
      <h2 className="text-[clamp(1.5rem,6vw,1.9rem)] font-extrabold leading-tight tracking-tight">
        Informações{' '}
        <em className="font-serif not-italic italic text-orange">nutricionais</em>
        <br />
        completas
      </h2>

      <p className="mt-2.5 text-[13px] leading-relaxed text-neutral">
        Na Vivere você sabe exatamente o que está consumindo. Consulte ingredientes, calorias,
        proteínas, carboidratos, gorduras, sódio e alergênicos de todas as refeições.
      </p>

      <div className="mt-4 rounded-2xl border border-black/5 bg-white p-4">
        <p className="mb-3 text-[10.5px] font-bold uppercase tracking-wider text-neutral">
          Ideal para quem:
        </p>
        <div className="flex flex-col gap-2.5">
          {IDEAL_FOR.map((item) => (
            <div key={item} className="flex items-center gap-2.5">
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green/10 text-[10px] font-bold text-green-dark">
                ✔
              </span>
              <p className="text-[13px] font-medium">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <LinkButton
        href="/nutricional.html"
        target="_self"
        size="md"
        className="mt-5 w-full gap-2"
      >
        <ClipboardList size={16} strokeWidth={2.5} />
        Consultar informações nutricionais
      </LinkButton>
    </section>
  )
}
