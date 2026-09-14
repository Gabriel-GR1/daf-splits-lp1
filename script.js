const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/GCi2WhyhAPXEExFhNszgoX?s=cl&p=a&mlu=4&ilr=4';

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
  link.href = WHATSAPP_GROUP_URL;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';

  link.addEventListener('click', () => {
    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', 'WhatsAppGroupClick');
    }
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: 'whatsapp_group_click' });
    }
  });
});
