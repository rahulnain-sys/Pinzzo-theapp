import './style.css';
import {
  createIcons, Pill, Smartphone, Menu, X, MapPin, ShieldCheck, BadgePercent, Wallet, Droplets,
  Thermometer, Bike, Phone, FileCheck2, Star, Search, UserCheck, Truck, FlaskConical, Stethoscope,
  HeartPulse, ArrowRight, Zap, BadgeIndianRupee, Snowflake, BellRing, Headphones, Plus, Play,
  Apple, Camera, AtSign, Briefcase, Mail,
} from 'lucide';

// 1. Icons: only the icons we import are bundled (tree-shaking keeps the file small)
const icons = {
  Pill, Smartphone, Menu, X, MapPin, ShieldCheck, BadgePercent, Wallet, Droplets, Thermometer, Bike,
  Phone, FileCheck2, Star, Search, UserCheck, Truck, FlaskConical, Stethoscope, HeartPulse, ArrowRight,
  Zap, BadgeIndianRupee, Snowflake, BellRing, Headphones, Plus, Play, Apple, Camera, AtSign, Briefcase, Mail,
};
createIcons({ icons });

// 2. Header: glass effect once the page is scrolled
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
  createIcons({ icons });
};
menuBtn.addEventListener('click', () => setMenu(menu.classList.contains('hidden')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

// 4. Scroll reveal + counters, both triggered by IntersectionObserver
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
  el.style.transitionDelay = `${(i % 4) * 80}ms`; // small stagger
  observer.observe(el);
});

// 5. Pincode checker (demo list — replace with real serviceable pincodes)
const SERVICEABLE = ['110001', '122001', '400001', '560001', '201301', '500001'];
document.getElementById('pinForm').addEventListener('submit', e => {
  e.preventDefault();
  const pin = document.getElementById('pin').value.trim();
  const msg = document.getElementById('pinMsg');
  const [text, color] = !/^\d{6}$/.test(pin)
    ? ['Please enter a valid 6-digit pincode.', 'text-rose-600']
    : SERVICEABLE.includes(pin)
      ? [`🎉 Yay! We deliver to ${pin} in ~30 minutes.`, 'text-brand-700']
      : [`We're not in ${pin} yet — coming soon!`, 'text-accent'];
  msg.textContent = text;
  msg.className = `mt-3 ml-4 h-6 text-sm font-semibold ${color}`;
});

// 6. Live ETA countdown in the phone mockup
const eta = document.getElementById('eta');
setInterval(() => { eta.textContent = eta.textContent > 3 ? eta.textContent - 1 : 12; }, 4000);

// 7. Duplicate marquee content so the loop is seamless
const marquee = document.getElementById('marquee');
marquee.innerHTML += marquee.innerHTML;

document.getElementById('year').textContent = new Date().getFullYear();
