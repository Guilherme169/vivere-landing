import { UtensilsCrossed, Clock } from 'lucide-react'
import { LinkButton } from '@/components/ui/Button'
import { CARDAPIO_LINK } from '@/lib/constants'

export function CardapioCTA() {
  return (
    <div className="px-5 pt-2 sm:px-10">
      <div
        id="cardapio-cta"
        className="scroll-mt-6 rounded-[26px] bg-gradient-to-br from-green to-green-dark p-6 text-center text-white shadow-xl shadow-green/35"
      >
        <h3 className="text-[1.4rem] font-extrabold leading-tight">
          Bora montar
          <br />
          seu pedido?
        </h3>
        <p className="mt-1.5 text-xs text-white/85">
          Cardápio completo, com fotos, preços e tabela nutricional de cada marmita.
        </p>

        <LinkButton href={CARDAPIO_LINK} variant="secondary" size="lg" className="mt-4 w-full">
          <UtensilsCrossed size={18} />
          Montar meu pedido
        </LinkButton>

        <p className="mt-3 flex items-center justify-center gap-1.5 text-[10.5px] text-white/75">
          <Clock size={12} />
          Aberto 24h · agende sua entrega quando quiser
        </p>
      </div>
    </div>
  )
}
