# DAF Splits — LP1

Landing page independente para tráfego pago com foco em redirecionar leads para o grupo da DAF Splits no WhatsApp.

## Status

Primeira versão responsiva baseada no protótipo visual aprovado.

## Estrutura

- `index.html` — estrutura da LP
- `styles.css` — identidade visual e responsividade
- `script.js` — menu, redirecionamento para WhatsApp e hooks de tracking
- `assets/logo.webp` — logo DAF
- `assets/hero.webp` — visual do hero
- `assets/community.webp` — visual da seção de comunidade

## Configurar o grupo do WhatsApp

Antes de publicar anúncios, abra `script.js` e substitua:

```js
const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/SEU-LINK-DO-GRUPO';
```

pelo link real do grupo.

## Tracking

Ao clicar em um CTA, a página dispara, quando disponíveis:

- Meta Pixel: `WhatsAppGroupClick`
- Google Tag Manager/Data Layer: `whatsapp_group_click`

## Deploy

Projeto estático e compatível com Vercel sem build step.
