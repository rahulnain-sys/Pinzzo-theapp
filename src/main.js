import './style.css';
import { SITE, waLink } from './config.js';
import {
  createIcons, Menu, X, MapPin, ShieldCheck, BadgePercent, Wallet, Phone, Upload, CircleCheck,
  Lock, Bell, Plus, Mail, Clock,
} from 'lucide';

// WhatsApp logo (Lucide has no brand icons), in Lucide's icon format
const Whatsapp = [['path', { fill: 'currentColor', stroke: 'none', d: 'M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.42.25-.69.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41Z' }]];

const icons = { Menu, X, MapPin, ShieldCheck, BadgePercent, Wallet, Phone, Upload, CircleCheck, Lock, Bell, Plus, Mail, Clock, Whatsapp };
const renderIcons = () => createIcons({ icons });

// 1. Fill contact details & WhatsApp links from config.js
document.querySelectorAll('[data-wa]').forEach(a => { a.href = waLink(a.dataset.waMsg); });
document.querySelectorAll('[data-tel]').forEach(a => { a.href = `tel:${SITE.phone.replace(/\s/g, '')}`; });
document.querySelectorAll('[data-mail]').forEach(a => { a.href = `mailto:${SITE.email}`; });
document.querySelectorAll('[data-site]').forEach(el => { el.textContent = SITE[el.dataset.site]; });
renderIcons();

// 2. Header shadow once the page is scrolled
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('header-scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// 3. Mobile menu
const menu = document.getElementById('menu');
const menuBtn = document.getElementById('menuBtn');
const setMenu = open => {
  menu.classList.toggle('hidden', !open);
  menu.classList.toggle('flex', open);
  menuBtn.innerHTML = `<i data-lucide="${open ? 'x' : 'menu'}"></i>`;
  renderIcons();
};
menuBtn.addEventListener('click', () => setMenu(menu.classList.contains('hidden')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

// 4. Scroll reveal + counters (IntersectionObserver)
const animateCounter = el => {
  const target = +el.dataset.to;
  const start = performance.now();
  const tick = now => {
    const p = Math.min((now - start) / 1500, 1);
    el.textContent = Math.round(target * (1 - (1 - p) ** 3)).toLocaleString('en-IN'); // ease-out
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
const observer = new IntersectionObserver(entries => {
  entries.forEach(({ isIntersecting, target }) => {
    if (!isIntersecting) return;
    target.classList.add('is-visible');
    target.querySelectorAll('.counter').forEach(animateCounter);
    observer.unobserve(target);
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  observer.observe(el);
});

// 5. Pincode checker (pincodes live in config.js)
document.getElementById('pinForm').addEventListener('submit', e => {
  e.preventDefault();
  const pin = document.getElementById('pin').value.trim();
  const msg = document.getElementById('pinMsg');
  let text, color;
  if (!/^\d{6}$/.test(pin)) [text, color] = ['Please enter a valid 6-digit pincode.', 'text-rose-600'];
  else if (SITE.pincodes.includes(pin)) [text, color] = [`🎉 Yes! We deliver to ${pin} in ~30 minutes.`, 'text-brand-700'];
  else if (SITE.comingSoon.some(p => pin.startsWith(p))) [text, color] = [`🚀 Coming soon to ${pin}! We're expanding across Delhi NCR.`, 'text-accent'];
  else [text, color] = [`Sorry, we don't deliver to ${pin} yet. We're live in ${SITE.city}.`, 'text-slate-600'];
  msg.textContent = text;
  msg.className = `mt-2 ml-4 min-h-6 text-sm font-semibold ${color}`;
});

// 6. Prescription upload -> WhatsApp
//    Phones: share sheet sends the photo straight into WhatsApp.
//    Desktop: opens WhatsApp chat with a message; user attaches the photo.
const rxFile = document.getElementById('rxFile');
const dropZone = document.getElementById('dropZone');
const rxPreview = document.getElementById('rxPreview');
const rxName = document.getElementById('rxName');
let file = null;

const setFile = f => {
  if (!f) return;
  file = f;
  rxName.textContent = `✓ ${f.name}`;
  if (f.type.startsWith('image/')) rxPreview.src = URL.createObjectURL(f);
};
rxFile.addEventListener('change', () => setFile(rxFile.files[0]));
['dragover', 'drop'].forEach(ev => dropZone.addEventListener(ev, e => {
  e.preventDefault();
  if (ev === 'drop') setFile(e.dataTransfer.files[0]);
}));

document.getElementById('rxSend').addEventListener('click', async () => {
  const note = document.getElementById('rxNote').value.trim();
  const text = `Hi Pinzzo! I'd like to order medicines.${note ? `\n${note}` : ''}${file ? '\n(Prescription attached)' : ''}`;
  if (file && navigator.canShare?.({ files: [file] })) {
    try { await navigator.share({ files: [file], text }); return; } catch { /* cancelled -> fall back */ }
  }
  window.open(waLink(text), '_blank', 'noopener');
});

// 7. Live ETA countdown in the chat mockup
const eta = document.getElementById('eta');
setInterval(() => { eta.textContent = eta.textContent > 3 ? eta.textContent - 1 : 12; }, 4000);

// 8. Duplicate marquee content so the loop is seamless
const marquee = document.getElementById('marquee');
marquee.innerHTML += marquee.innerHTML;

document.getElementById('year').textContent = new Date().getFullYear();
