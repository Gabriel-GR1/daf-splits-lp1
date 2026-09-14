# DAF Splits — LP1

Landing page independente para tráfego pago com foco em redirecionar leads para o grupo da DAF Splits no WhatsApp.

## Status

Primeira versão responsiva baseada no protótipo visual aprovado.

## Estrutura

- `index.html` — estrutura da LP
- `styles.css` — identidade visual e responsividade
- `mobile.css` — refinamentos específicos para mobile
- `script.js` — menu, redirecionamento para WhatsApp e hooks de tracking
- `assets/logo.svg` — logo DAF
- `assets/hero.webp` — visual do hero

## Terminologia

Usar sempre **perfumaria** nas comunicações e textos do projeto.

## Grupo do WhatsApp

Link atual do grupo:

```txt
https://chat.whatsapp.com/EdzyVNDL1B4FIjU8irkXNP
```

O mesmo endereço também está definido em `script.js` como `WHATSAPP_GROUP_URL`.

## Tracking

Ao clicar em um CTA, a página dispara, quando disponíveis:

- Meta Pixel: `WhatsAppGroupClick`
- Google Tag Manager/Data Layer: `whatsapp_group_click`

## Deploy

Projeto estático e compatível com Vercel sem build step.
