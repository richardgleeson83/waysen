# PROJECT LEDGER — Waysen Ltd Website Rebuild

> Source of Truth. Read at the start of every session.
> Do not modify the Master Roadmap without an explicit approved Change Request.

## Resume Protocol
On session start: read this file, state last action, state next step, ask for confirmation.

## You Are Here
**Status:** LIVE at https://waysen.co.uk
**Mode:** Post-launch — asset swap and QA remaining

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
| 8 — Favicon | ✅ DONE | Green W favicon (ICO + SVG) generated and wired up |
| 9 — GitHub Push | ✅ DONE | Pushed to github.com/richardgleeson83/waysen (main) |
| 10 — Asset Swap | ⏳ WAITING ON USER | User to provide images/logos for site/assets/ |
| 11 — cPanel Deployment | ✅ DONE | Deployed via cPanel Fileman API — LIVE at waysen.co.uk |
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
| 2026-05-11 | Favicon created (green W, ICO + SVG), wired up in all HTML pages |
| 2026-05-11 | Pushed to GitHub: github.com/richardgleeson83/waysen (main) |
| 2026-05-11 | Deployed to cPanel via Fileman API + PHP extractor — LIVE at waysen.co.uk |

## Next Immediate Steps (do these in order)

### STEP 1 — Provide images & logos (USER ACTION)
Drop files into `site/assets/` when ready:
- `waysen-logo.png`, `vancat.png`, `rocat.png`, `ponza.png`
- About section photo
Claude will swap CDN references to local paths, push a new commit, and redeploy.

### STEP 2 — Quality Audit
- Test live contact form (send a real email)
- Mobile check on phone
- Submit sitemap.xml to Google Search Console at https://waysen.co.uk/sitemap.xml

---
After Steps 1–3 are complete, next work will be:
- Live contact form test
- Mobile QA
- Submit sitemap.xml to Google Search Console
