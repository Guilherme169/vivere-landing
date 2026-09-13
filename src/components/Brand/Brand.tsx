import { FileText, Microwave, Snowflake, Tags } from 'lucide-react'
import { SectionTitle } from '@/components/ui/Badge'
import { BrandImage } from '@/components/ui/BrandImage'
import { BRAND_PHOTOS } from '@/lib/brand'

/**
 * Embalagem e conservação numa seção só. Antes eram duas — "do congelador pro
 * prato em 5 minutos" e "feita pra durar seis meses" — dizendo a mesma coisa
 * com uma seção inteira de distância entre elas.
 */
const POINTS = [
  {
    icon: Microwave,
    title: 'Pronto em 5 minutos',
    text: 'Do congelador direto ao micro-ondas, na própria embalagem. Sem descongelar antes, sem louça suja depois.',
  },
  {
    icon: Snowflake,
    title: '180 dias no congelador',
    text: 'Ultracongeladas logo depois do preparo. É o choque de frio que trava textura e sabor — não é conservante.',
  },
  {
    icon: FileText,
    title: 'Tabela nutricional impressa na caixa',
    text: 'Calorias, proteínas, ingredientes e alergênicos onde você precisa: na embalagem, não num link.',
  },
  {
    icon: Tags,
    title: 'Linhas Dia a Dia e Pasta',
    text: 'Cada caixa diz o que é e quanto pesa, pra você montar a semana sem abrir nada.',
  },
]

export function Brand() {
  return (
    <section id="marca" className="scroll-mt-4 bg-cream py-14 sm:py-20 lg:scroll-mt-20">
      <div className="shell grid gap-9 lg:grid-cols-[.88fr_1.12fr] lg:items-center lg:gap-16">
        <div className="flex flex-col gap-6">
          <SectionTitle
            eyebrow="Embalagem e preparo"
            tone="gold"
            title={
              <>
                Feita pra durar seis meses e{' '}
                <em className="text-orange-dark">parecer feita hoje</em>
              </>
            }
            description="A embalagem da Vivere não é só transporte: é o que garante que a marmita chegue no seu freezer do mesmo jeito que saiu da nossa cozinha — e que o preparo caiba em cinco minutos de um dia corrido."
          />

          <ul className="flex flex-col gap-4">
            {POINTS.map((point) => {
              const Icon = point.icon
              return (
                <li key={point.title} className="flex gap-3.5">
                  <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-xl border border-gold/30 bg-gold/[.08]">
                    <Icon size={16} className="text-[#8a6a24]" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-[14px] font-bold leading-tight">{point.title}</h3>
                    <p className="mt-1 max-w-prose text-[12.5px] leading-relaxed text-neutral">
                      {point.text}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <ul className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
          {BRAND_PHOTOS.map((photo) => (
            <li key={photo.file} className="overflow-hidden rounded-[20px] bg-sand">
              <BrandImage
                file={photo.file}
                alt={photo.alt}
                width={1000}
                height={1250}
                sizes="(min-width: 1024px) 320px, 45vw"
                className="aspect-[4/5] h-full w-full object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
