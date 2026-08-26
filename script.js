if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver(
  entries =>
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    }),
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const modal = document.getElementById('qrModal');
const qrButton = document.getElementById('qrButton');
const qrClose = document.getElementById('qrClose');

let qr;

qrButton.addEventListener('click', () => {
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');

  document.getElementById('qrcode').innerHTML = '';

  qr = new QRCode(document.getElementById('qrcode'), {
    text: window.location.href,
    width: 220,
    height: 220,
    colorDark: '#090c11',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });
});

function closeQr() {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
}

qrClose.addEventListener('click', closeQr);

modal.addEventListener('click', e => {
  if (e.target === modal) {
    closeQr();
  }
});

document.getElementById('downloadQr').addEventListener('click', () => {
  const canvas = document.querySelector('#qrcode canvas');

  if (canvas) {
    const a = document.createElement('a');
    a.download = 'popemmyelect-qr-code.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeQr();
  }
});