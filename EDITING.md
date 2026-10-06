# How to Edit the Pinzzo Website Yourself

Run `npm run dev`, open http://localhost:5173, and keep it open: every time you **save** a file, the browser updates instantly. Use **VS Code** (with the *Tailwind CSS IntelliSense* extension).

## Where things live
| I want to change… | Edit this file |
|---|---|
| WhatsApp number, phone, email, hours, pincodes | `src/config.js` |
| Any text, heading, section, number | `index.html` |
| Brand colors / font | `src/style.css` (the `@theme` block at the top) |
| Logo | Replace `public/logo.svg` |
| Pictures / illustrations | `public/img/` |
| Behaviour (pincode check, upload, animations) | `src/main.js` |

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
1. Save your logo as `logo.png` (transparent background, ~ 400×100px) in `public/`.
2. In `index.html`, search `logo.svg` and change it to `logo.png` (2 places: header + footer).

## 5. Brand colors — `src/style.css`
```css
--color-brand-50:  #ecfdf7;   /* lightest tint (backgrounds) */
--color-brand-500: #10b981;   /* main brand color */
--color-brand-600: #059669;   /* buttons */
--color-brand-700: #047857;   /* hover / dark text */
--color-accent:    #ff6b4a;   /* highlight color ("zzo", gradients) */
--color-ink:       #0b1b2b;   /* dark text & dark sections */
```
Tip: paste your main color into https://uicolors.app — it generates the whole 50→900 scale; copy the values here.

## 6. Images
Put a new image (`.webp`, `.png` or `.jpg`) in `public/img/`, then reference it:
```html
<img src="img/my-picture.webp" alt="Short description">
```
Current illustrations are Microsoft Fluent 3D Emoji (MIT licence, free for commercial use). Compress images at https://squoosh.app before adding.

## 7. Testimonials / FAQ / categories
Copy one existing block (e.g. a whole `<figure class="card reveal">…</figure>` or `<details class="faq reveal">…</details>`), paste it below, and edit the text.

## 8. Remove a section
Delete everything from its `<!-- ===== NAME ===== -->` comment to the closing `</section>`.

## 9. Make it live
```bash
npm run build        # creates the dist/ folder
```
Upload the **whole `dist/` folder** to your host (Netlify drop: https://app.netlify.com/drop, or AWS S3).

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
