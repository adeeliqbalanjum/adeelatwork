import { withBasePath } from "../site-config";

/*
  Visual evidence per project.
  - `mockup`: the device mockups that ship with the repo (public/work-images).
  - `shot`:   real homepage screenshots captured from the live site
              (public/work-images/shots). Add a file and list it here.
  Anything not listed renders as an honest placeholder tile — never a
  generated "fake browser" illustration.
*/
export type ProjectImages = { mockup?: string; shot?: string };

const files: Record<string, ProjectImages> = {
  "griffin-it": { mockup: "/work-images/griffin-it.webp", shot: "/work-images/shots/griffin-it.jpg" },
  "kk-travels-and-tours": { mockup: "/work-images/kay-kay.webp", shot: "/work-images/shots/kk-travels-and-tours.jpg" },
  "griffin-resources": { mockup: "/work-images/griffin-resources.webp", shot: "/work-images/shots/griffin-resources.jpg" },
  "bookmyholidays-uk": { mockup: "/work-images/book-my-holidays.webp", shot: "/work-images/shots/bookmyholidays-uk.jpg" },
  "artisan-technologies": { mockup: "/work-images/atdi.webp", shot: "/work-images/shots/artisan-technologies.jpg" },
  fastdocnow: { mockup: "/work-images/fastdocnow.webp", shot: "/work-images/shots/fastdocnow.jpg" },
  "desert-safari-dubai": { shot: "/work-images/shots/desert-safari-dubai.jpg" },
  getcaremd: { shot: "/work-images/shots/getcaremd.jpg" },
  "al-emirates-tours": { shot: "/work-images/shots/al-emirates-tours.jpg" },
  "junk-veteran": { shot: "/work-images/shots/junk-veteran.jpg" },
  "happy-hearts-childrens-center": { shot: "/work-images/shots/happy-hearts-childrens-center.jpg" },
  sparktivo: { shot: "/work-images/shots/sparktivo.jpg" },
  "pacific-valor-law": { shot: "/work-images/shots/pacific-valor-law.jpg" },
  "todd-malloy": { shot: "/work-images/shots/todd-malloy.jpg" },
  "thrivewell-solutions": { shot: "/work-images/shots/thrivewell-solutions.jpg" },
  "hercules-roof-system": { shot: "/work-images/shots/hercules-roof-system.jpg" },
  "7sky-consultant": { shot: "/work-images/shots/7sky-consultant.jpg" },
  relocrate: { shot: "/work-images/shots/relocrate.jpg" },
  "seva-wealth": { shot: "/work-images/shots/seva-wealth.jpg" },
};

/* Screenshots that actually exist on disk — keep in sync with public/work-images/shots */
export const capturedShots = new Set<string>([]);

export function projectImages(slug: string): ProjectImages {
  const f = files[slug] ?? {};
  return {
    mockup: f.mockup ? withBasePath(f.mockup) : undefined,
    shot: f.shot && capturedShots.has(slug) ? withBasePath(f.shot) : undefined,
  };
}

/* Best single image for a card: device mockup first, then a real screenshot */
export function cardImage(slug: string): string | undefined {
  const i = projectImages(slug);
  return i.mockup ?? i.shot;
}

export function monogram(name: string) {
  const words = name.replace(/[^A-Za-z0-9 ]/g, "").split(" ").filter(Boolean);
  if (words.length >= 2) return words.slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const caps = (words[0] ?? "").match(/[A-Z0-9]/g) ?? [];
  return (caps.length >= 2 ? caps.slice(0, 2).join("") : (words[0] ?? "").slice(0, 2)).toUpperCase();
}
