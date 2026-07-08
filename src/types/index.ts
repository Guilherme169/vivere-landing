export interface DishPhoto {
  id: string
  name: string
  image: string
  /** Price in BRL, confirmed against the live cardápio. Omitted when the
   * dish has no exact current match — never fabricate a price. */
  price?: number
  weight?: string
  description: string
  isNew?: boolean
}

export interface Testimonial {
  name: string
  photo: string
  text: string
  stars: number
}

export interface Step {
  title: string
  description: string
}
