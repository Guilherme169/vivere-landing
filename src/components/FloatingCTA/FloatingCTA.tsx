import { MessageCircle, UtensilsCrossed } from 'lucide-react'
import { WhatsAppLink, OrderLink } from '@/components/ui/OrderLink'
import { whatsappLink } from '@/lib/constants'

const HELP_LINK = whatsappLink('Oi! Estou no site da Vivere e fiquei com uma dúvida:')

/**
 * Conversão e socorro sempre à mão. No celular, uma barra fixa com o CTA do
 * cardápio e o WhatsApp ao lado; no desktop, um botão fixo de WhatsApp. Os
 * dois ficam visíveis o tempo todo — a dúvida do cliente não espera scroll.
 */
export function FloatingCTA() {
  return (
    <>
      <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pt-6 lg:hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cream via-cream/80 to-transparent"
          aria-hidden="true"
        />
        <div className="relative flex w-full max-w-[460px] items-center gap-2">
          <OrderLink
            source="barra-flutuante"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-green px-4 py-3.5 text-[14px] font-bold text-white shadow-lift"
          >
            <UtensilsCrossed size={16} aria-hidden="true" />
            Fazer meu pedido
          </OrderLink>
          <WhatsAppLink
            source="barra-flutuante"
            href={HELP_LINK}
            className="flex flex-none items-center gap-1.5 rounded-full bg-green-forest px-4 py-3.5 text-[13px] font-bold text-white shadow-lift"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Dúvidas
          </WhatsAppLink>
        </div>
      </div>

      <WhatsAppLink
        source="botao-fixo-desktop"
        href={HELP_LINK}
        className="fixed bottom-7 right-7 z-40 hidden items-center gap-2.5 rounded-full bg-green-forest px-5 py-3.5 text-[14px] font-semibold text-white shadow-lift transition-colors hover:bg-green-deep lg:inline-flex"
      >
        <MessageCircle size={18} aria-hidden="true" />
        Dúvidas? Chame no WhatsApp
      </WhatsAppLink>
    </>
  )
}
