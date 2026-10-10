# How to Edit the Pinzzo Website Yourself

Run `npm run dev`, open http://localhost:5173, and keep it open: every time you **save** a file, the browser updates instantly. Use **VS Code** (with the *Tailwind CSS IntelliSense* extension).

## Where things live
| I want to change… | Edit this file |
|---|---|
| WhatsApp number, phone, email, hours, pincodes | `src/config.js` |
| Any text, heading, section, number | `index.html` |
| Brand colors / font | `src/style.css` (the `@theme` block at the top) |
| Logo | Replace `public/logo.png` (and `public/favicon.png` for the browser tab icon) |
| Pictures / illustrations | `public/img/` |
| Behaviour (pincode check, upload, animations) | `src/main.js` |
| Footer (links, licence line) | `src/common.js` |
| Policy text | `privacy-policy.html`, `terms.html`, `refund-policy.html`, `shipping-policy.html` |
| Company legal name, address, licence no., grievance officer | `src/config.js` |
| Google Analytics ID, tracked buttons | `src/config.js` (`ga4Id`), `src/analytics.js` |

---

## 1. Contact details & WhatsApp — `src/config.js`
```js
whatsapp: '919876543210',   // 91 + 10-digit number, no + or spaces
phone: '+91 98765 43210',
email: 'care@pinzzo.in',
```
All WhatsApp buttons, the contact section and footer update automatically.

**Pincodes:** add/remove inside `pincodes: [ ... ]`. `comingSoon` holds prefixes (e.g. `'110'` = Delhi) that show "Coming soon".

## 2. Text — `index.html`
Press **Ctrl+F**, search the text you see on the website, change it, save. Each section starts with a comment like:
```html
<!-- ============ HOW IT WORKS ============ -->
```
Don't delete the `class="..."` parts — they are the styling.

## 3. Numbers (stats)
Search `data-to=` in `index.html`:
```html
<span class="counter" data-to="500">0</span>+
```
Change `500` to the new number (the `0` is just the starting value for the animation).

## 4. Logo
Replace `public/logo.png` with a new file of the **same name** (transparent background works best). The browser-tab icon is `public/favicon.png` (square, ~192×192).

## 5. Brand colors — `src/style.css`
```css
/* Navy (from logo) — buttons, headings, dark sections */
--color-brand-700: #0a3a75;   /* main navy */
--color-brand-800: #072f60;   /* hover / headings */
--color-ink:       #071f3f;   /* darkest sections */
/* Lime (from theme) — hero background, highlights */
--color-accent:     #b6e34a;  /* main lime */
--color-accent-100: #eef8d0;  /* light lime backgrounds */
```
Classes use these names, e.g. `bg-brand-700`, `text-accent`, `bg-accent-100`.
Tip: paste your main color into https://uicolors.app — it generates the whole 50→900 scale; copy the values here.

## 6. Images
Put a new image (`.webp`, `.png` or `.jpg`) in `public/img/`, then reference it:
```html
<img src="img/my-picture.webp" alt="Short description">
```
Current illustrations are Microsoft Fluent 3D Emoji (MIT licence, free for commercial use). Compress images at https://squoosh.app before adding.

## 7. Testimonials / FAQ / categories
Copy one existing block (e.g. a whole `<figure class="card reveal">…</figure>` or `<details class="faq reveal">…</details>`), paste it below, and edit the text.

## 7b. Policy pages
Open the policy `.html` file and edit the text between `<article class="prose">` and `</article>`. Each `<h2>` heading automatically appears in the "On this page" menu. Update `policyUpdated` in `src/config.js` whenever you change a policy.

**Add a new policy page:** copy `terms.html` to e.g. `ip-policy.html`, change the title and text, then add it in two places:
1. `vite.config.js` → the `pages` list (`'ip-policy'`)
2. `src/common.js` → the `POLICIES` list (`['ip-policy.html', 'IP Policy']`)

## 7c. Google Analytics 4
Paste your Measurement ID (looks like `G-ABC123XYZ`) into `ga4Id` in `src/config.js`. Leave it empty to switch analytics off. Visitors see a consent banner; nothing is stored until they tap Accept.

Tracked automatically (no code needed):

| Event | When | Details sent |
|---|---|---|
| `whatsapp_click` | Any button with `data-wa` | `location` (section), `label` |
| `call_click` / `email_click` | Buttons with `data-tel` / `data-mail` | `location` |
| `pincode_check` | Pincode form | `result` (serviceable, coming_soon, not_serviceable, invalid), `pincode` |
| `rx_file_selected` | Prescription chosen | `file_type` (image/pdf) |
| `rx_send` | "Send to Pinzzo on WhatsApp" | `has_file`, `has_note`, `method` |
| `faq_open` | An FAQ is opened | `question` |
| `cta_click` | Any element with `data-track="cta_click"` | `location`, `label` |

**Track a new button:** add `data-track="cta_click" data-track-label="my_button"` to it. `data-track-loc="..."` overrides the section name.

**Never** send names, phone numbers, medicine names, notes or prescription details to analytics.

**Campaign links:** add UTM tags to every link you share, e.g. `https://pinzzo.in/?utm_source=instagram&utm_campaign=diwali`. The site remembers the campaign for 30 days and adds `Ref: instagram / diwali` to the WhatsApp message, so the team can see which campaign each WhatsApp order came from.

## 8. Remove a section
Delete everything from its `<!-- ===== NAME ===== -->` comment to the closing `</section>`.

## 9. Make it live
```bash
npm run build        # creates the dist/ folder
```
Normally you don't need this: Vercel builds automatically when you push to GitHub (see `DEPLOY.md`).

## 10. Save your work with Git
```bash
git add .
git commit -m "Update phone number"
git push
```

### If something breaks
- Undo with **Ctrl+Z** and save.
- Check the terminal running `npm run dev` for a red error message.
- In the browser press **F12 → Console** to see errors.
- `git checkout -- index.html` restores the last saved version of a file.
