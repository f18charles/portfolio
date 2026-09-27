# Favor Charles Owuor — Software Engineering Portfolio & CMS

A high-performance, dark-themed, and interactive portfolio web application built with **React 18**, **Vite**, **Tailwind CSS**, and **Framer Motion**, backed by a cloud-synchronized **Supabase CMS**.

Designed with a calm, content-first dark theme, subtle page-level route transitions, an interactive CLI terminal, a filterable project ecosystem, an articles section, hobbies, and a comprehensive developer profile derived from real-world engineering at **Zone01 Kisumu**.

---

## ⚡ Highlights & Key Features

- **Restrained Dark UI**: A calm, content-first theme on near-black surfaces (`#0b0c12`) with a single blue accent, flat card surfaces, readable type, and no gradients, glows, blurs, or decorative motion.
- **Accessible by Default**: Skip-to-content link, visible focus rings, `prefers-reduced-motion` support, higher-contrast text, and a minimum 11–12px label size.
- **Professional Photo Hero**: A clean framed portrait (`me.png`) with a caption nameplate, plus a matching portrait on the About page — both served from a CMS-controlled `photoUrl`.
- **Résumé / CV, PDF-first**: A print-ready `/resume` page with **Print / Save as PDF**, plus direct **PDF** and **DOCX** downloads. The PDF (`/Favor_Charles_Owuor_Resume.pdf`) is the default `resumeUrl`; links appear in the navbar, hero, About, Contact, footer, and CLI.
- **Social Channels**: GitHub and LinkedIn (verified from the CV) shown everywhere; **Dev.to** and **X** fields are blank by default and only render once a real URL is set in `/admin`, so the site never links to a placeholder.
- **Interactive In-Browser CLI Terminal**: A dedicated landing-page section (kept out of the hero) supporting quick command chips and interactive inputs (`whoami`, `skills`, `projects`, `articles`, `education`, `contact`, `resume`, `help`, `clear`).
- **Personal vs. Team Projects**: Every project carries a `type` (e.g. `Personal`, `Team`, `Internal`) rendered as a badge and filterable on the Projects page alongside category and tech search.
- **Signal over fluff**: Cards surface each project's **date/period**, **role**, and concrete **impact metrics** (e.g. `5 REST resources`, `~30% of commits`, `Race-detector tested`) where verified from the CV.
- **Dynamic Projects Showcase (Dual Links)**:
  - Supports both **Live Deployed Demos** (with direct launch badges) and **GitHub Source Code** repositories for every project.
  - **Draft / Visibility Controls**: Easily hide in-progress or polishing projects from the public site with a single toggle in the `/admin` portal.
  - Interactive category filtering (`All`, `Full-Stack`, `Distributed Systems`, `AI & FinTech`, `Utilities`).
  - Real-time search by technology/tag (`Go`, `PostgreSQL`, `React`, `Gemini AI`, etc.).
  - Expandable technical engineering highlights drawn directly from the developer's architecture logs and CV.
- **Articles & Writing Section (opt-in)**: A `/articles` route with tag filters and keyword search. Article entries are **hidden by default** with empty URLs, so the section and its nav link stay hidden until a real post URL is set in `/admin` — no dead links for recruiters.
- **Hobbies & Interests**: An icon-grid of relevant hobbies on both the landing page and About page (`Open Source`, `Chess`, `Public Speaking`, `Football & Running`, `Reading`, `Music`), fully editable in the CMS.
- **Categorized Technical Matrix & Education**:
  - Domain-separated skill categories (Backend & Systems, Frontend & UI, Databases & DevOps, AI & Data Engineering) with muted, readable badges.
  - Peer-to-peer software engineering background at Zone01 Kisumu, BSc Statistics & Programming foundations, and certifications.
- **Interactive Contact Deck**:
  - One-click copy email button with a small, user-triggered confirmation burst.
  - Quick mailto launcher plus a full channel grid (Email, GitHub, LinkedIn, Dev.to, X, Résumé).
- **Subtle Route Transitions**: Powered by Framer Motion's `AnimatePresence` with short fade/slide transitions across routes (no blur).
- **Live Cloud CMS (`/admin`)**: Edit Hero (including professional photo + résumé URL), About (bio, skills, hobbies), Skills, Projects (including type, dual Live + GitHub URLs, technical highlights, and Work-in-Progress draft visibility toggles), Articles (CRUD, source, tags, visibility), and Contact/social channels with real-time Supabase persistence.

---

## 🛠️ Technology Stack

- **Frontend Core**: React 18, Vite 5, React Router DOM 6
- **Styling**: Tailwind CSS 3 (custom obsidian color space, flat card surfaces, single blue accent)
- **Animations & Motion**: Framer Motion 11 (`AnimatePresence`, subtle hover and layout animations)
- **Icons & Micro-interactions**: Lucide React, Canvas Confetti
- **Backend & Database (CMS)**: Supabase (PostgreSQL + Row-Level Security + Auth)

---

## 📁 Project Structure

```
portfolio/
├── index.html                  # HTML entrypoint with Inter + IBM Plex Mono fonts & SEO/OG meta
├── vite.config.js              # Vite bundler configuration
├── tailwind.config.js          # Colors (ink, cobalt, violet, signal, cyan, amber) & type scale
├── package.json
├── me.png                      # Professional photo (also served from /public/me.png)
├── public/
│   ├── favicon.svg
│   ├── me.png                  # CMS-default professional photo
│   ├── Favor_Charles_Owuor_Resume.pdf   # CMS-default downloadable résumé (PDF)
│   └── Favor_Charles_Owuor_Resume.docx  # DOCX alternative
└── src/
    ├── main.jsx                # Application root mounting ContentProvider and Router
    ├── App.jsx                 # Main layout with Navbar, Footer, skip link, and route transitions
    ├── index.css               # Base theme, flat card surfaces, focus/print styles
    ├── components/
    │   ├── Navbar.jsx          # Sticky nav with active indicator, résumé link and mobile drawer
    │   ├── Footer.jsx          # Rich footer with navigation, socials and résumé
    │   ├── InteractiveTerminal.jsx # Interactive in-browser CLI terminal
    │   ├── PageWrapper.jsx     # Subtle page transition container
    │   ├── ProjectCard.jsx     # Card with type badge, dates/role, metrics and dual links
    │   ├── ArticleCard.jsx     # Article card with source badge, tags, date & read time
    │   ├── StatusBadge.jsx     # Availability badge
    │   ├── SectionLabel.jsx    # Terminal-style section label
    │   ├── Icons.jsx           # Brand icons (GitHub, LinkedIn, Dev.to, X)
    │   └── AnimatedReveal.jsx  # Scroll-triggered viewport animations
    ├── pages/
    │   ├── Landing.jsx         # Hero (photo + résumé), stats, featured projects, CLI, hobbies
    │   ├── About.jsx           # Narrative, photo, skill matrix, education, attributes & hobbies
    │   ├── Projects.jsx        # Filterable catalog by scope (Personal/Team) + category + search
    │   ├── Articles.jsx        # Tag-filterable, searchable writing archive
    │   ├── Contact.jsx         # Contact deck, channel grid, copy-email confirmation
    │   ├── Resume.jsx          # Print/ATS-friendly résumé with Print-to-PDF + PDF/DOCX downloads
    │   └── Admin.jsx           # Protected CMS panel for live content editing (incl. articles & hobbies)
    ├── context/
    │   └── ContentContext.jsx  # Supabase synchronization & fallback data provider
    ├── data/
    │   └── defaultContent.js   # Built-in starting data from developer CV
    └── lib/
        └── supabaseClient.js   # Supabase client initializer
```

---

## 🚀 Getting Started Locally

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- npm or yarn

### 2. Installation

Clone or navigate into the project directory:

```bash
cd /d/FCO/Coding/portfolio/portfolio
npm install
```

### 3. Environment Variables (Optional for Supabase CMS)

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Set your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

> **Note:** If no `.env` file is present, the portfolio automatically uses the built-in fallback data in `src/data/defaultContent.js`, allowing the site to run immediately offline or without Supabase.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🗄️ Supabase CMS Setup (One-Time)

To enable live editing from `/admin`:

1. Create a free project at [supabase.com](https://supabase.com).
2. In the **SQL Editor**, run:

   ```sql
   create table content (
     id text primary key,
     data jsonb not null,
     updated_at timestamptz default now()
   );

   insert into content (id, data) values ('site', '{}');

   alter table content enable row level security;

   -- Public read access for portfolio visitors
   create policy "public read" on content
     for select using (true);

   -- Write access restricted to authenticated admin
   create policy "auth write" on content
     for all using (auth.uid() is not null)
     with check (auth.uid() is not null);
   ```

3. In **Authentication → Users**, create an admin user (email + password).
4. Navigate to `/admin` on your website, sign in, and update any content. Changes update instantly across all connected clients.

---

## 📦 Building & Deploying

### Build for Production

```bash
npm run build
```

The optimized static assets will be written to the `dist/` directory.

### Deploying to Vercel (Recommended)

1. **Push your repository** to GitHub/GitLab.
2. **Import Project** in [Vercel Dashboard](https://vercel.com/new).
3. **Framework Preset**: Vercel will automatically detect `Vite`.
4. **Environment Variables**: Add your Supabase project keys in **Project Settings → Environment Variables**:
   - `VITE_SUPABASE_URL`: `https://your-project-ref.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: `your-anon-public-key`
5. **Deploy**: Click **Deploy**. SPA route rewrites are handled automatically via [`vercel.json`](./vercel.json).

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
