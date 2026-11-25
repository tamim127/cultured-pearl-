# Cultured Pearl - React + TypeScript Conversion

This project is a conversion of **[Cultured Pearl](https://cultured-pearl-revamp.lovable.app)** to **React + TypeScript + Tailwind CSS + Vite**.

## 📖 Overview & Analysis

**Cultured Pearl** is a faith-based 501(c)(3) sisterhood organization founded in 2017 that embraces, encourages, and celebrates women through scripture teaching, seminars, community outreach, and the Purposeful Life Scholarship.

### Design System & Theme
- **Typography:**
  - Display / Headings: `Cormorant Garamond` (classic serif, italicized accents)
  - Body / Subtext: `Karla` (clean sans-serif)
- **Color Palette:**
  - `pearl`: `oklch(98.5% 0.006 90)` (Soft warm pearl white `#FBF9F5`)
  - `sand`: `oklch(94.5% 0.017 86)` (Warm linen sand `#F2ECE1`)
  - `espresso`: `oklch(31% 0.011 70)` (Deep earthy dark brown `#2C2623`)
  - `gold`: `oklch(68.8% 0.106 84)` (Rich gold `#C59B27`)
  - `gold-soft`: `oklch(84% 0.062 88)` (Subtle gold highlight `#E7C970`)
  - `background`: `oklch(97.7% 0.013 88)`
  - `foreground`: `oklch(26.8% 0.01 70)`
- **Key Visual Elements:**
  - Gradient veil (`.veil`): layered translucent overlay over full-bleed hero and banner images.
  - Golden horizontal divider (`.rule-gold`): small accent rule under section titles.
  - Subheaders (`.eyebrow`): tracked uppercase category pills.

### Pages & Routes
1. **Home (`/`)**:
   - Hero banner with full-bleed photography, mission statement, and quick actions.
   - "Who we are" introducing the metaphor of the cultured pearl formed under intentional conditions.
   - "Our name" feature quoting Proverbs 31:25 with oyster pearl photography.
   - "What we do" 3-column breakdown (Teaching, Sisterhood, Outreach).
   - "Gather with us" upcoming events schedule.
   - Community action callout with direct link to give.
2. **About (`/about`)**:
   - Organization background, scripture grounding (Proverbs 31:25–26, Zechariah 13:9).
   - "How we gather" values (Embrace, Encourage, Celebrate).
   - Founder & leadership feature for Sharonda Savoy with contact button.
3. **Sisterhood (`/sisterhood`)**:
   - Programs overview:
     - 01 Daughters of the King
     - 02 Seminars (Biblical life skills, finances, counseling)
     - 03 Purposeful Life Scholarship (with link to external application)
     - 04 Community Outreach
   - "Find a gathering" invitation banner.
4. **Events (`/events`)**:
   - Structured list of gatherings (e.g. *KingsDaughters* in Ocean City, *Community Day*).
   - RSVP and details links.
   - Partnership / Host invitation section.
5. **Give (`/give`)**:
   - Donation impact breakdown ($25 seminar materials, $100 care packages, $500 scholarship contribution).
   - 501(c)(3) tax-exempt status information and contact links.
6. **404 (`*`)**:
   - Clean, branded Not Found page.

---

## 🛠️ Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + PostCSS
- **Routing:** React Router DOM (v6)
- **Icons:** Lucide React

---

## 🚀 Getting Started

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```
