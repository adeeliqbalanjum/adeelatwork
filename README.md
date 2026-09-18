# adeelatwork v4

Portfolio of Muhammad Adeel Iqbal, WordPress and WooCommerce developer. A static site with no framework: `node build.js` turns content, data and templates into `dist/`.

Status: **live** at adeeliqbalanjum.github.io/adeelatwork since 18 September 2026 (commit `42ba5b5`, GitHub Actions run 307). The previous Next.js site is kept on the branch `backup-before-v4-static`.

## Run it

```
npm install
BASE= node build.js        # local build, served from /
node tools/serve.js        # http://localhost:4180
node build.js              # production build, served from /adeelatwork
node tools/check-links.js adeelatwork
node tools/graphics.js all # re-render project mockups and share images (needs Chrome installed)
```

## What is in it

| Path | What it is |
|---|---|
| `content.js` | All copy that is not per project: services pages, CV, work list lines, per project corrections, contact details |
| `data/projects.json` | The 21 projects, converted from the old `data.ts` with dashes removed |
| `src/fragments/` | Homepage and contact page bodies, and the RockBusto record diagram |
| `src/style.css`, `src/app.js` | Design system (tokens, glass, orbs, light and dark) and motion |
| `src/fonts/`, `src/vendor/` | Four type sets (Satoshi is the default; Anybody with Hanken Grotesk, Bricolage Grotesque with Instrument Sans, Unbounded with Hanken Grotesk), plus GSAP, ScrollTrigger and Lenis, all served from the site itself. A visitor only downloads the set in use |
| `assets/img/` | Source images. The build makes responsive WebP from every one |
| `assets/img/adeel.jpg`, `adeel-face.jpg` | The About portrait, and a tighter face crop used for the round avatar in the nav, footer and share images |
| `assets/video/` | Client video. Shown as a poster image until play is pressed (`preload="none"`), so it costs nothing at page load. Set per project with a `video` entry in `content.js` |
| `assets/icons/`, `assets/logos/` | Lucide icons (ISC) and Simple Icons tool logos (CC0), inlined at build time |
| `assets/og/` | One 1200 by 630 share image per page, rendered by `tools/graphics.js og` |
| `assets/img/mockups/` | Project cards and case study covers, rendered by `tools/graphics.js mockups` from the real screenshots in `shots/`, `mobile/` and `inner/`. Never edit these by hand: replace the screenshot and re-run |
| `backup-forest-look/` | A snapshot of the stylesheet, mockups and share images from before the 18 September restyle |
| `build.js` | The generator: pages, images, schema, sitemap, robots, manifest |

29 pages: home, the demos page, portfolio index, 21 case studies, 3 service landing pages, CV, contact (plus 404).

## Decisions made as CTO, and why

1. **No framework.** The old site shipped React to show text and images. This one ships HTML, one stylesheet and one script. You sell speed work, so your own scores are proof.
2. **Same URLs.** `/portfolio/` and `/portfolio/<slug>/` and `/cv/` are unchanged, so nothing already indexed or shared breaks.
3. **Three service landing pages** aimed at what buyers type: WooCommerce checkout fix, WordPress website build, white label WordPress developer for agencies. Each has its own FAQ with schema.
4. **Every call to action is WhatsApp first**, with a message already written for the page the visitor is on. Email and LinkedIn are second. Forms open WhatsApp or the mail app, so there is no backend to break. No Fiverr or Upwork anywhere.
5. **Two experiences from one codebase.** Desktop gets the full motion (pinned repair sequence, smooth scroll, reveals, stacking panels, cursor). Phones get the same design with the headline painted immediately, no scroll library, native observers, and sections laid out only as they approach the screen.
6. **The look: forest green, gold, black and white, with three balls behind soft glass.** The default palette is the one you chose. Three shaded balls (green, gold, mint) each cross the page on their own corner to corner route at their own speed (`ballA`, `ballB`, `ballC` in `src/style.css`). On desktop the default (Soft) blurs the balls deeply, 64px, so they stop reading as balls and become colour moving somewhere behind the page. That blur is on the balls themselves, which the browser renders once and then only slides, so it is much cheaper than a live backdrop blur. Fluted and Frosted use a `.glassy` sheet with `backdrop-filter`; there are no facet lines or edges, those were tried and rejected as not clean. Over that sits the motif (`.motif`): one repeating SVG tile of the WordPress, WooCommerce, PHP and Elementor marks and line icons for code, plugin, database, cart, card, speed, layout and security. `build.js` composes the tile from the files in `assets/icons` and `assets/logos` (edit the `MOTIF` list to change it) and it is applied as a mask, so it always takes the theme's text colour in light, dark and every palette. **Content stays readable:** a veil runs through the content column (letting go at the page edges) and the grey text colour was darkened, so body text keeps roughly 5 to 1 contrast even with a ball directly behind it. **The cursor:** on desktop a pool of light (`.follow`) trails the pointer slowly behind everything, and the icon layer drifts up to 15px the opposite way for depth (`gsap.quickTo` in `src/app.js`). Touch devices and reduced motion get neither. The Style control offers Soft (default), Fluted and Frosted glass, also `?bg=fluted`. Phones skip the live blur to protect the speed scores. Frame rate of the desktop glass has not been measured on a slow machine. The quiet eight point star lattice sits in the dark bands, the project covers and the share images.
7. **A Style control, bottom left,** lets anyone try five palettes (forest and gold, emerald and lemon, black and gold, lapis blue, plum and saffron) and four type sets. The choice is remembered on that device, and `?palette=mono&font=anybody` in the URL shares a combination. To make one the default, move its values into the `:root` line of the palette or type set block. To remove the control from the public site, delete `${stylePicker()}` in `build.js`. Project images and share images are rendered in the default palette only. The **+** swatch lets a visitor add palettes of their own from three colours (main, accent, third ball), with a live preview. Up to six are kept on their device. The main colour is darkened automatically if white text would not reach 4.5 to 1 on it, and the accent gets black or white text, whichever reads. Everything else (dark bands, dark mode ground, paper tint) is derived in the `[data-palette="custom"]` block.
   **Hover states were measured, not eyeballed** (18 September): every button, contact route, card and link, forced into its hover state on six page types, in light and dark, across all five palettes. Lowest text to fill contrast on hover is 12.8 to 1. The one real bug found: `.btn.line` set its own text colour after the shared hover rule, so its text stayed dark while the fill turned dark.
8. **Icons and images** where they speed up understanding: the three doors, each symptom, services, process steps, contact routes, the cause table on the fix page, tool logos, and real project screens on service and case pages.
9. **Graphics are rendered in code** from the same tokens (share images, the two missing project covers, the favicon) rather than drawn by hand in Figma, so they never drift from the site and can be regenerated in one command.
10. **Six scroll sequences, one source.** Each lives once in `src/fragments/demo-<name>.html` and is pulled in with `{{demo:name}}`. The homepage shows three (checkout, site down, speed). `/demos/` shows all six, adding broken mobile layout, enquiry emails that never arrive, and content the team cannot edit, with a jump index at the top (`DEMOS` list and `demosPage()` in `build.js`). Every sequence is a `.repair-pin` with a `data-demo` name and a timeline of the same name in `src/app.js`; `data-len` sets how much scrolling it takes. Shared parts: `scanAndNotes` (scan line and the four notes), `flags` (any element with `data-flag` gets a callout pin that pops as the scan reaches it, turns green at the fix and leaves), and `pointer`/`go`/`click` (an on screen cursor that does the clicking). The markup holds the fixed state and the script sets the broken state, so reduced motion and no script both show a sensible result. All are labelled as examples. The only real number in them is the 39 to 92 score. To add a seventh: write the fragment, add a timeline, add a line to `DEMOS`.
11. **A first visit loader, built so it cannot slow the page.** An earlier preloader was removed because it delayed the first paint. This one (`.loader`) is different in three ways: it plays once per visit, not on every page (`aw-seen` in sessionStorage, decided in the inline head script before first paint); it is pure CSS keyframes, so it never waits for a script and the real page loads and paints underneath it; and it is 1.5 seconds, then lifts. It says Broken, a scan line passes, Scanning, then Fixed, which is the site's whole idea in one beat. Reduced motion, `?static` and no script visitors never see it. The headline reveal waits for the curtain (`app.js`, where `intro` is called).

## The phone menu

Below 860px the header links are hidden, and until 18 September nothing replaced them: a phone visitor could only reach Work or Demos from the footer. Now the header shows photo and name, the light and dark button, and a menu button. The panel (`.menu`, markup from `menu()` and the `MENU` list in `build.js`) grows as a circle out of the button, the links rise in one after another, each says what is behind it, the current page is marked, and WhatsApp, email, availability and Lahore time sit at the bottom. The animation is CSS only, so it works before any script arrives; `app.js` only opens and closes it, moves keyboard focus, sets `inert` when closed and locks page scroll. It closes on a link, the close button, Escape, or when the window becomes desktop width. The state class is `is-open`, because `.open` was already the availability pill. The WhatsApp button leaves the phone header, since the bar at the bottom of the screen and the menu both carry it. Page transitions also gained a 1.3s safety net so a paused animation can never leave a link dead.

## Type scale

Reduced on 18 September at your request: headline from a 116px ceiling to 88px, section headings from 72px to 55px, body text from 18px to 16.5px (16px on phones). Every size is a `clamp()` in `src/style.css`, multiplied by `--d-s` per type set.

## Content decisions you delegated

- **Availability:** "Taking new projects", as you confirmed.
- **Pricing:** shown as "most single fixes land between $45 and $140" and "business sites start around $300", plus "fixed quote before work starts" and "the first look is free". These come from your own fix packages and the project costs you gave me. Change them in `content.js` and the homepage FAQ in `src/fragments/home.html`.
- **Testimonials:** only the two quotes that make no results claim (Desert Safari Dubai, Rozi Academy).
- **Desert Safari wording:** a booking flow on WooCommerce with group pricing, an admin approval step and automatic emails, plus the custom reviews widget. The earlier "from scratch plugin" and Telr wording is gone, because the live site does not show it.
- **Todd Malloy:** the site is back up, so it now has a real screenshot and cover. **7 Sky Consultant** still returns a server error, so it has a designed name tile, no live link, and a line saying so.
- **Biodynamic Breathwork:** no live link, with a sentence explaining the client moved platform.
- **Photo:** your studio portrait (supplied 18 September 2026), cropped once for the About section and once tighter for the avatar.
- **Client video:** the Desert Safari Dubai owner's message. No words are quoted from it anywhere, because it has not been transcribed.

## Measured (Lighthouse 12, mobile emulation, local server with gzip)

| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Home | 98 | 100 | 100 | 100 |
| Fix service page | 99 | 100 | 100 | 100 |
| RockBusto case study | 98 | 100 | 100 | 100 |
| Portfolio index | 93 | 100 | 100 | 100 |
| Home, desktop preset | 100 | | | |

Home on mobile: LCP 2.2s, total blocking time 10ms, layout shift 0. Home on desktop: LCP 0.5s. First run was 64. The fixes were: self hosted font, no layout of offscreen sections on phones, no `text-rendering: optimizeLegibility`, gradient orbs instead of blurred layers, and the split phone and desktop script. Real numbers on GitHub Pages will differ a little; re-run after deploy.

Also checked: 1,298 internal links and image references, 0 broken. Desktop Chrome: all page types, light and dark, no console errors.

## Deploy

The repo `adeeliqbalanjum/adeelatwork` deploys from `main` through GitHub Actions. Deploying means replacing the repo contents with this folder (minus `node_modules`, `dist`, `reports`) including the new `.github/workflows/deploy.yml`, and pushing to `main`. The old site stays in git history and on the existing backup branches, so rollback is one revert.

After deploy: submit `sitemap.xml` in Google Search Console, test one share link on WhatsApp and LinkedIn, and put the three service page URLs in your LinkedIn Featured section.

## Not done, on purpose

- Analytics. It needs an account decision from you (Plausible, GA4 or none).
- A custom domain. `adeelatwork.com` or similar would help trust and SEO more than any design change.
- Blog or articles. Worth doing later: one short post per symptom on the fix page.
