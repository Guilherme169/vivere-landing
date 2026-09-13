import { Bot, Instagram, MapPin, MessageCircle, Truck, Users } from 'lucide-react'
import { SectionTitle } from '@/components/ui/Badge'
import { WhatsAppLink } from '@/components/ui/OrderLink'
import {
  BUSINESS_ADDRESS,
  BUSINESS_CNPJ,
  BUSINESS_NAME,
  HOURS,
  INSTAGRAM_LINK,
  WHATSAPP_LINK,
  WHATSAPP_PHONE_HUMAN,
} from '@/lib/constants'
import { DELIVERY_CITIES, DELIVERY_ON_REQUEST } from '@/lib/delivery'
import { CITIES } from '@/lib/cities'
import { WORDMARK_ALT, WORDMARK_WHITE } from '@/lib/brand'

const HOUR_CARDS = [
  { icon: Users, title: 'Atendimento humano', text: HOURS.human },
  { icon: Bot, title: 'Chatbot no WhatsApp', text: HOURS.bot },
  {
    icon: Truck,
    title: 'Entregas',
    text: `${DELIVERY_CITIES.map((city) => `${city.name}: ${city.days.toLowerCase()}`).join(' · ')}. Em ${DELIVERY_ON_REQUEST.join(', ')}, a data é combinada no WhatsApp.`,
  },
  { icon: MapPin, title: 'Retirada no local', text: HOURS.store },
]

export function Footer() {
  return (
    <>
      <section className="bg-cream pb-14 sm:pb-20">
        <div className="shell grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-14">
          <SectionTitle
            eyebrow="Atendimento"
            title={
              <>
                Quando você consegue <em className="text-orange-dark">falar com a gente</em>
              </>
            }
            description={HOURS.cardapio}
          />

          <ul className="grid gap-2.5 sm:grid-cols-2">
            {HOUR_CARDS.map((card) => {
              const Icon = card.icon
              return (
                <li
                  key={card.title}
                  className="flex items-start gap-3 rounded-2xl border border-black/[.06] bg-white p-4 shadow-card"
                >
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-cream">
                    <Icon size={16} className="text-green-forest" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[13px] font-bold">{card.title}</h3>
                    <p className="mt-1 text-[12px] leading-relaxed text-neutral">{card.text}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <footer className="bg-green-forest pb-24 pt-12 text-white/75 lg:pb-12">
        <div className="shell flex flex-col items-center gap-5 text-center">
          <img
            src={WORDMARK_WHITE}
            alt={WORDMARK_ALT}
            width={720}
            height={257}
            loading="lazy"
            className="h-12 w-auto sm:h-14"
          />

          <div className="flex gap-3">
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Vivere"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <Instagram size={17} aria-hidden="true" />
            </a>
            <WhatsAppLink
              source="rodape"
              href={WHATSAPP_LINK}
              aria-label="WhatsApp da Vivere"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <MessageCircle size={17} aria-hidden="true" />
            </WhatsAppLink>
          </div>

          <div className="h-px w-24 bg-white/15" />

          <div className="flex flex-col items-center gap-2.5">
            <p className="text-[10px] font-bold uppercase tracking-[.14em] text-gold">
              Entregamos em
            </p>
            <nav className="flex flex-wrap justify-center gap-2">
              {CITIES.map((city) => (
                <a
                  key={city.slug}
                  href={`/${city.slug}`}
                  className="rounded-full border border-white/15 px-3.5 py-1.5 text-[12px] text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {city.name}
                </a>
              ))}
            </nav>
          </div>

          <div className="h-px w-24 bg-white/15" />

          <p className="text-[11.5px] leading-relaxed text-white/45">
            {BUSINESS_NAME} · CNPJ {BUSINESS_CNPJ}
            <br />
            {BUSINESS_ADDRESS} · {WHATSAPP_PHONE_HUMAN}
          </p>
        </div>
      </footer>
    </>
  )
}
