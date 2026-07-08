export const WHATSAPP_NUMBER = '5551980889884'
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`
export const WHATSAPP_DIET_LINK = `${WHATSAPP_LINK}?text=${encodeURIComponent(
  'Olá! Tenho uma dieta específica e quero montar minhas marmitas personalizadas.',
)}`

export const CARDAPIO_LINK = 'https://app.cardapioweb.com/vivere_comercio_de_alimentos?s=cb'
export const INSTAGRAM_HANDLE = '@viverealimentos'
export const INSTAGRAM_LINK = 'https://instagram.com/viverealimentos'

export const BUSINESS_ADDRESS = 'R. Sezefredo da Costa Tôrres, 373, Centro, Santo Antônio da Patrulha/RS'
export const BUSINESS_CNPJ = '66.705.927/0001-35'

export const HOURS = {
  human: 'Segunda a sexta, das 9h às 13h. Fora desse horário, retornamos no próximo dia útil.',
  bot: 'Disponível 24 horas, todos os dias, pra tirar dúvidas a qualquer momento.',
  delivery: 'Segunda a sexta, das 8h às 16h, com agendamento pelo cardápio online.',
  store: 'Santo Antônio da Patrulha/RS — apenas com agendamento prévio.',
} as const

export const AUTOMATIC_BENEFITS = [
  { icon: '🚚', label: 'Frete grátis em pedidos acima de R$ 100' },
  { icon: '💰', label: '5% off + frete grátis acima de R$ 200' },
  { icon: '🎉', label: '10% off + frete grátis acima de R$ 300' },
] as const
