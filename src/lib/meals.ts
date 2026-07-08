import type { DishPhoto } from '@/types'

import tradicionalBrasileiro from '@/assets/images/dishes/tradicional-brasileiro.jpg'
import frangoCaseiro from '@/assets/images/dishes/frango-caseiro.jpg'
import bolonhesaDaCasa from '@/assets/images/dishes/bolonhesa-da-casa.jpg'
import escondidinho from '@/assets/images/dishes/escondidinho.jpg'
import penneQueijoBacon from '@/assets/images/dishes/penne-queijo-bacon.jpg'
import sobrecoxaMassaLegumes from '@/assets/images/dishes/sobrecoxa-massa-legumes.jpg'
import feijoadaCompleta from '@/assets/images/dishes/feijoada-completa.jpg'

/**
 * Prices below were confirmed directly against the live cardápio online
 * (app.cardapioweb.com/vivere_comercio_de_alimentos) on 2026-07-08.
 * Dishes without a confirmed match in the current menu intentionally
 * omit `price` — never guess a value that could mislead a customer.
 */
export const DISHES: DishPhoto[] = [
  {
    id: 'tradicional-brasileiro',
    name: 'Tradicional Brasileiro',
    image: tradicionalBrasileiro,
    price: 17.7,
    weight: '400g',
    description: 'Carne moída refogada, arroz soltinho e feijão preto temperado na hora.',
    isNew: true,
  },
  {
    id: 'frango-caseiro',
    name: 'Frango Caseiro',
    image: frangoCaseiro,
    price: 15.49,
    weight: '400g',
    description: 'Sobrecoxa assada, douradinha por fora e suculenta por dentro, com polenta cremosa.',
    isNew: true,
  },
  {
    id: 'bolonhesa-da-casa',
    name: 'Bolonhesa da Casa',
    image: bolonhesaDaCasa,
    price: 17.9,
    weight: '400g',
    description: 'Massa caseira ao molho bolonhesa de carne moída com legumes refogados.',
    isNew: true,
  },
  {
    id: 'escondidinho',
    name: 'Escondidinho',
    image: escondidinho,
    price: 24.49,
    weight: '370g',
    description: 'Carne desfiada, queijo gratinado e purê cremoso de batata inglesa.',
  },
  {
    id: 'penne-queijo-bacon',
    name: 'Penne com Molho de Queijo e Bacon',
    image: penneQueijoBacon,
    price: 23.9,
    weight: '350g',
    description: 'Massa cremosa, sabor marcante — a favorita de quem treina pesado.',
  },
  {
    id: 'sobrecoxa-massa-legumes',
    name: 'Sobrecoxa com Massa e Legumes',
    image: sobrecoxaMassaLegumes,
    description: 'Sobrecoxa suculenta com massa e legumes frescos.',
  },
  {
    id: 'feijoada-completa',
    name: 'Feijoada Completa',
    image: feijoadaCompleta,
    description: 'A feijoada raiz, completa e temperada como a de casa.',
  },
]

export const FEATURED_DISHES = DISHES.filter((d) => d.isNew)
