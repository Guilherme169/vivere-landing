import { HeartHandshake } from 'lucide-react'
import { SectionTitle } from '@/components/ui/Badge'
import { WhatsAppLink } from '@/components/ui/OrderLink'
import { WHATSAPP_DIET_LINK } from '@/lib/constants'

const DIET_STEPS = [
  'Chame no nosso WhatsApp',
  'Peça pra falar com um atendente humano',
  'Envie o PDF da sua dieta ou descreva as restrições',
  'Receba um orçamento com as opções que encaixam',
  'Você escolhe, a gente prepara, congela e entrega',
]

export function PersonalizedDiet() {
  return (
    <section className="bg-white pb-14 sm:pb-20">
      <div className="shell">
        <div className="grid gap-7 rounded-3xl bg-[#fdf6ec] p-6 sm:p-9 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14">
          <SectionTitle
            eyebrow="Dieta específica?"
            tone="orange"
            title={
              <>
                A gente monta <em className="text-orange-dark">com você</em>
              </>
            }
            description="Tem prescrição de nutricionista, plano alimentar ou restrição alimentar? Montamos um cardápio sob medida, com as gramaturas que a sua dieta pede."
          />

          <div className="flex flex-col gap-5">
            <ol className="flex flex-col gap-2.5">
              {DIET_STEPS.map((step, index) => (
                <li key={step} className="flex gap-3 text-[13.5px] leading-snug text-ink">
                  <span className="tnum flex h-6 w-6 flex-none items-center justify-center rounded-full bg-orange/15 text-[11px] font-extrabold text-orange-dark">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>

            <WhatsAppLink
              source="dieta-personalizada"
              href={WHATSAPP_DIET_LINK}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-4 text-[14.5px] font-semibold text-ink transition-colors hover:bg-orange-hover"
            >
              <HeartHandshake size={17} aria-hidden="true" />
              Montar minha dieta personalizada
            </WhatsAppLink>
          </div>
        </div>
      </div>
    </section>
  )
}
