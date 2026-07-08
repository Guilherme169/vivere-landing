import { Users, Bot, Truck, MapPin, Instagram, MessageCircle } from 'lucide-react'
import { Eyebrow } from '@/components/ui/Badge'
import logoV from '@/assets/logo/LOGO_V.jpeg'
import {
  HOURS,
  BUSINESS_ADDRESS,
  BUSINESS_CNPJ,
  INSTAGRAM_LINK,
  WHATSAPP_LINK,
} from '@/lib/constants'

const HOUR_CARDS = [
  { icon: Users, title: 'Atendimento humano', text: HOURS.human },
  { icon: Bot, title: 'Chatbot no WhatsApp', text: HOURS.bot },
  { icon: Truck, title: 'Entregas', text: HOURS.delivery },
  { icon: MapPin, title: 'Loja física', text: HOURS.store },
]

export function Footer() {
  return (
    <>
      <section className="px-5 py-8 sm:px-10">
        <Eyebrow>Atendimento</Eyebrow>
        <h2 className="text-[clamp(1.5rem,6vw,1.9rem)] font-extrabold leading-tight tracking-tight">
          Quando você
          <br />
          consegue <em className="font-serif not-italic italic text-orange">falar com a gente</em>
        </h2>

        <div className="mt-4 flex flex-col gap-2.5">
          {HOUR_CARDS.map((card) => {
            const Icon = card.icon
            return (
              <div
                key={card.title}
                className="flex items-start gap-3 rounded-2xl border border-black/5 bg-white p-3.5"
              >
                <div className="flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[10px] bg-cream">
                  <Icon size={16} className="text-green-dark" />
                </div>
                <div>
                  <h5 className="text-xs font-bold">{card.title}</h5>
                  <p className="mt-0.5 text-[11.5px] leading-relaxed text-neutral">{card.text}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <footer className="bg-green-forest px-6 py-10 text-center text-white/80">
        <img
          src={logoV}
          alt="Vivere"
          className="mx-auto w-20 sm:w-28 object-contain"
        />

        <p className="mt-3 font-serif italic text-sm text-white/60">
          Alimentação que acompanha o seu ritmo
        </p>

        <div className="my-4 flex justify-center gap-3">
          <a
            href={INSTAGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
          >
            <Instagram size={16} />
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
          >
            <MessageCircle size={16} />
          </a>
        </div>

        <div className="mx-auto h-px max-w-[120px] bg-white/10" />

        <p className="mt-4 text-[10.5px] leading-relaxed text-white/45">
          Vivere Comércio de Alimentos · CNPJ {BUSINESS_CNPJ}
          <br />
          {BUSINESS_ADDRESS}
        </p>
      </footer>
    </>
  )
}
