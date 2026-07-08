import { useState } from 'react'
import {
  ChevronRight,
  UtensilsCrossed,
  ShoppingBag,
  Calendar,
  CreditCard,
  Package,
  type LucideIcon,
} from 'lucide-react'
import { Eyebrow } from '@/components/ui/Badge'
import { cn } from '@/lib/cn'

interface Step {
  title: string
  icon: LucideIcon
  description: string
  tip: string
}

const STEPS: Step[] = [
  {
    title: 'Escolha suas refeições',
    icon: UtensilsCrossed,
    description:
      'Navegue pelo cardápio online disponível 24h por dia. Cada prato tem foto, peso e tabela nutricional — fácil de escolher o que encaixa na sua rotina.',
    tip: 'Mais de 15 opções disponíveis, com novidades toda semana',
  },
  {
    title: 'Monte seu carrinho',
    icon: ShoppingBag,
    description:
      'Adicione as marmitas desejadas ao carrinho. Frete grátis e descontos progressivos são aplicados automaticamente — sem cupom, sem complicação.',
    tip: 'Acima de R$300: 10% de desconto + frete grátis, automático',
  },
  {
    title: 'Escolha a data de entrega',
    icon: Calendar,
    description:
      'Selecione o dia mais conveniente pra você. Entregas de segunda a sexta, das 8h às 16h. O agendamento é feito direto no momento da compra.',
    tip: 'Sem pressão — você decide quando receber',
  },
  {
    title: 'Finalize com segurança',
    icon: CreditCard,
    description:
      'Confirme seus dados e pague direto pelo cardápio online. Aceitamos Pix, cartão de crédito e débito. Tudo dentro do site, sem redirecionamentos.',
    tip: 'Confirmação do pedido por WhatsApp logo após o pagamento',
  },
  {
    title: 'Receba e aproveite',
    icon: Package,
    description:
      'Suas marmitas chegam ultracongeladas, com validade de até 180 dias. Guarde no congelador e aqueça em 5 minutos no micro-ondas quando quiser.',
    tip: 'Validade de até 180 dias — estoque pra o mês inteiro',
  },
]

export function HowItWorks() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="bg-white px-5 py-8 sm:px-10">
      <Eyebrow>Passo a passo</Eyebrow>
      <h2 className="text-[clamp(1.5rem,6vw,1.9rem)] font-extrabold leading-tight tracking-tight">
        Como comprar pelo
        <br />
        <em className="font-serif not-italic italic text-orange">cardápio online</em>
      </h2>
      <p className="mt-2 text-[13.5px] leading-relaxed text-neutral">
        Cinco passos simples. Toque em cada etapa para entender antes de pedir.
      </p>

      <div className="mt-4">
        {STEPS.map((step, index) => {
          const isOpen = index === openIndex
          const Icon = step.icon
          return (
            <div
              key={step.title}
              className={cn(
                'cursor-pointer py-3.5',
                index < STEPS.length - 1 && 'border-b border-black/[0.06]',
              )}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
            >
              <div className="flex gap-3">
                <div
                  className={cn(
                    'flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[10px] transition-colors duration-200',
                    isOpen ? 'bg-green' : 'bg-cream',
                  )}
                >
                  <Icon
                    size={16}
                    className={cn(
                      'transition-colors duration-200',
                      isOpen ? 'text-white' : 'text-green-dark',
                    )}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[13.5px] font-bold">{step.title}</p>
                    <ChevronRight
                      size={16}
                      className={cn(
                        'flex-shrink-0 text-neutral transition-transform duration-200',
                        isOpen && 'rotate-90 text-green',
                      )}
                    />
                  </div>
                  <div
                    className={cn(
                      'overflow-hidden text-[12px] leading-relaxed text-neutral transition-all duration-300',
                      isOpen ? 'mt-1.5 max-h-52' : 'max-h-0',
                    )}
                  >
                    <p>{step.description}</p>
                    <p className="mt-2 rounded-lg bg-green/10 px-2.5 py-1.5 text-[10.5px] font-medium text-green-dark">
                      {step.tip}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
