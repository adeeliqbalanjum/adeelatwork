// Renders every brand graphic from the site's own tokens and the real project screenshots.
// usage: node tools/graphics.js mockups [slug] | og [key] | all
// Sources: assets/img/shots (desktop), mobile (phone), inner (an inside page). Output: assets/img/mockups, assets/og.
const fs = require('fs'), path = require('path'), os = require('os'), { execFileSync } = require('child_process');
const sharp = require('sharp');
const C = require('../content');
const ROOT = path.resolve(__dirname, '..');
const CHROME = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'].find(fs.existsSync);
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'aw-gfx-'));
const fileUrl = p => 'file:///' + p.replace(/\\/g, '/').replace(/ /g, '%20');
const IMG = rel => path.join(ROOT, 'assets/img', rel + '.jpg');
const has = rel => fs.existsSync(IMG(rel));
const src = rel => fileUrl(IMG(rel));

/* Forest and gold, the site's default palette. Quiet grounds so the client's own site is the colour in the picture. */
const K = { ink: '#111411', lapis: '#1D5A3A', deep: '#0F2E20', tint: '#74D6A4', gold: '#F2B705', chalk: '#ECEAE1' };
const BACKDROPS = [
  { bg: K.chalk, line: K.lapis, o: .17, glow: 'rgba(255,255,255,.9)' },
  { bg: K.deep, line: '#74D6A4', o: .18, glow: 'rgba(47,163,107,.55)' },
  { bg: K.lapis, line: '#FFFFFF', o: .13, glow: 'rgba(116,214,164,.5)' },
  { bg: K.gold, line: K.ink, o: .11, glow: 'rgba(255,240,190,.8)' },
];
// the eight point star (khatam) lattice: two squares, one turned 45 degrees, joined edge to edge
const lattice = (line, o, size) => `url('data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${size || 132}' height='${size || 132}' viewBox='0 0 100 100' fill='none' stroke='${line}' stroke-width='1.5' opacity='${o}'><rect x='25' y='25' width='50' height='50'/><rect x='25' y='25' width='50' height='50' transform='rotate(45 50 50)'/><path d='M50 0v14.6M50 85.4V100M0 50h14.6M85.4 50H100'/></svg>`).replace(/'/g, '%27')}')`;

const FONT = `<style>${[400, 500, 700, 900].map(w => `@font-face{font-family:'Satoshi';font-weight:${w};src:url('${fileUrl(path.join(ROOT, 'src/fonts/satoshi-' + w + '.woff2'))}') format('woff2')}`).join('')}</style>`;

async function shoot(html, w, h, outFile, quality) {
  const page = path.join(TMP, 'p.html'), png = path.join(TMP, 'p.png');
  fs.writeFileSync(page, html);
  execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', '--allow-file-access-from-files', '--user-data-dir=' + path.join(TMP, 'profile'), '--window-size=' + w + ',' + h, '--virtual-time-budget=4000', '--screenshot=' + png, fileUrl(page)], { stdio: 'ignore' });
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  await sharp(png).extract({ left: 0, top: 0, width: w, height: h }).jpeg({ quality: quality || 86, mozjpeg: true }).toFile(outFile);
}

const CSS = `*{box-sizing:border-box;margin:0}html,body{overflow:hidden}body{font-family:'Satoshi',sans-serif;color:${K.ink};position:relative}
.d{font-family:'Satoshi',sans-serif;font-weight:900;letter-spacing:-.05em;line-height:.98}
.pat{position:absolute;inset:0;-webkit-mask-image:radial-gradient(ellipse 75% 70% at 50% 50%,transparent 30%,#000 100%)}
.glow{position:absolute;border-radius:50%;filter:blur(90px)}
.bw{position:absolute;border-radius:18px;overflow:hidden;background:#fff;box-shadow:0 60px 110px -50px rgba(8,20,14,.75),0 0 0 1px rgba(17,20,17,.10)}
.bar{height:44px;background:#F2F3EF;display:flex;align-items:center;gap:8px;padding:0 18px;border-bottom:1px solid rgba(17,20,17,.08)}
.bar i{width:11px;height:11px;border-radius:50%;background:#D5D9D2}
.bar span{margin-left:14px;height:26px;padding:0 16px;border-radius:99px;background:#fff;box-shadow:inset 0 0 0 1px rgba(17,20,17,.09);display:flex;align-items:center;font-size:13.5px;font-weight:500;color:#5B615C}
.bw img{display:block;width:100%;object-fit:cover;object-position:top}
.ph{position:absolute;border-radius:42px;overflow:hidden;background:${K.ink};border:9px solid ${K.ink};box-shadow:0 60px 100px -40px rgba(8,20,14,.8),0 0 0 1px rgba(255,255,255,.18)}
.ph img{display:block;width:100%;height:100%;object-fit:cover;object-position:top;border-radius:32px}
.ph:after{content:"";position:absolute;left:50%;top:9px;width:74px;height:20px;margin-left:-37px;border-radius:99px;background:${K.ink}}
.in{position:absolute;border-radius:16px;overflow:hidden;background:#fff;border:6px solid #fff;box-shadow:0 50px 90px -40px rgba(8,20,14,.8)}
.in img{display:block;width:100%;height:100%;object-fit:cover;object-position:top;border-radius:10px}`;

const stage = (w, h, b, inner) => `<!doctype html><meta charset="utf-8">${FONT}<style>${CSS}html,body{width:${w}px;height:${h}px}body{background:${b.bg}}</style><body>
<i class="glow" style="width:${w * .6}px;height:${w * .6}px;left:${-w * .15}px;top:${-w * .28}px;background:${b.glow}"></i>
<div class="pat" style="background:${lattice(b.line, b.o)}"></div>${inner}`;
const browser = (rel, domain, x, y, w, imgH) => `<div class="bw" style="left:${x}px;top:${y}px;width:${w}px"><div class="bar"><i></i><i></i><i></i><span>${domain}</span></div><img src="${src(rel)}" style="height:${imgH}px"></div>`;
const phone = (rel, x, y, w, h) => `<div class="ph" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px"><img src="${src(rel)}"></div>`;

// choose the backdrop that sits furthest from the screenshot's own dominant colour, and never repeat the previous one
const used = {};
const rgb = hex => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
async function pickBackdrop(rel, prev) {
  if (!has(rel)) return (prev + 1) % BACKDROPS.length;
  const { dominant: d } = await sharp(IMG(rel)).resize(64).stats();
  // prefer the furthest ground, but if it is already used much more than the runner up, take the runner up so the list stays varied
  const far = BACKDROPS.map((b, i) => { const c = rgb(b.bg); return [i, Math.hypot(c[0] - d.r, c[1] - d.g, c[2] - d.b)]; }).filter(x => x[0] !== prev).sort((a, b) => b[1] - a[1]);
  if (far[1] && (used[far[0][0]] || 0) > (used[far[1][0]] || 0) + 1 && far[1][1] > 150) far.reverse();
  used[far[0][0]] = (used[far[0][0]] || 0) + 1;
  return far[0][0];
}

function biodynamic(b) {
  const dots = [[150, 190, 24, 78], [420, 150, 41, 96], [640, 250, 19, 70], [260, 430, 12, 62], [520, 400, 9, 56], [720, 470, 31, 84], [110, 520, 8, 50]];
  return `<div class="in" style="left:90px;top:120px;width:860px;height:810px;border-width:0;border-radius:26px;background:#F7F8F4">
  <div style="display:flex;justify-content:space-between;align-items:center;padding:26px 30px;font-weight:700;font-size:22px">Find a practitioner<span style="background:${K.lapis};color:#fff;border-radius:99px;padding:8px 18px;font-size:16px">173 profiles</span></div>
  <div style="position:absolute;inset:88px 22px 22px;border-radius:18px;background:#E4EFE8;overflow:hidden"><div style="position:absolute;inset:0;background:${lattice(K.lapis, .16, 96)}"></div>
  ${dots.map(([x, y, n, r]) => `<div style="position:absolute;left:${x - r}px;top:${y - r}px;width:${r * 2}px;height:${r * 2}px;border-radius:50%;background:rgba(29,90,58,.18)"></div><div style="position:absolute;left:${x - 24}px;top:${y - 24}px;width:48px;height:48px;border-radius:50%;background:${K.lapis};border:4px solid #fff;display:grid;place-items:center;font-weight:800;font-size:17px;color:#fff">${n}</div>`).join('')}
  <div style="position:absolute;right:22px;bottom:22px;background:#fff;border-radius:16px;padding:16px 20px;display:flex;gap:14px;align-items:center;box-shadow:0 20px 40px -20px rgba(8,20,14,.4)"><i style="width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,${K.tint},${K.lapis})"></i><div style="font-weight:700;font-size:17px">Certified practitioner<div style="font-weight:500;font-size:14px;color:#5B615C">City, country, profile page</div></div></div></div></div>
  ${[['173', 'practitioner profiles, each one a record with photo, city and coordinates', 120], ['Leaflet', 'map drawn from those same records, listing alongside', 392], ['39 to 92', 'mobile PageSpeed at hand over. Desktop went from 83 to 98', 664]].map(([n, t, y]) => `<div style="position:absolute;left:990px;top:${y}px;width:320px;height:246px;border-radius:26px;background:#fff;padding:30px 28px;box-shadow:0 50px 90px -50px rgba(8,20,14,.7)"><div class="d" style="font-size:${n.length > 5 ? 50 : 62}px;color:${K.lapis}">${n}</div><div style="margin-top:14px;font-size:18px;line-height:1.4;font-weight:500;color:#3F4641">${t}</div></div>`).join('')}`;
}

async function mockups() {
  const projects = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/projects.json'), 'utf8'));
  const only = process.argv[3];
  let prev = -1;
  for (const slug of C.order) {
    const p = projects.find(x => x.slug === slug), shot = 'shots/' + slug, mob = 'mobile/' + slug, inner = 'inner/' + slug;
    const bi = await pickBackdrop(shot, prev); prev = bi;
    if (only && only !== slug) continue;
    const b = BACKDROPS[bi], domain = (p.url || slug).replace(/^https?:\/\/(www\.)?/, '').replace(/\/.*$/, '');
    const out = n => path.join(ROOT, 'assets/img/mockups', n + '.jpg');
    if (slug === 'biodynamic-breathwork') { await shoot(stage(1400, 1050, BACKDROPS[2], biodynamic()), 1400, 1050, out(slug)); process.stdout.write('b'); continue; }
    if (!has(shot)) { // no screenshot exists: a designed name tile
      await shoot(stage(1400, 1050, BACKDROPS[1], `<div style="position:absolute;inset:0;display:grid;place-content:center;text-align:center;gap:26px;color:#fff"><div class="d" style="font-size:150px">${p.name.replace(' Consultant', '<br>Consultant')}</div><div style="font-size:34px;font-weight:500;color:#A9D9C0">${p.industry}, ${p.location}</div></div>`), 1400, 1050, out(slug + '-card'));
      process.stdout.write('n'); continue;
    }
    // card, 4:3. The site crops about 6% top and bottom for parallax, so everything sits well inside.
    const card = has(mob)
      ? browser(shot, domain, 96, 150, 1010, 640) + phone(mob, 1006, 330, 286, 590)
      : browser(shot, domain, 160, 150, 1080, 690);
    await shoot(stage(1400, 1050, b, card), 1400, 1050, out(slug + '-card'));
    // case study cover, wide: homepage, an inside page and the phone together
    const cover = browser(shot, domain, 80, 84, 900, 540)
      + (has(inner) ? `<div class="in" style="left:640px;top:${has(mob) ? 470 : 430}px;width:${has(mob) ? 420 : 640}px;height:${has(mob) ? 250 : 270}px"><img src="${src(inner)}"></div>` : '')
      + (has(mob) ? phone(mob, 1086, 96, 250, 520) : '');
    await shoot(stage(1400, 780, b, cover), 1400, 780, out(slug));
    process.stdout.write('.');
  }
  console.log('\nmockups done');
}

async function og() {
  const projects = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/projects.json'), 'utf8'));
  const card = slug => has('mockups/' + slug + '-card') ? 'mockups/' + slug + '-card' : 'mockups/' + slug;
  const items = [
    ['home', 'Your site should be taking orders, not throwing errors.', 'WordPress and WooCommerce developer', card('rockbusto-fleet')],
    ['portfolio', C.order.length + ' client projects, and what each one fixed.', 'Work', card('desert-safari-dubai')],
    ['cv', 'Muhammad Adeel Iqbal', 'CV, WordPress and WooCommerce developer', card('al-emirates-tours')],
    ['contact', 'Tell me what is going on. I will tell you what it needs.', 'Free first look, fixed quote', card('fastdocnow')],
  ].concat(C.services.map(s => ['service-' + s.slug, s.h1, s.nav === 'Partner' ? 'For agencies' : s.nav === 'Fix' ? 'WooCommerce and WordPress fixes' : 'Website builds', s.image]))
    .concat(C.order.map(slug => { const p = projects.find(x => x.slug === slug), o = C.overrides[slug] || {}; return ['case-' + slug, o.h1 || p.name, 'Case study, ' + p.name, card(slug)]; }));
  const only = process.argv[3];
  for (const [key, title, kicker, rel] of items) {
    if (only && only !== key) continue;
    const size = title.length > 62 ? 48 : title.length > 40 ? 56 : 68;
    await shoot(`<!doctype html><meta charset="utf-8">${FONT}<style>${CSS}html,body{width:1200px;height:630px}body{background:${K.deep};color:#fff}</style><body>
<i class="glow" style="width:620px;height:620px;left:-220px;top:-300px;background:rgba(47,163,107,.8)"></i><i class="glow" style="width:420px;height:420px;right:-120px;bottom:-220px;background:rgba(242,183,5,.5)"></i><i class="glow" style="width:300px;height:300px;right:300px;top:-200px;background:rgba(116,214,164,.4)"></i>
<div class="pat" style="background:${lattice('#A9D9C0', .2, 120)};-webkit-mask-image:linear-gradient(90deg,#000,transparent 70%)"></div>
<div style="position:absolute;left:64px;top:54px;display:flex;align-items:center;gap:14px;font-size:25px" class="d"><img src="${src('adeel-face')}" style="width:52px;height:52px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,255,255,.7)">${C.site.brand}</div>
<div style="position:absolute;left:64px;top:168px;width:540px"><div style="font-size:22px;font-weight:700;color:#74D6A4;margin-bottom:18px">${kicker}</div><div class="d" style="font-size:${size}px">${title}</div></div>
<div style="position:absolute;left:64px;bottom:52px;display:flex;gap:14px;align-items:center;font-size:21px;font-weight:700"><span style="background:${K.gold};color:${K.ink};border-radius:999px;padding:12px 24px">Free first look</span><span style="color:#B9CFC3;font-weight:500">WordPress, WooCommerce, Elementor Pro</span></div>
<div style="position:absolute;right:50px;top:118px;width:526px;height:394px;border-radius:30px;overflow:hidden;box-shadow:0 50px 90px -40px rgba(0,0,0,.7),0 0 0 1px rgba(255,255,255,.22)"><img src="${src(rel)}" style="width:100%;height:100%;object-fit:cover;object-position:${rel.startsWith('mockups/') ? 'center' : 'left top'}"></div>`, 1200, 630, path.join(ROOT, 'assets/og', key + '.jpg'), 84);
    process.stdout.write('.');
  }
  console.log('\nog done:', items.length);
}

const run = { mockups, og, all: async () => { await mockups(); await og(); } }[process.argv[2] || 'all'];
run().then(() => fs.rmSync(TMP, { recursive: true, force: true })).catch(e => { console.error(e); process.exit(1); });
