import { withBasePath } from "../site-config";

/*
  Visual evidence per project (public/work-images/…).
  - mockups/<slug>.jpg  the real desktop + mobile screenshots framed in devices, on the project colour.
  - shots/<slug>.jpg    real homepage screenshot at desktop width, captured from the live site.
  - mobile/<slug>.jpg   real homepage screenshot at phone width.
  - inner/<slug>.jpg    a real inner page or a lower section of the page (booking form, inventory grid, product page…).
  - extra               optional second inner-page capture.
  Every file is captured from the live site; the mockups only frame them.
*/
export type ProjectImages = { mockup?: string; card?: string; shot?: string; mobile?: string; inner?: string; extra?: string; innerCaption?: string; extraCaption?: string };

const withAll = [
  "desert-safari-dubai", "fastdocnow", "getcaremd", "artisan-technologies", "griffin-resources", "griffin-it",
  "kk-travels-and-tours", "bookmyholidays-uk", "al-emirates-tours", "junk-veteran", "happy-hearts-childrens-center",
  "sparktivo", "pacific-valor-law", "thrivewell-solutions", "hercules-roof-system", "relocrate", "seva-wealth", "rockbusto-fleet",
];

const captions: Record<string, { inner?: string; extra?: string }> = {
  "desert-safari-dubai": { inner: "Tour page · booking form", extra: "Custom reviews widget" },
  "rockbusto-fleet": { inner: "Inventory grid · filters and pricing" },
  "al-emirates-tours": { inner: "Tour page · booking form with live totals" },
  fastdocnow: { inner: "Service product page" },
};

const files: Record<string, ProjectImages> = Object.fromEntries(
  withAll.map((slug) => [slug, {
    mockup: `/work-images/mockups/${slug}.jpg`,
    card: `/work-images/mockups/${slug}-card.jpg`,
    shot: `/work-images/shots/${slug}.jpg`,
    mobile: `/work-images/mobile/${slug}.jpg`,
    inner: `/work-images/inner/${slug}.jpg`,
    innerCaption: captions[slug]?.inner ?? "Further down the homepage",
  }]),
);
files["desert-safari-dubai"].extra = "/work-images/inner/desert-safari-dubai-reviews.jpg";
files["desert-safari-dubai"].extraCaption = captions["desert-safari-dubai"].extra;
/* Biodynamic Breathwork: the live site has since moved to another platform, so no current
   screenshot would show this work. A designed summary graphic is used instead. */
files["biodynamic-breathwork"] = { mockup: "/work-images/mockups/biodynamic-breathwork.jpg", card: "/work-images/mockups/biodynamic-breathwork.jpg" };

export function projectImages(slug: string): ProjectImages {
  const f = files[slug] ?? {};
  const bp = (p?: string) => (p ? withBasePath(p) : undefined);
  return { mockup: bp(f.mockup), card: bp(f.card), shot: bp(f.shot), mobile: bp(f.mobile), inner: bp(f.inner), extra: bp(f.extra), innerCaption: f.innerCaption, extraCaption: f.extraCaption };
}

/* Best single image for a card: the text-free device composition, then the raw screenshot */
export function cardImage(slug: string): string | undefined {
  const i = projectImages(slug);
  return i.card ?? i.mockup ?? i.shot;
}

export function monogram(name: string) {
  const words = name.replace(/[^A-Za-z0-9 ]/g, "").split(" ").filter(Boolean);
  if (words.length >= 2) return words.slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const caps = (words[0] ?? "").match(/[A-Z0-9]/g) ?? [];
  return (caps.length >= 2 ? caps.slice(0, 2).join("") : (words[0] ?? "").slice(0, 2)).toUpperCase();
}
