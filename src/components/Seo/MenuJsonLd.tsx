import { useEffect } from 'react'
import { COMBOS, unitPrice } from '@/lib/combos'
import { CARDAPIO_LINK, SITE_URL } from '@/lib/constants'
import { CATEGORY_LABELS, MEALS } from '@/lib/meals'
import type { MealCategory } from '@/types'

const CATEGORY_ORDER: MealCategory[] = ['carnes', 'frango', 'massas', 'lowcarb']

function buildMenu() {
  const sections = CATEGORY_ORDER.map((category) => ({
    '@type': 'MenuSection',
    name: CATEGORY_LABELS[category],
    hasMenuItem: MEALS.filter((meal) => meal.category === category).map((meal) => ({
      '@type': 'MenuItem',
      name: `${meal.name} (${meal.weight})`,
      description: meal.description,
      image: `${SITE_URL}/images/menu/${meal.image ?? ''}.jpg`,
      offers: {
        '@type': 'Offer',
        price: meal.price.toFixed(2),
        priceCurrency: 'BRL',
        availability: meal.soldOut
          ? 'https://schema.org/OutOfStock'
          : 'https://schema.org/InStock',
        url: CARDAPIO_LINK,
      },
    })),
  })).filter((section) => section.hasMenuItem.length > 0)

  sections.push({
    '@type': 'MenuSection',
    name: 'Combos',
    hasMenuItem: COMBOS.map((combo) => ({
      '@type': 'MenuItem',
      name: `${combo.title} — ${combo.units} marmitas`,
      description: `${combo.subtitle}. A partir de R$ ${unitPrice(combo)
        .toFixed(2)
        .replace('.', ',')} por marmita, com entrega grátis.`,
      image: `${SITE_URL}/og-image.jpg`,
      offers: {
        '@type': 'Offer',
        price: combo.price.toFixed(2),
        priceCurrency: 'BRL',
        availability: 'https://schema.org/InStock',
        url: CARDAPIO_LINK,
      },
    })),
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${SITE_URL}/#menu`,
    name: 'Cardápio Vivere',
    url: CARDAPIO_LINK,
    inLanguage: 'pt-BR',
    hasMenuSection: sections,
  }
}

/**
 * Publica o cardápio como dados estruturados. Fica num componente em vez de
 * ficar fixo no index.html para não dessincronizar: a fonte é sempre
 * `meals.ts` e `combos.ts`.
 */
export function MenuJsonLd() {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.source = 'menu'
    script.textContent = JSON.stringify(buildMenu())
    document.head.appendChild(script)
    return () => {
      script.remove()
    }
  }, [])

  return null
}
