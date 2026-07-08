import { Flame, Snowflake, Clock } from 'lucide-react'
import { Eyebrow } from '@/components/ui/Badge'

const FACTS = [
  {
    icon: Flame,
    title: 'Pronto em 5 minutos',
    description: 'Direto do congelador pro micro-ondas',
  },
  {
    icon: Snowflake,
    title: 'Ultracongeladas',
    description: 'Validade de até 180 dias, sem perder qualidade',
  },
  {
    icon: Clock,
    title: 'Cardápio aberto 24h',
    description: 'Peça a qualquer hora e agende a entrega',
  },
]

export function Stats() {
  return (
    <section className="px-5 py-8 sm:px-10">
      <Eyebrow>Como funciona</Eyebrow>
      <h2 className="text-[clamp(1.5rem,6vw,1.9rem)] font-extrabold leading-tight tracking-tight">
        Do congelador pro <em className="font-serif not-italic italic text-orange">prato</em> em 5 minutos
      </h2>

      <div className="mt-4 flex flex-col gap-2.5">
        {FACTS.map((fact) => {
          const Icon = fact.icon
          return (
            <div
              key={fact.title}
              className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-3.5"
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[11px] bg-green/10">
                <Icon size={17} className="text-green-dark" />
              </div>
              <p className="text-xs font-semibold leading-tight">
                {fact.title}
                <span className="mt-0.5 block text-[10.5px] font-normal text-neutral">
                  {fact.description}
                </span>
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
