import type { Combo } from '@/types'

/**
 * Preço de referência: uma marmita da linha de entrada comprada avulsa.
 * Todo "você economiza" da página é calculado contra este número — um só,
 * para que os três combos sejam comparáveis entre si.
 */
export const BASE_UNIT_PRICE = 19.97

export const COMBOS: Combo[] = [
  {
    id: 'combo-10',
    productId: '5088077',
    units: 10,
    title: 'Combo 10',
    subtitle: 'Pra experimentar o cardápio inteiro',
    price: 189.71,
    reference: 199.7,
  },
  {
    id: 'combo-15',
    productId: '5088106',
    units: 15,
    title: 'Combo 15',
    subtitle: 'Duas semanas de almoço resolvidas',
    price: 259.0,
    reference: 299.55,
    highlight: true,
    tag: 'Mais pedido',
  },
  {
    id: 'combo-30',
    productId: '5088108',
    units: 30,
    title: 'Combo 30',
    subtitle: 'O mês inteiro, com o menor preço por marmita',
    price: 510.0,
    reference: 599.1,
    tag: 'Maior economia',
  },
]

/**
 * Todo "R$ X por marmita" da página é um piso, não um preço fechado: parte da
 * linha econômica e sobe conforme os sabores escolhidos. Por isso sempre vem
 * acompanhado de "a partir de" e do asterisco.
 */
export const UNIT_PRICE_NOTE =
  'O valor por marmita parte da linha econômica do cardápio (pratos de R$ 19,97). Escolhendo pratos das linhas de R$ 22,49, R$ 24,97 ou R$ 25,97, o valor por marmita do combo sobe proporcionalmente.'

/** Versão curta, para onde não cabe a frase inteira. */
export const UNIT_PRICE_NOTE_SHORT = 'parte da linha econômica do cardápio'

export function unitPrice(combo: Combo): number {
  return combo.price / combo.units
}

export function savings(combo: Combo): number {
  return combo.reference - combo.price
}

export function savingsPercent(combo: Combo): number {
  return Math.round((savings(combo) / combo.reference) * 100)
}

/** Menor preço por marmita entre todos os combos. */
export const BEST_UNIT_PRICE = Math.min(...COMBOS.map(unitPrice))
