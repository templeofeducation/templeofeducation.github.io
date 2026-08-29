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

const admissionsEmail = document.querySelector('#contact-email').href;
const admissionsWhatsApp = document.querySelector('#contact-whatsapp').href;

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

  const mailtoLink = `${admissionsEmail}?subject=${encodeURIComponent('Admission Application - Temple of Education Little Champs Play School')}&body=${encodeURIComponent(details)}`;
  const whatsappLink = `${admissionsWhatsApp}?text=${encodeURIComponent(details)}`;

  const emailLink = document.createElement('a');
  emailLink.href = mailtoLink;
  emailLink.click();
  window.location.assign(whatsappLink);
});

document.querySelectorAll('[data-slider]').forEach((teacherSlider) => {
  const slides = [...teacherSlider.querySelectorAll('.teacher-photo')];
  let activeSlide = 0;
  let autoplay;

  const showSlide = (index) => {
    activeSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === activeSlide);
    });
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
});
