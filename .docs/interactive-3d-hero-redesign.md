# Interactive 3D Hero Redesign

- **Date:** July 12, 2026
- **Branch:** `redesign/interactive-3d-hero` (kept off `main` for review)
- **Commit:** `104277f` — Redesign portfolio with interactive 3D hero and Samsung experience

## Goal

Revamp the portfolio design while keeping the 3D desk diorama, and make the 3D scene
interactive: clicking should change the camera position around the scene. Also add the
new Samsung R&D Institute Indonesia experience with two proof photos.

## What changed

### 1. Interactive 3D hero scene

The desk objects are now clickable hotspots. Clicking one flies the camera to a
close-up of that object; each viewpoint is tied to a section of the site.

| Object | Viewpoint story | Links to |
|---|---|---|
| Laptop | "Where the code happens" | `/projects` |
| Lamp | "Ideas, switched on" | `/#skills` |
| Phone | "Always reachable" | `/contact` |
| Wall art | "A bit about me" | `/#about` |
| Chair | "Take a seat" | `/#skills` (experience) |

Behavior:

- Pulsing beacon markers invite clicks on each object (hidden while that object is focused).
- Clicking the focused object again, clicking the diorama platform, or pressing the
  **Overview** chip flies the camera back out.
- A row of **view chips** (Overview / Laptop / Lamp / Phone / Wall art / Chair) below the
  scene reaches every viewpoint by button — this is the path used on touch devices.
- When a view is focused, a glass caption card appears with a title, blurb, and CTA link;
  in overview a hint pill says "Click a glowing object to explore my desk".
- Auto-rotate runs only in overview and pauses while the camera is traveling or focused.
- If the user grabs the scene mid-flight (OrbitControls `start` event), the fly-to
  animation cancels — user input always wins.

New/changed files:

- **`src/components/three/heroViews.ts`** (new) — the single source of truth for
  viewpoints: id, chip label/icon, caption title/blurb, CTA, camera position, and orbit
  target. Add or tune a viewpoint here; no scene code changes needed.
- **`src/components/three/HeroScene.tsx`** (rewritten) —
  - `Hotspot`: wraps a desk object with an invisible box hit-mesh (reliable clicks
    without per-mesh handlers), a pulsing `Marker` billboard, and pointer cursor.
  - `CameraDirector`: damped-lerps `camera.position` and `controls.target` toward the
    active view each frame; reports "traveling" state up so auto-rotate can pause.
  - `Rig`: mouse-parallax is reduced to 30% strength while a view is focused so
    close-ups stay calm.
  - `OrbitControls` limits loosened for close-ups (`minDistance` 10 → 3,
    `maxPolarAngle` 1.42 → 1.55, `minPolarAngle` 0.55 → 0.35).
  - The component is now controlled: takes `view` + `onViewChange` props from `Home`.

### 2. Samsung R&D experience (with proof photos)

`src/pages/Home.tsx` — the Experience column now leads with two featured cards, each
with a proof photo, badge, role, period, and description:

1. **Contract** — Software Engineer, Mar 30, 2026 – Present
   (`public/images/contract-samsung.jpg`, live green "Present" pulse badge)
2. **Internship · 1 Year** — Software Engineer, Mar 3, 2025 – Feb 28, 2026
   (`public/images/intern-samsung.jpg`)

Each card has a per-image `imagePosition` value so the portrait photos crop to the
subject + Samsung signage instead of the ceiling. The older experience entries
(bootcamp, organizations, volunteering) remain below as glass timeline items.

The hero also gained:

- A green-pulse badge: "Currently at Samsung R&D Institute Indonesia".
- Subtitle changed from "Software Engineering Student" to "Software Engineer".
- A stats row: projects built (computed from `data/projects.ts`), 1+ year at Samsung,
  4+ years of study.

### 3. Design polish

- **`src/index.css`** — new utilities: `.text-gradient` (gradient headline text),
  `.kicker` (uppercase label with gradient dash above section headings), `.bg-grid`
  (faint blueprint grid, radially faded), `.view-chip` (+ `.active`) for the 3D view
  buttons.
- **`src/components/ui/SectionHeading.tsx`** — new optional `kicker` prop; now renders
  a wrapper div (kicker + h2). Only used by `Home`, so no other pages affected.
- **`src/components/layout/Navbar.tsx`** — gradient "LC" logo badge + full name,
  animated gradient underline on nav links, GitHub icon link.
- **`src/components/layout/Layout.tsx`** — background glow orbs now slowly pulse.
- **`src/components/projects/ProjectCard.tsx`** — hover reveals a bottom gradient and a
  "View project →" label; category chips glow on hover.
- **`src/components/layout/Footer.tsx`** — gradient hairline, gradient name, tagline
  ("Built with React, Three.js & Tailwind"), and social icon buttons (GitHub, LinkedIn,
  Instagram, WhatsApp, contact).

### 4. Bug fix

The hero text overlay (`div.relative.z-10.w-full`) was covering the whole hero and
swallowing pointer events, so the 3D scene could never be dragged on desktop. The
overlay is now `pointer-events-none` with `pointer-events-auto` restored on the inner
text block, so orbiting/clicking the scene works everywhere outside the text.

## Verification

- `npm run build` (tsc + vite) passes; `npm run lint` shows only pre-existing warnings
  in `legacy/`.
- Verified in headless Chrome (puppeteer-core) with zero console errors:
  - Overview render, chips, hint pill, stats, Samsung badge.
  - Chip click and **direct 3D click on the laptop** → camera flies to close-up with
    caption card; clicking the laptop again returns to overview.
  - Phone view + caption CTA.
  - Experience cards with corrected photo crops.
  - Mobile viewport (390×844): scene, chips, and hero stack correctly.

## How to preview

```bash
npm run dev
# open the printed localhost URL (5174 during review, since 5173 was in use)
```

To merge after review:

```bash
git checkout main
git merge redesign/interactive-3d-hero
```
