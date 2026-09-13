import type { City } from '../src/lib/cities'
import type { Combo, Meal } from '../src/types'

interface Data {
  cities: City[]
  meals: Meal[]
  combos: Combo[]
  siteUrl: string
  cardapioLink: string
  whatsappLink: string
  instagramLink: string
  businessAddress: string
  businessCnpj: string
  phoneHuman: string
  freight: { price: number; freeFrom: number }
  unitPriceNoteShort: string
}

const brl = (v: number) => v.toFixed(2).replace('.', ',')
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function cardapioUrl(link: string, slug: string, productId?: string) {
  const url = new URL(link)
  url.searchParams.set('utm_source', 'landing')
  url.searchParams.set('utm_medium', 'pagina-cidade')
  url.searchParams.set('utm_campaign', 'vivere-landing')
  url.searchParams.set('utm_content', `cidade-${slug}`)
  if (productId) {
    url.searchParams.set('id', productId)
    url.hash = 'produto'
  }
  return url.toString()
}

function faqFor(city: City, d: Data) {
  const entrega = city.onRequest
    ? `Sim. A Vivere entrega ${city.inName}. Como essa cidade ainda não tem dia fixo na rota, você faz o pedido pelo cardápio online e a gente combina a data da entrega com você pelo WhatsApp logo depois.`
    : `Sim. A entrega ${city.inName} acontece ${city.days.toLowerCase()} ${city.period}. Você escolhe a data no momento da compra, dentro do cardápio online.`

  return [
    { q: `A Vivere entrega ${city.inName}?`, a: entrega },
    {
      q: `Quanto custa a entrega ${city.inName}?`,
      a: `R$ ${d.freight.price},00, o mesmo valor de todas as cidades atendidas. Acima de R$ ${d.freight.freeFrom} em produtos a entrega sai de graça — o cupom entra sozinho no carrinho, sem você precisar digitar nada.`,
    },
    {
      q: 'Quanto tempo as marmitas duram?',
      a: 'Até 180 dias no congelador. São ultracongeladas logo depois do preparo, o que trava textura e sabor sem precisar de conservante. Do congelador ao micro-ondas são 5 minutos, na própria embalagem.',
    },
    {
      q: 'Preciso comprar combo?',
      a: `Não. Dá pra comprar avulso, a partir de R$ ${brl(Math.min(...d.meals.map((m) => m.price)))}, com os descontos entrando sozinhos conforme o valor do pedido. O combo é o caminho de quem quer o menor preço por marmita e entrega grátis desde a primeira unidade.`,
    },
  ]
}

export function renderCityPage(city: City, d: Data): string {
  const url = `${d.siteUrl}/${city.slug}`
  const titulo = `Marmitas congeladas ${city.inName} | Vivere`
  const descricao = city.onRequest
    ? `Marmitas congeladas gourmet ${city.inName}, prontas em 5 minutos. Peça pelo cardápio online e combine a data da entrega no WhatsApp. Frete grátis acima de R$ ${d.freight.freeFrom}.`
    : `Marmitas congeladas gourmet ${city.inName}, prontas em 5 minutos. Entrega ${city.days.toLowerCase()} ${city.period}. Combos a partir de R$ ${brl(Math.min(...d.combos.map((c) => c.price / c.units)))} por marmita.`

  const faq = faqFor(city, d)
  const cheapest = Math.min(...d.combos.map((c) => c.price / c.units))
  const outras = d.cities.filter((c) => c.slug !== city.slug)

  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Restaurant',
        '@id': `${url}#business`,
        name: 'Vivere Alimentos',
        url,
        image: `${d.siteUrl}/og-image.jpg`,
        servesCuisine: 'Brasileira',
        priceRange: 'R$ 17 - R$ 26',
        telephone: '+55-51-98088-9884',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'R. Sezefredo da Costa Tôrres, 373, Centro',
          addressLocality: 'Santo Antônio da Patrulha',
          addressRegion: 'RS',
          addressCountry: 'BR',
        },
        areaServed: { '@type': 'City', name: city.name },
        hasMenu: d.cardapioLink,
        sameAs: [d.instagramLink],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Vivere', item: `${d.siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: city.name, item: url },
        ],
      },
    ],
  }

  const combos = d.combos
    .map(
      (c) => `
        <li class="combo${c.highlight ? ' is-featured' : ''}">
          ${c.tag ? `<span class="tag">${esc(c.tag)}</span>` : ''}
          <h3>${esc(c.title)}</h3>
          <p class="combo-sub">${esc(c.subtitle)}</p>
          <p class="combo-from">A partir de</p>
          <p class="combo-price">R$ ${brl(c.price / c.units)}<sup>*</sup> <span>/ marmita</span></p>
          <p class="combo-total">${c.units} marmitas por R$ ${brl(c.price)}</p>
          <p class="combo-save">Economia de <strong>R$ ${brl(c.reference - c.price)}</strong> · entrega grátis</p>
          <a class="btn btn-combo" href="${esc(cardapioUrl(d.cardapioLink, city.slug, c.productId))}" target="_blank" rel="noopener">Montar o ${esc(c.title)}</a>
        </li>`,
    )
    .join('')

  const pratos = d.meals
    .map(
      (m) => `
        <li class="dish${m.soldOut ? ' is-out' : ''}">
          <a href="${esc(cardapioUrl(d.cardapioLink, city.slug, m.productId))}" target="_blank" rel="noopener">
            <picture>
              <source srcset="/images/menu/${m.image}.webp" type="image/webp" />
              <img src="/images/menu/${m.image}.jpg" alt="${esc(m.name)}" width="700" height="700" loading="lazy" decoding="async" />
            </picture>
            <div class="dish-body">
              <h3>${esc(m.cardName ?? m.name)}</h3>
              <p class="dish-price">R$ ${brl(m.price)} <span>${esc(m.weight)}</span></p>
            </div>
          </a>
        </li>`,
    )
    .join('')

  const perguntas = faq
    .map(
      (f) => `
        <details>
          <summary>${esc(f.q)}</summary>
          <p>${esc(f.a)}</p>
        </details>`,
    )
    .join('')

  const linksCidades = outras
    .map((c) => `<a href="/${c.slug}">${esc(c.name)}</a>`)
    .join('')

  const entregaLinha = city.onRequest
    ? `<strong>Data combinada no WhatsApp</strong><span>depois do pedido</span>`
    : `<strong>${esc(city.days)}</strong><span>${esc(city.period)}</span>`

  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descricao)}" />
<link rel="canonical" href="${esc(url)}" />
<meta name="robots" content="index, follow" />
<meta name="theme-color" content="#1b3f14" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Vivere Alimentos" />
<meta property="og:locale" content="pt_BR" />
<meta property="og:url" content="${esc(url)}" />
<meta property="og:title" content="${esc(titulo)}" />
<meta property="og:description" content="${esc(descricao)}" />
<meta property="og:image" content="${d.siteUrl}/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="${d.siteUrl}/og-image.jpg" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap" />
<link rel="stylesheet" href="/cidades.css" />
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<script>
!(function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)})(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','1503053695196978');fbq('track','PageView');fbq('trackCustom','VerPaginaCidade',{cidade:'${esc(city.name)}'});
</script>
</head>
<body>
<noscript><img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id=1503053695196978&ev=PageView&noscript=1" /></noscript>

<header class="topbar">
  <div class="shell topbar-in">
    <a href="/" aria-label="Vivere, início">
      <img src="/images/brand/vivere-wordmark-white.png" alt="Vivere — alimentação que acompanha o seu ritmo" width="720" height="257" class="wordmark" />
    </a>
    <nav>
      <a class="link-quiet" href="/">Site completo</a>
      <a class="btn btn-sm" href="${esc(cardapioUrl(d.cardapioLink, city.slug))}" target="_blank" rel="noopener">Cardápio</a>
    </nav>
  </div>
</header>

<main>
  <section class="hero">
    <div class="shell">
      <p class="eyebrow">Entrega ${esc(city.inName)}</p>
      <h1>Marmitas congeladas<br /><em>${esc(city.inName)}</em></h1>
      <p class="lead">${esc(city.intro)}</p>

      <div class="delivery-card">
        <div><span class="dc-label">Dia da entrega</span>${entregaLinha}</div>
        <div><span class="dc-label">Frete</span><strong>R$ ${d.freight.price},00</strong><span>grátis acima de R$ ${d.freight.freeFrom}</span></div>
        <div><span class="dc-label">Preparo</span><strong>5 minutos</strong><span>no micro-ondas</span></div>
      </div>

      <div class="hero-cta">
        <a class="btn btn-lg" href="${esc(cardapioUrl(d.cardapioLink, city.slug))}" target="_blank" rel="noopener">Ver cardápio e pedir</a>
        <a class="btn btn-ghost btn-lg" href="${esc(d.whatsappLink)}" target="_blank" rel="noopener">Falar no WhatsApp</a>
      </div>
    </div>
  </section>

  <section class="band">
    <div class="shell">
      <p class="eyebrow eyebrow-dark">Combos</p>
      <h2>Quanto mais marmitas, <em>menor o preço de cada uma</em></h2>
      <p class="sec-lead">Você escolhe os sabores um a um até completar o combo. Vale qualquer combinação do cardápio, e a entrega ${esc(city.inName)} sai de graça.</p>
      <ul class="combos">${combos}</ul>
      <p class="note">* ${esc(d.unitPriceNoteShort)}.</p>
    </div>
  </section>

  <section class="band band-alt">
    <div class="shell">
      <p class="eyebrow eyebrow-dark">Cardápio · ${d.meals.length} pratos</p>
      <h2>O que você pode pedir ${esc(city.inName)}</h2>
      <p class="sec-lead">Preços e gramaturas exatamente como estão no cardápio online. Toque em qualquer prato para abrir a ficha dele.</p>
      <ul class="dishes">${pratos}</ul>
    </div>
  </section>

  <section class="band">
    <div class="shell">
      <p class="eyebrow eyebrow-dark">Dúvidas</p>
      <h2>Perguntas de quem é ${esc(city.inName.replace(/^em /, 'de '))}</h2>
      <div class="faq">${perguntas}</div>
    </div>
  </section>

  <section class="cta">
    <div class="shell">
      <h2>Pronto pra montar seu combo?</h2>
      <p>O pedido é fechado no nosso cardápio online: é lá que você escolhe cada sabor, marca a data da entrega ${esc(city.inName)} e paga. Aqui você conhece os pratos, as promoções e a marca — lá você finaliza.</p>
      <a class="btn btn-white btn-lg" href="${esc(cardapioUrl(d.cardapioLink, city.slug))}" target="_blank" rel="noopener">Ir para o cardápio e montar meu pedido</a>
      <p class="cta-note">Pedidos 24h por dia · combos a partir de R$ ${brl(cheapest)}<sup>*</sup> por marmita</p>
    </div>
  </section>
</main>

<footer class="rodape">
  <div class="shell">
    <img src="/images/brand/vivere-wordmark-white.png" alt="Vivere" width="720" height="257" class="wordmark wordmark-lg" />
    <p class="cidades-label">Também entregamos em</p>
    <nav class="cidades">${linksCidades}</nav>
    <p class="legal">Vivere Comércio de Alimentos · CNPJ ${esc(d.businessCnpj)}<br />${esc(d.businessAddress)} · ${esc(d.phoneHuman)}</p>
    <a class="link-quiet" href="/">Ver o site completo da Vivere</a>
  </div>
</footer>
</body>
</html>
`
}

export const CITY_CSS = `*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --forest:#1b3f14;--deep:#112a0c;--green:#49b657;--green-dark:#3a9446;--moss:#a8e6ae;
  --cream:#f6f2eb;--sand:#ece5d8;--ink:#14160f;--neutral:#63675a;--gold:#c09548;--white:#fff;
}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
body{background:var(--cream);color:var(--ink);font-family:Inter,system-ui,sans-serif;font-size:15px;line-height:1.6;-webkit-font-smoothing:antialiased}
img{max-width:100%;display:block}
a{color:inherit}
.shell{width:100%;max-width:1140px;margin:0 auto;padding-inline:20px}
@media(min-width:640px){.shell{padding-inline:32px}}
h1,h2,h3{font-family:'Instrument Serif',Georgia,serif;font-weight:400;letter-spacing:-.015em;text-wrap:balance}
em{font-style:italic}
sup{font-size:.55em;font-family:Inter,sans-serif;font-weight:600;vertical-align:super}

.topbar{background:var(--forest);color:#fff}
.topbar-in{display:flex;align-items:center;justify-content:space-between;gap:16px;padding-block:14px;border-bottom:1px solid rgba(255,255,255,.1)}
.topbar nav{display:flex;align-items:center;gap:14px}
.wordmark{height:30px;width:auto}
.wordmark-lg{height:46px;margin-inline:auto}
.link-quiet{font-size:13px;color:rgba(255,255,255,.75);text-decoration:none}
.link-quiet:hover{color:#fff;text-decoration:underline}

.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:999px;background:var(--green);color:#fff;font-weight:600;font-size:14px;padding:12px 22px;text-decoration:none;transition:background .2s}
.btn:hover{background:var(--green-dark)}
.btn-sm{padding:8px 16px;font-size:13px}
.btn-lg{padding:15px 28px;font-size:15px}
.btn-ghost{background:transparent;border:1px solid rgba(255,255,255,.28)}
.btn-ghost:hover{background:rgba(255,255,255,.1)}
.btn-white{background:#fff;color:var(--forest)}
.btn-white:hover{background:var(--cream)}

.eyebrow{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.1);border-radius:999px;padding:5px 13px;font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;font-family:Inter,sans-serif}
.eyebrow-dark{border-color:rgba(20,22,15,.12);background:rgba(73,182,87,.1);color:var(--forest)}

.hero{background:var(--forest);color:#fff;padding-block:44px 52px}
.hero h1{font-size:clamp(2.3rem,8.5vw,3.9rem);line-height:1;margin-top:18px}
.hero h1 em{color:var(--moss)}
.lead{margin-top:18px;max-width:62ch;font-size:15.5px;line-height:1.68;color:rgba(255,255,255,.78)}
.delivery-card{display:grid;gap:1px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.14);border-radius:18px;overflow:hidden;margin-top:28px}
@media(min-width:640px){.delivery-card{grid-template-columns:repeat(3,1fr)}}
.delivery-card>div{background:var(--deep);padding:16px 18px;display:flex;flex-direction:column;gap:2px}
.dc-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:var(--gold);margin-bottom:4px}
.delivery-card strong{font-size:15px;font-weight:600}
.delivery-card span:not(.dc-label){font-size:12.5px;color:rgba(255,255,255,.6)}
.hero-cta{display:flex;flex-wrap:wrap;gap:10px;margin-top:26px}

.band{padding-block:48px}
.band-alt{background:var(--sand)}
.band h2{font-size:clamp(1.75rem,5vw,2.5rem);line-height:1.08;margin-top:14px}
.band h2 em{color:#b3611a}
.sec-lead{margin-top:12px;max-width:62ch;font-size:14.5px;color:var(--neutral)}
.note{margin-top:18px;font-size:11.5px;color:var(--neutral);max-width:62ch}

.combos{list-style:none;display:grid;gap:14px;margin-top:26px}
@media(min-width:860px){.combos{grid-template-columns:repeat(3,1fr)}}
.combo{position:relative;background:#fff;border:1px solid rgba(20,22,15,.08);border-radius:22px;padding:24px}
.combo.is-featured{border-color:rgba(192,149,72,.45);box-shadow:0 2px 4px rgba(20,22,15,.06),0 20px 44px -22px rgba(20,22,15,.4)}
.combo .tag{position:absolute;top:18px;right:18px;font-family:Inter,sans-serif;font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.09em;color:var(--forest);background:rgba(73,182,87,.14);border-radius:999px;padding:4px 9px}
.combo h3{font-size:1.6rem;line-height:1}
.combo-sub{margin-top:6px;font-size:12.5px;color:var(--neutral);max-width:26ch}
.combo-from{margin-top:18px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:var(--green-dark)}
.combo-price{font-family:'Instrument Serif',Georgia,serif;font-size:2.4rem;line-height:1;color:var(--forest);font-variant-numeric:tabular-nums}
.combo-price span{font-family:Inter,sans-serif;font-size:12px;font-weight:600;color:var(--neutral)}
.combo-total{margin-top:8px;font-size:13.5px;font-weight:600;font-variant-numeric:tabular-nums}
.combo-save{margin-top:12px;padding-top:12px;border-top:1px solid rgba(192,149,72,.25);font-size:12.5px;color:var(--neutral);font-variant-numeric:tabular-nums}
.combo-save strong{color:var(--ink)}
.btn-combo{margin-top:18px;width:100%}

.dishes{list-style:none;display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:26px}
@media(min-width:640px){.dishes{grid-template-columns:repeat(3,1fr)}}
@media(min-width:1024px){.dishes{grid-template-columns:repeat(4,1fr)}}
.dish{background:#fff;border:1px solid rgba(20,22,15,.07);border-radius:20px;overflow:hidden}
.dish a{text-decoration:none;display:block;height:100%}
.dish img{width:100%;height:auto;aspect-ratio:1;object-fit:cover}
.dish-body{padding:12px 14px 14px}
.dish h3{font-family:Inter,sans-serif;font-size:13.5px;font-weight:600;line-height:1.25;letter-spacing:0}
.dish-price{margin-top:8px;padding-top:8px;border-top:1px solid rgba(192,149,72,.25);font-family:'Instrument Serif',Georgia,serif;font-size:18px;color:var(--forest);font-variant-numeric:tabular-nums}
.dish-price span{font-family:Inter,sans-serif;font-size:9.5px;font-weight:600;text-transform:uppercase;letter-spacing:.12em;color:var(--neutral);margin-left:6px}
.dish.is-out{opacity:.55}

.faq{margin-top:24px;border-top:1px solid rgba(20,22,15,.08)}
.faq details{border-bottom:1px solid rgba(20,22,15,.08)}
.faq summary{cursor:pointer;list-style:none;padding:16px 0;font-size:14.5px;font-weight:600;display:flex;justify-content:space-between;gap:16px}
.faq summary::-webkit-details-marker{display:none}
.faq summary::after{content:"+";color:var(--neutral);font-weight:400;font-size:20px;line-height:1}
.faq details[open] summary::after{content:"−";color:var(--green-dark)}
.faq p{padding-bottom:18px;font-size:13.5px;color:var(--neutral);max-width:66ch}

.cta{padding-block:8px 48px}
.cta .shell>*{max-width:none}
.cta .shell{text-align:center}
.cta h2,.cta p,.cta a{position:relative}
.cta .shell{background:linear-gradient(135deg,var(--green),var(--green-dark));color:#fff;border-radius:26px;padding:44px 24px;max-width:1100px;margin-inline:auto}
@media(min-width:640px){.cta .shell{padding:56px 48px}}
.cta h2{font-size:clamp(1.9rem,5.5vw,2.9rem);line-height:1.05}
.cta p{margin:16px auto 0;max-width:60ch;font-size:14.5px;color:rgba(255,255,255,.86)}
.cta .btn{margin-top:26px}
.cta-note{margin-top:18px;font-size:12px;color:rgba(255,255,255,.75)}

.rodape{background:var(--forest);color:rgba(255,255,255,.72);padding-block:40px 44px;text-align:center}
.rodape .shell{display:flex;flex-direction:column;align-items:center;gap:16px}
.cidades-label{font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:var(--gold)}
.cidades{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 10px;max-width:70ch}
.cidades a{font-size:13px;color:rgba(255,255,255,.8);text-decoration:none;border:1px solid rgba(255,255,255,.18);border-radius:999px;padding:6px 14px;transition:background .2s}
.cidades a:hover{background:rgba(255,255,255,.1);color:#fff}
.legal{font-size:11.5px;line-height:1.7;color:rgba(255,255,255,.45)}

:focus-visible{outline:2px solid var(--green);outline-offset:3px;border-radius:4px}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*::before,*::after{transition-duration:.01ms!important;animation-duration:.01ms!important}}
`
