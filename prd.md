# Product Requirements Document (PRD)

## Project: Raman Kumar Tiwari — Personal Engineering & AI Portfolio
**Document Version:** 1.0.0  
**Status:** Active / Production  
**Owner:** Raman Kumar Tiwari  
**Repository:** `tiwariraman884/RamanPortfolio`  
**Target URL:** [tiwariraman.dev](https://tiwariraman884.github.io/RamanPortfolio/) (or custom deployment domain)

---

## 1. Executive Summary & Vision

### 1.1 Purpose
The purpose of this web application is to serve as the definitive personal digital presence, interactive engineering showcase, and professional portfolio for **Raman Kumar Tiwari**—a Computer Science & Engineering student at Roorkee Institute of Technology, full-stack software engineer, hackathon competitor, and AI developer.

### 1.2 Core Objective
To transcend standard developer templates by delivering an editorial, high-performance, and visually immersive web experience. The website blends precision brutalist and luxury-minimalist typography with real-time 3D graphics (Three.js), inertia-based smooth scrolling (Lenis), tactile micro-interactions (Framer Motion), and a signature oversized kinetic typography footer inspired by high-end design firms like Bending Spoons.

### 1.3 Key Metrics for Success
- **First Impression & Brand Perception:** Instant communication of technical depth, aesthetic sophistication, and attention to detail.
- **Conversion Rate:** High engagement on primary actions (Contact form submission, Resume download, LinkedIn / GitHub profile visits).
- **Core Web Vitals:** Sub-second First Contentful Paint (FCP), Lighthouse Performance score > 90, zero layout shifts (CLS < 0.05).
- **Zero Friction:** Seamless responsive experience spanning mobile (390px), tablet (820px), desktop (1440px), and ultrawide displays.

---

## 2. Target Audience & User Personas

| Persona | Primary Goal | What They Care About | Key Portfolio Touchpoints |
|---|---|---|---|
| **Tech Recruiters & Talent Acquisition** | Quickly assess role fit, qualifications, and core competencies | Education, current status, verified credentials, clean resume access, immediate contact channel | Hero status pill, Resume download button, Certifications, Contact section |
| **Engineering Managers & Tech Leads** | Evaluate code quality, technical depth, and problem-solving maturity | Architectural decisions, full-stack complexity, GitHub activity, live demos, and real impact | Projects deep dives, GitHub activity graph, Capabilities matrix |
| **Hackathon Organizers & Collaborators** | Gauge rapid prototyping ability, teamwork, and innovation track record | Hackathon placements, national rankings, problem-solving mindset | Recognition section, Hackathons timeline, Philosophy |
| **Industry Peers & Clients** | Explore ideas, initiate contract/consulting work, network | Design execution, aesthetic refinement, reliable response time | 3D Network canvas, Contact form with SLA indicator |

---

## 3. Technology Stack & Architecture

### 3.1 Architecture Overview
The application is structured as a client-side Single Page Application (SPA) with dynamic code-splitting, lazy evaluation of below-the-fold components, and lightweight serverless API integration.

```
Client Tier:
┌────────────────────────────────────────────────────────┐
│                        App.jsx                         │
├──────────────────────────┬─────────────────────────────┤
│ Synchronous Above-Fold:  │ Asynchronous Below-Fold:    │
│  - Navbar                │  - About                    │
│  - Hero                  │  - Philosophy               │
│  - CustomCursor          │  - Status                   │
│  - Three.js Background   │  - Projects & ProjectDetails│
│                          │  - Experience               │
│                          │  - Recognition              │
│                          │  - Certifications           │
│                          │  - Capabilities             │
│                          │  - GitHub Activity          │
│                          │  - Contact                  │
│                          │  - Footer & Wordmark        │
└──────────────────────────┴─────────────────────────────┘
                             │
                      API & Integrations
                             ▼
               Resend Serverless Email Service
```

### 3.2 Technology Matrix
- **Runtime & Build Tool:** [Vite 8](https://vitejs.dev/) — instantaneous HMR, optimized ESM bundling, zero-overhead static export.
- **Core Framework:** [React 19](https://react.dev/) (`react`, `react-dom`) — concurrent rendering, modern hooks.
- **Motion & Interactions:** [Framer Motion 13](https://motion.dev/) — declarative spring physics, scroll-triggered viewport animations, layout transitions.
- **Smooth Inertia Scrolling:** [Lenis](https://lenis.darkroom.engineering/) — normalized momentum scrolling integrated with `requestAnimationFrame`.
- **3D Graphics & Canvas:** [Three.js](https://threejs.org/) + [@react-three/fiber](https://r3f.docs.pmnd.rs/) + [@react-three/drei](https://github.com/pmndrs/drei) — background particle and node network reacting to cursor coordinates.
- **Icons:** [Lucide React](https://lucide.dev/) — lightweight, consistent SVG iconography.
- **Email Delivery:** [Resend SDK](https://resend.com/) — reliable direct dispatch for contact form submissions.
- **Styling Architecture:** Pure Vanilla CSS with a global design token architecture (`src/index.css`) for maximum layout control, zero runtime CSS-in-JS overhead, and ultra-crisp responsive clamp calculations.

---

## 4. Visual Design System & Aesthetics

### 4.1 Color Tokens
The design adheres to a dark luxury palette featuring high-contrast typography, deep ambient dark backgrounds, and warm gold accents:

| Token Name | Hex / Value | Usage |
|---|---|---|
| `bg-primary` | `#080808` / `#050505` | Canvas, page background, deep spatial depth |
| `surface-glass` | `rgba(255, 255, 255, 0.03)` | Card containers, interactive hover overlays |
| `border-subtle` | `rgba(255, 255, 255, 0.08)` | Hairline dividers, card outlines, geometric grid lines |
| `accent-gold` | `#d2b27b` | Primary accent, animated wordmark, active highlights, key metrics |
| `text-primary` | `#f5f5f7` | Headings, hero display copy, primary labels |
| `text-secondary` | `#a1a1a6` | Body text, descriptions, metadata |
| `text-muted` | `#6e6e73` | Dates, section indices (`01`, `02`), copyright copy |

### 4.2 Typography Hierarchy
- **Editorial Headings & Quotes:** Georgia, serif (`"Build with purpose. Create something that matters."`)
- **Interface & Technical Copy:** Modern system sans stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`) with tight letter-spacing (`-0.02em` to `-0.05em`).
- **Signature Footer Wordmark:** Scaled with `clamp(2.8rem, 9.2vw, 9rem)`, `font-weight: 800`, uppercase, tight tracking (`-0.045em`), and gold tone (`#d2b27b`).

### 4.3 Micro-Physics & Motion Philosophy
- **Inertial Momentum:** Lenis provides cinematic scroll velocity (`duration: 1.2s`, custom exponential ease).
- **Clip-Mask Reveals:** Major display typography emerges from overflow-hidden clipping containers rather than simple opacity fades.
- **Interactive Stacking:** Cards and rows leverage subtle hover transforms, border luminosity increases, and cursor-following particle distortions.

---

## 5. Functional Requirements by Component & Section

### 5.1 Global Utilities & Layout (`App.jsx`)
- **Dynamic Code-Splitting:** Above-the-fold assets (`Navbar`, `Hero`, `NetworkBackground`, `CustomCursor`) load synchronously. All below-the-fold modules are wrapped in React `Suspense` with an invisible non-flashing fallback (`SectionFallback`).
- **Smooth Scroll Loop:** Continuous RAF loop binding Lenis to browser ticks.
- **Routing:** Built-in pathname switch handling `/projects/:id` project detail pages versus standard home view.

### 5.2 Header & Navigation (`Navbar.jsx`)
- **Positioning:** Fixed top header with glassmorphism backdrop blur.
- **Navigation Links:** Smooth anchor links to `#about`, `#projects`, `#experience`, `#recognition`, `#contact`.
- **Status Indicator:** Live pulse indicator signaling current engineering availability.
- **Resume Access:** Direct link to cloud-hosted PDF resume with `target="_blank"`.

### 5.3 3D Spatial Canvas (`three/NetworkBackground.jsx`)
- Interactive constellation of points and connecting lines rendered in WebGL.
- Interpolates camera perspective and particle orientation based on cursor movements.
- Dynamically throttles tick overhead when scrolled out of view or on low-power devices.

### 5.4 Custom Cursor (`CustomCursor.jsx`)
- Sleek circular follower cursor that smoothly tracks mouse coordinates with trailing physics.
- Contextual state scaling: expands and inverts over interactive elements, project cards, and action links.
- Automatically disables on touch-enabled devices (`hover: none`).

### 5.5 Section 00: Hero (`Hero.jsx`)
- High-impact greeting, title, and specialization tags.
- Animated status pill: *"Available for Summer 2026 Opportunities & High-Impact Projects"*.
- Quick action buttons: *"Explore Projects →"* and *"Get in Touch"*.

### 5.6 Section 01: About (`About.jsx`)
- Educational profile: 2nd Year B.Tech Computer Science & Engineering student at Roorkee Institute of Technology (RIT).
- Narrative framing of engineering motivations, transitioning from theoretical computer science to shipping production AI and full-stack software.
- Staggered viewport entrance animation using custom cubic bezier curves.

### 5.7 Section 02: Philosophy (`Philosophy.jsx`)
- Core engineering axioms: building around real-world constraints, prioritizing reliability over hype, iterative refinement.
- High-contrast typography layout with hairline grid accents.

### 5.8 Section 03: Status & Focus (`Status.jsx`)
- Real-time indicator of current technical pursuits:
  - Deepening Full-Stack foundations (Next.js, TypeScript, PostgreSQL)
  - Advancing AI / Machine Learning pipelines and LLM tooling
  - Continuous Data Structures & Algorithms mastery

### 5.9 Section 04: Projects & Deep Dives (`Projects.jsx`, `ProjectDetails.jsx`)
- Curated showcase of flagship engineering deliverables (e.g., MediBridge, AI diagnostic tools, developer utilities).
- Each project card features:
  - Project Title & Problem Statement
  - Technology stack tags
  - External GitHub repository and live deployment links
  - Deep-dive routing trigger opening dedicated `ProjectDetails` view with architectural breakdown.

### 5.10 Section 05: Experience (`Experience.jsx`)
- Chronological timeline of technical leadership, developer internships, and student organization contributions.
- Clear role breakdown, deliverables, technologies utilized, and quantifiable impact metrics.

### 5.11 Section 06: Recognition & Hackathons (`Recognition.jsx`)
- Structured list of national hackathons, rankings, and awards:
  - **GFG × RIT Hackathon:** 3rd Place (Team MediBridge)
  - **HackOcean 2026:** National Frontend Hackathon
  - **Google Solution Challenge 2026:** Participant
  - **Q-Hackathon 2026:** 36-Hour Innovation Sprint, Quantum University
  - **IBM Z Datathon:** Team Lead (5-member ML/Backend squad)
  - **Smart India Hackathon:** Rank 1302
  - **Aester Alpha AI Summit:** Top 30
- Verified LinkedIn post proof links for authenticated third-party validation.

### 5.12 Section 07: Certifications (`Certifications.jsx`)
- Categorized professional credentials across AI, Cloud, Frontend, and Security.
- Includes credential ID, issuing organization, issuance date, and credential verification modal/link.

### 5.13 Section 08: Capabilities (`Capabilities.jsx`)
- High-density matrix of competencies organized into distinct domains:
  - **Frontend Engineering:** React, Next.js, TypeScript, TailwindCSS, Three.js, Framer Motion
  - **Backend & Systems:** Node.js, Express, Python, REST APIs, GraphQL, PostgreSQL, MongoDB
  - **AI / ML & Tooling:** PyTorch, Scikit-learn, LangChain, Hugging Face, Vector Databases
  - **Developer Operations & Core:** Git, Docker, Linux, CI/CD, Agile, Postman

### 5.14 Section 09: GitHub Activity (`GithubActivity.jsx`)
- Real-time visualization of GitHub contribution calendar and repository metrics.
- Reinforces consistency, commit frequency, and open-source contribution patterns.

### 5.15 Section 10: Inquiries & Contact (`Contact.jsx`)
- Direct contact gateway with high-touch user experience:
  - Form fields: Name, Email, Subject, Message.
  - Interactive validation and error prevention.
  - Integration with Resend for direct inbox notification.
  - Direct communication fallback options: Email (`tiwariraman884@gmail.com`), LinkedIn, GitHub.

### 5.16 Section 11: Editorial Footer (`Footer.jsx`)
- **Top Utility Navigation:** Clean anchor jumps (`SEND MESSAGE →`, `LINKEDIN →`, `GITHUB →`, `DOWNLOAD RESUME →`) and SLA response time badge (*"RESPONSE WITHIN 24 H · IST"*).
- **Editorial Quotation & Attribution:** Georgia serif display quote: *"Build with purpose. Create something that matters."* attributed to `— RAMAN KUMAR TIWARI`.
- **Bottom Bar:** Origin timestamp (*"RAMAN KUMAR TIWARI — ROORKEE, INDIA · 2026"*), social icon links, and smooth `TOP ↑` scroll trigger.

---

## 6. Non-Functional Requirements & Performance

### 6.1 Performance Standards
- **Initial Bundle Size:** Core JS < 150 KB (gzipped), dynamic chunks loaded on demand.
- **Image & Asset Optimization:** WebP format, responsive `srcset`, inline SVG symbols for zero network request overhead.
- **Frame Rate:** Sustained 60 FPS animation execution across Lenis scroll, Three.js canvas, and Framer Motion transitions.

### 6.2 Accessibility (a11y) & Usability
- **Semantic Structure:** Proper document hierarchy (`<main>`, `<section>`, `<article>`, `<header>`, `<footer>`, single `<h1>`).
- **Screen Reader Support:** Animated display spans marked with `aria-hidden="true"`, accompanied by accessible parent container `aria-label="Raman Kumar Tiwari"`.
- **Keyboard Traversal:** Visible focus rings on all interactive anchors, buttons, and form inputs.
- **Graceful Motion Handling:** Fluid, non-jarring transitions designed to look polished regardless of hardware or platform.

### 6.3 Cross-Browser & Device Matrix
- **Browsers:** Chrome 120+, Firefox 120+, Safari 17+, Edge 120+.
- **Breakpoints:**
  - Mobile Small/Standard: `360px – 480px`
  - Tablet Portrait: `481px – 820px`
  - Desktop Standard: `1024px – 1440px`
  - Large / Ultrawide: `1440px – 2560px+`

---

## 7. Quality Assurance, Testing & Automation Suite

The codebase incorporates automated QA test scripts in root `.mjs` modules utilizing Playwright/Puppeteer automation patterns:
- **`qa-modes.mjs`**: Evaluates wordmark reveal behavior across viewport aspect ratios (mobile 390x844, tablet 820x1180, desktop 1440x900), tracking transform values, visibility percentage, and zero horizontal scroll overflow.
- **`qa-scroll.mjs` & `qa-progress.mjs`**: Validates Lenis smooth scroll synchronization, scroll position tracking, and viewport intersection trigger thresholds.
- **`qa-wordmark.mjs` & `qa-spoons*.mjs`**: Verifies typography clipping physics, ease timing, and letter/word bounding rect integrity.
- **Linting & Code Integrity:** Strict ESLint configuration (`npm run lint`) ensuring clean React 19 hook lifecycles, zero unused variables, and valid HTML nesting.

---

## 8. Deployment & CI/CD Pipeline

- **Hosting Platform:** Vercel / GitHub Pages.
- **Build Command:** `npm run build`
- **Output Directory:** `dist/`
- **Continuous Deployment:** Automated build and preview deployments triggered on git push to `main` branch.

---

## 9. Future Roadmap & Iterations

1. **Interactive Case Studies (Phase 2):** Expand project pages with interactive sandbox demos and live architectural sequence diagrams.
2. **AI Chat Assistant (Phase 3):** Embed an interactive Gemini-powered portfolio assistant answering recruiter questions about Raman's background, code repositories, and schedule.
3. **Blog & Engineering Notes (Phase 4):** Lightweight MDX-based technical writing section detailing hackathon post-mortems and AI experiments.
