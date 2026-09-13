import type { Meal, MealCategory } from '@/types'

/**
 * Cardápio completo conferido em app.cardapioweb.com/vivere_comercio_de_alimentos
 * em 13/09/2026. Preço e gramatura saem daqui — não repita valor dentro de componente.
 *
 * `image` aponta para /public/images/menu/<image>.webp (com .jpg de fallback).
 */
export const MEALS: Meal[] = [
  // ── Linha R$ 19,97 ────────────────────────────────────────────────
  {
    id: 'frango-caseiro',
    productId: '4578834',
    name: 'Frango Caseiro',
    weight: '400g',
    price: 19.97,
    category: 'frango',
    image: 'frango-caseiro',
    description: 'Sobrecoxa assada, douradinha por fora e suculenta por dentro.',
    tag: 'novidade',
  },
  {
    id: 'tradicional-brasileiro',
    productId: '4578836',
    name: 'Tradicional Brasileiro',
    weight: '400g',
    price: 19.97,
    category: 'carnes',
    image: 'tradicional-brasileiro',
    description: 'Arroz soltinho, carne moída com legumes e feijão preto temperado na hora.',
    tag: 'novidade',
  },
  {
    id: 'bolonhesa-da-casa',
    productId: '4578838',
    name: 'Bolonhesa da Casa',
    weight: '400g',
    price: 19.97,
    category: 'massas',
    image: 'bolonhesa-da-casa',
    description: 'Massa caseira ao molho bolonhesa de carne moída com legumes refogados.',
    tag: 'oferta',
  },
  {
    id: 'sobrecoxa-massa-legumes',
    productId: '4579221',
    name: 'Sobrecoxa com Massa e Legumes',
    cardName: 'Sobrecoxa com Massa',
    weight: '370g',
    price: 19.97,
    category: 'frango',
    image: 'sobrecoxa-massa-legumes',
    description: 'Sobrecoxa desossada, espaguete ao molho artesanal e legumes frescos.',
    tag: 'novidade',
  },
  {
    id: 'feijoada-completa',
    productId: '4579234',
    name: 'Feijoada Completa',
    weight: '400g',
    price: 19.97,
    category: 'carnes',
    image: 'feijoada-completa',
    description: 'Feijão preto com calabresa e bacon, arroz, farofa crocante e couve.',
  },
  {
    id: 'frango-low-carb',
    productId: '5088031',
    name: 'Frango em Cubos com Seleta (Low Carb)',
    cardName: 'Frango em Cubos Low Carb',
    weight: '300g',
    price: 19.97,
    category: 'lowcarb',
    image: 'frango-low-carb',
    description: 'Cubos grelhados e seleta de legumes. Leve, proteico, sem carboidrato pesado.',
  },
  {
    id: 'suino-barbecue',
    productId: '4584053',
    name: 'Suíno Barbecue com Aipim',
    weight: '400g',
    price: 19.97,
    category: 'carnes',
    image: 'suino-barbecue',
    description: 'Filé suíno ao molho barbecue com aipim rústico e legumes.',
    tag: 'novidade',
    soldOut: true,
  },

  // ── Linha R$ 22,49 ────────────────────────────────────────────────
  {
    id: 'penne-queijo-bacon',
    productId: '4578813',
    name: 'Penne ao Molho de Queijo com Bacon',
    cardName: 'Penne com Queijo e Bacon',
    weight: '350g',
    price: 22.49,
    category: 'massas',
    image: 'penne-queijo-bacon',
    description: 'Massa cremosa e sabor marcante. A favorita de quem treina pesado.',
  },
  {
    id: 'carne-moida',
    productId: '4578786',
    name: 'Carne Moída com Arroz de Cenoura',
    cardName: 'Carne Moída',
    weight: '300g',
    price: 22.49,
    category: 'carnes',
    image: 'carne-moida',
    description: 'Patinho moído, arroz de cenoura e mix de legumes. Leve e nutritivo.',
    hasNutrition: true,
  },
  {
    id: 'frango-cremoso',
    productId: '4578805',
    name: 'Frango Cremoso com Arroz Integral',
    cardName: 'Frango Cremoso',
    weight: '370g',
    price: 22.49,
    category: 'frango',
    image: 'frango-cremoso',
    description: 'Frango ao molho cremoso, arroz integral e legumes. Não pesa.',
    tag: 'recomendado',
    hasNutrition: true,
  },
  {
    id: 'frango-creme-milho',
    productId: '4578793',
    name: 'Frango em Cubos com Creme de Milho',
    cardName: 'Frango com Creme de Milho',
    weight: '300g',
    price: 22.49,
    category: 'frango',
    image: 'frango-creme-milho',
    description: 'Proteína magra com toque cremoso de milho e arroz integral.',
    hasNutrition: true,
  },

  // ── Linha R$ 24,97 ────────────────────────────────────────────────
  {
    id: 'massa-carne-desfiada',
    productId: '4578768',
    name: 'Massa com Carne Desfiada',
    weight: '400g',
    price: 24.97,
    category: 'massas',
    image: 'massa-carne-desfiada',
    description: 'Patinho desfiado bem temperado com massa farta. Resolve fome de verdade.',
    tag: 'mais-pedido',
    hasNutrition: true,
  },
  {
    id: 'risoto-carne-panela',
    productId: '4578798',
    name: 'Risoto de Carne de Panela',
    weight: '370g',
    price: 24.97,
    category: 'carnes',
    image: 'risoto-carne-panela',
    description: 'Risoto cremoso com carne de panela desfiada, derretendo na boca.',
    hasNutrition: true,
  },
  {
    id: 'carne-desfiada-integral',
    productId: '4578799',
    name: 'Carne Desfiada com Arroz Integral e Feijão',
    cardName: 'Carne Desfiada Integral',
    weight: '370g',
    price: 24.97,
    category: 'carnes',
    description: 'Carne desfiada suculenta, feijão preto, arroz integral e legumes.',
    tag: 'oferta',
    hasNutrition: true,
  },
  {
    id: 'carne-desfiada-pure-moranga',
    productId: '4578788',
    name: 'Carne Desfiada com Purê de Moranga',
    cardName: 'Carne Desfiada c/ Moranga',
    weight: '370g',
    price: 24.97,
    category: 'carnes',
    image: 'carne-desfiada-pure-moranga',
    description: 'Combinação gaúcha de carne desfiada e purê de moranga. Sabor de casa de vó.',
    tag: 'mais-pedido',
    hasNutrition: true,
  },

  // ── Linha R$ 25,97 ────────────────────────────────────────────────
  {
    id: 'escondidinho',
    productId: '4578791',
    name: 'Escondidinho de Carne',
    weight: '370g',
    price: 25.97,
    category: 'carnes',
    image: 'escondidinho',
    description: 'Carne desfiada, queijo gratinado e purê cremoso de batata inglesa.',
    hasNutrition: true,
  },
  {
    id: 'lasanha-bolonhesa',
    productId: '4578816',
    name: 'Lasanha Bolonhesa',
    weight: '350g',
    price: 25.97,
    category: 'massas',
    image: 'lasanha-bolonhesa',
    description: 'Camadas de massa, molho bolonhesa encorpado e muçarela derretida.',
    hasNutrition: true,
  },
]

export const CATEGORY_LABELS: Record<MealCategory, string> = {
  carnes: 'Carnes',
  frango: 'Frango',
  massas: 'Massas',
  lowcarb: 'Low carb',
}

export const TAG_LABELS: Record<NonNullable<Meal['tag']>, string> = {
  novidade: 'Novidade',
  'mais-pedido': 'Mais pedido',
  oferta: 'Oferta',
  recomendado: 'Recomendado',
}

/** Menor preço avulso do cardápio — âncora usada no hero e nos combos. */
export const CHEAPEST_MEAL_PRICE = Math.min(...MEALS.map((m) => m.price))

/** Pratos com foto, para o carrossel do hero e a prévia do Instagram. */
export const MEALS_WITH_PHOTO = MEALS.filter((m) => m.image && !m.soldOut)

export function mealImage(meal: Meal, ext: 'webp' | 'jpg' = 'webp'): string | undefined {
  return meal.image ? `/images/menu/${meal.image}.${ext}` : undefined
}

export function formatBRL(value: number): string {
  return value.toFixed(2).replace('.', ',')
}
