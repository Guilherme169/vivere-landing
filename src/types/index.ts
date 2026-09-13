export type MealCategory = 'carnes' | 'frango' | 'massas' | 'lowcarb'

export type MealTag = 'novidade' | 'mais-pedido' | 'oferta' | 'recomendado'

export interface Meal {
  id: string
  /** Id do produto no cardápio online — abre a ficha direto. */
  productId: string
  name: string
  /** Nome curto para o card, quando o do cardápio é longo demais. */
  cardName?: string
  weight: string
  /** Preço avulso em BRL, conferido no cardápio online. */
  price: number
  category: MealCategory
  /** Base do arquivo em /public/images/menu (sem extensão). Ausente = ainda sem foto. */
  image?: string
  description: string
  tag?: MealTag
  soldOut?: boolean
  /** Tem tabela nutricional publicada em /nutricional.html. */
  hasNutrition?: boolean
}

export interface Combo {
  id: string
  /** Id do produto no cardápio online — abre o combo já com o seletor de sabores. */
  productId: string
  units: number
  title: string
  subtitle: string
  /** Preço total do combo no cardápio. */
  price: number
  /** Mesmo número de marmitas comprado avulso, na linha de R$ 19,97. */
  reference: number
  highlight?: boolean
  tag?: string
}

export interface Testimonial {
  name: string
  photo: string
  text: string
  stars: number
}

export interface FaqItem {
  question: string
  answer: string
}
