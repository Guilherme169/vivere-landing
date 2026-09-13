/**
 * Ativos oficiais da marca, servidos de /public/images/brand.
 * O wordmark vem em duas versões: branca para fundo verde-escuro e verde
 * para fundo claro. Nunca recolorir por CSS — usar o arquivo certo.
 */
export const WORDMARK_WHITE = '/images/brand/vivere-wordmark-white.png'
export const WORDMARK_FOREST = '/images/brand/vivere-wordmark-forest.png'
export const WORDMARK_ALT = 'Vivere — alimentação que acompanha o seu ritmo'

export interface BrandPhoto {
  file: string
  alt: string
  tall?: boolean
}

export const BRAND_PHOTOS: BrandPhoto[] = [
  {
    file: 'embalagens-empilhadas',
    alt: 'Caixas de marmita Vivere empilhadas, com as linhas Dia a Dia e Pasta.',
    tall: true,
  },
  {
    file: 'embalagens-linha',
    alt: 'Três embalagens Vivere lado a lado, mostrando o prato pela janela da caixa.',
  },
  {
    file: 'embalagem-lasanha',
    alt: 'Embalagem da Lasanha Bolonhesa Vivere, com a tabela nutricional impressa na caixa.',
  },
  {
    file: 'rotina-marmita',
    alt: 'Cliente comendo uma marmita Vivere direto da embalagem.',
  },
]

export function brandImage(file: string, ext: 'webp' | 'jpg' = 'webp'): string {
  return `/images/brand/${file}.${ext}`
}
