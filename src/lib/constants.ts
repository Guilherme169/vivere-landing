/**
 * Fonte única de verdade de contatos, links e regras comerciais.
 * Qualquer mudança de preço, horário ou entrega começa aqui.
 */

/** Domínio público da landing (Vercel). Usado em canonical, og:url e JSON-LD. */
export const SITE_URL = 'https://vivere-landing-alpha.vercel.app'

export const WHATSAPP_NUMBER = '5551980889884'
export const WHATSAPP_PHONE_HUMAN = '(51) 98088-9884'
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`

export function whatsappLink(message: string): string {
  return `${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`
}

export const WHATSAPP_DIET_LINK = whatsappLink(
  'Olá! Tenho uma dieta específica e quero montar minhas marmitas personalizadas.',
)

/**
 * Nenhum botão abre uma conversa em branco: a mensagem já diz de onde a
 * pessoa veio, o atendimento responde direto ao ponto e a gente enxerga
 * qual parte do site gera conversa.
 */
export const WHATSAPP_HELLO_LINK = whatsappLink(
  'Oi! Estou no site da Vivere e queria falar com o atendimento.',
)

export const WHATSAPP_FAQ_LINK = whatsappLink(
  'Oi! Li as perguntas frequentes no site da Vivere e fiquei com uma dúvida:',
)

export const CARDAPIO_LINK = 'https://app.cardapioweb.com/vivere_comercio_de_alimentos?s=cb'

export const INSTAGRAM_HANDLE = '@viverealimentos'
export const INSTAGRAM_LINK = 'https://instagram.com/viverealimentos'

export const BUSINESS_NAME = 'Vivere Comércio de Alimentos'
export const BUSINESS_STREET = 'R. Sezefredo da Costa Tôrres, 373'
export const BUSINESS_CITY = 'Santo Antônio da Patrulha'
export const BUSINESS_STATE = 'RS'
export const BUSINESS_ADDRESS = `${BUSINESS_STREET}, Centro, ${BUSINESS_CITY}/${BUSINESS_STATE}`
export const BUSINESS_CNPJ = '66.705.927/0001-35'

/** Pixel já em uso na página de criadores — mesma conta de anúncios. */
export const META_PIXEL_ID = '1503053695196978'

export const HOURS = {
  /** O cardápio online nunca fecha: o pedido entra a qualquer hora e a entrega é agendada. */
  cardapio: 'Pedidos 24 horas por dia, todos os dias. A entrega você agenda na hora da compra.',
  human: 'Segunda a sexta, das 9h às 13h. Fora desse horário, retornamos no próximo dia útil.',
  bot: 'Disponível 24 horas, todos os dias, pra tirar dúvidas a qualquer momento.',
  store: 'Retirada em Santo Antônio da Patrulha, apenas com agendamento prévio.',
} as const

/** Benefícios aplicados sozinhos no carrinho, sem cupom. */
export const AUTOMATIC_BENEFITS = [
  { value: 'Frete grátis', label: 'em pedidos acima de R$ 100' },
  { value: '5% de desconto', label: 'acima de R$ 200' },
  { value: '10% de desconto', label: 'acima de R$ 300' },
] as const
