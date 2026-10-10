import './style.css';
import { SITE, waLink } from './config.js';
import { initAnalytics, withRef } from './analytics.js';
import {
  createIcons, Menu, X, MapPin, ShieldCheck, BadgePercent, Wallet, Phone, Upload, CircleCheck,
  Lock, Bell, Plus, Mail, Clock, ArrowLeft,
} from 'lucide';

// Shared by every page: footer, contact details, WhatsApp links, icons

// WhatsApp logo (Lucide has no brand icons), in Lucide's icon format
const Whatsapp = [['path', { fill: 'currentColor', stroke: 'none', d: 'M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.42.25-.69.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41Z' }]];

const icons = { Menu, X, MapPin, ShieldCheck, BadgePercent, Wallet, Phone, Upload, CircleCheck, Lock, Bell, Plus, Mail, Clock, ArrowLeft, Whatsapp };
export const renderIcons = () => createIcons({ icons });

// Policy pages — add/rename here and the footer updates on every page
export const POLICIES = [
  ['privacy-policy.html', 'Privacy Policy'],
  ['terms.html', 'Terms & Conditions'],
  ['refund-policy.html', 'Refund & Cancellation'],
  ['shipping-policy.html', 'Shipping & Delivery'],
];

const footerHTML = () => `
  <div class="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-4">
    <div class="md:col-span-2">
      <a href="./"><img src="logo.png" alt="Pinzzo" class="h-12 w-auto rounded-xl bg-white px-3 py-2"></a>
      <p class="mt-4 max-w-sm text-sm">Genuine medicines and pharmacy essentials delivered to your door, in about 30 minutes.</p>
    </div>
    <div>
      <h4 class="font-bold text-white">Quick links</h4>
      <ul class="mt-4 space-y-2 text-sm">
        <li><a href="./#how" class="hover:text-white">How it works</a></li>
        <li><a href="./#order" class="hover:text-white">Upload prescription</a></li>
        <li><a href="./#faq" class="hover:text-white">FAQ</a></li>
        <li><a href="./#contact" class="hover:text-white">Contact us</a></li>
      </ul>
    </div>
    <div>
      <h4 class="font-bold text-white">Our policies</h4>
      <ul class="mt-4 space-y-2 text-sm">
        ${POLICIES.map(([href, label]) => `<li><a href="${href}" class="hover:text-white">${label}</a></li>`).join('')}
      </ul>
    </div>
  </div>
  <div class="mx-auto mt-12 max-w-7xl border-t border-white/10 px-5 pt-6 text-xs">
    <p>Medicines are dispensed by licensed pharmacists against valid prescriptions. Information on this site is not a substitute for medical advice.</p>
    <p class="mt-3 font-bold tracking-widest text-accent">MEDICINE • WELLNESS • EVERYDAY HEALTH</p>
    <p class="mt-3">© ${new Date().getFullYear()} ${SITE.legalName} · All rights reserved · <button data-cookie-settings class="underline hover:text-white">Cookie settings</button></p>
  </div>`;

export function initCommon() {
  initAnalytics();
  const footer = document.getElementById('site-footer');
  if (footer) footer.innerHTML = footerHTML();

  document.querySelectorAll('[data-wa]').forEach(a => { a.href = waLink(withRef(a.dataset.waMsg)); });
  document.querySelectorAll('[data-tel]').forEach(a => { a.href = `tel:${SITE.phone.replace(/\s/g, '')}`; });
  document.querySelectorAll('[data-mail]').forEach(a => { a.href = `mailto:${SITE.email}`; });
  document.querySelectorAll('[data-site]').forEach(el => { el.textContent = SITE[el.dataset.site]; });
  renderIcons();

  // Header shadow once the page is scrolled
  const header = document.getElementById('header');
  const onScroll = () => header?.classList.toggle('header-scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
