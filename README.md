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

### Deploying

`dist/` is a plain static site, so any static host can serve it:

- **Netlify / Cloudflare Pages / Vercel:** import the repo, set the build command to `npm run build` and the output directory to `dist`.
- **Any web server or S3 bucket:** upload the contents of `dist/`.

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
