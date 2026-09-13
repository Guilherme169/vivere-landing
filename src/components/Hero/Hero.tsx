import { Clock, Instagram, MessageCircle, Snowflake, Truck } from 'lucide-react'
import { Eyebrow } from '@/components/ui/Badge'
import { HeroGallery } from '@/components/Hero/HeroGallery'
import { OrderLink, WhatsAppLink } from '@/components/ui/OrderLink'
import { BEST_UNIT_PRICE, UNIT_PRICE_NOTE_SHORT } from '@/lib/combos'
import { INSTAGRAM_LINK, WHATSAPP_LINK } from '@/lib/constants'
import { WORDMARK_ALT, WORDMARK_WHITE } from '@/lib/brand'
import { FREIGHT } from '@/lib/delivery'
import { formatBRL } from '@/lib/meals'

const TRUST = [
  { icon: Clock, label: 'Pronto em 5 minutos' },
  { icon: Snowflake, label: '180 dias no congelador' },
  { icon: Truck, label: `Frete grátis acima de R$ ${FREIGHT.freeFrom}` },
]

export function Hero() {
  return (
    <section id="inicio" className="bg-green-forest text-white">
      <div className="shell">
        <header className="flex items-center justify-between gap-3 border-b border-white/10 py-4 sm:py-5">
          <a href="#inicio" aria-label="Vivere, início" className="flex-none">
            <img
              src={WORDMARK_WHITE}
              alt={WORDMARK_ALT}
              width={720}
              height={257}
              className="h-8 w-auto sm:h-10"
            />
          </a>
          <nav className="flex items-center gap-2">
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Vivere"
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/85 transition-colors hover:bg-white/10 sm:flex"
            >
              <Instagram size={16} aria-hidden="true" />
            </a>
            <WhatsAppLink
              source="header"
              href={WHATSAPP_LINK}
              aria-label="Falar no WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/85 transition-colors hover:bg-white/10"
            >
              <MessageCircle size={16} aria-hidden="true" />
            </WhatsAppLink>
            <OrderLink
              source="header"
              className="rounded-full bg-green px-4 py-2 text-[13px] font-semibold transition-colors hover:bg-green-dark"
            >
              Cardápio
            </OrderLink>
          </nav>
        </header>
      </div>

      <div className="shell grid gap-7 pb-14 pt-7 sm:gap-9 sm:pt-10 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:gap-16 lg:pb-24">
        <div className="order-2 flex flex-col items-start gap-5 lg:order-1">
          {/* No celular o preço vira uma linha aqui, para não cobrir a foto. */}
          <p className="tnum -mt-1 text-[13px] text-white/70 sm:hidden">
            Nos combos, a partir de{' '}
            <strong className="font-serif text-[19px] font-normal text-white">
              R$ {formatBRL(BEST_UNIT_PRICE)}
            </strong>
            <sup className="ml-0.5 text-[10px] font-semibold text-green-moss">*</sup> por marmita
            <span className="mt-0.5 block text-[10.5px] text-white/60">
              * {UNIT_PRICE_NOTE_SHORT}
            </span>
          </p>

          <Eyebrow tone="light">Marmitas congeladas gourmet</Eyebrow>

          <h1 className="balance font-serif text-[clamp(2.5rem,10vw,4.4rem)] font-normal leading-[.96] tracking-[-.02em]">
            Sua rotina merece
            <br />
            <em className="text-green-moss">comida de verdade</em>
          </h1>

          <p className="max-w-prose text-[15px] leading-relaxed text-white/75 sm:text-[15.5px]">
            Feitas na nossa cozinha, ultracongeladas no mesmo dia e entregues na sua casa. Você
            aquece em 5 minutos.
          </p>

          <div className="flex w-full items-center gap-2.5">
            <OrderLink
              source="hero"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-green px-5 py-3.5 text-[14.5px] font-semibold text-white shadow-lg shadow-black/25 transition-colors hover:bg-green-dark sm:flex-none sm:px-7 sm:py-4 sm:text-[15px]"
            >
              Montar meu pedido
            </OrderLink>
            <a
              href="#combos"
              className="inline-flex flex-none items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-white/10 sm:px-7 sm:py-4 sm:text-[15px]"
            >
              Ver combos
            </a>
          </div>

          <ul className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
            {TRUST.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.label} className="flex items-center gap-2 text-[12.5px] text-white/70">
                  <Icon size={14} className="text-green-moss" aria-hidden="true" />
                  {item.label}
                </li>
              )
            })}
          </ul>
        </div>

        <div className="relative order-1 lg:order-2">
          <HeroGallery />

          <div className="absolute -bottom-8 right-6 hidden w-[280px] rounded-2xl border border-gold/25 bg-green-deep/90 px-5 py-3.5 backdrop-blur-md sm:block">
            <p className="text-[10px] font-bold uppercase tracking-[.14em] text-gold">
              Nos combos, a partir de
            </p>
            <p className="tnum mt-1 font-serif text-[1.9rem] leading-none">
              R$ {formatBRL(BEST_UNIT_PRICE)}
              <sup className="ml-0.5 font-sans text-[12px] font-semibold text-green-moss">*</sup>
              <span className="ml-1.5 font-sans text-[11.5px] font-medium text-white/60">
                por marmita
              </span>
            </p>
            <p className="mt-1.5 text-[10px] leading-snug text-white/60">
              * {UNIT_PRICE_NOTE_SHORT}
            </p>
          </div>
        </div>
      </div>

      <div className="h-6 lg:h-10" />
    </section>
  )
}
