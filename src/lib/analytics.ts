import { CARDAPIO_LINK } from '@/lib/constants'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

/**
 * Monta o link do cardápio carimbando de qual seção da landing veio o clique.
 * Sem isso não dá pra saber qual bloco converte — todos os CTAs apontam pro
 * mesmo destino.
 */
export function cardapioUrl(source: string, productId?: string): string {
  const url = new URL(CARDAPIO_LINK)
  url.searchParams.set('utm_source', 'landing')
  url.searchParams.set('utm_medium', 'link-bio')
  url.searchParams.set('utm_campaign', 'vivere-landing')
  url.searchParams.set('utm_content', source)

  // Com o id do produto, o cardápio abre direto na ficha — no caso dos combos,
  // já com o seletor de sabores aberto. Sem ele, cai na home do cardápio.
  if (productId) {
    url.searchParams.set('id', productId)
    url.hash = 'produto'
  }

  return url.toString()
}

export function trackOrderIntent(source: string): void {
  window.fbq?.('trackCustom', 'CliqueCardapio', { source })
  window.fbq?.('track', 'InitiateCheckout', { content_category: source })
}

export function trackWhatsApp(source: string): void {
  window.fbq?.('trackCustom', 'CliqueWhatsApp', { source })
  window.fbq?.('track', 'Contact', { content_category: source })
}

export function trackComboIntent(comboId: string, value: number): void {
  window.fbq?.('trackCustom', 'CliqueCombo', { combo: comboId, value, currency: 'BRL' })
}

export function trackGoogleProfile(source: string): void {
  window.fbq?.('trackCustom', 'CliqueGoogle', { source })
}
