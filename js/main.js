// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  // Close menu after clicking a link (mobile)
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Current year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Contact form — validate and hand off to the visitor's mail client
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const company = (data.get('company') || '').toString().trim();
    const message = (data.get('message') || '').toString().trim();

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name || !emailOk || !message) {
      formStatus.textContent = 'Please add your name, a valid email, and a short message.';
      formStatus.className = 'form-status error';
      return;
    }

    const subject = `New project enquiry — ${name}${company ? ' (' + company + ')' : ''}`;
    const body =
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      (company ? `Studio / Company: ${company}\n` : '') +
      `\n${message}\n`;
    window.location.href =
      `mailto:hello@taikogames.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    formStatus.textContent = 'Thanks! Your email is ready to send in your mail app. We reply within two business days.';
    formStatus.className = 'form-status success';
    form.reset();
  });
}

// Scroll reveal — only hide elements once JS is confirmed active
document.body.classList.add('reveal-ready');
const revealEls = document.querySelectorAll('.reveal, .service-card, .news-card');
revealEls.forEach((el) => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  // Fallback: no observer support, just show everything
  revealEls.forEach((el) => el.classList.add('is-visible'));
}
