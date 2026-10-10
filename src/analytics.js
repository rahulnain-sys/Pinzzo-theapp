// Google Analytics 4: consent banner, click tracking and campaign memory.
// Set SITE.ga4Id in config.js to switch it on; until then events only print
// to the browser console during `npm run dev`.
import { SITE } from './config.js';

const CONSENT_KEY = 'pinzzo-consent'; // 'granted' | 'denied'
const CAMPAIGN_KEY = 'pinzzo-campaign';
const CAMPAIGN_DAYS = 30;

// localStorage can throw (private mode, blocked storage): never let that break the page
const store = {
  get: k => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
};

window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); } // gtag needs the arguments object, not an array

// Send one event. Never pass names, phone numbers, medicines or prescription details.
export function track(name, params = {}) {
  if (import.meta.env.DEV) console.debug('[track]', name, params);
  if (SITE.ga4Id) gtag('event', name, params);
}

// ---- Campaign memory -------------------------------------------------------
// Remember which ad or link brought the visitor (utm_* / gclid / fbclid), so a
// WhatsApp order can carry a short "Ref:" line and the team knows its source.
function rememberCampaign() {
  const q = new URLSearchParams(location.search);
  const source = q.get('utm_source') || (q.has('gclid') ? 'google' : q.has('fbclid') ? 'meta' : '');
  if (!source) return;
  store.set(CAMPAIGN_KEY, JSON.stringify({ source, campaign: q.get('utm_campaign') || '', at: Date.now() }));
}

export function campaign() {
  try {
    const c = JSON.parse(store.get(CAMPAIGN_KEY));
    if (c && Date.now() - c.at < CAMPAIGN_DAYS * 864e5) return c;
  } catch { /* no or bad value */ }
  return null;
}

// Adds "Ref: instagram / diwali_offer" to a WhatsApp message when the visit came from a campaign
export function withRef(msg = SITE.waMessage) {
  const c = campaign();
  return c ? `${msg}\n\nRef: ${[c.source, c.campaign].filter(Boolean).join(' / ')}` : msg;
}

// ---- Consent ---------------------------------------------------------------
// Consent Mode v2: nothing is stored until the visitor accepts. Ads signals stay
// off until we run ads that need them.
function setConsent(choice) {
  store.set(CONSENT_KEY, choice);
  gtag('consent', 'update', { analytics_storage: choice });
  document.getElementById('consent')?.remove();
}

function showBanner() {
  document.getElementById('consent')?.remove();
  document.body.insertAdjacentHTML('beforeend', `
    <div id="consent" role="dialog" aria-label="Cookie consent" class="fixed inset-x-3 bottom-20 z-50 mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-2xl md:bottom-6">
      <p class="text-slate-700">We use Google Analytics cookies to see how people use our site so we can improve it. We never send your prescriptions or health details. <a href="privacy-policy.html#section-8" class="font-semibold text-brand-700 underline">Learn more</a></p>
      <div class="mt-3 flex justify-end gap-2">
        <button data-consent="denied" class="btn-ghost !px-4 !py-2 text-sm">Decline</button>
        <button data-consent="granted" class="btn-primary !px-4 !py-2 text-sm">Accept</button>
      </div>
    </div>`);
}

// ---- Click tracking --------------------------------------------------------
// Where on the page a click happened: data-track-loc, else the nearest section id
const where = el => el.dataset.trackLoc || el.closest('[id]')?.id || 'page';

function onClick(e) {
  const el = e.target.closest('a, button');
  if (!el) return;

  if (el.dataset.consent) return setConsent(el.dataset.consent);
  if (el.hasAttribute('data-cookie-settings')) return showBanner();

  const location = where(el);
  if (el.hasAttribute('data-wa')) {
    track('whatsapp_click', { location, label: el.dataset.trackLabel || el.querySelector('h3')?.textContent || '' });
  } else if (el.hasAttribute('data-tel')) {
    track('call_click', { location });
  } else if (el.hasAttribute('data-mail')) {
    track('email_click', { location });
  } else if (el.dataset.track) {
    track(el.dataset.track, { location, label: el.dataset.trackLabel || el.textContent.trim().slice(0, 40) });
  }
}

export function initAnalytics() {
  rememberCampaign();
  document.addEventListener('click', onClick);

  if (!SITE.ga4Id) return;
  const consent = store.get(CONSENT_KEY);
  gtag('consent', 'default', {
    analytics_storage: consent === 'granted' ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  gtag('js', new Date());
  gtag('config', SITE.ga4Id);

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${SITE.ga4Id}`;
  document.head.appendChild(s);

  if (!consent) showBanner();
}
