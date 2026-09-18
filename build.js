// adeelatwork v4: static site generator. No framework. `node build.js` writes ./dist
// BASE is the sub path the site is served from. GitHub Pages: /adeelatwork. Local preview: BASE= node build.js
const fs = require('fs'), path = require('path'), sharp = require('sharp');
const C = require('./content');
const ROOT = __dirname, DIST = path.join(ROOT, 'dist'), ASSETS = path.join(ROOT, 'assets');
const BASE = process.env.BASE !== undefined ? process.env.BASE : '/adeelatwork';
const S = C.site;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const out = (rel, data) => { const f = path.join(DIST, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, data); };
const wa = text => 'https://wa.me/' + S.wa + '?text=' + encodeURIComponent(text);

/* ---------- projects ---------- */
const raw = JSON.parse(read('data/projects.json'));
const projects = C.order.map(slug => { const p = raw.find(x => x.slug === slug); if (!p) throw new Error('missing project ' + slug); return Object.assign({}, p, C.overrides[slug] || {}, { line: C.lines[slug], tags: C.tags[slug] }); });

/* ---------- icons + logos ---------- */
const icon = (name, cls) => { const f = path.join(ASSETS, 'icons', name + '.svg'); if (!fs.existsSync(f)) throw new Error('missing icon ' + name); const inner = fs.readFileSync(f, 'utf8').replace(/<!--[\s\S]*?-->/g, '').match(/<svg[^>]*>([\s\S]*)<\/svg>/)[1].replace(/\s+/g, ' ').trim(); return '<svg class="ic' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + '</svg>'; };
const logo = name => { const f = path.join(ASSETS, 'logos', name + '.svg'); if (!fs.existsSync(f)) throw new Error('missing logo ' + name); const d = fs.readFileSync(f, 'utf8').match(/<path d="([^"]+)"/)[1]; return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + d + '"/></svg>'; };
const stackStrip = () => [['wordpress', 'WordPress'], ['woocommerce', 'WooCommerce'], ['elementor', 'Elementor Pro'], ['php', 'PHP'], ['figma', 'Figma'], ['javascript', 'JavaScript'], ['cloudflare', 'Cloudflare']].map(([l, n]) => '<span class="glass">' + logo(l) + n + '</span>').join('');
const LOGO_FOR = { WordPress: 'wordpress', WooCommerce: 'woocommerce', 'Elementor Pro': 'elementor', 'Custom PHP': 'php', 'Custom PHP Plugin': 'php', PHP: 'php', Cloudflare: 'cloudflare' };

/* ---------- images: every source becomes responsive WebP ---------- */
const manifest = {};
const WIDTHS = [520, 960, 1400];
async function images() {
  const walk = d => fs.readdirSync(d).flatMap(f => { const p = path.join(d, f); return fs.statSync(p).isDirectory() ? walk(p) : /\.(jpe?g|png)$/i.test(f) ? [p] : []; });
  for (const file of walk(path.join(ASSETS, 'img'))) {
    const rel = path.relative(path.join(ASSETS, 'img'), file).replace(/\\/g, '/').replace(/\.(jpe?g|png)$/i, '');
    const meta = await sharp(file).metadata();
    const widths = [...new Set(WIDTHS.filter(w => w < meta.width).concat(Math.min(meta.width, 1400)))].sort((a, b) => a - b);
    manifest[rel] = { w: meta.width, h: meta.height, widths };
    for (const w of widths) {
      const dest = path.join(DIST, 'img', rel + '-' + w + '.webp');
      if (fs.existsSync(dest) && fs.statSync(dest).mtimeMs > fs.statSync(file).mtimeMs) continue;
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      await sharp(file).resize({ width: w }).webp({ quality: 78 }).toFile(dest);
    }
  }
}
const has = rel => !!manifest[rel];
const imgUrl = (rel, want) => { const m = manifest[rel]; if (!m) throw new Error('missing image ' + rel); const w = m.widths.find(x => x >= want) || m.widths[m.widths.length - 1]; return BASE + '/img/' + rel + '-' + w + '.webp'; };
const pic = (rel, alt, o = {}) => { const m = manifest[rel]; if (!m) throw new Error('missing image ' + rel); const big = m.widths[m.widths.length - 1]; return '<img src="' + BASE + '/img/' + rel + '-' + big + '.webp" srcset="' + m.widths.map(w => BASE + '/img/' + rel + '-' + w + '.webp ' + w + 'w').join(', ') + '" sizes="' + (o.sizes || '(max-width:860px) 100vw, 50vw') + '" width="' + m.w + '" height="' + m.h + '" alt="' + esc(alt || '') + '"' + (o.eager ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async">'; };

// client video: poster only until play is pressed, so it costs nothing at page load
const videoFrame = v => '<div class="vt-frame"><video src="' + BASE + '/video/' + v.file + '" poster="' + imgUrl(v.poster, 960) + '" preload="none" playsinline width="576" height="1024"></video><button class="vt-play" type="button" aria-label="Play the video message from ' + esc(v.who) + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg></button><span class="vt-len">' + v.len + '</span></div>';

// counts come from the data, so a claim on the page can never drift from what is actually on the site
const COUNT = { all: projects.length, live: projects.filter(p => !p.offline).length };
const fill = h => h.replace(/\{\{demo:([a-z]+)\}\}/g, (m, n) => read('src/fragments/demo-' + n + '.html')).replace(/\{\{base\}\}/g, BASE).replace(/\{\{n:(all|live)\}\}/g, (m, k) => COUNT[k]).replace(/\{\{video:([a-z0-9-]+)\}\}/g, (m, slug) => videoFrame(projects.find(p => p.slug === slug).video)).replace(/\{\{icon:([a-z0-9-]+)\}\}/g, (m, n) => icon(n)).replace(/\{\{stack\}\}/g, stackStrip)
  .replace(/\{\{pic:([^|}]+)\|([^}]*)\}\}/g, (m, rel, alt) => rel === 'adeel' ? pic(rel, alt, { sizes: '(max-width:860px) 90vw, 420px' }) : pic(rel, alt));

/* ---------- background motif: WordPress and the tools around it, one repeating SVG tile ---------- */
// [file, x, y, size, rotation]. Logos are filled marks, icons are strokes. Spread so no two similar shapes sit together.
const MOTIF = [['logo:wordpress', 36, 40, 92, -10], ['code-xml', 250, 30, 46, 8], ['plug', 440, 70, 44, -14], ['logo:woocommerce', 330, 170, 70, 6], ['database', 120, 210, 42, 10], ['gauge', 520, 230, 46, -6],
  ['shopping-cart', 40, 340, 46, -8], ['logo:php', 215, 330, 62, 0], ['layout-template', 420, 340, 44, 12], ['logo:wordpress', 500, 440, 56, 14], ['credit-card', 130, 470, 46, 6], ['shield-check', 300, 480, 44, -10], ['logo:elementor', 30, 520, 40, 0], ['wrench', 400, 540, 40, 18]];
const motifTile = () => { const T = 600; const g = MOTIF.map(([f, x, y, s, r]) => { const isLogo = f.startsWith('logo:'), file = path.join(ASSETS, isLogo ? 'logos' : 'icons', f.replace('logo:', '') + '.svg'); const svg = fs.readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, ''); const inner = isLogo ? '<path d="' + svg.match(/<path d="([^"]+)"/)[1] + '"/>' : svg.match(/<svg[^>]*>([\s\S]*)<\/svg>/)[1].replace(/\s+/g, ' ').trim(); return '<g transform="translate(' + x + ' ' + y + ') rotate(' + r + ' ' + s / 2 + ' ' + s / 2 + ') scale(' + (s / 24).toFixed(3) + ')" ' + (isLogo ? 'fill="#000"' : 'fill="none" stroke="#000" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"') + '>' + inner + '</g>'; }).join(''); return 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="' + T + '" height="' + T + '" viewBox="0 0 ' + T + ' ' + T + '">' + g + '</svg>'); };

/* ---------- shared partials ---------- */
const sun = '<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg><svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/></svg>';
const avatar = () => '<img src="' + BASE + '/img/adeel-face-' + manifest['adeel-face'].widths[0] + '.webp" width="36" height="36" alt="">';
// the phone menu: every destination, what is behind it, and the two ways to reach Adeel
const MENU = () => [['home', 'Home', '/', 'Back to the start'], ['work', 'Work', '/portfolio/', COUNT.all + ' client projects, ' + COUNT.live + ' live to open'], ['demos', 'Demos', '/demos/', 'Watch six problems get found and fixed'], ['services', 'Services', '/#services', 'Fix it, build it, or borrow me'], ['about', 'About', '/#about', 'Who you will be talking to'], ['cv', 'CV', '/cv/', 'Experience, skills and education'], ['contact', 'Contact', '/contact/', 'Free first look, fixed quote']];
const navBtn = (label, extra) => '<button class="navbtn' + (extra || '') + '" type="button" aria-label="' + label + '" aria-controls="menu"' + (extra ? '' : ' aria-expanded="false"') + '><i></i><i></i></button>';
const menu = (key, waText) => `<div class="menu" id="menu" inert>
  <div class="menu-top"><a class="brand" href="${BASE}/">${avatar()}${S.brand}</a>${navBtn('Close the menu', ' x')}</div>
  <nav class="menu-links" aria-label="Menu">${MENU().map(([k, t, u, hint], i) => '<a' + (k === key ? ' class="on" aria-current="page"' : '') + ' href="' + BASE + u + '" style="--i:' + i + '"><span class="ml-t">' + t + '</span><span class="ml-h">' + esc(hint) + '</span>' + icon('arrow-up-right') + '</a>').join('')}</nav>
  <div class="menu-foot" style="--i:${MENU().length}"><div class="menu-cta"><a class="btn gold" href="${wa(waText)}" target="_blank" rel="noopener">${icon('message-circle')}WhatsApp me</a><a class="btn ghost" href="mailto:${S.email}" aria-label="Email Adeel">${icon('mail')}Email</a></div>
    <p><i class="pulse"></i>Taking new projects. It is <span class="clock">00:00</span> in Lahore.</p></div>
</div>`;

const nav = (key, waText) => `<header class="nav"><div class="wrap"><div class="nav-in glass">
  <a class="brand" href="${BASE}/">${avatar()}${S.brand}</a>
  <nav class="nav-links" aria-label="Main">${[['work', 'Work', '/portfolio/'], ['demos', 'Demos', '/demos/'], ['services', 'Services', '/#services'], ['about', 'About', '/#about'], ['cv', 'CV', '/cv/'], ['contact', 'Contact', '/contact/']].map(([k, t, u]) => '<a' + (k === key ? ' class="on" aria-current="page"' : '') + ' href="' + BASE + u + '">' + t + '</a>').join('')}</nav>
  <div class="nav-right"><span class="open"><i class="pulse"></i>Taking new projects</span><button class="mode" aria-label="Switch between light and dark">${sun}</button><a class="btn sm" href="${wa(waText)}" target="_blank" rel="noopener" data-magnet>WhatsApp<span class="me">&nbsp;me</span></a>${navBtn('Open the menu')}</div>
</div></div></header>
${menu(key, waText)}`;

const closing = o => `<section class="final"><div class="orbs local"><i></i><i></i><i></i><i></i><i></i></div><div class="wrap">
  <div class="mega">${o.mega}</div>
  <div class="final-grid">
    <div><h2 class="display" style="font-size:calc(clamp(22px,2.1vw,31px)*var(--d-s));line-height:1.05">${o.h}</h2><p class="lede" style="margin-top:16px">You will hear back from me personally with what I think is happening and what it would take. The first look is free.</p>
      <div class="ways"><a class="way main" href="${wa(o.wa)}" target="_blank" rel="noopener" data-magnet><span class="l">${icon('message-circle')}WhatsApp</span><span>${S.phone}</span></a><a class="way" href="mailto:${S.email}"><span class="l">${icon('mail')}Email</span><span>${S.email}</span></a><a class="way" href="${S.linkedin}" target="_blank" rel="noopener"><span class="l">${icon('linkedin')}LinkedIn</span><span>/in/adeelatwork</span></a></div></div>
    <form class="form glass" data-wa><label>Your name<input name="name" autocomplete="name" placeholder="Sarah Khan"></label><label>Site URL<input name="url" inputmode="url" placeholder="https://"></label><label>What is happening?<textarea name="what" rows="3" placeholder="Customers reach checkout and the page just spins"></textarea></label><div class="cta-row"><button class="btn" data-magnet>${icon('send')}Send on WhatsApp</button><button type="button" class="btn line" data-mail>Send by email</button></div></form>
  </div>
</div></section>`;

const footer = () => `<footer class="site"><div class="wrap foot">
  <div><a class="brand" href="${BASE}/">${avatar()}${S.brand}</a><p>WordPress and WooCommerce developer in Lahore. I fix what is broken and build sites your team can run.</p></div>
  <div><h2>Work</h2><a href="${BASE}/portfolio/">All ${COUNT.all} projects</a><a href="${BASE}/demos/">Watch six repairs</a>${projects.slice(0, 3).map(p => '<a href="' + BASE + '/portfolio/' + p.slug + '/">' + esc(p.name) + '</a>').join('')}</div>
  <div><h2>Services</h2>${C.services.map(s => '<a href="' + BASE + '/services/' + s.slug + '/">' + (s.nav === 'Fix' ? 'WooCommerce and WordPress fixes' : s.nav === 'Build' ? 'Website builds' : 'White label for agencies') + '</a>').join('')}</div>
  <div><h2>Contact</h2><a href="${wa('Hi Adeel, I found your site. ')}" target="_blank" rel="noopener">WhatsApp</a><a href="mailto:${S.email}">Email</a><a href="${S.linkedin}" target="_blank" rel="noopener">LinkedIn</a><a href="${S.github}" target="_blank" rel="noopener">GitHub</a><a href="${BASE}/cv/">CV</a></div>
</div><div class="wrap"><span>© 2026 ${S.name}. It is <span class="clock">00:00</span> in Lahore.</span><span>Built by hand, no page builder.</span></div></footer>`;

const PALETTES = [['forest', 'Forest and gold', '#1D5A3A', '#F2B705'], ['lime', 'Emerald and lemon', '#0A6B48', '#FFD60A'], ['mono', 'Black and gold', '#141414', '#F2B705'], ['kashi', 'Lapis blue', '#2140E0', '#B4C4FF'], ['plum', 'Plum and saffron', '#4A1B5E', '#FFB020']];
const TYPESETS = [['satoshi', 'Satoshi', "'Satoshi'", 900, '100%'], ['anybody', 'Anybody', "'Anybody'", 900, '85%'], ['bricolage', 'Bricolage', "'Bricolage Grotesque'", 800, '85%'], ['unbounded', 'Unbounded', "'Unbounded'", 800, '100%']];
const stylePicker = () => `<div class="style"><button class="style-btn glass" type="button" aria-expanded="false" aria-controls="style-panel"><i></i><span>Style</span></button>
<div class="style-panel glass" id="style-panel" hidden><p>Colours</p><div class="sw-row">${PALETTES.map(([k, n, a, c]) => '<button class="sw" type="button" data-palette="' + k + '" style="--a:' + a + ';--b:' + c + '" aria-label="' + n + '" title="' + n + '"></button>').join('')}<button class="sw add" type="button" aria-label="Add your own palette" title="Add your own palette" aria-expanded="false" aria-controls="cp">+</button></div>
<div class="cp" id="cp" hidden><div class="cp-row"><label>Main<input type="color" name="a" value="#1D5A3A"></label><label>Accent<input type="color" name="b" value="#F2B705"></label><label>Third ball<input type="color" name="c" value="#7FD8C2"></label></div><div class="cp-act"><button class="cp-save" type="button">Save palette</button><button class="cp-del" type="button" hidden>Remove</button></div><p class="cp-note" aria-live="polite"></p></div>
<p class="bg-only-desktop">Glass</p><div class="bg-row bg-only-desktop">${[['soft', 'Soft'], ['fluted', 'Fluted'], ['frosted', 'Frosted']].map(([k, n]) => '<button class="ty" type="button" data-bg="' + k + '">' + n + '</button>').join('')}</div>
<p>Typography</p><div class="ty-row">${TYPESETS.map(([k, n, fam, w, st]) => '<button class="ty" type="button" data-font="' + k + '" style="font-family:' + fam + ',sans-serif;font-weight:' + w + ';font-stretch:' + st + '">' + n + '</button>').join('')}</div></div></div>`;

const waBar = waText => `<div class="wa-bar glass"><a class="btn" href="${wa(waText)}" target="_blank" rel="noopener">${icon('message-circle')}WhatsApp Adeel</a><a class="btn line" href="mailto:${S.email}" aria-label="Email Adeel">${icon('mail')}</a></div>`;

const HEAD_JS = "(function(d){var m,q=location.search;try{m=localStorage.getItem('aw-mode')}catch(e){}var f=/[?&]mode=(light|dark)/.exec(q);d.dataset.mode=f?f[1]:m||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');['palette','font','bg'].forEach(function(k){var v=(new RegExp('[?&]'+k+'=([a-z]+)').exec(q)||[])[1];try{v=v||localStorage.getItem('aw-'+k)}catch(e){}if(v)d.dataset[k]=v});if(!d.dataset.bg||d.dataset.bg=='prism')d.dataset.bg='soft';var cp=/^custom:(\\d+)$/.exec(d.dataset.palette||'');if(cp){try{var P=JSON.parse(localStorage.getItem('aw-custom'))[+cp[1]];['c1','c1raw','c2','c2ink','c3'].forEach(function(k){d.style.setProperty('--'+k,P[k])});d.dataset.palette='custom';d.dataset.cp=cp[1]}catch(e){d.dataset.palette='forest'}}if(/[?&]static/.test(q))return;d.classList.add('anim');try{if(!sessionStorage.getItem('aw-seen')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('first');sessionStorage.setItem('aw-seen','1')}}catch(e){}try{if(sessionStorage.getItem('nav'))d.classList.add('from-nav')}catch(e){}})(document.documentElement)";

const person = { '@type': 'Person', '@id': S.url + '/#adeel', name: S.name, alternateName: S.short, jobTitle: 'WordPress and WooCommerce Developer', url: S.url + '/', email: 'mailto:' + S.email, telephone: S.phone, address: { '@type': 'PostalAddress', addressLocality: 'Lahore', addressCountry: 'PK' }, sameAs: [S.linkedin, S.github], knowsAbout: ['WordPress', 'WooCommerce', 'Elementor Pro', 'PHP', 'Advanced Custom Fields', 'Custom Post Types', 'Core Web Vitals'] };
const faqSchema = qa => ({ '@type': 'FAQPage', mainEntity: qa.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
const crumbSchema = items => ({ '@type': 'BreadcrumbList', itemListElement: items.map(([n, u], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: S.url + u })) });

const pages = [];
function page(o) {
  const canonical = S.url + o.path;
  const og = S.url + '/og/' + o.og + '.jpg';
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(o.title)}</title>
<meta name="description" content="${esc(o.desc)}">
<link rel="canonical" href="${canonical}">${o.noindex ? '\n<meta name="robots" content="noindex">' : ''}
<meta property="og:type" content="${o.ogType || 'website'}"><meta property="og:site_name" content="${S.short}"><meta property="og:title" content="${esc(o.ogTitle || o.title)}"><meta property="og:description" content="${esc(o.desc)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${og}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#F7F5EF" media="(prefers-color-scheme: light)"><meta name="theme-color" content="#08140F" media="(prefers-color-scheme: dark)">
<link rel="icon" href="${BASE}/favicon.svg" type="image/svg+xml"><link rel="manifest" href="${BASE}/site.webmanifest">
<script>${HEAD_JS}</script>
<link rel="preload" href="${BASE}/fonts/satoshi-900.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="${BASE}/fonts/satoshi-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${BASE}/style.css?v=${STAMP}">
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': [person].concat(o.schema || []) })}</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="orbs" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><span class="follow"></span><span class="glassy"><b></b></span><span class="motif"></span></div>
<div class="loader" aria-hidden="true"><div class="loader-in"><b>${S.brand}</b><span class="loader-state"><i>Broken</i><i>Scanning</i><i>Fixed</i></span><span class="loader-bar"><u></u></span></div><span class="loader-scan"></span></div>
<div class="curtain" aria-hidden="true"></div><div class="cur" aria-hidden="true"></div>${o.peek ? '<div class="peek" aria-hidden="true"><img src="' + imgUrl('mockups/rockbusto-fleet-card', 960) + '" alt=""></div>' : ''}
${nav(o.nav, o.wa)}
<main id="main">
${fill(o.body)}
</main>
${o.closing === false ? '' : closing(Object.assign({ mega: 'Send me the URL.', h: 'And tell me what is going wrong.', wa: o.wa }, o.closing || {}))}
${footer()}
${waBar(o.wa)}
${stylePicker()}
<script>(function(){var m=matchMedia("(max-width:860px)").matches,s=["vendor/gsap.min.js"];if(!m)s.push("vendor/ScrollTrigger.min.js","vendor/lenis.min.js");s.push("app.js?v=${STAMP}");function go(){s.forEach(function(u){var e=document.createElement("script");e.src="${BASE}/"+u;e.async=false;document.body.appendChild(e)})}m?addEventListener("load",function(){setTimeout(go,60)}):go()})()</script>
</body></html>`;
  out(path.join(o.path, o.file || 'index.html'), html);
  if (!o.noindex) pages.push({ path: o.path, priority: o.priority || '0.6' });
}
const STAMP = Date.now().toString(36);

/* ---------- page builders ---------- */
function home() {
  const body = read('src/fragments/home.html');
  const qa = [...body.matchAll(/<button class="qa-head">([^<]+)<i class="plus"><\/i><\/button><div class="fold"><div><p>([^<]+)<\/p>/g)].map(m => [m[1], m[2]]);
  page({
    path: '/', nav: 'home', og: 'home', priority: '1.0', wa: 'Hi Adeel, I found your site. My website is: ',
    title: 'WordPress and WooCommerce developer who fixes what is broken | Adeel Iqbal',
    desc: 'Checkout failing, a site that broke after an update, or a build your team can edit. I find the real cause, fix it properly and test it. ' + COUNT.all + ' client projects across 5 countries, ' + COUNT.live + ' of them live to open. Free first look.',
    body, schema: [{ '@type': 'ProfessionalService', '@id': S.url + '/#service', name: 'Adeel Iqbal, WordPress and WooCommerce development', url: S.url + '/', image: S.url + '/og/home.jpg', founder: { '@id': S.url + '/#adeel' }, areaServed: ['AE', 'GB', 'US', 'PK'], priceRange: '$45 to $600+', address: person.address, telephone: S.phone }, faqSchema(qa)],
  });
}

function work() {
  const chips = [['all', 'Everything'], ['booking', 'Bookings and checkout'], ['data', 'Inventories and directories'], ['business', 'A business site that brings enquiries'], ['health', 'Healthcare'], ['travel', 'Travel'], ['speed', 'Speed work']];
  const count = f => f === 'all' ? projects.length : projects.filter(p => p.tags.split(' ').includes(f)).length;
  const rows = projects.map(p => { const card = 'mockups/' + p.slug + '-card', cover = has(card) ? card : 'mockups/' + p.slug; return '<a class="wrow" href="' + BASE + '/portfolio/' + p.slug + '/" data-tags="' + p.tags + '" data-img="' + imgUrl(cover, 960) + '"><h2>' + esc(p.name) + '</h2><p>' + esc(p.line) + '</p><span class="meta">' + esc(p.industry + ', ' + p.location + ', ' + p.year) + '</span><span class="th">' + pic(cover, '', { sizes: '120px' }) + '</span></a>'; }).join('\n');
  page({
    path: '/portfolio/', nav: 'work', og: 'portfolio', priority: '0.9', peek: true, wa: 'Hi Adeel, I looked through your work. Here is what I need: ',
    title: 'WordPress and WooCommerce portfolio: ' + COUNT.all + ' client projects | Adeel Iqbal',
    desc: 'Booking flows, vehicle inventories, practitioner directories, telehealth and business sites. Every project says what the client was stuck on and what I built.',
    closing: { mega: 'Not on the list?', h: 'Tell me what you are trying to do.' },
    schema: [{ '@type': 'ItemList', itemListElement: projects.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: S.url + '/portfolio/' + p.slug + '/', name: p.name })) }, crumbSchema([['Home', '/'], ['Work', '/portfolio/']])],
    body: `<section class="page-top"><div class="wrap"><h1 class="display" data-intro>Find the project that looks like yours.</h1><p class="lede" data-intro-fade>Filter by what you need, not by what I call it. Every row says what the client was stuck on and what I built, and most link to a site you can open today.</p></div></section>
<section><div class="wrap"><div class="filters" data-filters data-intro-fade>${chips.map(([f, t], i) => '<button class="chip' + (i ? '' : ' on') + '" data-f="' + f + '">' + t + '<sup>' + count(f) + '</sup></button>').join('')}</div>
<div class="wlist glass">${rows}</div></div></section>`,
  });
}

function caseStudy(p, i) {
  const next = projects[(i + 1) % projects.length];
  const hero = has('mockups/' + p.slug) ? 'mockups/' + p.slug : 'mockups/' + p.slug + '-card';
  const online = !p.offline;
  const first = p.challenge.split(/(?<=[.!?])\s+/), say = first.shift(), rest = first.join(' ');
  const shots = [['shots/' + p.slug, 'Homepage'], ['inner/' + p.slug, 'Inside the site'], p.extraShot || null, ['mobile/' + p.slug, 'On a phone']].filter(s => s && has(s[0]));
  const desk = shots.filter(s => !s[0].startsWith('mobile/')), mob = shots.find(s => s[0].startsWith('mobile/'));
  const gallery = !shots.length ? '' : `<section class="chapter"><b>As shipped</b><div><div class="shots${desk.length === 1 && mob ? ' two' : desk.length <= 1 && !mob ? ' one' : ''}"${desk.length === 3 ? ' style="grid-template-columns:1fr 1fr"' : ''}>${desk.map(s => '<figure class="glass" data-wipe' + (online ? ' data-cursor="Live"' : '') + '><div class="im">' + pic(s[0], p.name + ': ' + s[1].toLowerCase(), { sizes: '(max-width:860px) 100vw, 40vw' }) + '</div><figcaption>' + s[1] + '</figcaption></figure>').join('')}${mob ? '<figure class="glass" data-wipe><div class="im">' + pic(mob[0], p.name + ' on a phone', { sizes: '(max-width:860px) 100vw, 290px' }) + '</div><figcaption>' + mob[1] + '</figcaption></figure>' : ''}</div></div></section>`;
  const waText = 'Hi Adeel, I saw the ' + p.name + ' case study and need something similar. My site: ';
  page({
    path: '/portfolio/' + p.slug + '/', nav: 'work', og: 'case-' + p.slug, ogType: 'article', wa: waText, priority: i < 5 ? '0.8' : '0.6',
    title: p.name + ': ' + p.tagline + ' | Adeel Iqbal', ogTitle: p.h1 || p.name,
    desc: (p.line + ' ' + p.stack.slice(0, 4).join(', ') + '.').slice(0, 300),
    closing: { mega: 'Need something like this?', h: 'Send me your site and what you have in mind.' },
    schema: [{ '@type': 'CreativeWork', name: p.name, headline: p.h1 || p.tagline, about: p.industry, dateCreated: p.year, creator: { '@id': S.url + '/#adeel' }, image: S.url + '/og/case-' + p.slug + '.jpg', url: S.url + '/portfolio/' + p.slug + '/', keywords: p.stack.join(', ') }, crumbSchema([['Home', '/'], ['Work', '/portfolio/'], [p.name, '/portfolio/' + p.slug + '/']])],
    body: `<div class="wrap"><section class="cs-top">
  <div><nav class="crumbs" aria-label="Breadcrumb" data-intro-fade><a href="${BASE}/portfolio/">Work</a><span>/</span>${esc(p.name)}</nav>
    <h1 class="display" data-intro style="font-size:calc(clamp(32px,4vw,60px)*var(--d-s))">${esc(p.h1 || p.tagline)}${p.h1 ? '' : '.'}</h1></div>
  <div class="spec glass" data-intro-fade><div><b>Client</b>${esc(p.name)}, ${esc(p.location)}</div><div><b>Year</b>${esc(p.year)}</div><div><b>Industry</b>${esc(p.industry)}</div><div><b>My role</b>Development, from structure to launch</div>${online ? '<div><b>Live site</b><a href="' + p.url + '" target="_blank" rel="noopener" style="text-decoration:underline">' + p.url.replace(/^https?:\/\/(www\.)?/, '') + '</a></div>' : ''}</div>
</section></div>
<div class="cover" data-intro-fade>${pic(hero, p.name + ' on desktop and phone', { sizes: '100vw', eager: true })}</div>
<div class="wrap">
<section class="chapter"><b>The problem</b><div><p class="say" style="margin-top:0">${esc(say)}</p>${rest ? '<p>' + esc(rest) + '</p>' : ''}</div></section>
${p.flow ? '<section class="chapter"><b>The idea</b><div><h2 class="display" data-split>Treat inventory as data. Let the site draw itself from it.</h2><p>One vehicle becomes one record with fields. Everything a buyer sees reads from that record, so there is only ever one place to change anything.</p>' + read('src/fragments/flow-rockbusto.html') + '</div></section>' : ''}
<section class="chapter"><b>What I built</b><div><h2 class="display" data-split>${p.solution.length} pieces, one system.</h2><ul class="built glass">${p.solution.map(s => '<li>' + icon('check') + '<span>' + esc(s) + '</span></li>').join('')}</ul></div></section>
<section class="chapter"><b>Built with</b><div><div class="tags" style="margin-top:0">${p.stack.map(s => '<span>' + (LOGO_FOR[s] ? logo(LOGO_FOR[s]) : '') + esc(s) + '</span>').join('')}</div></div></section>
${gallery}
${p.video ? '<section class="chapter"><b>From the client</b><div><figure class="vt glass">' + videoFrame(p.video) + '<figcaption><h2 class="display">A message from ' + esc(p.video.who) + '.</h2><p>' + esc(p.video.len.replace(/^0:/, '')) + ' seconds, recorded on a phone, not in a studio.</p></figcaption></figure></div></section>' : ''}
${p.result ? '<section class="chapter"><b>The result</b><div><p class="say" style="margin-top:0">' + esc(p.result) + '</p></div></section>' : ''}
<section class="chapter"><b>How I approached it</b><div><p style="margin-top:0">${esc(p.body)}</p>${p.offline ? '<p class="offline">' + esc(p.offline) + '</p>' : ''}
  <div class="cta-row" style="margin-top:40px"><a class="btn" href="${wa(waText)}" target="_blank" rel="noopener" data-magnet>{{icon:message-circle}}I need something like this</a>${online ? '<a class="btn line" href="' + p.url + '" target="_blank" rel="noopener">Open the live site{{icon:arrow-up-right}}</a>' : ''}</div></div></section>
</div>
<a class="nextcs" href="${BASE}/portfolio/${next.slug}/" data-cursor="Next"><div class="orbs local"><i></i><i></i><i></i><i></i><i></i></div><div class="wrap"><div><p style="color:var(--on-deep);font-weight:600;margin-bottom:16px">Next case study</p><h2 class="display">${esc(next.name)}</h2><p class="lede" style="color:var(--on-deep);margin-top:18px">${esc(next.line)}</p></div>${pic(has('mockups/' + next.slug + '-card') ? 'mockups/' + next.slug + '-card' : 'mockups/' + next.slug, '', { sizes: '440px' })}</div></a>`,
  });
}

function service(s) {
  const rel = s.related.map(slug => projects.find(p => p.slug === slug));
  const accordion = '<div class="faq-list" data-acc="multi">' + s.faq.map(([q, a], i) => '<div class="qa glass' + (i ? '' : ' on') + '"><button class="qa-head">' + esc(q) + '<i class="plus"></i></button><div class="fold"><div><p>' + esc(a) + '</p></div></div></div>').join('') + '</div>';
  page({
    path: '/services/' + s.slug + '/', nav: 'services', og: 'service-' + s.slug, priority: '0.9', wa: s.wa,
    title: s.title + ' | Adeel Iqbal', desc: s.desc, ogTitle: s.h1,
    closing: { mega: s.mega, h: s.closeH },
    schema: [{ '@type': 'Service', name: s.title, description: s.desc, provider: { '@id': S.url + '/#adeel' }, areaServed: ['AE', 'GB', 'US', 'PK'], url: S.url + '/services/' + s.slug + '/' }, faqSchema(s.faq), crumbSchema([['Home', '/'], ['Services', '/#services'], [s.nav, '/services/' + s.slug + '/']])],
    body: `<div class="wrap"><section class="svc-top">
  <div><nav class="crumbs" aria-label="Breadcrumb" data-intro-fade><a href="${BASE}/#services">Services</a><span>/</span>${s.nav}</nav>
    <h1 class="display" data-intro>${esc(s.h1)}</h1><p class="lede" data-intro-fade>${esc(s.lede)}</p>
    <div class="cta-row" data-intro-fade><a class="btn" href="${wa(s.wa)}" target="_blank" rel="noopener" data-magnet>{{icon:message-circle}}${esc(s.cta)}</a><a class="btn line" href="${BASE}/portfolio/">See the work</a></div>
    <div class="reassure" data-intro-fade>${s.reassure.map(r => '<span>{{icon:check}}' + esc(r) + '</span>').join('')}</div></div>
  <div class="frame glass" data-intro-fade>${pic(s.image, '', { sizes: '(max-width:860px) 100vw, 480px', eager: true })}</div>
</section></div>
${s.causes ? `<section class="band tight"><div class="wrap"><div class="head"><h2 class="display" data-split>${esc(s.causesTitle)}</h2><p class="lede">${esc(s.causesLede)}</p></div>
<div class="causes glass">${s.causes.map(([ic, sym, why, chk]) => '<div class="cause-row"><span class="ic-box">' + icon(ic) + '</span><h3>' + esc(sym) + '</h3><p><b>Usually behind it</b>' + esc(why) + '</p><p><b>What I check</b>' + esc(chk) + '</p></div>').join('')}</div></div></section>` : ''}
<section class="band tight"><div class="wrap"><div class="head"><h2 class="display" data-split>${esc(s.inclTitle)}</h2><p class="lede"></p></div>
<div class="incl">${s.incl.map(([ic, t, d]) => '<div><span class="ic-box">' + icon(ic) + '</span><h3>' + esc(t) + '</h3><p>' + esc(d) + '</p></div>').join('')}</div></div></section>
${s.flowTitle ? `<section class="band tight"><div class="wrap"><div class="head"><h2 class="display" data-split>${esc(s.flowTitle)}</h2><p class="lede">${esc(s.flowLede)}</p></div>${read('src/fragments/flow-rockbusto.html')}</div></section>` : ''}
${s.need ? `<section class="band tight"><div class="wrap faq"><div class="faq-side"><h2 class="display" data-split>${esc(s.needTitle)}</h2></div><ol class="built glass" style="margin-top:0;max-width:none">${s.need.map((n, i) => '<li><b>' + (i + 1) + '</b><span>' + esc(n) + '</span></li>').join('')}</ol></div></section>` : ''}
<section class="band tight"><div class="wrap"><div class="head"><h2 class="display" data-split>Work that shows it.</h2><p class="lede">Real client projects. Open one and read what the client was stuck on and what I built.</p></div>
<div class="rel">${rel.map(p => '<a class="glass" href="' + BASE + '/portfolio/' + p.slug + '/" data-cursor="Open"><div class="im">' + pic('mockups/' + p.slug + '-card', p.name, { sizes: '(max-width:860px) 100vw, 33vw' }) + '</div><h3>' + esc(p.name) + '</h3><p>' + esc(p.line) + '</p></a>').join('')}</div></div></section>
<section class="band tight"><div class="wrap faq"><div class="faq-side"><h2 class="display" data-split>Straight answers.</h2></div>${accordion}</div></section>`,
  });
}

// the demos page: every scroll sequence in one place. Each entry: id, fragment name, icon, short label, heading, lede
const DEMOS = [
  ['checkout', 'credit-card', 'Checkout failing', 'Checkout spins and the order never arrives.', 'The most expensive fault a store can have, because every minute of it is a sale that did not happen.'],
  ['crash', 'refresh-cw', 'Site down after an update', 'The whole site went down overnight. Here is how that gets traced.', 'The error screen tells your visitors nothing, on purpose. The real message is written somewhere else, and that is where I look first.'],
  ['speed', 'gauge', 'Slow site', 'Slow is a bug too. This is what a speed pass looks like.', 'Google scores your site on a mid range phone with a weak connection, because that is what many of your visitors are holding. So that is where I measure.'],
  ['mobile', 'smartphone', 'Broken on phones', 'Fine on your laptop. Falling apart on a phone.', 'A good share of your visitors are holding a phone. If the page slides sideways or the button hangs off the edge, they leave before they read a word.'],
  ['mail', 'mail', 'Enquiries not arriving', 'The form says sent. Nothing ever arrives.', 'The quietest fault there is. Nobody complains, because the people who wrote to you think you ignored them.'],
  ['fields', 'pencil-ruler', 'Cannot edit your own site', 'You should not need a developer to change a price.', 'Content belongs in fields your team fills in, not typed into a design that only a developer dares to open.'],
];
function demosPage() {
  page({
    path: '/demos/', nav: 'demos', og: 'demos', priority: '0.8', wa: 'Hi Adeel, I watched the demos on your site. Mine looks like this: ',
    title: 'Watch six WordPress problems get found and fixed | Adeel Iqbal',
    desc: 'Six scroll through examples of the WordPress and WooCommerce repairs I am asked for most: failing checkout, a site down after an update, slow pages, broken mobile layouts, enquiry emails that never arrive, and content your team cannot edit.',
    closing: { mega: 'Seen yours?', h: 'Send me the URL and what is going wrong.' },
    schema: [crumbSchema([['Home', '/'], ['Demos', '/demos/']])],
    body: `<section class="page-top"><div class="wrap"><h1 class="display" data-intro>Watch six problems get found and fixed.</h1><p class="lede" data-intro-fade>These are the jobs I am asked to do most. Each one is an example, drawn the way the real repair goes: what you see, what is actually wrong, what I change, and how I prove it works. Scroll slowly.</p>
<nav class="demo-index" data-intro-fade aria-label="Jump to a demo">${DEMOS.map(([id, ic, label], i) => '<a class="chip" href="#d-' + id + '">' + icon(ic) + label + '</a>').join('')}</nav></div></section>
${DEMOS.map(([id, ic, label, h, lede], i) => '<section class="repair later' + (i ? ' pad' : '') + '" id="d-' + id + '"><div class="wrap"><div class="head"><h2 class="display" data-split>' + esc(h) + '</h2><p class="lede">' + esc(lede) + '</p></div>\n{{demo:' + id + '}}</div></section>').join('\n')}`,
  });
}

function cv() {
  const c = C.cv;
  page({
    path: '/cv/', nav: 'cv', og: 'cv', priority: '0.7', wa: 'Hi Adeel, I read your CV. I would like to talk about: ',
    title: 'CV: Muhammad Adeel Iqbal, WordPress and WooCommerce developer', desc: 'WordPress developer in Lahore, working remotely. Elementor Pro, WooCommerce, PHP, ACF and custom post types. Agency experience at Nuovo Studios and Rozi Academy, plus direct clients in five countries.',
    closing: { mega: 'Hiring, or have a project?', h: 'Either way, tell me what you need.' },
    schema: [{ '@type': 'ProfilePage', mainEntity: { '@id': S.url + '/#adeel' } }, crumbSchema([['Home', '/'], ['CV', '/cv/']])],
    body: `<section class="page-top"><div class="wrap"><h1 class="display" data-intro>${S.name}</h1><p class="lede" data-intro-fade>${esc(c.profile)}</p>
  <div class="cta-row" style="margin-top:34px" data-intro-fade><a class="btn" href="mailto:${S.email}" data-magnet>{{icon:mail}}Email me</a><a class="btn line" href="${BASE}/portfolio/">See the case studies</a><button class="btn line" onclick="print()">{{icon:file-text}}Print or save as PDF</button></div></div></section>
<div class="wrap cv">
  <aside class="cv-side">
    <div class="cv-card glass"><h2>Contact</h2><a href="mailto:${S.email}">{{icon:mail}}${S.email}</a><a href="https://wa.me/${S.wa}">{{icon:message-circle}}${S.phone}</a><a href="${S.linkedin}">{{icon:linkedin}}/in/adeelatwork</a><a href="${S.github}">{{icon:github}}adeeliqbalanjum</a><a>{{icon:map-pin}}Lahore, Pakistan. Remote, worldwide</a></div>
    <div class="cv-card glass"><h2>Core skills</h2><div class="tags" style="margin-top:0">${c.skills.map(([l, n]) => '<span>' + (l ? logo(l) : '') + n + '</span>').join('')}</div><h2 style="margin-top:24px">Supporting</h2><div class="tags" style="margin-top:0">${c.support.map(n => '<span>' + n + '</span>').join('')}</div></div>
    <div class="cv-card glass"><h2>Education</h2><p style="font-weight:700">${c.education[0]}</p><p class="small">${c.education[1]}</p></div>
  </aside>
  <div>${c.jobs.map(j => '<article class="job glass"><header><h3>' + esc(j.role) + '</h3><span class="when">' + esc(j.when) + '</span></header><p class="co">' + esc(j.co) + '</p><ul>' + j.points.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul></article>').join('')}
    <div class="rel" style="margin-top:16px">${projects.slice(0, 3).map(p => '<a class="glass" href="' + BASE + '/portfolio/' + p.slug + '/"><div class="im">' + pic(has('mockups/' + p.slug + '-card') ? 'mockups/' + p.slug + '-card' : 'mockups/' + p.slug, p.name, { sizes: '(max-width:860px) 100vw, 25vw' }) + '</div><h3>' + esc(p.name) + '</h3><p>' + esc(p.line) + '</p></a>').join('')}</div></div>
</div>`,
  });
}

function contact() {
  let body = read('src/fragments/contact.html');
  body = body.replace('<div class="chips" data-pick>', '<div class="chips" data-pick data-label="I need">').replace('<div class="chips" data-pick>', '<div class="chips" data-pick data-label="Costing sales now">')
    .replace('<button class="btn" data-magnet>Send on WhatsApp</button>', '<div class="cta-row"><button class="btn" data-magnet>{{icon:send}}Send on WhatsApp</button><button type="button" class="btn line" data-mail>Send by email</button></div>')
    .replace('>WhatsApp, the fastest route<span>', '><span class="l">{{icon:message-circle}}WhatsApp, the fastest route</span><span>').replace('>Email<span>', '><span class="l">{{icon:mail}}Email</span><span>').replace('>LinkedIn<span>', '><span class="l">{{icon:linkedin}}LinkedIn</span><span>')
    .replace('<li>I look at the site before I reply, so the answer is about your site.</li>', '<li>I look at the site before I reply, so the answer is about your site. That first look is free.</li>');
  page({
    path: '/contact/', nav: 'contact', og: 'contact', priority: '0.8', closing: false, wa: 'Hi Adeel, I found your site. My website is: ',
    title: 'Contact Adeel Iqbal: WhatsApp, email or a short form', desc: 'Tell me what is going on with your WordPress or WooCommerce site. A few lines on WhatsApp or email is enough for a free first look and a fixed quote.',
    schema: [{ '@type': 'ContactPage', url: S.url + '/contact/' }, crumbSchema([['Home', '/'], ['Contact', '/contact/']])], body,
  });
}

function notFound() {
  page({ path: '/', file: '404.html', nav: '', og: 'home', noindex: true, wa: 'Hi Adeel, I found your site. ', title: 'Page not found | Adeel Iqbal', desc: 'That page does not exist.', closing: false,
    body: `<section class="page-top" style="padding-bottom:200px"><div class="wrap"><h1 class="display" data-intro>That page is not here.</h1><p class="lede" data-intro-fade>The link may be old. The work and the contact page are still where they should be.</p><div class="cta-row" style="margin-top:34px" data-intro-fade><a class="btn" href="${BASE}/portfolio/">See the work</a><a class="btn line" href="${BASE}/">Back to the homepage</a></div></div></section>` });
}

/* ---------- run ---------- */
(async () => {
  const t = Date.now();
  fs.mkdirSync(DIST, { recursive: true });
  await images();
  home(); work(); demosPage(); projects.forEach(caseStudy); C.services.forEach(service); cv(); contact(); notFound();
  out('style.css', read('src/style.css').split('__MOTIF__').join(motifTile()).replace(/\/\*[\s\S]*?\*\//g, '').replace(/\n\s*/g, '').replace(/;}/g, '}')); out('app.js', read('src/app.js'));
  for (const f of fs.readdirSync(path.join(ROOT, 'src/fonts'))) fs.copyFileSync(path.join(ROOT, 'src/fonts', f), (fs.mkdirSync(path.join(DIST, 'fonts'), { recursive: true }), path.join(DIST, 'fonts', f)));
  for (const f of fs.readdirSync(path.join(ROOT, 'src/vendor'))) fs.copyFileSync(path.join(ROOT, 'src/vendor', f), (fs.mkdirSync(path.join(DIST, 'vendor'), { recursive: true }), path.join(DIST, 'vendor', f)));
  if (fs.existsSync(path.join(ASSETS, 'video'))) for (const f of fs.readdirSync(path.join(ASSETS, 'video'))) fs.copyFileSync(path.join(ASSETS, 'video', f), (fs.mkdirSync(path.join(DIST, 'video'), { recursive: true }), path.join(DIST, 'video', f)));
  out('favicon.svg', read('assets/favicon.svg'));
  out('site.webmanifest', JSON.stringify({ name: S.short + ', WordPress developer', short_name: S.brand, start_url: BASE + '/', display: 'browser', background_color: '#F7F5EF', theme_color: '#1D5A3A', icons: [{ src: BASE + '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }] }));
  out('robots.txt', 'User-agent: *\nAllow: /\n\nSitemap: ' + S.url + '/sitemap.xml\n');
  out('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + pages.map(p => '  <url><loc>' + S.url + p.path + '</loc><lastmod>' + new Date().toISOString().slice(0, 10) + '</lastmod><priority>' + p.priority + '</priority></url>').join('\n') + '\n</urlset>\n');
  out('.nojekyll', '');
  if (fs.existsSync(path.join(ASSETS, 'og'))) for (const f of fs.readdirSync(path.join(ASSETS, 'og'))) fs.copyFileSync(path.join(ASSETS, 'og', f), (fs.mkdirSync(path.join(DIST, 'og'), { recursive: true }), path.join(DIST, 'og', f)));
  fs.writeFileSync(path.join(ROOT, 'pages.json'), JSON.stringify(pages.map(p => p.path), null, 1));
  console.log('built', pages.length, 'pages,', Object.keys(manifest).length, 'images, BASE="' + BASE + '" in', ((Date.now() - t) / 1000).toFixed(1) + 's');
})().catch(e => { console.error(e); process.exit(1); });
