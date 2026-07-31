# PROJECT LEDGER — Waysen Ltd Website Rebuild

> Source of Truth. Read at the start of every session.
> Do not modify the Master Roadmap without an explicit approved Change Request.

## Resume Protocol
On session start: read this file, state last action, state next step, ask for confirmation.

## You Are Here
**Status:** LIVE at https://waysen.co.uk — all images and contact form working
**Mode:** QA / Polish

## Master Roadmap
| Phase | Status | Description |
|-------|--------|-------------|
| 1 — Research & Brand Extraction | ✅ DONE | Scraped waysen.co.uk, extracted all content, colors, fonts, images |
| 2 — Build Brief | ✅ DONE | Brief approved |
| 3 — Build Homepage | ✅ DONE | index.html — hero, about, portfolio, blog preview, contact form |
| 4 — Build Blog Pages | ✅ DONE | 3 blog posts + blog listing page |
| 5 — Contact Form PHP | ✅ DONE | PHP mail handler with rate limiting and auto-reply |
| 6 — Supporting Files | ✅ DONE | .htaccess, sitemap.xml, robots.txt, 404.html |
| 7 — Favicon | ✅ DONE | Green W favicon (ICO + SVG) wired up in all pages |
| 8 — GitHub Push | ✅ DONE | github.com/richardgleeson83/waysen (public, main) |
| 9 — cPanel Deployment | ✅ DONE | Live via Fileman API + PHP extractor |
| 10 — Asset Swap | ✅ DONE | All brand images local, zero CDN references |
| 11 — Contact Form Fix | ✅ DONE | Moved to root, fixed LiteSpeed 403, confirmed working |
| 12 — Quality Audit | ⏳ PENDING | Mobile check, real email test, Google Search Console |

## Component / Feature Registry
| Component | File | Status |
|-----------|------|--------|
| Homepage | site/index.html | ✅ Done |
| Global CSS | site/css/style.css | ✅ Done |
| Animations JS | site/js/main.js | ✅ Done |
| Contact Form Handler | site/contact.php | ✅ Done (root, not php/) |
| Blog Listing | site/blog/index.html | ✅ Done |
| Blog: Football | site/blog/local-football-team-sponsorship.html | ✅ Done |
| Blog: Smaralfalfa | site/blog/smaralfalfa-progreso.html | ✅ Done |
| Blog: Recycling | site/blog/recyclable-packaging.html | ✅ Done |
| 404 Page | site/404.html | ✅ Done |
| Sitemap | site/sitemap.xml | ✅ Done |
| Robots.txt | site/robots.txt | ✅ Done |
| .htaccess | site/.htaccess | ✅ Done |
| Favicon | site/favicon.ico + favicon.svg | ✅ Done |
| Brand Assets | site/assets/ | ✅ Done — 10 local images |

## Active Technical Decisions
- **Stack:** Pure HTML/CSS/JS — no frameworks. cPanel/LiteSpeed hosting.
- **Contact Form:** contact.php must live in site ROOT (not a subdirectory) — LiteSpeed blocks PHP in subdirs
- **Deploy method:** zip upload via cPanel Fileman API + self-deleting PHP extractor. After deploy, re-upload contact.php directly via API to fix permissions (zip extraction sets wrong perms on PHP files)
- **Colors:** Primary #3D8C27 (green), Dark #1A3A12, Light bg #F0F5EC, Text #2C2C2C
- **Fonts:** Montserrat (headings) + Inter (body) via Google Fonts
- **Images:** All local in site/assets/ — no external CDN dependencies
- **GitHub:** github.com/richardgleeson83/waysen (public repo, main branch)
- **cPanel:** waysen.co.uk:2083, user waysenco, API token in session context
- **Waysen logo:** SVG text logo (site/assets/waysen-logo.svg) — no brand logo file provided yet

## Change Log
| Date | Action |
|------|--------|
| 2026-05-11 | Project initialized, brand research completed |
| 2026-05-11 | Build brief created and approved |
| 2026-05-11 | All project files created (homepage, blog, PHP, README) |
| 2026-05-11 | Favicon created (green W, ICO + SVG), wired up in all HTML pages |
| 2026-05-11 | Pushed to GitHub: github.com/richardgleeson83/waysen (main) |
| 2026-05-11 | Deployed to cPanel via Fileman API + PHP extractor — LIVE at waysen.co.uk |
| 2026-05-11 | All brand images added to assets, all CDN references replaced |
| 2026-05-11 | Smaralfalfa portfolio card fixed to use logo not field photo |
| 2026-05-11 | Contact form fixed: moved to root, removed LiteSpeed-incompatible htaccess rule |
| 2026-07-31 | Added Fred's Catnip Farm as 5th portfolio brand (card + footer link + logo asset); portfolio grid reformatted from 4-col auto-fit grid to centered flex (3 + 2 rows) |

## Next Immediate Steps

### STEP 1 — Quality Audit (USER ACTION)
- **Real email test:** Fill in the contact form at waysen.co.uk and check martin@waysen.co.uk receives it
- **Mobile check:** View site on phone — check nav, hero, portfolio cards, contact form
- **Submit sitemap:** Go to Google Search Console → Add property → waysen.co.uk → Submit https://waysen.co.uk/sitemap.xml

### STEP 2 — Waysen Logo (when available)
If a proper brand logo file (PNG/SVG) is obtained, replace site/assets/waysen-logo.svg and redeploy.

### STEP 3 — Deploy process note
When redeploying in future: after zip extract, always re-upload contact.php directly:
```
curl -F 'dir=/home/waysenco/public_html' -F 'file-1=@site/contact.php' \
  -H 'Authorization: cpanel waysenco:TOKEN' \
  https://waysen.co.uk:2083/execute/Fileman/upload_files
```
