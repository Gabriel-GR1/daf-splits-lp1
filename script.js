const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/SEU-LINK-DO-GRUPO';

const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.menu');
const whatsappLinks = document.querySelectorAll('.whatsapp-link');

menuButton?.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.addEventListener('click', (event) => {
  if (!menu?.classList.contains('open')) return;
  if (menu.contains(event.target) || menuButton.contains(event.target)) return;
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
});

whatsappLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    if (WHATSAPP_GROUP_URL.includes('SEU-LINK-DO-GRUPO')) {
      event.preventDefault();
      console.warn('Configure WHATSAPP_GROUP_URL em script.js antes de publicar os anúncios.');
      return;
    }

    link.href = WHATSAPP_GROUP_URL;
    link.target = '_blank';

    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', 'WhatsAppGroupClick');
    }
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: 'whatsapp_group_click' });
    }
  });
});
