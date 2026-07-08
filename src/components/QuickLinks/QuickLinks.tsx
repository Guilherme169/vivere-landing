import { UtensilsCrossed, MessageCircle, Instagram, HeartHandshake, type LucideIcon } from 'lucide-react'
import { CARDAPIO_LINK, WHATSAPP_LINK, WHATSAPP_DIET_LINK, INSTAGRAM_LINK } from '@/lib/constants'
import { cn } from '@/lib/cn'

interface QuickLink {
  icon: LucideIcon
  label: string
  description: string
  href: string
  tone: 'green' | 'orange'
}

const LINKS: QuickLink[] = [
  {
    icon: UtensilsCrossed,
    label: 'Cardápio online',
    description: 'Monte seu pedido, 24h por dia',
    href: CARDAPIO_LINK,
    tone: 'green',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    description: 'Fale direto com a gente',
    href: WHATSAPP_LINK,
    tone: 'green',
  },
  {
    icon: HeartHandshake,
    label: 'Dieta personalizada',
    description: 'Sob medida pra sua rotina',
    href: WHATSAPP_DIET_LINK,
    tone: 'orange',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    description: '@viverealimentos',
    href: INSTAGRAM_LINK,
    tone: 'orange',
  },
]

export function QuickLinks() {
  return (
    <section className="px-5 py-7 sm:px-10">
      <div className="grid grid-cols-2 gap-3">
        {LINKS.map((link) => {
          const Icon = link.icon
          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 rounded-2xl border border-black/5 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-xl',
                  link.tone === 'green' ? 'bg-green/10' : 'bg-orange/10',
                )}
              >
                <Icon size={17} className={link.tone === 'green' ? 'text-green-dark' : 'text-orange'} />
              </div>
              <div>
                <p className="text-[13px] font-bold leading-tight text-ink">{link.label}</p>
                <p className="mt-0.5 text-[11px] leading-tight text-neutral">{link.description}</p>
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}
