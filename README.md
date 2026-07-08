# Vivere Landing

Landing page de conversão da **Vivere** (marmitas congeladas gourmet) — mobile-first, pensada para ser o destino do link da bio do Instagram, QR Codes, campanhas de marketing e disparos de WhatsApp.

Este projeto é **independente** do site institucional da Vivere (`vivere-site`). Ele não o substitui — os dois convivem lado a lado, com objetivos diferentes: o site institucional apresenta a marca por completo (cardápio, sobre, depoimentos); esta landing existe para converter em segundos quem chega de um link externo.

## Fluxo da página

1. **Hero** — carrossel de fotos reais das marmitas ("food porn") + headline + CTA.
2. **QuickLinks** — atalhos diretos: Cardápio online, WhatsApp, Dieta personalizada, Instagram.
3. **FeaturedMeals** — pratos em promoção (com preço real, confirmado no cardápio online).
4. **Gallery** — grade com o restante do cardápio fotografado.
5. **HowItWorks** — passo a passo interativo de como comprar pelo cardápio online, seguido do CTA principal (cardápio como canal prioritário) e do WhatsApp como opção secundária.
6. **PersonalizedDiet** — explicação do atendimento para dietas específicas.
7. **Stats** — como funciona a Vivere (pronto em 5 min, ultracongelado, cardápio 24h).
8. **Testimonials** — depoimentos reais de clientes (Google, 5,0★).
9. **InstagramCTA** — convite para seguir o perfil.
10. **Footer** — horários de atendimento, endereço, CNPJ, redes sociais.
11. **FloatingCTA** — barra fixa inferior (some no topo, aparece ao rolar) com os dois CTAs prioritários.

## Stack

- **React 18** + **TypeScript** (strict mode)
- **Vite 6** — dev server e build
- **Tailwind CSS 3** — estilização utilitária, tokens de marca via `tailwind.config.js`
- **lucide-react** — ícones
- **ESLint 9** (flat config) + **Prettier** — qualidade e formatação de código
- Alias `@` → `src/`

### Sobre shadcn/ui e Framer Motion

O briefing original pedia shadcn/ui e Framer Motion. Este projeto implementa a **mesma filosofia** desses dois — um `cn()` utilitário em `src/lib/cn.ts` e primitivos (`Button`, `Badge`/`Eyebrow`) em `src/components/ui/` no mesmo espírito do shadcn; scroll-reveal e transições via Tailwind + um hook `useInView` em vez de `framer-motion` — **sem** as duas dependências reais.

O motivo é 100% técnico: este projeto foi montado num ambiente sandboxed sem acesso ao registry do npm, então não foi possível instalar nem verificar essas duas bibliotecas de verdade. Em vez de declarar dependências não testadas, preferi entregar um projeto **verificado e funcional** com um stack levemente mais enxuto. Se quiser as bibliotecas literais mais tarde:

```bash
npm install framer-motion class-variance-authority clsx tailwind-merge tailwindcss-animate
npx shadcn@latest init
npx shadcn@latest add button badge
```

Os componentes já seguem a convenção de props/nomenclatura do shadcn, então a migração é direta.

## Como instalar

Pré-requisito: [Node.js](https://nodejs.org) 18 ou superior.

```bash
npm install
```

> Se uma pasta `node_modules/` já vier junto com o projeto, apague-a antes (`rm -rf node_modules package-lock.json`) e rode `npm install` de novo — ela foi gerada apenas para testes internos de compilação e não deve ser usada em produção.

## Como executar em desenvolvimento

```bash
npm run dev
```

Abre em `http://localhost:5173`. Para acessar pelo celular na mesma rede Wi-Fi:

```bash
npm run dev -- --host
```

## Como gerar build de produção

```bash
npm run build
```

Gera a pasta `dist/`, pronta para deploy estático. Para conferir localmente antes de publicar:

```bash
npm run preview
```

## Lint e formatação

```bash
npm run lint     # ESLint
npm run format   # Prettier (escreve as correções)
```

## Estrutura de pastas

```
vivere-landing/
├── public/                  # favicons e manifest (servidos como estão)
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── dishes/      # fotos reais das marmitas
│   │   │   └── testimonials/# fotos reais dos clientes
│   │   └── logo/            # logo-vivere.png
│   ├── components/
│   │   ├── Hero/
│   │   ├── QuickLinks/
│   │   ├── FeaturedMeals/
│   │   ├── Gallery/
│   │   ├── HowItWorks/      # steps + CardapioCTA + PersonalizedDiet
│   │   ├── Stats/
│   │   ├── Testimonials/
│   │   ├── Instagram/
│   │   ├── Footer/
│   │   ├── FloatingCTA/
│   │   └── ui/               # Button, Badge/Eyebrow (primitivos estilo shadcn)
│   ├── pages/
│   │   └── Home/             # composição das seções
│   ├── hooks/                 # useCarousel, useInView
│   ├── lib/                   # cn, constants, meals, testimonials
│   ├── types/                 # tipos compartilhados
│   ├── styles/                # globals.css (Tailwind + fontes)
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
└── README.md
```

## Boas práticas adotadas

- **Mobile first**: todo layout nasce para 375–430px e ganha breakpoints `sm:`/`lg:` depois — nunca o contrário.
- **Componentização de responsabilidade única**: cada seção é uma pasta com um único componente principal; nada de arquivos gigantes.
- **Dados fora do JSX**: conteúdo de pratos, depoimentos, links e horários vive em `src/lib/`, não hardcoded dentro de componentes.
- **Preços reais, nunca inventados**: os valores em `lib/meals.ts` foram confirmados diretamente no cardápio online; pratos sem correspondência exata no cardápio atual não exibem preço fabricado.
- **Sem `console.log`, sem código comentado, sem TODOs esquecidos.**
- **Acessibilidade**: `alt` em todas as imagens, `aria-label` em botões só-ícone, contraste de texto sobre imagem garantido via gradiente.

## Publicação (Vercel / Cloudflare Pages / Netlify)

O projeto já está pronto para deploy sem qualquer alteração — é uma SPA estática gerada por `vite build`.

**Vercel**
1. Importe o repositório.
2. Framework preset: `Vite`.
3. Build command: `npm run build` · Output directory: `dist`.

**Cloudflare Pages**
1. Conecte o repositório.
2. Build command: `npm run build` · Build output directory: `dist`.

**Netlify**
1. Conecte o repositório.
2. Build command: `npm run build` · Publish directory: `dist`.

Em qualquer uma das três, configure o domínio ou subdomínio desejado (ex.: `link.vivereeu.com.br`) e aponte o DNS depois do primeiro deploy.
