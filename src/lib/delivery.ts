// Import relativo de propósito: este arquivo também é lido pelo vite.config,
// que não resolve o alias '@'.
import { CITIES, type City } from './cities'

export type DeliveryCity = City

/** Cidades com dia fixo de entrega. */
export const DELIVERY_CITIES: DeliveryCity[] = CITIES.filter((city) => !city.onRequest)

/**
 * Cidades atendidas sem dia fixo: o cliente faz o pedido normalmente e a data
 * é combinada com o atendimento no WhatsApp logo depois.
 */
export const DELIVERY_ON_REQUEST = CITIES.filter((city) => city.onRequest).map(
  (city) => city.name,
)

/** Todas as cidades atendidas, para SEO e para o rodapé. */
export const ALL_DELIVERY_CITIES = CITIES.map((city) => city.name)

export const FREIGHT = {
  price: 9,
  freeFrom: 100,
} as const
