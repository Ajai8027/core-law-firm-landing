# Core Law Firm India — Landing Page

Responsive single-page React landing page for Core Law Firm India.

## Links

- **Live site (Vercel):** https://core-law-firm-landing.vercel.app
- **Source (GitHub):** https://github.com/Ajai8027/core-law-firm-landing

> **Google Drive note:** Google Drive is file storage, not a static web host. If you open `index.html` from a Drive link on mobile, it may show a blank white screen because linked CSS/JS files are not served like a website. Use the live Vercel link above, or open `index-standalone.html` for a single-file offline copy.

## Stack

- React 19 + Vite
- Functional components: `Header`, `Hero`, `RegistrationForm`, `Footer`
- External CSS, semantic HTML, responsive breakpoints at 600px / 1024px
- Accessible registration form with validation and session-only success state

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build / local browser preview

```bash
npm run build
```

After building, open **`index.html`** directly in your browser (double-click / `file://`). The build publishes a single root `index.html` plus `assets/` and `favicon.svg`, using relative paths and a non-module script so local file preview works without a server.

You can also use:

```bash
npm run preview
```

## Deploy

The project is deployed on **Vercel** as a static site (`vercel.json` sets `outputDirectory: "."` and `buildCommand: npm run build`). Production URL: https://core-law-firm-landing.vercel.app

To deploy manually to any static host, upload the built `index.html`, `assets/`, and `favicon.svg`. The built HTML uses relative asset paths.

## Structure

```text
.
├── assets/                 # Built JS/CSS/favicon (included in deliverable)
├── public/                 # Source favicon
├── screenshots/            # Responsive and smoke-test evidence
├── scripts/                # Build publish helper
├── src/
│   ├── assets/
│   ├── components/
│   ├── data/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── index.html              # Deployable/local-preview HTML (uses ./assets)
├── index-standalone.html   # Single-file offline copy (CSS/JS/favicon inlined)
├── favicon.svg
├── OPEN_LIVE_SITE.txt      # Drive/mobile viewing instructions
├── package.json
├── README.md
└── vite.config.js
```

## Notes

- Registration is client-side only; responses are kept in memory for the current session and cleared on refresh.
- No backend, authentication, payment, or database integrations.
