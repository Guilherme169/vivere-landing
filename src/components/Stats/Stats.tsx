import { Clock, Snowflake, Store } from 'lucide-react'
import { SectionTitle } from '@/components/ui/Badge'

const FACTS = [
  {
    icon: Clock,
    title: 'Pronto em 5 minutos',
    description: 'Direto do congelador para o micro-ondas, na própria embalagem.',
  },
  {
    icon: Snowflake,
    title: 'Ultracongeladas',
    description: 'Até 180 dias de validade sem conservante e sem perder textura.',
  },
  {
    icon: Store,
    title: 'Pedido a qualquer hora',
    description: 'O cardápio online não fecha. A entrega você agenda na compra.',
  },
]

export function Stats() {
  return (
    <section className="bg-cream py-14 sm:py-20">
      <div className="shell grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:gap-14">
        <SectionTitle
          eyebrow="Como funciona"
          title={
            <>
              Do congelador pro prato em <em className="text-orange-dark">cinco minutos</em>
            </>
          }
        />

        <ul className="grid gap-3 sm:grid-cols-3">
          {FACTS.map((fact) => {
            const Icon = fact.icon
            return (
              <li
                key={fact.title}
                className="flex flex-col gap-3 rounded-2xl border border-black/[.06] bg-white p-5 shadow-card"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green/10">
                  <Icon size={18} className="text-green-forest" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-[14px] font-bold leading-tight">{fact.title}</h3>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-neutral">
                    {fact.description}
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
