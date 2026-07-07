# Migrate html-portofolio to React + Vite + Three.js (react-three-fiber)

## Context

The site is currently a static, no-build multi-page HTML/Tailwind-CDN/vanilla-JS portfolio. The user wants a meaningfully better-designed version built as a real React app (Vite + npm), with a from-scratch interactive 3D scene (built with react-three-fiber) as the hero centerpiece, replacing the current abstract particle/torus-knot background. The 3D scene is based on `picturefor3d.png`, a dimensioned blueprint of a desk setup (lamp, laptop, mouse, desk, chair, wall frame, phone, power strip) — the blueprint is construction reference (shapes + cm dimensions), not a texture to be mapped onto anything.

Confirmed scope decisions (already made with the user, do not re-litigate):
- Full site migrated, but only the **core portfolio**: Home (hero/about/skills/experience/featured-projects), Projects grid, Project detail, Contact. `movie-ranking.html`, `birthday-invite_backup.html` (a course exercise, never wired into the site), `public/js/MainPage.js` + `public/css/MainPage.css` (confirmed dead — `index.html` has no `aboutme`/`container2`/`buttonback` refs), and `public/css/contact.css` (orphaned, unused) are all excluded and archived, not ported.
- Stack: React + Vite, TypeScript project with `allowJs: true` (pragmatic mix — write new code in `.tsx`, don't force strict rigor), `react-router-dom` SPA with routes `/`, `/projects`, `/projects/:id`, `/contact` sharing one layout (navbar + 3D mount) — no page reloads between routes.
- 3D: `@react-three/fiber` + `@react-three/drei`, hand-built primitive geometry (not a GLTF import) docked inside the Hero section only (not a fixed full-page canvas), with OrbitControls (bounded), idle auto-rotate, and mouse-parallax.
- Deployment: keep publishing to the same GitHub Pages URL (`https://lasercl.github.io/html-portofolio/`), including setting up a GitHub Actions auto-deploy workflow as part of this work.

## Execution approach

Implementation will run under the current model (Sonnet 5) for structural/mechanical steps (scaffolding, data layer, routing, hooks, deployment config), but design-critical steps — the 3D hero scene (Step 5) and Tailwind/global visual styling (Step 6), plus the optional polish pass (Step 8) — will be delegated to sub-agents running on the Fable 5 model, per the user's request to use Fable 5 especially for design work. Each such agent will be briefed with the relevant blueprint/style context from this plan so it can work independently, and its output will be reviewed before moving to the next step.

## Step 0 — Write plan doc, then archive legacy static site

First action on approval: write this plan verbatim to `MIGRATION_PLAN.md` at the repo root, committed alongside the code, so it's a persistent reference for this session's sub-agents (especially the Fable 5 design agents) and for future contributors — not just the ephemeral internal plan file.

Then move the current root static site into `legacy/` as one atomic move so all relative paths inside those files stay valid:
- `git mv` all root `.html` files (incl. all `*_backup.html`, `about.html`) plus `public/js/`, `public/css/`, `assets/` → `legacy/`
- Leave `.git`, `.vscode`, `CLAUDE.md`, `README.md`, `picturefor3d.png` at root.
- Do not delete `legacy/` until the new site is verified live (Step 9) — then remove it in a follow-up commit.

## Step 1 — Scaffold Vite app at root

- `npm create vite@latest . -- --template react-ts`
- `tsconfig.app.json`: add `"allowJs": true`
- Install: `react-router-dom`, `three @react-three/fiber @react-three/drei`, `-D @types/three`, `-D tailwindcss @tailwindcss/vite`, `-D shx` (for the Pages `404.html` postbuild copy). Optional: `framer-motion` for Step 8 polish only.
- Copy (not move) only what's actually referenced from `legacy/assets/` into the new `public/`:
  - all `path`/`path2`/`path3` images + `foto profile.jpg` → `public/images/`
  - only `CVNEW_10Mei2026.pdf` and `portfolio.pdf` (the only two actually linked) → `public/pdf/`
- Keep Google Fonts `<link>` tags and the FontAwesome Kit `<script>` tag in the new root `index.html` `<head>` — no need for `@fontsource`/`@fortawesome/react-fontawesome` packages, the CDN approach already works fine with JSX `className`.

## Step 2 — Folder structure

```
src/
  main.tsx                      # BrowserRouter basename="/html-portofolio"
  App.tsx                       # Routes + Layout
  index.css                     # Tailwind import + @theme + @layer components
  types/project.ts
  data/projects.ts              # ported from legacy/public/js/data.js, typed
  hooks/useLastPushDate.ts      # replaces detailProject.js's getLastPushDate()
  hooks/useScrollPosition.ts    # navbar shrink-on-scroll
  components/
    layout/{Navbar,Footer,Layout}.tsx
    three/HeroScene.tsx
    three/desk/{constants,Desk,Lamp,Laptop,Mouse,Chair,WallFrame,Phone,PowerStrip}.tsx
    projects/{ProjectCard,ProjectGrid,ProjectFilters,RelatedProjects,ImageZoomOverlay,ProjectLinks}.tsx
    ui/{SectionHeading,SkillBar,TimelineItem}.tsx
  pages/{Home,Projects,ProjectDetail,Contact}.tsx
```

## Step 3 — Data layer

Port `legacy/public/js/data.js`'s 13-entry array into `src/data/projects.ts` verbatim (same fields), typed via `src/types/project.ts`. Rewrite `path`/`path2`/`path3` from `./assets/images/x.png` to `/images/x.png`. Don't restructure `category` into an array — both old renderers just `.split(",")` it inline; keep that.

`useLastPushDate(apiUrl)` hook replaces the inline `getLastPushDate()`/fetch in `detailProject.js` — same unauthenticated GitHub REST call, same date formatting, returns `"-"` on failure/invalid date, same as today.

## Step 4 — Component logic mapping

| Old (DOM-ID driven) | New (React) |
|---|---|
| `project.js` render + `#query`/`#projects` filter listeners | `Projects.tsx`: controlled state + `useMemo` filtered list → `ProjectGrid`/`ProjectFilters` |
| `detailProject.js` `URLSearchParams` + `getElementById(...).innerText=` | `ProjectDetail.tsx`: `useParams<{id}>()`, `find`, JSX binding; **add** a redirect to `/projects` when no match (old page just went blank — small correctness fix) |
| `renderLinks()` string concat | `ProjectLinks.tsx` — conditional anchors per non-empty field |
| `zoomImage()` + `#overlay` globals | `ImageZoomOverlay.tsx` — local `useState<string\|null>` |
| `#shareBtn` handler | inline `navigator.share` handler in `ProjectDetail.tsx`, same try/catch |
| `renderProjects(data, id)` related strip | `RelatedProjects.tsx` — filter out current id, `.slice(0,4)` |
| Navbar mobile toggle + scroll-shrink `classList` mutation | `Navbar.tsx` — `useState` + `useScrollPosition()` driving className |
| Featured-projects grid on Home (currently: hardcoded Movie Ranking card + ids 2 and 4, with an empty 4th slot) | Replace with a curated `FEATURED_IDS` constant pulling straight from `data/projects.ts` (drop the out-of-scope Movie Ranking card, fill all 4 slots with real entries) |

## Step 5 — 3D hero scene (`src/components/three/desk/*`)

Hand-built primitives, `1 unit = 10cm` scale from the blueprint's callouts (shade 35cm height, laptop 32×22cm, mouse 12×7cm, desk ~78×55cm):
- **Lamp**: bell-profile shade (`LatheGeometry` or tapered `CylinderGeometry`), ring "frame" (`TorusGeometry`), tripod-leg base, emissive bulb `SphereGeometry` + `PointLight` tinted brand purple `#8b5cf6` (not the blueprint's literal warm tone — ties it to the site's glow language)
- **Laptop**: base + screen boxes in a hinged `Group`, screen open ~100–110°, generic glowing logo dot (no trademarked mark)
- **Mouse**: capsule/sphere body on a flat mat plane
- **Desk**: top box + leg/drawer boxes, `EdgesGeometry`/`LineSegments` overlay per box for crisp linework (not a fully wireframe scene — needs to read as a solid centerpiece)
- **Chair**, **WallFrame**, **Phone**, **PowerStrip** (with a `useFrame`-driven pulsing emissive LED) round out the blueprint's remaining callouts
- All `MeshStandardMaterial`, dark slate bases + purple rim/point lighting matching `.glass`/`.glow-text`

**Mount**: `HeroScene.tsx`'s `<Canvas>` lives inside the Hero section only (bounded height), not a fixed full-viewport backdrop — keeps the detailed scene legible against later glass-card content, scopes WebGL/OrbitControls scroll-capture to one element, and allows dropping to `frameloop="demand"` once scrolled past. Replace the old full-page ambience elsewhere on the page with a cheap CSS blurred-gradient-blob treatment instead of a second WebGL context.

**Interactivity**: `<OrbitControls enablePan={false}>` with clamped `min/maxDistance` and `min/maxPolarAngle`, slow `autoRotate` that pauses on pointer-down, a mouse-parallax tilt on the rig via `useFrame` lerp as an idle fallback, optional hover-emissive highlight on the laptop/lamp. On small viewports, cap `dpr` and consider disabling drag (auto-rotate only) for performance.

## Step 6 — Tailwind + global styles

Tailwind v4 via `@tailwindcss/vite` (CSS-first config, no `tailwind.config.js` needed):

```ts
// vite.config.ts
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({ plugins: [react(), tailwindcss()], base: "/html-portofolio/" });
```

`src/index.css` centralizes what today is duplicated inline on every page: `@theme` block for `--color-primary: #6d28d9`, `--color-secondary: #1e1b4b`, `--font-sans: "Outfit", sans-serif`; `@layer base` for body/scrollbar styles; `@layer components` for `.glass`, `.glass-card` (+hover), `.glow-text`, `.glow-text-subtle` — ported verbatim from the current inline `<style>` blocks.

## Step 7 — Routing & in-page anchors

`BrowserRouter basename="/html-portofolio"` (not `HashRouter` — Home's `#about`/`#skills`/`#projects` anchors need the hash for scroll purposes, which would conflict with a hash-based router). On `Home.tsx`, a `useEffect` watching `location.hash` calls `scrollIntoView({behavior:"smooth"})` on the matching element; navbar Home/About/Skills/Projects links render as `<Link to="/#about">` etc.; Contact/Projects nav items are real route links (`<Link to="/contact">`).

## Step 8 — Polish (optional, don't over-scope)

Scroll-reveal via `framer-motion` on section entrances, refined project grid hover states. This is secondary to the 3D centerpiece — keep section copy/content as-is, this is visual polish only.

## Step 9 — GitHub Pages deployment

- `vite.config.ts`: `base: "/html-portofolio/"`
- `main.tsx`: `BrowserRouter basename="/html-portofolio"`
- `package.json`: `"postbuild": "shx cp dist/index.html dist/404.html"` (GH Pages has no server rewrite; this lets deep-link refreshes fall through to the SPA router)
- `.github/workflows/deploy.yml`: build + `actions/upload-pages-artifact` + `actions/deploy-pages` on push to `main` (standard modern Vite+Pages approach, no `gh-pages` package, no manual `dist/` commits)

## Step 10 — Remove legacy/

Only after Step 9's live GH Pages deploy is verified working end-to-end.

## Verification plan (run after each relevant step, not just at the end)

- Step 1–2: `npm run dev`, confirm Tailwind utility classes render, router navigates across all 4 routes incl. browser back/forward and direct URL entry to `/projects`
- Step 3: temporarily assert `projects.length === 13` and log one `useLastPushDate` result
- Step 4: walk all 13 project ids in `/projects/:id`, including ones with empty `demoLink`/`prototypeLink` (ids 1,3,4,6,7,9,10,11,12,13) to confirm conditional link rendering; hit a non-existent id to confirm the redirect; exercise search + category filter combinations
- Step 5: confirm OrbitControls drag doesn't hijack outer page scroll, camera bounds don't clip into geometry, auto-rotate resumes after interaction, rough FPS sanity check (temporary drei `<Stats/>`, removed before shipping)
- Step 6: visually diff each page against the current `legacy/` HTML for the ported sections
- Step 9: `npm run build && npm run preview` locally with the real `base` first; after pushing, click every route on the live GH Pages URL and hard-refresh on a deep route like `/projects/2` to confirm the `404.html` fallback; confirm PDFs/images/GitHub API calls resolve from the deployed origin

## Critical files to read/port from during implementation
- `legacy/public/js/data.js` — project data source
- `legacy/public/js/detailProject.js` — detail-page logic to port
- `legacy/public/js/project.js` — grid/filter logic to port
- `legacy/index.html` — hero/about/skills/experience content + inline styles to port
- `picturefor3d.png` — 3D scene dimensional reference
