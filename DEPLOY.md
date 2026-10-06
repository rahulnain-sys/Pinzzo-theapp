# Going Live: Deploy, Share & Transfer Ownership

## 1. Get a shareable link (Vercel, free)

Vercel builds the site from GitHub and gives a public link like `pinzzo.vercel.app`. Every time code is pushed, the site updates by itself in about 1 minute.

### One-time setup
1. **Create a `main` branch** (the live site will follow it):
   GitHub → repo → branch dropdown → type `main` → *Create branch: main from `claude/pinzzo-static-website-o0nirc`*.
   Then **Settings → General → Default branch → `main`**.
2. Go to **vercel.com → Sign up → Continue with GitHub**. Use the GitHub account that owns the repo.
3. **Add New → Project → Import** `Pinzzo-theapp`. If it isn't listed, click *Adjust GitHub App Permissions* and allow the repo.
4. Vercel detects **Vite** automatically. Check that:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Click **Deploy**. You get a link like `https://pinzzo-theapp.vercel.app`, which you can share with anyone.

### How updates work after that
| You do | Vercel does |
|---|---|
| Push to `main` | Updates the **live** site |
| Push to any other branch | Creates a **preview link** to show your boss before going live |

You can rename the free link in Vercel: **Project → Settings → Domains → Edit** (e.g. `pinzzo.vercel.app`, if available).

## 2. Custom domain (e.g. `pinzzo.in`)
1. Buy the domain from GoDaddy, Hostinger, Namecheap or Cloudflare (about ₹500–1,000 a year for `.in`).
2. In Vercel, go to **Project → Settings → Domains → Add** and enter `pinzzo.in` and `www.pinzzo.in`.
3. Vercel shows 1–2 DNS records (an **A record** and a **CNAME**). Add them in your domain provider's DNS settings.
4. Wait 10 minutes to a few hours. HTTPS (the padlock) is set up automatically and is free.

## 3. Move everything to the business account

Do this **before** connecting Vercel if you can; it saves re-linking later.

### Step A: Create the accounts
- A business email (Google Workspace or Zoho Mail), e.g. `tech@pinzzo.in`
- A new **GitHub** account with that email (or a free GitHub **Organization**, e.g. `pinzzo`, which is better for teams)

### Step B: Transfer the repository
1. Log in to GitHub with the **current** account.
2. Repo → **Settings** → scroll to **Danger Zone** → **Transfer ownership**.
3. Enter the new account or organization name, then confirm by typing the repo name.
4. Accept the transfer from the new account's email.

The full history, branches and files move with it. GitHub automatically redirects the old URL.

### Step C: On your laptop, point Git at the new place
```bash
git remote set-url origin https://github.com/<new-account>/Pinzzo-theapp.git
```

### Step D: Vercel
- If Vercel was set up with the old account, create a Vercel account with the business GitHub, import the repo again, and delete the old project.
- Alternatively, create a Vercel **Team** and transfer the project: **Project → Settings → Advanced → Transfer**.

### Step E: Remove office access
In the new repo, go to **Settings → Collaborators** and add or remove people as needed.

## 4. Go-live checklist
- [ ] Real WhatsApp number, phone, email and hours in `src/config.js`
- [ ] Legal entity name, registered address, drug licence number and grievance officer in `src/config.js`
- [ ] **Have a lawyer or CA review the 4 policy pages.** They are good starting templates, not legal advice.
- [ ] Real testimonials (with customers' permission)
- [ ] Gurugram pincodes and areas checked against where you actually deliver
- [ ] Test on your phone: WhatsApp buttons, prescription upload, pincode check
- [ ] **WhatsApp Business** app on the order number, with a greeting message and catalogue
- [ ] **Google Business Profile** for "Pinzzo – Medicine delivery Gurugram", which helps you show up on Maps
- [ ] Optional: Google Search Console, plus Vercel Analytics (free, no cookies)

## 5. Legal registrations (India, for pharmacy delivery)
Ask your CA or lawyer to confirm, but typically you need:
- **Retail drug licence** (Form 20/21) for the pharmacy, with a registered pharmacist
- **GST registration**
- **Udyam (MSME)** registration (optional, but gives benefits)
- **FSSAI** licence if you sell baby food or nutrition supplements
- Company or LLP registration (needed for the legal name in the policies)
