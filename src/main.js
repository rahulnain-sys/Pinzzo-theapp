import { SITE, waLink } from './config.js';
import { initCommon, renderIcons } from './common.js';

initCommon();

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
  if (!/^\d{6}$/.test(pin)) [text, color] = ['Please enter a valid 6-digit pincode.', 'text-red-700'];
  else if (SITE.pincodes.includes(pin)) [text, color] = [`🎉 Yes! We deliver to ${pin} in ~30 minutes.`, 'text-brand-800'];
  else if (SITE.comingSoon.some(p => pin.startsWith(p))) [text, color] = [`🚀 Coming soon to ${pin}! We're expanding across Delhi NCR.`, 'text-brand-800'];
  else [text, color] = [`Sorry, we don't deliver to ${pin} yet. We're live in ${SITE.city}.`, 'text-brand-800'];
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

