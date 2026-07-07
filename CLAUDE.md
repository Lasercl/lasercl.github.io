# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Laser Clauss's personal portfolio site: a static, no-build multi-page HTML site (no `package.json`, no bundler, no npm scripts). Every page is a standalone `.html` file that pulls in Tailwind, FontAwesome, and Three.js from CDNs via `<script>`/import-map tags in the `<head>` — there is no local build step.

## Running / previewing

There is no dev server or build command. Open the HTML files directly, or use a static file server (the repo includes `.vscode/settings.json` configured for the VS Code "Live Server" extension on port 5501). Since some pages `fetch()` GitHub's API and read `?id=` query params, prefer serving over `file://` when testing project detail pages.

## Architecture

**Pages** (root-level `.html` files): `index.html` (home/about/skills/featured projects), `project.html` (full project grid with search/filter), `detailProject.html` (single project detail, `?id=<n>` query param), `contact.html`, `movie-ranking.html`, `birthday-invite.html`. Each page also has a sibling `*_backup.html` file — these are prior saved versions kept for rollback, not templates to edit; edit the non-backup file.

**Shared assets** live under `public/`:
- `public/css/` — one stylesheet per page (`MainPage.css`, `contact.css`, `movie-ranking.css`, `birthday-invite.css`). No shared/global stylesheet; Tailwind utility classes (loaded via CDN + inline `tailwind.config`) do most of the styling, with these files layering custom effects (glassmorphism, glow text, animations).
- `public/js/` — one script per page, plus `data.js`.

**Project data model**: `public/js/data.js` exports a single `data` array of project objects (id, title, details, image paths `path`/`path2`/`path3`, category, client, objective, tools, `apiLastDate` — a GitHub API repo URL, `demoLink`, `githubLink`, `prototypeLink`). This is the single source of truth for all project content; `project.html` and `detailProject.html` both load `data.js` and render from it instead of hardcoding project markup.
- `project.js` renders the project grid into `#container-flex` and implements the category filter (`#projects` select) and text search (`#query` input) by re-filtering the `data` array and re-rendering.
- `detailProject.js` reads `id` from `window.location.search`, looks up the matching entry in `data`, and populates the detail page by element ID (`#titleDetail`, `#detail`, `#picture1..3`, `#linkContainer`, etc.). It also calls the project's `apiLastDate` (a `https://api.github.com/repos/...` URL) to fetch and display the repo's last-pushed date via the GitHub REST API — no auth token, so it's subject to GitHub's unauthenticated rate limits.
- Adding/editing a project only requires adding/editing an entry in `data.js`; the grid and detail pages update automatically.

**3D background**: Several pages (e.g. `index.html`) embed an inline `<script type="module">` that imports Three.js (via the import map pointing at `unpkg.com`) to render a particle field + wireframe torus-knot background on a `<canvas id="bg">`, reacting to mouse movement and scroll position. This logic is currently duplicated inline per page rather than factored into a shared module.

**Styling conventions**: Dark theme, purple/violet accent (`primary: #6d28d9`), glassmorphism (`backdrop-filter: blur(...)`) via `.glass`/`.glass-card` utility classes defined inline in each page's `<head>`, plus Tailwind's `tailwind.config` extension (also inline per page) for the `primary`/`secondary` colors and `Outfit` font.

## Conventions to be aware of

- No module bundler/transpiler — don't introduce `import`/`export` syntax outside of the Three.js `<script type="module">` blocks (which rely on the browser-native import map), and don't assume Node tooling (npm, webpack, vite) exists.
- Some JS/comments are in Indonesian (e.g. `MainPage.js`); match existing comment language/style when editing those files rather than translating wholesale.
- Image assets referenced by `data.js` live in `assets/images/`; resumes/portfolios referenced from the navbar live in `assets/pdf/`.
