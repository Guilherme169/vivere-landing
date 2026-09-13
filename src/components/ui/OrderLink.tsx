import { type AnchorHTMLAttributes } from 'react'
import { cardapioUrl, trackComboIntent, trackOrderIntent, trackWhatsApp } from '@/lib/analytics'

interface OrderLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /** De qual bloco da página veio o clique — vira utm_content e parâmetro do evento. */
  source: string
  /** Id do produto no cardápio online. Abre a ficha direto, sem procurar na lista. */
  productId?: string
  /** Quando o clique é de um card de combo, registra também o valor. */
  combo?: { id: string; value: number }
}

/**
 * Único caminho da landing para o cardápio online. Centraliza o carimbo de
 * origem, o disparo do evento e o link direto para a ficha do produto, para
 * que nenhum CTA saia da página sem medição nem faça o cliente procurar.
 */
export function OrderLink({ source, productId, combo, onClick, ...props }: OrderLinkProps) {
  return (
    <a
      href={cardapioUrl(source, productId)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => {
        trackOrderIntent(source)
        if (combo) trackComboIntent(combo.id, combo.value)
        onClick?.(event)
      }}
      {...props}
    />
  )
}

interface WhatsAppLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  source: string
}

export function WhatsAppLink({ source, onClick, ...props }: WhatsAppLinkProps) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => {
        trackWhatsApp(source)
        onClick?.(event)
      }}
      {...props}
    />
  )
}
