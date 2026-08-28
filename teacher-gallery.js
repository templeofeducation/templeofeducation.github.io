const gallery = document.querySelector('#teacher-photo-gallery');
const title = document.querySelector('#gallery-title');
const teacher = new URL(window.location.href).searchParams.get('teacher');

const showMessage = (message) => {
  gallery.replaceChildren();
  const text = document.createElement('p');
  text.className = 'gallery-message';
  text.textContent = message;
  gallery.append(text);
};

if (!teacher || !/^[a-z-]+$/.test(teacher)) {
  showMessage('Please choose a teacher from the Teachers section.');
} else {
  fetch('index.html', { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error('Unable to load teacher photos.');
      return response.text();
    })
    .then((html) => {
      const page = new DOMParser().parseFromString(html, 'text/html');
      const card = page.querySelector(`[data-teacher="${teacher}"]`);
      if (!card) throw new Error('Teacher not found.');

      const name = card.querySelector('h3')?.textContent?.trim() || 'Teacher';
      const photos = [...card.querySelectorAll('.teacher-photo')];
      title.textContent = `${name} — Photos`;
      document.title = `${name} Photos | Temple of Education`;
      gallery.replaceChildren();

      photos.forEach((photo, index) => {
        const image = document.createElement('img');
        image.src = photo.src;
        image.alt = `${name} — photo ${index + 1} of ${photos.length}`;
        image.loading = index === 0 ? 'eager' : 'lazy';
        gallery.append(image);
      });
    })
    .catch((error) => showMessage(error.message));
}
