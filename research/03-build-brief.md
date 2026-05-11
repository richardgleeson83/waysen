# Build Brief — Waysen Ltd Website Rebuild

## Project Overview
Rebuild waysen.co.uk as a modern, clean static HTML/CSS/JS website. Hosted on cPanel, connected to GitHub for version control and auto-deployment.

---

## Design Direction

### Color Palette
| Role | Color | Hex |
|------|-------|-----|
| Primary | Deep Green | #3D8C27 |
| Dark | Forest Green | #1A3A12 |
| Medium | Olive Green | #4A5240 |
| Light BG | Pale Green | #F0F5EC |
| White | Pure White | #FFFFFF |
| Text | Dark Charcoal | #2C2C2C |
| Muted Text | Grey | #666666 |
| Border | Light Grey | #E5E7E2 |

### Typography
- **Headings:** Montserrat — Bold, tight tracking, uppercase for section labels
- **Body:** Inter — 16px/1.6 line-height, clean and readable
- Both loaded via Google Fonts

### Photography Style
- Clean product shots on white/neutral backgrounds
- Community/lifestyle photography for blog
- Brand logos on clean white cards

### Animation Direction
- Smooth fade-up on scroll (IntersectionObserver)
- Subtle hover lifts on cards (transform: translateY(-4px))
- Smooth nav transitions
- No heavy animations — clean and fast

### What to AVOID
- Heavy background colors on hero (use gradient over image or solid dark green)
- Cluttered layouts
- Placeholder dummy text (info@yourwebsite.com etc)
- Template-looking cards without breathing room

---

## Site Architecture

### Pages
| Page | Purpose |
|------|---------|
| / (index.html) | Main landing: Hero, About, Portfolio, Blog preview, Contact |
| /blog/ | Blog listing with 3 articles |
| /blog/local-football-team-sponsorship.html | Full article |
| /blog/smaralfalfa-progreso.html | Full article |
| /blog/recyclable-packaging.html | Full article |
| /404.html | Custom not found page |

### Navigation
- Logo (left) → links to homepage
- Nav links (right): Portfolio, Blog, Contact
- Mobile: Hamburger menu

### Footer
- Logo, tagline
- Quick links
- Contact details (address, phone, email, company reg)
- Copyright

---

## Homepage Sections (in order)

1. **Hero** — Full viewport, dark green gradient, headline, tagline, CTA "Let's Talk"
2. **About/Stats** — 3 stats (nationwide dispatch, repeat business, UK trade accounts) + paragraph
3. **Portfolio/Brands** — Grid of 4 brand cards with logo, description, "Visit website" link
4. **Blog Preview** — 3 most recent articles in card grid
5. **Contact** — Full contact section with form (name, email, phone, message) + contact details

---

## Content Framework

### Homepage Headline Options
1. "Where Excellence Meets Growth" (original — keep it)
2. "Your UK Gateway to International Brands"
3. "Connecting World-Class Brands to UK Retailers"

### Value Proposition Structure
- Hook: Bold headline
- Sub: "UK distributor connecting quality international brands to retailers nationwide"
- Stats: Weekly dispatches | Repeat business | UK trade accounts
- CTA: "Let's Talk"

### SEO Keyword Targets
- "UK distributor" 
- "UK product distribution"
- "import products UK"
- "UK retail trade accounts"
- "pet product distributor UK"

---

## Conversion Playbook
- **Primary CTA:** "Let's Talk" → smooth scroll to contact form
- **Secondary CTA:** "Visit Website" on brand cards
- **Lead Capture:** Contact form (name, email, phone, message)
- **Social Proof:** Brand logos (VanCat, RoCat, Smaralfalfa, Pomza)
- **Trust Signals:** Company registration number, UK address, phone number, real email

---

## Technical Specs
- **Hosting:** cPanel (shared hosting)
- **Stack:** HTML5, CSS3, Vanilla JS
- **Contact Form:** PHP mail() handler (contact.php)
- **Version Control:** GitHub → cPanel Git Version Control
- **Mobile First:** Responsive breakpoints at 768px, 1024px
- **Images:** User will provide final images; CDN references used as placeholders

---

## Deliverables
- [x] brain.md
- [x] PROJECT_LEDGER.md
- [ ] site/index.html
- [ ] site/css/style.css
- [ ] site/js/main.js
- [ ] site/blog/index.html
- [ ] site/blog/[3 posts].html
- [ ] php/contact.php
- [ ] site/404.html
- [ ] site/sitemap.xml
- [ ] site/robots.txt
- [ ] README.md (deployment instructions)
