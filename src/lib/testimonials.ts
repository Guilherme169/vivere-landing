import type { Testimonial } from '@/types'

import lucasFigueiredo from '@/assets/images/testimonials/lucas-figueiredo.png'
import brunaBraun from '@/assets/images/testimonials/bruna-braun.png'
import chiaraMarques from '@/assets/images/testimonials/chiara-marques.png'
import augustoEbert from '@/assets/images/testimonials/augusto-ebert.png'
import julianoPortal from '@/assets/images/testimonials/juliano-portal.png'

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Lucas Figueiredo',
    photo: lucasFigueiredo,
    stars: 5,
    text: 'Sou nutricionista e utilizo a Vivere quase todos os dias. Com as marmitas, consigo manter o padrão de qualidade da alimentação, com as quantidades ideais para os meus objetivos.',
  },
  {
    name: 'Bruna Braun Cardeal',
    photo: brunaBraun,
    stars: 5,
    text: 'Sem dúvidas as melhores marmitas da vida! Praticidade para o dia a dia, facilita a alimentação saudável, além do sabor caseiro que parece que acabaram de ser preparadas.',
  },
  {
    name: 'Chiara Vitoria Marques',
    photo: chiaraMarques,
    stars: 5,
    text: 'Além de um cardápio delicioso, a Vivere ainda oferece a possibilidade de montar a marmita de acordo com a minha dieta, o que faz toda a diferença na rotina.',
  },
  {
    name: 'Augusto Ebert',
    photo: augustoEbert,
    stars: 5,
    text: 'Consumo dos produtos da Vivere há alguns meses e só tenho elogios. Agilidade, personalização, atendimento e principalmente qualidade da comida.',
  },
  {
    name: 'Juliano Portal',
    photo: julianoPortal,
    stars: 5,
    text: 'Experiência memorável! Melhor marmitaria da região. Aprovadíssimos.',
  },
]
