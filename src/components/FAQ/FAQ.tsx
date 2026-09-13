import { Plus } from 'lucide-react'
import { SectionTitle } from '@/components/ui/Badge'
import { WhatsAppLink } from '@/components/ui/OrderLink'
import { FAQ_ITEMS } from '@/lib/faq'
import { WHATSAPP_FAQ_LINK } from '@/lib/constants'

/**
 * `<details>` nativo: abre por teclado, é lido por leitor de tela e continua
 * funcionando se o JavaScript falhar.
 */
export function FAQ() {
  return (
    <section id="duvidas" className="scroll-mt-4 lg:scroll-mt-20 bg-white py-14 sm:py-20">
      <div className="shell grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-14">
        <div className="flex flex-col gap-5">
          <SectionTitle
            eyebrow="Dúvidas"
            title={
              <>
                Perguntas que <em className="text-orange-dark">todo mundo faz</em>
              </>
            }
          />
          <WhatsAppLink
            source="faq"
            href={WHATSAPP_FAQ_LINK}
            className="inline-flex w-fit items-center justify-center rounded-full border border-green-forest/25 px-5 py-3 text-[13.5px] font-semibold text-green-forest transition-colors hover:bg-green-forest/5"
          >
            Ficou outra dúvida? Chame no WhatsApp
          </WhatsAppLink>
        </div>

        <ul className="flex flex-col">
          {FAQ_ITEMS.map((item) => (
            <li key={item.question} className="border-b border-black/[.07] first:border-t">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center gap-4 py-4 [&::-webkit-details-marker]:hidden">
                  <span className="flex-1 text-[14.5px] font-semibold leading-snug">
                    {item.question}
                  </span>
                  <Plus
                    size={17}
                    aria-hidden="true"
                    className="flex-none text-neutral transition-transform duration-200 group-open:rotate-45 group-open:text-green-dark"
                  />
                </summary>
                <p className="max-w-prose pb-5 text-[13.5px] leading-relaxed text-neutral">
                  {item.answer}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
