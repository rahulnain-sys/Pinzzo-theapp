# Pinzzo Static Website — Build Guide

A learning guide for how this site is built, the tools used, and the steps to follow.

## 1. Goal
An **info website** for Pinzzo (fast home delivery of medicines), similar in spirit to Tata 1mg / PharmEasy landing pages. Static = no server or database; just files the browser opens.

## 2. Tech stack
| Tool | Purpose |
|------|---------|
| **HTML5** | Structure/content of the page |
| **CSS3** (Flexbox, Grid, variables, media queries) | Styling & responsive layout |
| **Vanilla JavaScript** | Interactivity (menu, FAQ, forms, counters) |
| **VS Code** + *Live Server* extension | Editing + auto-reload preview |
| **Git + GitHub** | Version control |
| **GitHub Pages / Netlify** | Free hosting (later) |
| Chrome DevTools | Debugging, mobile view testing |

No frameworks or build tools — keeps it simple for learning.

## 3. Folder structure
```
Pinzzo-theapp/
├── index.html      # Page content
├── css/style.css   # All styles
├── js/main.js      # All behaviour
├── assets/         # Images, logo, icons
└── GUIDE.md        # This doc
```

## 4. Build steps (how it goes)
1. **Research** — study 1mg, PharmEasy, Apollo 24|7: note sections, colors, tone.
2. **Plan sections** — Header → Hero (pincode check) → Stats → How it works → Services → Why us → FAQ → Contact → Footer.
3. **Wireframe** — rough sketch on paper / Figma (optional).
4. **HTML first** — write semantic structure (`header`, `nav`, `main`, `section`, `footer`). No styling yet.
5. **CSS** — define color variables, base styles, then each section; finally mobile media queries.
6. **JavaScript** — add interactivity one feature at a time and test each.
7. **Test** — Chrome, Firefox, mobile view (DevTools `Ctrl+Shift+M`), Lighthouse audit.
8. **Deploy** — push to GitHub → enable GitHub Pages (Settings → Pages → branch).
9. **Iterate** — add real logo, images, content from the team.

## 5. Guidelines / best practices
- **Semantic HTML**: use proper tags; one `h1` per page; headings in order.
- **Mobile-first & responsive**: test at 360px, 768px, 1280px widths.
- **CSS variables** for brand colors — change once, updates everywhere.
- **Comment sections** in HTML/CSS/JS so code is easy to follow.
- **Accessibility**: `alt` on images, `aria-label` on icon buttons, good color contrast.
- **Performance**: compress images (WebP), no unnecessary libraries, script at end of `body`.
- **SEO**: meaningful `<title>`, `meta description`.
- **Git**: small commits with clear messages.
- **Legal (pharmacy)**: don't claim medical advice; add license/disclaimer text before going live.

## 6. What each JS feature teaches
| Feature | Concept |
|---------|---------|
| Mobile menu | `addEventListener`, `classList.toggle` |
| FAQ accordion | DOM traversal (`parentElement`) |
| Pincode check | Form handling, regex validation |
| Contact form | `checkValidity()`, `preventDefault()` |
| Stat counters | `IntersectionObserver`, `setInterval` |

## 7. Run locally
Open `index.html` in a browser, or in VS Code right-click → *Open with Live Server*.

## 8. Next steps
- Add real logo/images in `assets/`
- Add pages: About, Careers, Privacy Policy
- Connect contact form to a service (Formspree / Google Forms)
- Deploy to GitHub Pages
