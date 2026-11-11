const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

document.querySelectorAll('.site-nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('contact-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = `EnkoyLab inquiry: ${data.get('interest')}`;
  const body = [
    `Name: ${data.get('name')}`,
    `Organization: ${data.get('organization') || 'Not provided'}`,
    `Email: ${data.get('email')}`,
    `Area of interest: ${data.get('interest')}`,
    '',
    data.get('message')
  ].join('\n');
  window.location.href = `mailto:contact@enkoylab.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
