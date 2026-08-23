# Favor Charles Owuor — Software Engineering Portfolio & CMS

A high-performance, dark-themed, and interactive portfolio web application built with **React 18**, **Vite**, **Tailwind CSS**, and **Framer Motion**, backed by a cloud-synchronized **Supabase CMS**.

Designed with a cyber-neon aesthetic, smooth page-level route transitions, interactive CLI terminal, ambient cursor lighting, filterable project ecosystem, and comprehensive developer profile derived from real-world engineering at **Zone01 Kisumu**.

---

## ⚡ Highlights & Key Features

- **Cyber-Neon Dark Aesthetic**: Tailored obsidian backgrounds (`#08080C`), radiant neon gradients, custom text glows (`.neon-signal`, `.neon-cobalt`, `.neon-violet`, `.neon-cyan`), and animated laser beams.
- **Interactive Ambient Lighting**: Dynamic cursor spotlight (`CursorSpotlight.jsx`) tracking viewport interaction with smooth radial neon glows.
- **Interactive In-Browser CLI Terminal**: Embedded command-line terminal on the landing page supporting quick command chips and interactive inputs (`whoami`, `skills`, `projects`, `education`, `contact`, `help`, `clear`).
- **Dynamic Projects Showcase (Dual Links)**:
  - Supports both **Live Deployed Demos** (with direct launch badges) and **GitHub Source Code** repositories for every project.
  - **Draft / Visibility Controls**: Easily hide in-progress or polishing projects from the public site with a single toggle in the `/admin` portal.
  - Interactive category filtering (`All`, `Full-Stack`, `Distributed Systems`, `AI & FinTech`, `Utilities`).
  - Real-time search by technology/tag (`Go`, `PostgreSQL`, `React`, `Gemini AI`, etc.).
  - Expandable technical engineering highlights drawn directly from the developer's architecture logs and CV.
- **Categorized Technical Matrix & Education**:
  - Domain-separated skill categories (Backend & Systems, Frontend & UI, Databases & DevOps, AI & Data Engineering) with glowing interactive badges.
  - Peer-to-peer software engineering background at Zone01 Kisumu, BSc Statistics & Programming foundations, and certifications.
- **Interactive Contact Deck**:
  - One-click copy email button with celebratory canvas confetti and animated validation.
  - Quick mailto launcher and direct social channels (GitHub, LinkedIn).
- **Cinematic Route Transitions**: Powered by Framer Motion's `AnimatePresence` with coordinated scale, blur, and slide transitions across all routes.
- **Live Cloud CMS (`/admin`)**: Edit Hero, About, Skills, Projects (including dual Live + GitHub URLs, technical highlights, and Work-in-Progress draft visibility toggles), and Contact information with real-time Supabase persistence.

---

## 🛠️ Technology Stack

- **Frontend Core**: React 18, Vite 5, React Router DOM 6
- **Styling**: Tailwind CSS 3 (custom neon glow tokens, obsidian color space, cyber grid textures)
- **Animations & Motion**: Framer Motion 11 (`AnimatePresence`, spring transitions, gesture hover effects, layout animations)
- **Icons & Micro-interactions**: Lucide React, Canvas Confetti
- **Backend & Database (CMS)**: Supabase (PostgreSQL + Row-Level Security + Auth)

---

## 📁 Project Structure

```
portfolio/
├── index.html                  # HTML entrypoint with Bebas Neue, Inter, and IBM Plex Mono fonts
├── vite.config.js              # Vite bundler configuration
├── tailwind.config.js          # Custom colors (ink, cobalt, violet, signal, cyan, amber) & animations
├── package.json
└── src/
    ├── main.jsx                # Application root mounting ContentProvider and Router
    ├── App.jsx                 # Main layout with Navbar, Footer, CursorSpotlight, and Route Transitions
    ├── index.css               # Neon utilities, scrollbars, glowing text shadows, cyber grid
    ├── components/
    │   ├── Navbar.jsx          # Sticky nav with glowing active tab indicators and mobile drawer
    │   ├── Footer.jsx          # Responsive footer with social channels
    │   ├── CursorSpotlight.jsx # Ambient radial gradient following user cursor
    │   ├── InteractiveTerminal.jsx # Interactive in-browser CLI terminal
    │   ├── PageWrapper.jsx     # Cinematic page transition container
    │   ├── ProjectCard.jsx     # Card component with dual live/github links & highlights
    │   ├── StatusBadge.jsx     # Pulsing neon emerald availability badge
    │   ├── SectionLabel.jsx    # Terminal prompt with blinking cursor
    │   └── AnimatedReveal.jsx  # Scroll-triggered viewport animations
    ├── pages/
    │   ├── Landing.jsx         # Hero showcase, stats, interactive CLI, featured projects
    │   ├── About.jsx           # Engineering narrative, domain skill matrix, education timeline
    │   ├── Projects.jsx        # Filterable project catalog with live & github links
    │   ├── Contact.jsx         # Contact deck with email copier, confetti, and social links
    │   └── Admin.jsx           # Protected CMS panel for live content editing
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

### Deploying to Vercel / Netlify / Cloudflare Pages

1. Push your code to GitHub.
2. Import the repository in your hosting dashboard (e.g. Vercel).
3. Set the `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` environment variables in the project settings.
4. Deploy!

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
