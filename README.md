# Cultured Pearl — Official Wix Headless Web Platform

A production-ready, fully dynamic web application for **Cultured Pearl**, a 501(c)(3) nonprofit organization dedicated to empowering women through faith, education, sisterhood, and community service. Powered by a high-performance **React 18 + TypeScript + Vite** frontend directly integrated with **Wix Headless APIs, Wix CMS, Wix Events, Wix Forms v4, and Wix CRM**.

---

## 🌐 Live Deployment & Dashboard

- **Live Production URL:** [https://headless-myhqhhixfom-cmsscaleup-140a.wix-site-host.com](https://headless-myhqhhixfom-cmsscaleup-140a.wix-site-host.com)
- **Wix Site ID (`metaSiteId`):** `6f7426b7-afd2-4e14-84db-49d2395b4ee7`
- **Wix Admin Dashboard:** [https://manage.wix.com/dashboard/6f7426b7-afd2-4e14-84db-49d2395b4ee7](https://manage.wix.com/dashboard/6f7426b7-afd2-4e14-84db-49d2395b4ee7)

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework:** React 18 with TypeScript
- **Bundler & Build Tool:** Vite (ESM code splitting with custom vendor chunking)
- **Styling & Design System:** Tailwind CSS with custom OKLCH color spaces (`pearl`, `sand`, `espresso`, `gold`, `gold-soft`)
- **Typography:** Cormorant Garamond (display/serif) and Karla (clean sans-serif)
- **Routing:** React Router v6 with `HashRouter` for zero-configuration static hosting compatibility
- **Icons:** Lucide React
- **Backend / Headless Engine:** Official Wix APIs (`https://www.wixapis.com`)
  - **Wix Data / CMS v2:** Real-time collection querying with 5-minute memory + sessionStorage caching
  - **Wix Events v3:** Live event catalog querying, RSVP dispatching, and category sorting
  - **Wix Forms v4 & CRM:** Direct form submissions with automatic Contact upsertion in Wix CRM
  - **Wix eCommerce & Payments:** Tiered donation processing and magazine print/digital reservations

---

## 📁 Key Project Structure

```
c:\Project\Wix\cultured-pearl-wix\
├── dist/                      # Production build output uploaded to Wix Hosting
├── src/
│   ├── components/            # Reusable UI components (Button, Header, Footer, Section, Eyebrow)
│   ├── pages/                 # Full application views:
│   │   ├── Home.tsx           # Hero, mission, live Wix Events, Wix CMS Testimonials
│   │   ├── About.tsx          # Organization history, scripture foundations, founder feature
│   │   ├── MeetTheTeam.tsx    # Live dynamic team directory connected to Wix CMS TeamMembers
│   │   ├── Debutante.tsx      # Signature Debutante Ball program & registration form
│   │   ├── Scholarship.tsx    # Purposeful Life Scholarship criteria & application packet modal
│   │   ├── Events.tsx         # Live Wix Events catalog with search, category filtering & RSVP
│   │   ├── EventDetail.tsx    # Individual event details & interactive RSVP form
│   │   ├── GetInvolved.tsx    # 4 ways to serve & live Wix CRM Volunteer Application
│   │   ├── Give.tsx           # Interactive giving portal ($25-$500 + custom), one-time vs monthly
│   │   ├── Shop.tsx           # Cultured Pearl Magazine store with interactive checkout modal
│   │   ├── Gallery.tsx        # Responsive photo gallery with full-screen lightbox modal
│   │   ├── Videos.tsx         # Keynote & sermon video archive
│   │   ├── Blog.tsx           # Faith & sisterhood articles
│   │   └── Contact.tsx        # General inquiries & prayer requests connected to Wix Forms v4
│   ├── services/
│   │   ├── wixClient.ts       # Centralized Wix Headless API client (CMS, Forms, Events, Cache)
│   │   └── wixEvents.ts       # Wix Events service wrapper
│   └── data/
│       ├── catalog.ts         # Static curated defaults and fallback catalogs
│       └── team.ts            # Default leadership bios for offline fallback
├── CMS-SCHEMA.md              # Complete CMS data dictionary & collection specifications
├── WIX-INTEGRATION.md         # Wix Headless architecture, API endpoints, and authentication
├── CLIENT-DASHBOARD-GUIDE.md  # Non-technical client guide for managing dashboard content
└── README.md                  # This file
```

---

## 🚀 Development & Build Workflows

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### Local Development
```bash
# Install dependencies
npm install

# Run local Vite development server
npm run dev
```

### Production Build
```bash
# Type check and bundle for production
npm run build

# Preview production build locally
npm run preview
```

---

## 🔒 Security & Client Boundaries

- **Public Credentials Only:** Frontend queries utilize client-safe headers (`wix-site-id: 6f7426b7-afd2-4e14-84db-49d2395b4ee7`). No admin keys or elevated API secrets are exposed to the browser.
- **Fail-Safe Offline Resilience:** If the Wix API encounters transient network delays or rate limits, the UI falls back seamlessly to pre-seeded local data without crashing or showing blank layouts.
- **Input Sanitization:** All forms enforce strict string trimming, email regex validation, and character limits prior to network dispatch.
- **Tax Notice:** Standard 501(c)(3) compliance disclosures are featured across all donation portals and receipt confirmations.
