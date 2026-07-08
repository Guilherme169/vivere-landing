import { useEffect, useState } from 'react'
import { UtensilsCrossed, MessageCircle } from 'lucide-react'
import { CARDAPIO_LINK, WHATSAPP_LINK } from '@/lib/constants'
import { cn } from '@/lib/cn'

/**
 * Sticky bottom conversion bar. Appears once the visitor scrolls past
 * the hero, so it never competes with the hero's own CTA on first paint.
 */
export function FloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={cn(
        'safe-bottom fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 transition-all duration-300',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <div className="flex w-full max-w-[440px] items-center gap-2 rounded-full border border-white/40 bg-white/85 p-1.5 shadow-2xl shadow-black/20 backdrop-blur-md">
        <a
          href={CARDAPIO_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-green py-2.5 text-[13px] font-bold text-white shadow-md shadow-green/30"
        >
          <UtensilsCrossed size={15} />
          Fazer meu pedido
        </a>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chamar no WhatsApp"
          className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-full bg-ink text-white"
        >
          <MessageCircle size={16} />
        </a>
      </div>
    </div>
  )
}
