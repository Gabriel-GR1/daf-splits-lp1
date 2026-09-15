async function loadHqImage(targetSelector, parts) {
  try {
    const chunks = await Promise.all(
      parts.map(path =>
        fetch(path, { cache: 'force-cache' }).then(response => {
          if (!response.ok) throw new Error(`Falha ao carregar ${path}`);
          return response.text();
        })
      )
    );

    const base64 = chunks.join('').replace(/\s+/g, '');
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    const objectUrl = URL.createObjectURL(
      new Blob([bytes], { type: 'image/webp' })
    );

    document.querySelectorAll(targetSelector).forEach(img => {
      const oldUrl = img.dataset.hqObjectUrl;
      if (oldUrl) URL.revokeObjectURL(oldUrl);

      img.src = objectUrl;
      img.dataset.hqObjectUrl = objectUrl;
      img.decoding = 'async';
    });
  } catch (error) {
    console.warn('HQ image fallback:', error);
  }
}

async function loadFeedbackPack() {
  try {
    const response = await fetch('./assets/feedbacks-pack.bin', { cache: 'force-cache' });
    if (!response.ok) throw new Error('Falha ao carregar o pacote de feedbacks');

    const buffer = await response.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const view = new DataView(buffer);

    if (bytes.length < 10) throw new Error('Pacote de feedbacks inválido');

    const magic = String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3]);
    if (magic !== 'DAF1') throw new Error('Formato de pacote de feedbacks desconhecido');

    const count = view.getUint16(4, false);
    const images = [...document.querySelectorAll('.feedback-card img')];
    let offset = 6;

    for (let index = 0; index < count && index < images.length; index += 1) {
      if (offset + 4 > bytes.length) throw new Error('Pacote de feedbacks incompleto');

      const length = view.getUint32(offset, false);
      offset += 4;

      if (!length || offset + length > bytes.length) {
        throw new Error(`Imagem ${index + 1} inválida no pacote`);
      }

      const imageBytes = bytes.slice(offset, offset + length);
      offset += length;

      const objectUrl = URL.createObjectURL(new Blob([imageBytes], { type: 'image/webp' }));
      const img = images[index];
      const oldUrl = img.dataset.hqObjectUrl;

      if (oldUrl) URL.revokeObjectURL(oldUrl);

      img.src = objectUrl;
      img.dataset.hqObjectUrl = objectUrl;
      img.decoding = 'async';
      img.removeAttribute('loading');
    }
  } catch (error) {
    console.warn('Feedback HQ fallback:', error);
  }
}

loadHqImage('.hero-visual img', [
  './assets/hq/hero-00a.txt',
  './assets/hq/hero-00b.txt',
  './assets/hq/hero-01.txt',
  './assets/hq/hero-02.txt',
  './assets/hq/hero-03.txt',
  './assets/hq/hero-04.txt'
]);

loadFeedbackPack();
