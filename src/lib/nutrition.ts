/**
 * Macros por marmita, copiados das tabelas impressas na caixa e publicadas em
 * /nutricional. Só existem para os pratos que já passaram por análise
 * laboratorial — os outros ficam de fora, e o card não mostra nada.
 *
 * É a informação que nenhum concorrente regional publica: a maioria fala em
 * "balanceado" e para por aí. Por isso ela sai da página escondida e passa a
 * aparecer no card do prato.
 *
 * Valores por porção inteira (a marmita), não por 100 g.
 */
export interface Macros {
  kcal: number
  /** Proteínas em gramas. */
  protein: number
  carbs: number
  fat: number
}

export const NUTRITION: Record<string, Macros> = {
  'lasanha-bolonhesa': { kcal: 836, protein: 49, carbs: 130, fat: 14 },
  'carne-desfiada-integral': { kcal: 459, protein: 30, carbs: 44, fat: 17 },
  'massa-carne-desfiada': { kcal: 564, protein: 44, carbs: 60, fat: 16 },
  'carne-desfiada-pure-moranga': { kcal: 385, protein: 33, carbs: 41, fat: 10 },
  'carne-moida': { kcal: 315, protein: 14, carbs: 33, fat: 14 },
  escondidinho: { kcal: 444, protein: 41, carbs: 32, fat: 16 },
  'frango-creme-milho': { kcal: 348, protein: 28, carbs: 30, fat: 12 },
  'risoto-carne-panela': { kcal: 722, protein: 52, carbs: 56, fat: 33 },
  'frango-cremoso': { kcal: 363, protein: 30, carbs: 36, fat: 12 },
}

export function macros(mealId: string): Macros | undefined {
  return NUTRITION[mealId]
}

/** A partir de quantos gramas um prato entra no filtro "mais proteína". */
export const HIGH_PROTEIN = 30

export function isHighProtein(mealId: string): boolean {
  const m = NUTRITION[mealId]
  return Boolean(m && m.protein >= HIGH_PROTEIN)
}

/** Quantos pratos já têm tabela publicada — usado no texto da seção. */
export const NUTRITION_COUNT = Object.keys(NUTRITION).length
