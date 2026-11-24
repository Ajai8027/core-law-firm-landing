# Core Law Firm India — Landing Page

Responsive single-page React application for Core Law Firm India.

## Source of truth

This folder is the source project for the **Code Single-Page React Web Application Layout for Core
Law Firm India**. It contains the React source that builds and deploys the live site linked below.

## Live site

https://core-law-firm-landing.vercel.app

## Stack

- React 19 + Vite
- Components: `Header`, `Hero`, `RegistrationForm`, `Footer`
- Plain CSS split by section, with design tokens in `src/styles/index.css`
- Client-side form validation; no backend or external services

## What is in this folder

- `index.html` — Vite entry shell. The deployable HTML is generated into `dist/` by the build.
- `src/` — React components, page copy, styles, and artwork.
- `public/favicon.svg` — browser tab icon.
- `assets/` — logo, artwork, and full-page screenshots for phone, tablet, and desktop (reference
  pack for Google Drive; the app bundles its own copies from `src/` and `public/`).
- `OPEN_LIVE_SITE.txt` — the live link and Google Drive sharing instructions.

## Development

```bash
npm install
npm run dev
```

## Build and local preview

```bash
npm run build
npm run preview
```

The build output is written to `dist/`.

## Deploy

Vercel runs `npm run build` and serves `dist/`. Commit and push to `main` and the live site updates
automatically.

## Notes

- The registration form validates name, email, topic, and consent in the browser.
- A successful submission is kept only for the current browser session; refreshing clears it.
- No data is sent to a server.
