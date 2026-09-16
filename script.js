const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/GCi2WhyhAPXEExFhNszgoX?s=cl&p=i&mlu=0&ilr=4';

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

const feedbackCarousel = document.querySelector('.feedback-carousel');

if (feedbackCarousel) {
  const track = feedbackCarousel.querySelector('.feedback-track');
  const previousButton = feedbackCarousel.querySelector('.feedback-prev');
  const nextButton = feedbackCarousel.querySelector('.feedback-next');
  const cards = [...feedbackCarousel.querySelectorAll('.feedback-card')];
  let currentIndex = 0;

  const updateFeedbackCarousel = () => {
    const hasFeedbacks = cards.length > 0;
    feedbackCarousel.dataset.empty = String(!hasFeedbacks);

    if (!hasFeedbacks) {
      previousButton.disabled = true;
      nextButton.disabled = true;
      track.style.transform = 'translateX(0)';
      return;
    }

    currentIndex = Math.max(0, Math.min(currentIndex, cards.length - 1));
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    previousButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === cards.length - 1;
  };

  previousButton?.addEventListener('click', () => {
    if (currentIndex === 0) return;
    currentIndex -= 1;
    updateFeedbackCarousel();
  });

  nextButton?.addEventListener('click', () => {
    if (currentIndex >= cards.length - 1) return;
    currentIndex += 1;
    updateFeedbackCarousel();
  });

  updateFeedbackCarousel();
}
