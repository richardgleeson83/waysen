# PROJECT LEDGER — Waysen Ltd Website Rebuild

> Source of Truth. Read at the start of every session.
> Do not modify the Master Roadmap without an explicit approved Change Request.

## Resume Protocol
On session start: read this file, state last action, state next step, ask for confirmation.

## You Are Here
**Status:** Build complete — awaiting user assets, GitHub setup, and cPanel deployment
**Mode:** Handoff / Asset swap / Deployment

## Master Roadmap
| Phase | Status | Description |
|-------|--------|-------------|
| 1 — Research & Brand Extraction | ✅ DONE | Scraped waysen.co.uk, extracted all content, colors, fonts, images |
| 2 — Build Brief | ✅ DONE | Brief approved |
| 3 — Build Homepage | ✅ DONE | index.html — hero, about, portfolio, blog preview, contact form |
| 4 — Build Blog Pages | ✅ DONE | 3 blog posts + blog listing page |
| 5 — Contact Form PHP | ✅ DONE | PHP mail handler with rate limiting and auto-reply |
| 6 — Supporting Files | ✅ DONE | .htaccess, sitemap.xml, robots.txt, 404.html |
| 7 — GitHub + cPanel Docs | ✅ DONE | Full step-by-step in README.md |
| 8 — Asset Swap | ⏳ WAITING ON USER | User to provide images/logos for site/assets/ |
| 9 — GitHub Push | ⏳ WAITING ON USER | Create repo and push (commands in README.md) |
| 10 — cPanel Deployment | ⏳ WAITING ON USER | Connect cPanel Git Version Control to repo |
| 11 — Quality Audit | ⏳ PENDING | Test contact form live, mobile check, submit sitemap to Google |

## Component / Feature Registry
| Component | File | Status |
|-----------|------|--------|
| Homepage | site/index.html | ✅ Done |
| Global CSS | site/css/style.css | ✅ Done |
| Animations JS | site/js/main.js | ✅ Done |
| Contact Form Handler | site/php/contact.php | ✅ Done |
| Blog Listing | site/blog/index.html | ✅ Done |
| Blog: Football | site/blog/local-football-team-sponsorship.html | ✅ Done |
| Blog: Smaralfalfa | site/blog/smaralfalfa-progreso.html | ✅ Done |
| Blog: Recycling | site/blog/recyclable-packaging.html | ✅ Done |
| 404 Page | site/404.html | ✅ Done |
| Sitemap | site/sitemap.xml | ✅ Done |
| Robots.txt | site/robots.txt | ✅ Done |
| .htaccess | site/.htaccess | ✅ Done |
| Favicon | site/favicon.ico | ⏳ User to provide |

## Active Technical Decisions
- **Stack:** Pure HTML/CSS/JS — no frameworks. cPanel hosting compatible.
- **Animations:** CSS transitions + lightweight vanilla JS (no GSAP dependency for simplicity/performance)
- **Contact Form:** PHP mail() handler — standard on cPanel
- **Colors:** Primary #3D8C27 (green), Dark #1A3A12, Light bg #F0F5EC, Text #2C2C2C
- **Fonts:** Montserrat (headings) + Inter (body) via Google Fonts
- **Images:** Reference waysen.co.uk CDN until user provides replacements
- **GitHub + cPanel:** cPanel Git Version Control for auto-deployment
- **User will provide:** Images, logos for final version

## Change Log
| Date | Action |
|------|--------|
| 2026-05-11 | Project initialized, brand research completed |
| 2026-05-11 | Build brief created and approved |
| 2026-05-11 | All project files created (homepage, blog, PHP, README) |

## Next Immediate Steps (do these in order)

### STEP 1 — Provide images & logos (USER ACTION)
Drop your image files into `site/assets/`. Key files needed:
- `waysen-logo.png` — main logo (used in nav + footer on every page)
- `vancat.png` — VanCat brand logo (portfolio section)
- `rocat.png` — RoCat brand logo (portfolio section)
- `ponza.png` — Pomza Export logo (portfolio section)
- A photo for the About section (replaces the placeholder lifestyle image)
- Optional: hero background image if you want one
- Optional: `favicon.png` — browser tab icon

Once images are in `site/assets/`, Claude will swap all CDN references (`waysen.co.uk/wp-content/...`) to local paths (`/assets/filename`).

### STEP 2 — Push to GitHub (USER ACTION)
Run these commands in terminal from `/Users/richardgleeson/Projects/waysen`:
```
git init  (already done)
git add .
git commit -m "Initial Waysen website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/waysen-website.git
git push -u origin main
```
Full instructions in `README.md`.

### STEP 3 — Connect cPanel Git Version Control (USER ACTION)
1. Log in to cPanel
2. Find "Git Version Control" under Files
3. Create → paste your GitHub repo URL
4. Set path to `public_html`
5. Optional: add GitHub webhook for auto-deploy on push

Full step-by-step in `README.md`.

---
After Steps 1–3 are complete, next work will be:
- Live contact form test
- Mobile QA
- Submit sitemap.xml to Google Search Console
