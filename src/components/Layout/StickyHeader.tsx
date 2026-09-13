import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { OrderLink, WhatsAppLink } from '@/components/ui/OrderLink'
import { WORDMARK_ALT, WORDMARK_FOREST } from '@/lib/brand'
import { WHATSAPP_HELLO_LINK } from '@/lib/constants'
import { cn } from '@/lib/cn'

const LINKS = [
  { href: '#combos', label: 'Combos' },
  { href: '#cardapio', label: 'Cardápio' },
  { href: '#entregas', label: 'Entregas' },
  { href: '#duvidas', label: 'Dúvidas' },
]

/**
 * Barra fixa do desktop, a partir do fim do hero. No celular quem cumpre esse
 * papel é a barra inferior — duas barras fixas comeriam metade da tela.
 */
export function StickyHeader() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        setVisible(window.scrollY > window.innerHeight * 0.85)
        frame = 0
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      className={cn(
        'fixed inset-x-0 top-0 z-50 hidden border-b border-ink/[.07] bg-cream/90 backdrop-blur-md transition-transform duration-300 lg:block',
        visible ? 'translate-y-0' : '-translate-y-full',
      )}
      aria-hidden={!visible}
    >
      <div className="shell flex items-center justify-between gap-6 py-3">
        <a href="#inicio" aria-label="Vivere, início" tabIndex={visible ? undefined : -1}>
          <img
            src={WORDMARK_FOREST}
            alt={WORDMARK_ALT}
            width={720}
            height={257}
            className="h-7 w-auto"
          />
        </a>

        <nav className="flex items-center gap-7">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              tabIndex={visible ? undefined : -1}
              className="text-[13.5px] font-medium text-neutral transition-colors hover:text-green-forest"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppLink
            source="header-fixo"
            href={WHATSAPP_HELLO_LINK}
            aria-label="Falar no WhatsApp"
            tabIndex={visible ? undefined : -1}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-green-forest transition-colors hover:bg-green-forest/5"
          >
            <MessageCircle size={16} aria-hidden="true" />
          </WhatsAppLink>
          <OrderLink
            source="header-fixo"
            tabIndex={visible ? undefined : -1}
            className="rounded-full bg-green px-5 py-2.5 text-[13.5px] font-semibold text-green-deep transition-colors hover:bg-green-hover"
          >
            Fazer meu pedido
          </OrderLink>
        </div>
      </div>
    </div>
  )
}
