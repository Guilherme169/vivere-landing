import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

import { CITIES } from './src/lib/cities'
import { MEALS } from './src/lib/meals'
import { COMBOS, UNIT_PRICE_NOTE_SHORT } from './src/lib/combos'
import {
  BUSINESS_ADDRESS,
  BUSINESS_CNPJ,
  CARDAPIO_LINK,
  INSTAGRAM_LINK,
  GOOGLE_PROFILE_LINK,
  SITE_URL,
  WHATSAPP_LINK,
  WHATSAPP_PHONE_HUMAN,
} from './src/lib/constants'
import { FREIGHT } from './src/lib/delivery'
import { CITY_CSS, renderCityPage } from './scripts/city-page'

/**
 * Gera uma página estática por cidade em /<slug>, além do sitemap.
 *
 * São HTML puro, sem React e sem JavaScript de aplicação: quem chega por busca
 * local quer a resposta na primeira tela, e o conteúdo vem dos mesmos arquivos
 * de dados da landing (`cities.ts`, `meals.ts`, `combos.ts`), então preço e dia
 * de entrega nunca divergem entre a home e a página da cidade.
 */
function paginasDeCidade(): Plugin {
  return {
    name: 'vivere-paginas-de-cidade',
    apply: 'build',
    closeBundle() {
      const out = resolve(__dirname, 'dist')
      const dados = {
        cities: CITIES,
        meals: MEALS,
        combos: COMBOS,
        siteUrl: SITE_URL,
        cardapioLink: CARDAPIO_LINK,
        whatsappLink: WHATSAPP_LINK,
        googleProfileLink: GOOGLE_PROFILE_LINK,
        instagramLink: INSTAGRAM_LINK,
        businessAddress: BUSINESS_ADDRESS,
        businessCnpj: BUSINESS_CNPJ,
        phoneHuman: WHATSAPP_PHONE_HUMAN,
        freight: { price: FREIGHT.price, freeFrom: FREIGHT.freeFrom },
        unitPriceNoteShort: UNIT_PRICE_NOTE_SHORT,
      }

      writeFileSync(resolve(out, 'cidades.css'), CITY_CSS, 'utf-8')

      for (const city of CITIES) {
        const dir = resolve(out, city.slug)
        mkdirSync(dir, { recursive: true })
        writeFileSync(resolve(dir, 'index.html'), renderCityPage(city, dados), 'utf-8')
      }

      const hoje = new Date().toISOString().slice(0, 10)
      const urls = [
        { loc: `${SITE_URL}/`, prio: '1.0', freq: 'weekly' },
        ...CITIES.map((c) => ({ loc: `${SITE_URL}/${c.slug}`, prio: '0.8', freq: 'weekly' })),
        { loc: `${SITE_URL}/nutricional`, prio: '0.7', freq: 'monthly' },
        { loc: `${SITE_URL}/criadores-osorio`, prio: '0.4', freq: 'monthly' },
      ]
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${hoje}</lastmod>\n    <changefreq>${u.freq}</changefreq>\n    <priority>${u.prio}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`
      writeFileSync(resolve(out, 'sitemap.xml'), sitemap, 'utf-8')

      // eslint-disable-next-line no-console
      console.log(`\n  ✓ ${CITIES.length} páginas de cidade + sitemap gerados\n`)
    },
  }
}

export default defineConfig({
  plugins: [react(), paginasDeCidade()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    target: 'es2020',
    sourcemap: false,
  },
})
