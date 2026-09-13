# Vivere Landing

Landing page de conversão da **Vivere** (marmitas congeladas gourmet). É o destino do link da bio do Instagram, dos QR Codes, das campanhas de tráfego pago e dos disparos de WhatsApp.

A página existe para uma coisa: levar quem chegou de um link externo até o cardápio online com o pedido montado. Desde setembro de 2026 o argumento principal deixou de ser a marmita avulsa e passou a ser o **combo** — ticket maior, preço por marmita menor, entrega grátis.

## Fluxo da página

1. **Hero** — cabeçalho com marca e atalhos, promessa e galeria com cinco pratos em transição lenta.
2. **DeliveryBar** — as 8 cidades: cinco com dia fixo, três com data combinada no WhatsApp.
3. **Combos** — oferta principal: 10, 15 e 30 marmitas, com preço "a partir de" por unidade e economia em reais. Abaixo, os cupons automáticos de quem compra avulso.
4. **ComboCalculator** — quantas marmitas por semana → quanto tempo cada combo dura e qual encaixa melhor.
5. **Testimonials** — prova social logo depois da oferta, uma citação por vez em corpo serifado.
6. **Menu** — cardápio completo: 8 pratos com expansão para os 17, filtrável por tipo.
7. **HowItWorks** — passo a passo da compra, em acordeão acessível. Vem antes do CTA de propósito: explica, depois convida.
8. **CardapioCTA** — chamada principal, deixando explícito que o pedido é fechado no cardápio online e que o site serve para entender produto, promoções e marca.
9. **PersonalizedDiet** — atendimento para dieta prescrita e restrições.
10. **Brand** — embalagem e conservação numa seção só: preparo em 5 minutos, 180 dias de validade, tabela impressa na caixa, linhas Dia a Dia e Pasta.
11. **NutricionalCTA** — ponte para `/nutricional`.
12. **FAQ** — objeções de congelado, entrega, pagamento e retirada.
13. **InstagramCTA** — convite para seguir o perfil.
14. **Footer** — atendimento, entregas, endereço e CNPJ.
15. **FloatingCTA** — barra fixa no celular (pedido + WhatsApp) e botão fixo de WhatsApp no desktop. Sempre visíveis.

Além das seções, o **StickyHeader** aparece no desktop a partir do fim do hero, com a navegação e o CTA sempre à mão. No celular esse papel é da barra inferior — duas barras fixas comeriam metade da tela.

### Ordem das seções

A ordem não é acidental. A prova social vem logo depois da oferta, porque quem está em dúvida decide antes de chegar ao fim da página. O passo a passo vem antes do CTA grande, para ninguém clicar sem entender que o pedido é fechado fora daqui. E os fundos alternam entre `cream`, `sand`, `white` e `green-forest` de forma que duas seções vizinhas nunca compartilhem o mesmo fundo.

## Onde ficam os dados

Nenhum preço, horário ou telefone vive dentro de componente. Tudo em `src/lib/`:

| Arquivo | O que guarda |
| --- | --- |
| `constants.ts` | Domínio, WhatsApp, Instagram, endereço, CNPJ, ID do pixel, horários, descontos automáticos |
| `meals.ts` | Os 17 pratos: nome, preço, gramatura, categoria, foto, etiqueta |
| `combos.ts` | Os combos e o preço de referência usado em toda a página |
| `delivery.ts` | Cidades, dias de entrega e regra de frete |
| `faq.ts` | Perguntas frequentes |
| `analytics.ts` | Eventos do pixel, carimbo de origem e link direto para a ficha do produto |
| `brand.ts` | Wordmark e fotos institucionais |

**Quando o cardápio online mudar de preço, mexa só em `meals.ts` e `combos.ts`.** O resto da página se ajusta sozinho — inclusive a âncora "a partir de R$ …" do hero e a contagem de pratos.

## Medição

Todo link que sai da página para o cardápio passa por `<OrderLink source="…">`, e todo link de WhatsApp por `<WhatsAppLink source="…">`. Os dois:

- carimbam `utm_content` com o nome do bloco de origem, e
- disparam um evento no Meta Pixel (`CliqueCardapio` / `CliqueWhatsApp`, mais os eventos padrão `InitiateCheckout` e `Contact`).

Assim dá pra ver qual seção converte. **Nunca adicione um `<a href={CARDAPIO_LINK}>` solto** — use o componente, ou o clique sai da página sem medição.

## Link direto para o produto

Cada prato e cada combo tem um `productId` — o id do produto dentro do cardápio online. Passando `productId` para o `OrderLink`, o link vira `?id=<productId>#produto` e o cardápio **abre a ficha direto**, já com o seletor de sabores no caso dos combos. Sem `productId`, cai na home do cardápio e o cliente tem que procurar.

Para descobrir o id de um produto novo: abra o cardápio, inspecione o card e leia o atributo `data-product-id`.

O ID do pixel está em `constants.ts` e no `index.html` (código base do Meta). É o mesmo da página de criadores.

## Identidade visual

O wordmark oficial vive em `public/images/brand/` em duas versões, ambas com fundo transparente:

- `vivere-wordmark-white.png` — para fundo verde-escuro (cabeçalho, rodapé)
- `vivere-wordmark-forest.png` — para fundo claro

Use o arquivo certo em vez de recolorir por CSS. As fotos institucionais da embalagem ficam na mesma pasta e são listadas em `src/lib/brand.ts`.

## Fotos dos pratos

Ficam em `public/images/menu/<slug>.webp` com `<slug>.jpg` de fallback, em 700×700. Para adicionar uma foto nova:

1. Salve o arquivo quadrado nos dois formatos com o mesmo nome.
2. Aponte o campo `image` do prato em `meals.ts` para esse nome (sem extensão).

Prato sem `image` aparece com o monograma da marca no lugar da foto — não quebra o layout.

A imagem de compartilhamento (`public/og-image.jpg`, 1200×630) é o que aparece quando o link é colado no WhatsApp ou no Instagram.

## Páginas de cidade

Cada cidade atendida tem a própria página em `/<slug>` — `/osorio`, `/capao-da-canoa`, `/tramandai`… São HTML puro, sem React e sem JavaScript de aplicação: quem busca "marmita congelada em Osório" quer a resposta na primeira tela, não um bundle.

Elas não são escritas à mão. O plugin `paginasDeCidade()` do `vite.config.ts` roda no fim do build e monta cada página a partir de `scripts/city-page.ts`, usando os mesmos dados da landing (`cities.ts`, `meals.ts`, `combos.ts`, `constants.ts`). Preço, gramatura e dia de entrega nunca divergem entre a home e a página da cidade, porque saem do mesmo lugar.

Para mudar o texto de uma cidade, mexa em `src/lib/cities.ts` — é lá que ficam o slug, o dia, o período e o parágrafo próprio de cada uma. Para mudar o layout de todas, mexa em `scripts/city-page.ts` (`renderCityPage` e `CITY_CSS`).

Cada parágrafo de cidade é escrito à mão de propósito: oito páginas com o mesmo texto e o nome trocado é página-isca, e o Google trata como tal.

Duas coisas saem do build junto com elas:

- `dist/cidades.css` — folha única de ~8 KB que todas usam, com os mesmos tokens de marca da landing.
- `dist/sitemap.xml` — regenerado a cada build com a data do dia, já com as 8 cidades. Por isso **não existe** `public/sitemap.xml`: editar um arquivo que o build sobrescreve só gera confusão.

As cidades se ligam entre si e com a home: os cartões da DeliveryBar, os chips das cidades sem dia fixo, o rodapé da landing e o rodapé de cada página de cidade.

## Stack

- **React 18** + **TypeScript** (strict)
- **Vite 6**
- **Tailwind CSS 3** — tokens de marca em `tailwind.config.js`
- **lucide-react** — ícones
- **ESLint 9** + **Prettier**
- Alias `@` → `src/`

## Rodando

```bash
npm install
npm run dev              # http://localhost:5173
npm run dev -- --host    # abre para o celular na mesma rede
```

## Build

```bash
npm run build     # tsc -b && vite build → dist/ (+ 8 páginas de cidade e sitemap)
npm run preview   # confere o build antes de publicar
```

## Lint e formatação

```bash
npm run lint
npm run format
```

## Publicação

Deploy estático na Vercel a partir do branch `main`. Preset `Vite`, build `npm run build`, saída `dist`.

O `vercel.json` cuida de três coisas:

- **URLs limpas** — `/nutricional` em vez de `/nutricional.html`.
- **Cache** — `/assets/*` (arquivos com hash) fica imutável por um ano; `/images/*` fica uma hora no navegador e um ano no CDN, que a Vercel limpa a cada deploy. Trocar uma foto mantendo o mesmo nome aparece na hora para quem chega novo, e em até uma hora para quem já visitou.
- **Atalhos de link** — para QR Code, bio e stories:

| Atalho | Vai para |
| --- | --- |
| `/cardapio` | cardápio online, carimbado como `utm_medium=qrcode` |
| `/combo10` `/combo15` `/combo30` | a ficha do combo, já com o seletor de sabores |
| `/whatsapp` | conversa no WhatsApp com mensagem pronta |
| `/criadores` | página do programa de criadores |

Ao trocar o domínio, atualize em cinco lugares: `SITE_URL` em `src/lib/constants.ts`, as tags `canonical` / `og:url` / `og:image` / `twitter:image` do `index.html`, o mesmo bloco em `public/nutricional.html`, e o `public/robots.txt`. O `sitemap.xml` se atualiza sozinho no build.

## SEO

- `index.html` traz o JSON-LD de `Restaurant` (endereço, cidades atendidas, nota, horário) e de `FAQPage`.
- `MenuJsonLd` publica o cardápio inteiro como `Menu` em tempo de execução, a partir de `meals.ts` e `combos.ts` — assim os dados estruturados nunca ficam defasados em relação aos preços da página.
- Cada página de cidade tem título, descrição, canonical, Open Graph e JSON-LD próprios (`Restaurant` + `FAQPage` + `BreadcrumbList`).
- `robots.txt` fica em `public/`. O `sitemap.xml` é gerado pelo build em `dist/` — veja *Páginas de cidade*.

## Decisões que valem lembrar

- **Mobile primeiro, mas não só mobile.** O layout nasce em 390px e abre em 2 e 4 colunas. A página não fica mais presa a um container de largura de celular no desktop.
- **Um preço de referência só.** Os três combos comparam contra a mesma marmita avulsa (`BASE_UNIT_PRICE`), senão não dá pra comparar entre eles.
- **Preço de combo é piso, não valor fechado.** Todo "R$ X por marmita" vem com "a partir de" e com o asterisco de `UNIT_PRICE_NOTE`, porque o valor sobe conforme os sabores escolhidos.
- **Preço nunca é inventado.** Todo valor exibido foi conferido no cardápio online. Prato sem correspondência não vai para a página.
- **Acessibilidade.** Acordeão com `<button>` e `aria-expanded`, FAQ com `<details>` nativo, `alt` em toda imagem, foco visível, `prefers-reduced-motion` respeitado.
