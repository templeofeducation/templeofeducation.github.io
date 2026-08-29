const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#main-menu');

menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  menu.classList.toggle('open');
});

menu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const admissionsEmail = 'admissions@templeofeducation.edu';
const whatsappNumber = '15551234567';

document.querySelector('#application-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const details = [
    'New admission application for Temple of Education Little Champs Play School',
    `Child Name: ${formData.get('childName')}`,
    `Date of Birth: ${formData.get('dob')}`,
    `Class Applying For: ${formData.get('className')}`,
    `Parent/Guardian Name: ${formData.get('parentName')}`,
    `Mobile Number: ${formData.get('phone')}`,
    `Email: ${formData.get('email')}`,
    `Message: ${formData.get('message') || 'N/A'}`,
  ].join('\n');

  const mailtoLink = `mailto:${admissionsEmail}?subject=${encodeURIComponent('Admission Application - Temple of Education Little Champs Play School')}&body=${encodeURIComponent(details)}`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(details)}`;

  window.location.href = mailtoLink;
  window.open(whatsappLink, '_blank', 'noopener');
});

const teacherSlider = document.querySelector('[data-slider]');
if (teacherSlider) {
  const slides = [...teacherSlider.querySelectorAll('.teacher-photo')];
  const status = teacherSlider.querySelector('.slider-status');
  let activeSlide = 0;
  let autoplay;

  const showSlide = (index) => {
    activeSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === activeSlide);
    });
    status.textContent = `Photo ${activeSlide + 1} of ${slides.length}`;
  };

  const startAutoplay = () => {
    window.clearInterval(autoplay);
    autoplay = window.setInterval(() => showSlide(activeSlide + 1), 4500);
  };

  teacherSlider.querySelector('.slider-prev').addEventListener('click', () => {
    showSlide(activeSlide - 1);
    startAutoplay();
  });
  teacherSlider.querySelector('.slider-next').addEventListener('click', () => {
    showSlide(activeSlide + 1);
    startAutoplay();
  });
  teacherSlider.addEventListener('mouseenter', () => window.clearInterval(autoplay));
  teacherSlider.addEventListener('mouseleave', startAutoplay);
  teacherSlider.addEventListener('focusin', () => window.clearInterval(autoplay));
  teacherSlider.addEventListener('focusout', startAutoplay);
  startAutoplay();
}
