import { HeartHandshake } from 'lucide-react'
import { Eyebrow } from '@/components/ui/Badge'
import { LinkButton } from '@/components/ui/Button'
import { WHATSAPP_DIET_LINK } from '@/lib/constants'

const DIET_STEPS = [
  'Chame no nosso WhatsApp',
  'Peça pra falar com um atendente humano',
  'Envie o PDF da sua dieta ou descreva pra gente',
  'Receba um orçamento com opções que encaixam na sua dieta',
  'Você escolhe, a gente prepara, congela e entrega',
]

export function PersonalizedDiet() {
  return (
    <section className="px-5 py-4 sm:px-10">
      <div className="rounded-[22px] bg-[#fff8f0] p-5">
        <Eyebrow tone="orange">Dieta específica?</Eyebrow>
        <h2 className="text-[1.35rem] font-extrabold leading-tight tracking-tight">
          A gente monta <em className="font-serif not-italic italic text-orange">com você</em>
        </h2>
        <p className="mt-2 text-[13.5px] leading-relaxed text-neutral">
          Tem prescrição de nutricionista, plano alimentar ou restrições? Montamos um cardápio sob medida:
        </p>

        <ol className="mt-3.5 flex flex-col gap-2">
          {DIET_STEPS.map((step, index) => (
            <li key={step} className="flex gap-2 text-xs leading-relaxed text-ink">
              <b className="flex-shrink-0 font-extrabold text-orange">{index + 1}.</b>
              {step}
            </li>
          ))}
        </ol>

        <LinkButton href={WHATSAPP_DIET_LINK} className="mt-4 w-full bg-orange text-white hover:bg-orange/90">
          <HeartHandshake size={16} />
          Montar minha dieta personalizada
        </LinkButton>
      </div>
    </section>
  )
}
