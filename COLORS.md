# ADM Labworks — Color Reference

> A complete guide to every color used across the website.  
> File location: `J:\Website - ADM\globals.css`

---

## 1. Primary Palette

| Name | Hex | Where it's used |
|---|---|---|
| **Pitch Black** | `#000000` | Body background, overlays, scrollbar track, hero/portfolio fade-bottom endpoints |
| **Dark Card** | `#0a0a0a` | Service card, process card, portfolio card, service project card backgrounds |
| **Card Hover** | `#0d0d0d` | Service card hover background |
| **Dark Select** | `#0B0B0B` | Contact select dropdown options, checkbox background |
| **Pure White** | `#FFFFFF` | Body text colour, hover text (buttons/links), hover backgrounds (mobile nav/social/hero anchors), SVG fill in hamburger/close icons |
| **Cyan** | `#00DEFF` | **Primary accent** — used everywhere: borders, glows, icons, text highlights, hover states, focus rings, scrollbar |
| **Light Cyan** | `#ABF9FF` | Text gradient stop (paired with white) for hero title, mobile marquee, service page title, contact heading |
| **Rotating Cyan** | `#C5F8FF` | About page rotating text colour |
| **Silver** | `#D6D6D6` | Hero subtitle text |
| **Muted Gray** | `#7A7A7A` | Contact page legal/privacy text |
| **Error Red** | `#ff4444` | Form validation error message |
| **Checkbox Border** | `#3b3b3b` | Checkbox default border |

---

## 2. Background Colors

| Name | Value | Component |
|---|---|---|
| Body | `#000000` | Body, `html` |
| Header (initial) | `rgba(0, 0, 0, 0)` | Header — fully transparent on load |
| Header nav pill wrap | `rgba(50, 50, 50, 0.1)` | Header nav background pill |
| Primary button | `rgba(255,255,255,0.02)` | `btn-primary`, mobile header inner |
| Accent button | `rgba(0, 237, 255, 0.45)` | `btn-accent`, contact submit (slightly greener than `#00DEFF`) |
| Service card | `#0a0a0a` | `.service-card` |
| Service card hover | `#0d0d0d` | `.service-card:hover` |
| Service card arrow | `rgba(0,222,255,0.08)` | `.service-card-arrow` |
| Service card arrow hover | `rgba(0,222,255,0.1)` | `.service-card-arrow:hover` |
| Process card | `#0a0a0a` | `.process-card` |
| Portfolio card | `#0a0a0a` | `.portfolio-card` |
| Social button | `rgba(255,255,255,0.05)` | `.social-btn` |
| Social button hover | `rgba(0,222,255,0.1)` | `.social-btn:hover` |
| Filter button | `rgba(255,255,255,0.05)` | `.portfolio-filter-btn` |
| Hero anchor link | `rgba(255,255,255,0.05)` | `.hero-anchor-link` |
| Mobile nav link | `rgba(255,255,255,0.02)` | `.mobile-nav-list-link` |
| Mobile nav link hover | `#FFFFFF` | `.mobile-nav-list-link:hover` |
| Mobile social icon | `rgba(255,255,255,0.03)` | `.mobile-nav-social-icon` |
| Mobile social icon hover | `#FFFFFF` | `.mobile-nav-social-icon:hover` |
| Contact input | `rgba(255,255,255,0)` | Contact form input fields (transparent) |
| Contact select | `#0B0B0B` | Contact select option background |
| Contact checkbox | `#0B0B0B` | Contact checkbox background |
| Service page card hover | `radial-gradient(...)` | See gradients section |

---

## 3. Text / Foreground Colors

| Name | Value | Elements |
|---|---|---|
| Body text | `#FFFFFF` | Default text colour |
| Primary button text | `#FFFFFF` | `btn-primary` |
| Primary button hover text | `#000000` | `btn-primary:hover`, `btn-accent:hover`, submit hover |
| Section labels | `rgba(255,255,255,0.5)` | `.section-label` |
| Section title accent (em) | `#00DEFF` | `.section-title em` |
| Card descriptions | `rgba(255,255,255,0.5)` | Service cards, process cards, portfolio cards |
| Service keyword text | `rgba(255,255,255,0.5)` | `.service-card-keyword` |
| Keywords label | `rgba(255,255,255,0.3)` | `.service-card-keywords-label` |
| Service card number (watermark) | `rgba(0,222,255,0.08)` | `.service-card-number` |
| Service card list icons | `#00DEFF` | `.service-card-list li svg` |
| Service card arrow | `#00DEFF` | `.service-card-arrow` |
| Service card arrow hover text | `#000000` | `.service-card-arrow:hover` (SVG fill) |
| Process step number | `#00DEFF` | `.process-step-num` |
| Process step description | `rgba(255,255,255,0.5)` | `.process-step-desc` |
| Process subheading | `rgba(255,255,255,0.35)` | `.process-step-sub` |
| Process deliverables | `rgba(255,255,255,0.5)` | `.process-deliverable` |
| Process deliverable bullets | `#00DEFF` | `.process-deliverable::before` |
| Footer copyright | `rgba(255,255,255,0.5)` | `.footer-copy` |
| Footer social icons | `rgba(255,255,255,0.5)` | `.footer-social-icon` |
| Footer social hover | `#00DEFF` | `.footer-social-icon:hover` |
| Social sidebar icons | `rgba(255,255,255,0.6)` | `.social-btn` SVG fill |
| Breadcrumbs | `rgba(255,255,255,0.5)` | `.breadcrumb-text`, `.breadcrumb-link` |
| Breadcrumb separator | `rgba(255,255,255,0.2)` | (separator character) |
| Breadcrumb hover | `#00DEFF` | `.breadcrumb-link:hover` |
| Page title em | `#00DEFF` | `.page-title em` |
| Filter buttons (default) | `rgba(255,255,255,0.6)` | `.portfolio-filter-btn` |
| Filter buttons (active/hover) | `#00DEFF` / `#FFFFFF` | `.portfolio-filter-btn.active`, `.portfolio-filter-btn:hover` |
| Portfolio card category | `#00DEFF` | `.portfolio-card-cat` |
| Service project card category | `#00DEFF` | `.service-project-card-cat` |
| Service project card desc | `rgba(255,255,255,0.5)` | `.service-project-card-desc` |
| Service page card title | gradient | See gradients |
| Service page card desc | `rgba(255,255,255,0.5)` | `.service-page-card-desc` |
| Service page features check | `#00DEFF` | Checkmark SVG in features list |
| Hero subtitle | `#D6D6D6` | `.hero-subtitle` |
| Hero dynamic word | `#C5F8FF` | `.hero-dynamic-word` (rotating role) |
| About rotating text | `#C5F8FF` → originally, change to `#00DEFF` if desired | `.about-rotating-text` |
| Contact description | `#FFFFFF` | `.contact-desc` |
| Contact input text | `#FFFFFF` | Contact form input text |
| Contact placeholder | `rgba(255,255,255,0.3)` | Contact form placeholder |
| Contact legal | `#7A7A7A` | Privacy/legal text |
| Contact checkbox label | `#00DEFF` | Checkbox label |
| Form error | `#ff4444` | `.contact-error` |
| Mobile nav link text | `#FFFFFF` | `.mobile-nav-list-link` |
| Mobile nav link hover text | `#000000` | `.mobile-nav-list-link:hover` |
| Mobile nav social icon | `rgba(255,255,255,0.6)` | Mobile menu social icons |
| Mobile nav social hover | `#000000` | Mobile menu social icons hover |
| Portfolio empty state | `rgba(255,255,255,0.4)` | No-results message |
| Hero anchor link text | `rgba(255,255,255,0.6)` | `.hero-anchor-link` |
| Hero anchor link hover text | `#000000` | `.hero-anchor-link:hover` |
| Contact hero button hover text | `#000000` | `.contact-hero-btn:hover` |

---

## 4. Border Colors

| Value | Components |
|---|---|
| `rgba(255,255,255,0.06)` | Service card, process card, portfolio card, service page card, service project card, footer top divider, service card footer divider |
| `rgba(255,255,255,0.1)` | Service card keyword, portfolio filter button, hero anchor link, mobile nav social icon |
| `rgba(255,255,255,0.15)` | Social sidebar button |
| `rgba(255,255,255,0.19)` | Primary button, mobile header inner, mobile nav list link, contact field, contact submit |
| `rgba(255,255,255,0.25)` | Portfolio filter button hover |
| `rgba(255,255,255,0.3)` | Header nav pill wrap, hero scroll mouse border |
| `#00DEFF` | Social button hover, button primary hover, service card arrow hover, footer social hover, filter button active, contact field focus, checkbox checked |
| `rgba(0,222,255,0.06)` | (Same as white 0.06 — used on cyan borders) |
| `rgba(0,222,255,0.2)` | Service card arrow, service project card link hover |
| `rgba(0,222,255,0.25)` | Mobile responsive: service card, process card, service page card (≤768px) |
| `rgba(0,222,255,0.3)` | Service project card hover, portfolio card hover |
| `rgba(0,222,255,0.32)` | Service card hover border |
| `rgba(0,222,255,0.9)` | Cursor `.hover` state border |
| `#FFFFFF` | Hero anchor link hover, contact hero button hover |
| `#3b3b3b` | Checkbox default border |

---

## 5. Shadows & Glows

| Value | Component | Notes |
|---|---|---|
| `0 0 20px rgba(0,222,255,.95)` | Cursor `.cur` | Layer 1 glow |
| `0 0 80px rgba(0,222,255,.7)` | Cursor `.cur` | Layer 2 glow |
| `0 0 200px rgba(0,222,255,.45)` | Cursor `.cur` | Layer 3 glow |
| `0 0 400px rgba(0,222,255,.25)` | Cursor `.cur` | Layer 4 glow |
| `0 0 600px rgba(0,222,255,.1)` | Cursor `.cur` | Layer 5 glow |
| `0 0 20px rgba(0,222,255,.8)` | Cursor `.hover`, `.text` | Hover/text glow layer 1 |
| `0 0 60px rgba(0,222,255,.4)` | Cursor `.hover` | Hover glow layer 2 |
| `0 0 40px rgba(0,222,255,.4)` | Cursor `.text` | Text glow layer 2 |
| `0 0 10px rgba(0,222,255,.8)` | Cursor `.text` | Text glow layer 1 |
| `0px 0px 25px -5px #00DEFF` | `btn-accent` | Default button glow |
| `0px 0px 35px -5px #00DEFF` | `btn-accent:hover` | Hover button glow |
| `rgba(0,222,255,0.3)` | `social-btn:hover` | Box shadow |
| `inset 0 0 0 1px rgba(0,222,255,0.14), 0 8px 32px rgba(0,0,0,0.95)` | Service card hover | Inset ring + drop shadow |
| `0 10px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.3)` | Process card | Multi-layer shadow |
| `0 0 10px rgba(0,222,255,.8)` | Header nav text-shadow | Applied on hover |

---

## 6. Gradients

| Gradient | Used On |
|---|---|
| `linear-gradient(30deg, #ABF9FF 30%, #FFFFFF 75%)` | Hero title, mobile marquee, service page card title, contact heading |
| `linear-gradient(30deg, #FFFFFF 30%, #ABF9FF 75%)` | CTA marquee text, CTA rotator slides, portfolio title |
| `linear-gradient(90deg, transparent 0%, #00DEFF 50%, transparent 100%)` | Service card hover accent bar (`::before`) |
| `radial-gradient(at top center, #00DEFF29 0%, #00DEFF00 55%)` | Service page card hover overlay |
| `linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.1) 100%)` | Hero overlay, portfolio hero overlay |
| `linear-gradient(to bottom, transparent 0%, #000000 100%)` | Hero fade-bottom |
| `linear-gradient(transparent 0%, #000 100%)` | Portfolio fade-bottom |

### Mask Gradients (clip masks, not visual colour)

| Mask | Used On |
|---|---|
| `linear-gradient(90deg, transparent 20%, #000 30%, #000 70%, transparent 80%)` | CTA marquee wrap (fade edges) |
| `linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)` | Mobile marquee wrap (fade edges) |

---

## 7. Opacity Scale

### White `rgba(255,255,255,…)` — for text depth

| Opacity | Name / Usage |
|---|---|
| `0.02` | Minimal — btn bg, mobile header bg, nav link bg |
| `0.03` | Micro — mobile social icon bg |
| `0.05` | Subtle — social-btn bg, filter btn bg, anchor link bg |
| `0.06` | Faint — card borders, dividers, inset shadow |
| `0.1` | Light — keyword borders, filter btn borders, anchor borders |
| `0.15` | Soft — social sidebar borders |
| `0.19` | Visible — primary button borders, contact field borders |
| `0.2` | Dim — breadcrumb separator text |
| `0.25` | Muted — filter btn hover border |
| `0.3` | Medium — nav pill borders, scroll mouse border, placeholder text |
| `0.35` | Semi-muted — process subheading text |
| `0.4` | Faded — portfolio empty state text |
| `0.5` | Half — labels, descriptions, breadcrumbs, keywords, footer |
| `0.55` | Strong — service page card desc hover |
| `0.6` | Bold — social icons, filter btn text, mobile nav icons |

### Cyan `rgba(0,222,255,…)` — for accent depth

| Opacity | Usage |
|---|---|
| `0.08` | Arrow bg, watermark number |
| `0.1` | Social btn hover bg, cursor glow edge |
| `0.14` | Service card hover inset ring |
| `0.2` | Arrow border, project link hover |
| `0.25` | Cursor click bg, mobile card borders |
| `0.3` | Card hover borders, social shadow |
| `0.32` | Service card hover border |
| `0.35` | Cursor hover bg |
| `0.4` | Cursor/text glow (outer), header nav text-shadow |
| `0.45` | btn-accent / submit background — note: uses `rgba(0,237,255,0.45)` (slightly greener) |
| `0.5` | (not used) |
| `0.6` | (not used) |
| `0.7` | Cursor glow (outer layer 2) |
| `0.8` | Cursor text bg, glow |
| `0.9` | Cursor hover border |
| `0.95` | Cursor glow core |

---

## 8. Scrollbar

| Element | Colour |
|---|---|
| Track | `#000000` |
| Thumb | `#00DEFF` |

---

## 9. Inline SVG Colours (in TSX files)

These are hardcoded in SVG elements, not in CSS:

| Colour | File | Element |
|---|---|---|
| `white` | `Header.tsx:32-34` | Hamburger icon `<rect>` fill (3 bars) |
| `white` | `MobileMenu.tsx:28` | Close button cross `<path>` stroke |

All other SVGs use `fill="currentColor"` and inherit from CSS parent text colour.
