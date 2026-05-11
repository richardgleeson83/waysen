# Waysen Ltd — Website

Modern static website for Waysen Ltd (waysen.co.uk). Built with HTML5, CSS3, and vanilla JavaScript. Hosted on cPanel.

## Project Structure

```
site/                    ← Deploy this folder to public_html/
├── index.html           ← Homepage
├── 404.html             ← Custom 404 page
├── sitemap.xml          ← XML sitemap
├── robots.txt           ← Search engine directives
├── .htaccess            ← Apache config (HTTPS, caching, security)
├── css/
│   └── style.css        ← All styles
├── js/
│   └── main.js          ← Nav, animations, contact form
├── php/
│   └── contact.php      ← Contact form email handler
├── blog/
│   ├── index.html       ← Blog listing
│   ├── local-football-team-sponsorship.html
│   ├── smaralfalfa-progreso.html
│   └── recyclable-packaging.html
└── assets/              ← Place your images/logos here
```

## Deployment: GitHub + cPanel

### Step 1 — Create a GitHub repository

1. Go to [github.com](https://github.com) and create a new repository named `waysen-website` (private recommended)
2. In your terminal, from this project folder:

```bash
cd /Users/richardgleeson/Projects/waysen
git init
git add .
git commit -m "Initial Waysen website build"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/waysen-website.git
git push -u origin main
```

### Step 2 — Connect GitHub to cPanel Git Version Control

1. Log in to cPanel (usually `yourdomain.co.uk/cpanel` or via your host's control panel)
2. Find **Git Version Control** (under Files section)
3. Click **Create**
4. Fill in:
   - **Clone URL:** `https://github.com/YOUR_USERNAME/waysen-website.git`
   - **Repository Path:** `/home/YOUR_CPANEL_USERNAME/public_html` (or a subdirectory)
   - **Repository Name:** `waysen-website`
5. Click **Create**

> cPanel will clone your repo. You'll need to provide your GitHub credentials or a Personal Access Token (PAT).

### Step 3 — Set up a GitHub Personal Access Token (PAT)

1. In GitHub, go to **Settings → Developer settings → Personal access tokens → Tokens (classic)**
2. Click **Generate new token**
3. Give it a name, set expiry, check **repo** scope
4. Copy the token — use it as your password when cPanel asks for GitHub credentials

### Step 4 — Configure auto-deployment via cPanel

After connecting the repo, cPanel lets you pull updates manually or set up auto-deploy:

**Manual pull:** Go to Git Version Control → Manage → Pull or Deploy

**Auto-deploy via webhook (optional):**
1. In cPanel Git Version Control, note your **Deploy URL** (under Manage → Deployment)
2. In GitHub repository → **Settings → Webhooks → Add webhook**
3. Paste the deploy URL, set Content-Type to `application/json`, click Add
4. Now every `git push` to `main` auto-deploys to cPanel

### Step 5 — Publish new content

```bash
# Edit files locally, then:
git add .
git commit -m "Update: [describe what changed]"
git push origin main
# If webhook is set up: auto-deploys. Otherwise, pull manually in cPanel.
```

---

## Contact Form Setup

The contact form uses PHP `mail()` which is available on all cPanel servers.

**To configure:**
1. Open `site/php/contact.php`
2. Verify line: `$to = 'martin@waysen.co.uk';` — change if needed
3. Verify line: `$from = 'noreply@waysen.co.uk';` — must be a valid email on your cPanel domain

**To test after deployment:**
1. Visit your site
2. Fill out the contact form
3. Check `martin@waysen.co.uk` inbox (and spam folder)
4. Check your cPanel **Error Logs** if email doesn't arrive: cPanel → Logs → Error Log

**If mail() doesn't work on your host:**
Some hosts block `mail()`. Options:
- Use **SMTP via PHPMailer** (ask your host for SMTP credentials)
- Use a transactional email service (Mailgun, SendGrid, Brevo — all have free tiers)

---

## Replacing Images

The site currently references images from the original WordPress CDN. To use your own:

1. Place images in `site/assets/`
2. Find/replace all instances of:
   ```
   https://waysen.co.uk/wp-content/uploads/2024/03/
   ```
   with:
   ```
   /assets/
   ```
3. Rename your files to match (or update the src attributes directly)

**Key images to replace:**
| Image | File | Used in |
|-------|------|---------|
| Main logo | `waysen-logo.png` | Nav, footer (all pages) |
| VanCat logo | `vancat.png` | Portfolio section |
| RoCat logo | `rocat.png` | Portfolio section |
| Pomza logo | `ponza.png` | Portfolio section |
| About photo | `pexels-photo-1056251...jpg` | About section |
| Football | `vc-football-uai-951x634.jpg` | Blog post |
| Smaralfalfa | `smaralfaprogreso-11...jpg` | Blog post |
| Packaging | `packaging-recycling-uai...jpg` | Blog post |

---

## Favicon

Add a favicon by placing `favicon.ico` or `favicon.png` in `site/` and adding to the `<head>` of each HTML file:

```html
<link rel="icon" type="image/png" href="/favicon.png">
```

---

## Local Development

No build step needed — open `site/index.html` directly in a browser, or serve locally:

```bash
# Python 3
cd site && python3 -m http.server 8000
# Then open: http://localhost:8000
```

> Note: The PHP contact form won't work locally without a PHP server. For local testing, use MAMP, XAMPP, or `php -S localhost:8000` from the `site/` directory.

---

## Checklist Before Going Live

- [ ] Replace all CDN image references with local assets
- [ ] Add favicon
- [ ] Verify contact form sends to correct email
- [ ] Set up HTTPS in cPanel (free via AutoSSL/Let's Encrypt)
- [ ] Test on mobile
- [ ] Submit sitemap to Google Search Console: `https://waysen.co.uk/sitemap.xml`
- [ ] Test contact form end-to-end on live server
