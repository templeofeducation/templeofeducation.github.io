const gallery = document.querySelector('#teacher-photo-gallery');
const title = document.querySelector('#gallery-title');
const eyebrow = document.querySelector('#gallery-eyebrow');
const backLink = document.querySelector('#gallery-back-link');
const params = new URL(window.location.href).searchParams;
const teacher = params.get('teacher');
const schoolGallery = params.get('gallery');
const selection = teacher || schoolGallery;
const isTeacher = Boolean(teacher);

const showMessage = (message) => {
  gallery.replaceChildren();
  const text = document.createElement('p');
  text.className = 'gallery-message';
  text.textContent = message;
  gallery.append(text);
};

if (!selection || !/^[a-z-]+$/.test(selection) || (teacher && schoolGallery)) {
  showMessage('Please choose a photo gallery from the website.');
} else {
  eyebrow.textContent = isTeacher ? 'Teacher gallery' : 'School gallery';
  backLink.href = isTeacher ? 'index.html#teachers' : 'index.html#gallery';
  backLink.textContent = isTeacher ? 'Back to Teachers' : 'Back to School Photos';

  fetch('index.html', { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error('Unable to load photos.');
      return response.text();
    })
    .then((html) => {
      const page = new DOMParser().parseFromString(html, 'text/html');
      const attribute = isTeacher ? 'data-teacher' : 'data-gallery';
      const card = page.querySelector(`[${attribute}="${selection}"]`);
      if (!card) throw new Error('Photo gallery not found.');

      const name = card.querySelector('h3')?.textContent?.trim() || 'Gallery';
      const photos = [...card.querySelectorAll('.teacher-photo')];
      title.textContent = `${name} — Photos`;
      document.title = `${name} Photos | Temple of Education Little Champs Play School`;
      gallery.replaceChildren();

      photos.forEach((photo, index) => {
        const image = document.createElement('img');
        image.src = photo.getAttribute('src');
        image.alt = `${name} — photo ${index + 1} of ${photos.length}`;
        image.loading = index === 0 ? 'eager' : 'lazy';
        gallery.append(image);
      });
    })
    .catch((error) => showMessage(error.message));
}
