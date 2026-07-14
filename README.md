# Laser Clauss — Portfolio

Personal portfolio site built with **React + Vite + TypeScript**, styled with **Tailwind CSS 4**, and centered on an **interactive 3D desk diorama** rendered with **Three.js / react-three-fiber**.

Repo: [Lasercl/html-portofolio](https://github.com/Lasercl/html-portofolio) — deployed automatically to GitHub Pages on every push to `main`.

## Features

- **Interactive 3D hero** — a hand-modeled desk scene (lamp, laptop, mouse, chair, phone, wall frame, power strip) built from geometric primitives, based on a dimensioned blueprint (`picturefor3d.png`, 1 unit = 10 cm). Desk objects are clickable hotspots: clicking one flies the camera to a close-up tied to a section of the site (laptop → projects, phone → contact, wall art → about, …). A row of view chips below the scene reaches every viewpoint by button, which is also the path used on touch devices. Auto-rotate runs in overview and user input always cancels camera animation.
- **Data-driven projects** — all project content lives in a single typed array (`src/data/projects.ts`). The projects grid (with category filter + text search), the detail pages, and the featured section on Home all render from it; adding a project means adding one entry.
- **Live repo dates** — project detail pages fetch each repo's last-pushed date from the GitHub REST API (unauthenticated, so subject to rate limits).
- **SPA routing on GitHub Pages** — `react-router-dom` routes with a `404.html` fallback copied at build time so deep links work on Pages.
- **Dark glassmorphism theme** — purple/violet accent, gradient text, glass cards, and `framer-motion` animations.

## Pages

| Route | Page |
|---|---|
| `/` | Home — hero (3D scene), about, skills, experience (incl. Samsung R&D Institute Indonesia), featured projects |
| `/projects` | Full project grid with category filter and text search |
| `/projects/:id` | Project detail — images with zoom overlay, links, related projects, share button |
| `/contact` | Contact |

Unknown routes redirect to `/`.

## Tech stack

- [React 19](https://react.dev/) + [Vite](https://vite.dev/) + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- [Three.js](https://threejs.org/) with [@react-three/fiber](https://r3f.docs.pmnd.rs/) and [@react-three/drei](https://drei.docs.pmnd.rs/)
- [react-router-dom](https://reactrouter.com/) · [framer-motion](https://motion.dev/) · [oxlint](https://oxc.rs/)

## Getting started

```bash
npm install
npm run dev       # start the Vite dev server
```

Other scripts:

```bash
npm run build     # type-check (tsc -b) + production build; copies dist/index.html → dist/404.html
npm run preview   # preview the production build locally
npm run lint      # oxlint
```

## Project structure

```
src/
  main.tsx                  # BrowserRouter (basename from Vite BASE_URL)
  App.tsx                   # Routes + shared Layout
  index.css                 # Tailwind import, theme, component utilities
  data/projects.ts          # single source of truth for all project content
  types/project.ts
  hooks/
    useLastPushDate.ts      # GitHub API last-pushed date
    useScrollPosition.ts    # navbar shrink-on-scroll
  components/
    layout/                 # Navbar, Footer, Layout
    three/
      HeroScene.tsx         # canvas, hotspots, camera director, parallax rig
      heroViews.ts          # single source of truth for 3D viewpoints (camera pos, captions, CTAs)
      desk/                 # Desk, Lamp, Laptop, Mouse, Chair, Phone, WallFrame, PowerStrip, constants
    projects/               # ProjectCard, ProjectGrid, ProjectFilters, ProjectLinks, RelatedProjects, ImageZoomOverlay
    ui/                     # SectionHeading, SkillBar, TimelineItem
  pages/                    # Home, Projects, ProjectDetail, Contact
public/
  images/                   # project screenshots + photos
  pdf/                      # CV and portfolio PDFs
```

### Adding or editing a project

Edit `src/data/projects.ts` — each entry has an `id`, `title`, `details`, image paths (`path`/`path2`/`path3` pointing into `public/images/`), `category`, `client`, `objective`, `tools`, an `apiLastDate` GitHub API URL, and optional `demoLink` / `githubLink` / `prototypeLink`. The grid, detail page, and featured section pick it up automatically.

### Tuning the 3D scene

Viewpoints (camera position, orbit target, chip label, caption, CTA) live in `src/components/three/heroViews.ts` — add or adjust a viewpoint there without touching scene code. The desk models themselves are in `src/components/three/desk/`.

## Deployment

`.github/workflows/deploy.yml` builds and deploys `dist/` to GitHub Pages on every push to `main` (or manually via *workflow_dispatch*). The `postbuild` step copies `index.html` to `404.html` so client-side routes resolve. If you host the site under a sub-path instead of a domain root, set `base` in `vite.config.ts` accordingly (currently `'/'`).

## Legacy site

The original no-build, multi-page static HTML/Tailwind-CDN version of this portfolio is preserved under `legacy/`. It is not part of the build; see `MIGRATION_PLAN.md` for the full migration plan and `.docs/` for design documentation (e.g. the interactive 3D hero redesign).
