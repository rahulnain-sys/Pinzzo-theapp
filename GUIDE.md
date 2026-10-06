# Pinzzo Website — Build Guide

A learning guide: what we use, how the project is organised, and the steps to build and ship it.

## 1. Goal
A modern **info website** for Pinzzo (fast home delivery of medicines), inspired by Tata 1mg / PharmEasy / Apollo 24|7. It is **static**: the final output is plain HTML + CSS + JS files, no server or database.

## 2. Tech stack (and why)
| Tool | What it does | Why |
|------|--------------|-----|
| **HTML5** | Page structure | Semantic, SEO-friendly |
| **Tailwind CSS v4** | Utility-first CSS framework | Fast, consistent, professional styling without writing long CSS files |
| **Vanilla JavaScript (ES modules)** | Interactivity | No framework needed for an info site |
| **Vite** | Dev server + build tool | Instant live reload; bundles & minifies for production |
| **Lucide** | SVG icon library | Clean icons, only the used ones are bundled |
| **Google Fonts** (Plus Jakarta Sans) | Typography | Modern brand look |
| **Node.js + npm** | Installs/runs the tools above | Industry standard |
| **Git + GitHub** | Version control | Team collaboration |
| **Netlify / Vercel / GitHub Pages** | Hosting | Free, deploys from GitHub |

> Why the first version looked like "notepad": the browser loaded `index.html` but couldn't find the CSS/JS files beside it, so it showed unstyled HTML. Running through Vite (`npm run dev`) or a host like Vercel avoids this.

## 3. Folder structure
```
Pinzzo-theapp/
├── index.html        # Page markup (Tailwind classes)
├── src/
│   ├── style.css     # Tailwind import + brand theme (colors, fonts, animations)
│   ├── config.js     # WhatsApp number, contacts, pincodes (edit here!)
│   └── main.js       # Icons, menu, animations, pincode check, Rx upload -> WhatsApp
├── public/           # logo.svg + img/ (3D illustrations, copied as-is)
├── vite.config.js    # Build config
├── package.json      # Dependencies & scripts
├── dist/             # Build output (generated, not committed)
├── GUIDE.md
└── EDITING.md      # How to edit any part yourself
```

## 4. Run it
```bash
npm install        # once — installs tools
npm run dev        # dev server at http://localhost:5173 with live reload
npm run build      # production build -> dist/index.html
npm run preview    # preview the production build
```

## 5. Build steps (how it goes)
1. **Research** competitors: sections, tone, colors.
2. **Define brand tokens** in `src/style.css` (`@theme`): colors, font, animations.
3. **Plan sections**: Header → Hero (pincode check + phone mockup) → Category marquee → Stats → How it works → Services → Why Pinzzo → Testimonials → FAQ → App CTA → Footer.
4. **Build HTML with Tailwind classes**, mobile-first (`md:` / `lg:` prefixes add desktop styles).
5. **Add JS features** one by one, testing each.
6. **Test**: Chrome DevTools device mode, Lighthouse (performance, accessibility, SEO).
7. **Deploy**: connect GitHub repo to Netlify/Vercel → build command `npm run build`, publish dir `dist`.
8. **Iterate** with real logo, photos, content and legal pages.

## 6. Guidelines
- **Mobile-first**: test at 390px, 768px, 1440px.
- **Brand colors only via tokens** (`bg-brand-600`, `text-accent`) — never hard-code hex in HTML.
- **Reusable components** (`.btn-primary`, `.card`, `.eyebrow`) live in `style.css`.
- **Semantic HTML & accessibility**: one `h1`, `aria-label` on icon-only buttons, good contrast, native `<details>` for FAQ.
- **Performance**: no heavy libraries, tree-shaken icons, compressed images (WebP) in future.
- **SEO**: title, meta description, meaningful headings.
- **Git**: small commits, clear messages; never commit `node_modules` or `dist`.
- **Pharmacy compliance**: add drug license no., disclaimers, privacy policy before going live. Numbers on the page are placeholders.

## 7. JS features & concepts
| Feature | Concept |
|---------|---------|
| Glass header on scroll | `scroll` event, `classList.toggle` |
| Mobile menu | Toggle state, re-rendering icons |
| Scroll reveal & counters | `IntersectionObserver`, `requestAnimationFrame`, easing |
| Pincode check | Form handling, regex validation |
| Live ETA in mockup | `setInterval` |
| Infinite marquee | CSS keyframes + duplicated content |

## 8. Next steps
- Real logo/images in `public/`
- More pages: About, Careers, Privacy, Terms
- Contact/lead form via Formspree
- Deploy to Netlify/Vercel and add custom domain
