export interface DeliveryCity {
  city: string
  days: string
  period: string
  /** Cidade-sede: produção e retirada no local. */
  isBase?: boolean
}

/** Cidades com dia fixo de entrega. Atualizado em 13/09/2026. */
export const DELIVERY_CITIES: DeliveryCity[] = [
  { city: 'Santo Antônio da Patrulha', days: 'Segunda a sexta', period: 'a combinar', isBase: true },
  { city: 'Osório', days: 'Terças e sextas', period: 'pela manhã' },
  { city: 'Glorinha', days: 'Quartas', period: 'pela manhã' },
  { city: 'Capão da Canoa', days: 'Sextas', period: 'pela manhã' },
  { city: 'Xangri-Lá', days: 'Sextas', period: 'pela manhã' },
]

/**
 * Cidades atendidas sem dia fixo: o cliente faz o pedido normalmente e a data
 * é combinada com o atendimento no WhatsApp logo depois.
 */
export const DELIVERY_ON_REQUEST = ['Tramandaí', 'Imbé', 'Caraá'] as const

/** Todas as cidades atendidas, para SEO e para o rodapé. */
export const ALL_DELIVERY_CITIES = [
  ...DELIVERY_CITIES.map((city) => city.city),
  ...DELIVERY_ON_REQUEST,
]

export const FREIGHT = {
  price: 9,
  freeFrom: 100,
} as const
