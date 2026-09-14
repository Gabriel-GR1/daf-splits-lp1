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

loadHqImage('.hero-visual img', [
  './assets/hq/hero-00a.txt',
  './assets/hq/hero-00b.txt',
  './assets/hq/hero-01.txt',
  './assets/hq/hero-02.txt',
  './assets/hq/hero-03.txt',
  './assets/hq/hero-04.txt'
]);

loadHqImage('.community-photo img', [
  './assets/hq/community-fix-00.txt',
  './assets/hq/community-fix-00b.txt',
  './assets/hq/community-fix-01.txt',
  './assets/hq/community-fix-02.txt',
  './assets/hq/community-fix-03.txt',
  './assets/hq/community-fix-04.txt'
]);
