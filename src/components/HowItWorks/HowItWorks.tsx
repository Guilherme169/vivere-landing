import { useId, useState } from 'react'
import {
  Calendar,
  ChevronRight,
  CreditCard,
  Package,
  ShoppingBag,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react'
import { SectionTitle } from '@/components/ui/Badge'
import { MEALS } from '@/lib/meals'
import { FREIGHT } from '@/lib/delivery'
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
      'O cardápio online fica aberto 24 horas por dia. Cada prato tem foto, peso e composição em gramas — dá pra ver exatamente o que vem na embalagem antes de decidir.',
    tip: `${MEALS.length} pratos no cardápio, com novidades entrando toda semana`,
  },
  {
    title: 'Monte o combo ou compre avulso',
    icon: ShoppingBag,
    description:
      'No combo você escolhe quantas unidades quiser de cada sabor até fechar 10, 15 ou 30 marmitas. Comprando avulso, os cupons de desconto e de frete grátis entram sozinhos no carrinho conforme o valor do pedido.',
    tip: `Frete grátis a partir de R$ ${FREIGHT.freeFrom} em qualquer formato`,
  },
  {
    title: 'Escolha a data de entrega',
    icon: Calendar,
    description:
      'Nas cidades com dia fixo você seleciona a data ainda no carrinho. Em Tramandaí, Imbé e Caraá, a gente combina a data com você pelo WhatsApp logo depois do pedido. Se preferir, dá pra retirar em Santo Antônio da Patrulha com agendamento.',
    tip: 'Osório ter/sex · Glorinha qua · Capão e Xangri-Lá sex · demais a combinar',
  },
  {
    title: 'Finalize com segurança',
    icon: CreditCard,
    description:
      'Confirme seus dados e pague direto no cardápio online, sem redirecionamento. A confirmação do pedido chega no seu WhatsApp logo em seguida.',
    tip: 'Pix, cartão de crédito e débito',
  },
  {
    title: 'Receba e aproveite',
    icon: Package,
    description:
      'As marmitas chegam ultracongeladas. Guarde no congelador e aqueça no micro-ondas por 5 minutos, na própria embalagem, quando bater a fome.',
    tip: 'Validade de até 180 dias — dá pra estocar o mês inteiro',
  },
]

export function HowItWorks() {
  const [openIndex, setOpenIndex] = useState(0)
  const baseId = useId()

  return (
    <section id="como-funciona" className="scroll-mt-4 lg:scroll-mt-20 bg-white py-14 sm:py-20">
      <div className="shell grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-14">
        <SectionTitle
          eyebrow="Passo a passo"
          title={
            <>
              Como comprar pelo <em className="text-orange-dark">cardápio online</em>
            </>
          }
          description="O pedido é montado e pago no cardápio online. Aqui vão os cinco passos, para você chegar lá sabendo exatamente o que vai encontrar."
        />

        <ul className="flex flex-col">
          {STEPS.map((step, index) => {
            const isOpen = index === openIndex
            const Icon = step.icon
            const panelId = `${baseId}-panel-${index}`
            const buttonId = `${baseId}-button-${index}`

            return (
              <li
                key={step.title}
                className={cn(index < STEPS.length - 1 && 'border-b border-black/[.07]')}
              >
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center gap-3.5 py-4 text-left"
                >
                  <span
                    className={cn(
                      'flex h-10 w-10 flex-none items-center justify-center rounded-xl transition-colors duration-200',
                      isOpen ? 'bg-green text-white' : 'bg-cream text-green-forest',
                    )}
                  >
                    <Icon size={17} aria-hidden="true" />
                  </span>
                  <span className="flex-1 text-[14.5px] font-bold leading-tight">{step.title}</span>
                  <ChevronRight
                    size={17}
                    aria-hidden="true"
                    className={cn(
                      'flex-none text-neutral transition-transform duration-200',
                      isOpen && 'rotate-90 text-green-dark',
                    )}
                  />
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="pb-5 pl-[54px] pr-1"
                >
                  <p className="text-[13.5px] leading-relaxed text-neutral">{step.description}</p>
                  <p className="mt-2.5 rounded-lg bg-green/[.09] px-3 py-2 text-[12px] font-medium text-green-forest">
                    {step.tip}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
