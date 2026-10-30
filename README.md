# radhe-organics-website

Landing page for the **Radhe Organics Winter Harvest Subscription 2026–27**: your own dedicated mini farm in Ludhiana, grown naturally and delivered home every week. Content comes from the *Winter Subscription 2026–27* brochure. Every "Join the waitlist" button opens the [waitlist Google Form](https://docs.google.com/forms/d/e/1FAIpQLSeBLb8dglpulu8sY6JkWU5ZmDutrUFch4GF5a4gLCO33RnJsQ/viewform?usp=header).

## Viewing the website

### Requirements

- [Node.js](https://nodejs.org/) **20.19+ or 22.12+** (includes `npm`)

### Run it locally

```bash
npm install      # first time only
npm run dev
```

Then open **http://localhost:5173** in your browser. The page reloads automatically when you edit files.

To check it on your phone, run `npm run dev -- --host`, then open the `Network:` URL it prints on a phone that's on the same Wi-Fi.

### Production build

```bash
npm run build    # type-checks and writes the static site to dist/
npm run preview  # serves dist/ at http://localhost:4173
```

### Live site (GitHub Pages)

The site is published at **https://abhitoronto.github.io/radhe-organics-website/**.

Every push to `main` runs `.github/workflows/deploy.yml`, which lints, builds and deploys to GitHub Pages. You can also redeploy by hand from the **Actions** tab → *Deploy to GitHub Pages* → *Run workflow*. One-time setup: in **Settings → Pages**, set *Source* to **GitHub Actions**.

The workflow sets two build variables from the Pages config, so a custom domain also works without code changes:

- `BASE_PATH`: the URL prefix the site is served under (`/radhe-organics-website/`). It defaults to `/` locally.
- `VITE_SITE_URL`: the absolute site URL, used for the link-preview image on WhatsApp and Facebook. The local default is in `.env`.

To preview the GitHub Pages build locally:

```bash
BASE_PATH=/radhe-organics-website/ npm run build
BASE_PATH=/radhe-organics-website/ npm run preview   # http://localhost:4173/radhe-organics-website/
```

### Other hosts

`dist/` is a plain static site. On Netlify, Cloudflare Pages or Vercel, import the repo, set the build command to `npm run build` and the output directory to `dist`. Set `VITE_SITE_URL` to the final URL.

## Editing content

| What | Where |
| --- | --- |
| Waitlist form link, phone numbers, Instagram, address, map link | `src/data.ts` (top of file) |
| Vegetable list, plans and prices, FAQs, photo captions | `src/data.ts` |
| Section layout and copy | `src/components/*.tsx` |
| Colours and fonts | `@theme` block in `src/index.css` |
| Photos, logo, QR codes | `public/img/` |

## Tech stack

- [Vite](https://vite.dev/) + [React 19](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Motion](https://motion.dev/) for scroll-linked and layout animations
- [Lenis](https://lenis.darkroom.engineering/) for smooth scrolling
- [Lucide](https://lucide.dev/) icons, self-hosted Lora and Poppins fonts via Fontsource

Animations respect the visitor's "reduce motion" system setting.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Lint with oxlint |
