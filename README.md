# Vivere Landing

Landing page de conversão da **Vivere** (marmitas congeladas gourmet). É o destino do link da bio do Instagram, dos QR Codes, das campanhas de tráfego pago e dos disparos de WhatsApp.

A página existe para uma coisa: levar quem chegou de um link externo até o cardápio online com o pedido montado. Desde setembro de 2026 o argumento principal deixou de ser a marmita avulsa e passou a ser o **combo** — ticket maior, preço por marmita menor, entrega grátis.

## Fluxo da página

1. **Hero** — cabeçalho com marca e atalhos, promessa, foto do prato e a âncora de preço dos combos.
2. **DeliveryBar** — cidades atendidas e dia de entrega de cada uma. Primeira dúvida de quem nunca comprou.
3. **Combos** — oferta principal: 10, 15 e 30 marmitas, com preço "a partir de" por unidade e economia em reais. Abaixo, os cupons automáticos de quem compra avulso.
4. **ComboCalculator** — quantas marmitas por semana → quanto tempo cada combo dura e qual encaixa melhor.
5. **Menu** — cardápio completo, filtrável por tipo, com preço e gramatura reais.
6. **CardapioCTA** — chamada principal para o cardápio online.
7. **HowItWorks** — passo a passo da compra, em acordeão acessível.
8. **PersonalizedDiet** — atendimento para dieta prescrita e restrições.
9. **Stats** — preparo, validade e disponibilidade do cardápio.
10. **Brand** — a embalagem: tabela impressa na caixa, micro-ondas, linhas Dia a Dia e Pasta.
11. **Testimonials** — avaliações reais do Google.
12. **NutricionalCTA** — ponte para `/nutricional.html`.
13. **FAQ** — objeções de congelado, entrega, pagamento e retirada.
14. **InstagramCTA** — convite para seguir o perfil.
15. **Footer** — atendimento, entregas, endereço e CNPJ.
16. **FloatingCTA** — barra fixa de conversão no mobile, a partir do fim do hero.

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
npm run build     # tsc -b && vite build → dist/
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

Ao trocar o domínio, atualize em cinco lugares: `SITE_URL` em `src/lib/constants.ts`, as tags `canonical` / `og:url` / `og:image` / `twitter:image` do `index.html`, o mesmo bloco em `public/nutricional.html`, o `public/robots.txt` e o `public/sitemap.xml`.

## SEO

- `index.html` traz o JSON-LD de `Restaurant` (endereço, cidades atendidas, nota, horário) e de `FAQPage`.
- `MenuJsonLd` publica o cardápio inteiro como `Menu` em tempo de execução, a partir de `meals.ts` e `combos.ts` — assim os dados estruturados nunca ficam defasados em relação aos preços da página.
- `robots.txt` e `sitemap.xml` ficam em `public/`.

## Decisões que valem lembrar

- **Mobile primeiro, mas não só mobile.** O layout nasce em 390px e abre em 2 e 4 colunas. A página não fica mais presa a um container de largura de celular no desktop.
- **Um preço de referência só.** Os três combos comparam contra a mesma marmita avulsa (`BASE_UNIT_PRICE`), senão não dá pra comparar entre eles.
- **Preço de combo é piso, não valor fechado.** Todo "R$ X por marmita" vem com "a partir de" e com o asterisco de `UNIT_PRICE_NOTE`, porque o valor sobe conforme os sabores escolhidos.
- **Preço nunca é inventado.** Todo valor exibido foi conferido no cardápio online. Prato sem correspondência não vai para a página.
- **Acessibilidade.** Acordeão com `<button>` e `aria-expanded`, FAQ com `<details>` nativo, `alt` em toda imagem, foco visível, `prefers-reduced-motion` respeitado.
