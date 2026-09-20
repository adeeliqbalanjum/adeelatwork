// The glass style homepage. build.js calls render() for the live homepage; run directly it writes a standalone preview.
// usage: node tools/glass-preview.js   ->  preview-glass/index.html  (open it in a browser)
// Content comes from content.js and data/projects.json, so every fact on the page is one the live site already states.
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..'), OUT = path.join(ROOT, 'preview-glass');
const c = require(path.join(ROOT, 'content.js')), data = require(path.join(ROOT, 'data/projects.json'));
const LIVE = c.site.url, esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const bySlug = Object.fromEntries(data.map(p => [p.slug, p]));
const img = s => '../assets/img/mockups/' + (fs.existsSync(path.join(ROOT, 'assets/img/mockups', s + '-card.jpg')) ? s + '-card.jpg' : s + '.jpg');
function render(o) {
const projects = c.order.map(s => bySlug[s]).filter(Boolean).map(p => ({
  slug: p.slug, name: p.name, industry: p.industry, location: p.location, year: p.year, stack: (p.stack || []).slice(0, 4),
  line: c.lines[p.slug] || p.tagline, img: o.img(p.slug), href: `${o.base}/portfolio/${p.slug}/`,
}));
const wa = o.wa;

const css = `
@font-face{font-family:'Anton';src:url('${o.fonts}/anton-400.woff2') format('woff2');font-weight:400;font-display:swap}
@font-face{font-family:'Hanken';src:url('${o.fonts}/hanken-var.woff2') format('woff2');font-weight:100 900;font-display:swap}
@font-face{font-family:'Unbounded';src:url('${o.fonts}/unbounded-800.woff2') format('woff2');font-weight:800;font-display:swap}
:root{--ink:#151517;--cream:#F3EEE6;--sand:#CDB79E;--rose:#B78E7A;--slate:#5F6E80;--glass:rgba(255,255,255,.16);--glass-hi:rgba(255,255,255,.34);--line:rgba(255,255,255,.38);
--tall:'Anton','Impact','Haettenschweiler',sans-serif;--wide:'Unbounded','Arial Black',sans-serif;--body:'Hanken','Helvetica Neue',Arial,sans-serif;--r:34px}
*{box-sizing:border-box;margin:0}
html{scroll-behavior:smooth}
body{font-family:var(--body);color:var(--ink);background:#3b4452;min-height:100vh;-webkit-font-smoothing:antialiased;overflow-x:hidden}
a{color:inherit;text-decoration:none}
button{font:inherit;color:inherit;border:0;background:none;cursor:pointer}
:focus-visible{outline:3px solid #fff;outline-offset:3px;border-radius:12px}
.sky{position:fixed;inset:0;z-index:-2;background:
 radial-gradient(90% 55% at 78% 62%,rgba(255,196,140,.85),transparent 60%),
 radial-gradient(70% 40% at 20% 30%,rgba(120,138,160,.9),transparent 70%),
 linear-gradient(180deg,#56637a 0%,#8a8f9c 28%,#d2a98a 55%,#c79a78 64%,#8c6a55 78%,#4a3a32 100%)}
.sky svg{position:absolute;left:0;bottom:0;width:100%;height:58%}
.grain{position:fixed;inset:0;z-index:-1;opacity:.22;mix-blend-mode:soft-light;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)'/%3E%3C/svg%3E")}
.wrap{width:min(1180px,calc(100% - 32px));margin:0 auto}
.glass{background:linear-gradient(140deg,var(--glass-hi),var(--glass) 42%,rgba(255,255,255,.08));border:1px solid var(--line);border-radius:var(--r);-webkit-backdrop-filter:blur(26px) saturate(1.25);backdrop-filter:blur(26px) saturate(1.25);box-shadow:0 30px 80px -30px rgba(30,20,15,.55),inset 0 1px 0 rgba(255,255,255,.55)}
.lab{font-family:var(--wide);font-weight:800;font-size:8.5px;letter-spacing:.06em;text-transform:uppercase;line-height:1.55}
.lab.dim{opacity:.55}
.pill{display:inline-flex;align-items:center;gap:10px;border-radius:99px;padding:13px 22px;font-weight:600;font-size:14px;transition:transform .2s}
.pill:hover{transform:translateY(-2px)}
.pill.dark{background:var(--ink);color:#fff}
.pill.light{background:#fff;color:var(--ink)}
.dot{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:var(--ink);color:#fff;flex:none;transition:transform .2s}
.dot:hover{transform:scale(1.06)}
.dot svg{width:18px;height:18px}
/* nav */
.nav{position:sticky;top:16px;z-index:20;margin-top:20px;background:linear-gradient(140deg,rgba(38,42,52,.5),rgba(38,42,52,.34));display:flex;align-items:center;gap:34px;padding:16px 30px;border-radius:99px;color:#fff}
.logo{font-family:var(--wide);font-weight:800;font-size:20px;letter-spacing:-.02em}
.logo sup{font-size:9px;font-weight:800;margin-left:2px}
.nav nav{display:flex;gap:30px;font-size:13px;font-weight:500;margin-left:24px}
.nav nav a{opacity:.85}.nav nav a:hover{opacity:1}
.nav .right{margin-left:auto;display:flex;align-items:center;gap:18px;text-align:right}
.status{display:inline-flex;align-items:center;gap:8px;font-size:12.5px;font-weight:500}
.status i{width:8px;height:8px;border-radius:50%;background:#7CF2A4;box-shadow:0 0 0 4px rgba(124,242,164,.25)}
/* hero */
.hero{position:relative;margin-top:26px;padding:0 0 26px;display:flow-root}
.back{position:absolute;right:-6%;top:-4px;width:64%;height:330px;border-radius:var(--r);background:var(--cream);overflow:hidden;z-index:0;box-shadow:0 30px 80px -30px rgba(30,20,15,.5)}
.back b{position:absolute;left:4%;top:-34px;font-family:var(--tall);font-weight:400;font-size:330px;line-height:1;letter-spacing:-.01em;color:var(--ink);white-space:nowrap}
.back span{position:absolute;right:26%;top:30px;color:var(--ink)}
.viewer{position:relative;z-index:1;margin-top:150px;padding:30px;color:#fff}
.vtop{display:grid;grid-template-columns:150px 150px 1fr 1fr auto;gap:22px;align-items:start;min-height:150px}
.num{font-family:var(--tall);font-size:132px;line-height:.86;color:var(--ink)}
.spec{color:var(--ink)}
.spec p{margin-bottom:9px}
.vtop .act{display:flex;align-items:center;gap:8px}
.vgrid{display:grid;grid-template-columns:230px 1fr;gap:22px;margin-top:8px}
.side{display:flex;flex-direction:column;gap:16px}
.thumb{position:relative;height:340px;border-radius:28px;overflow:hidden;background:#6f7a88;display:block;width:100%;text-align:left}
.thumb img,.stage img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:top center;transition:opacity .45s,transform .9s}
.thumb::after,.stage::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,18,18,.72),rgba(20,18,18,.25) 30%,transparent 42%,transparent 62%,rgba(20,18,18,.5))}
.thumb .t,.stage .t{position:absolute;left:22px;top:20px;z-index:2}
.t b{display:block;font-weight:600;font-size:24px;letter-spacing:-.01em;text-transform:uppercase;max-width:14ch;line-height:1.02}
.stage .t b{font-size:30px;max-width:20ch}
.t span{display:block;margin-top:8px}
.thumb .dot{position:absolute;right:14px;bottom:14px;z-index:2}
.refresh{display:flex;align-items:center;gap:12px;padding:8px 18px 8px 8px;border-radius:99px;background:rgba(255,255,255,.3);border:1px solid var(--line);color:var(--ink);width:100%}
.refresh .dot{width:34px;height:34px}
.refresh em{margin-left:auto;font-style:normal;font-size:11px;opacity:.6}
.stage{position:relative;height:410px;border-radius:28px;overflow:hidden;background:#6f7a88}
.bar{position:absolute;right:26px;top:30px;z-index:2;width:150px;height:2px;background:rgba(255,255,255,.35)}
.bar i{display:block;height:100%;background:#fff;transition:width .45s}
.stage .line{position:absolute;left:22px;bottom:22px;z-index:2;max-width:46ch;font-size:15px;line-height:1.45;font-weight:400;color:#fff;text-shadow:0 1px 12px rgba(0,0,0,.45)}
.stage .go{position:absolute;right:20px;bottom:20px;z-index:2;display:flex;gap:8px;align-items:center}
.arrows{position:absolute;right:-22px;top:50%;z-index:3;display:grid;gap:10px;transform:translateY(-50%)}
.arrows .dot{background:#fff;color:var(--ink);box-shadow:0 10px 30px -10px rgba(0,0,0,.5)}
.swap img{opacity:0;transform:scale(1.04)}
/* bottom bar */
.bottom{position:relative;z-index:1;margin-top:26px;display:flex;align-items:center;gap:36px;padding:18px 34px 18px 18px;border-radius:99px;color:#fff}
.bottom .round{width:118px;height:118px;border-radius:50%;overflow:hidden;flex:none;position:relative;border:1px solid var(--line)}
.bottom .round img{width:100%;height:100%;object-fit:cover}
.big{font-weight:300;font-size:clamp(30px,4.2vw,50px);line-height:1.04;letter-spacing:.005em;text-transform:uppercase}
.big .ar{display:inline-block;transform:translateY(-.06em)}
.bottom .facts{display:flex;gap:40px;margin-left:auto}
.ring{display:grid;place-items:center;width:92px;height:92px;border-radius:50%;border:1px solid rgba(255,255,255,.7);flex:none;transition:background .25s,color .25s}
.ring:hover{background:#fff;color:var(--ink)}
.ring svg{width:34px;height:34px}
/* sections */
section{margin-top:90px;scroll-margin-top:110px}
.head{display:flex;align-items:end;justify-content:space-between;gap:24px;color:#fff;margin-bottom:26px}
.head h2{font-weight:300;font-size:clamp(30px,4vw,48px);line-height:1.05;text-transform:uppercase;max-width:18ch}
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.card{padding:28px;color:#fff;display:flex;flex-direction:column;min-height:320px}
.card .n{font-family:var(--tall);font-size:74px;line-height:.9;color:var(--ink)}
.card h3{font-weight:500;font-size:21px;line-height:1.2;margin-top:18px}
.card p{font-size:15px;line-height:1.55;margin-top:12px;opacity:.92}
.card .pill{margin-top:auto;align-self:flex-start}
.about{display:grid;grid-template-columns:1.1fr .9fr;gap:22px}
.cream{background:var(--cream);border-radius:var(--r);padding:36px;position:relative;overflow:hidden;box-shadow:0 30px 80px -30px rgba(30,20,15,.5)}
.cream .tall{font-family:var(--tall);font-size:clamp(90px,13vw,170px);line-height:.88;letter-spacing:-.005em}
.cream p{font-size:17px;line-height:1.6;max-width:52ch;margin-top:22px}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:22px}
.chips span{border:1px solid rgba(21,21,23,.25);border-radius:99px;padding:8px 14px;font-size:13px;font-weight:500}
.panel{padding:34px;color:#fff;display:flex;flex-direction:column;gap:18px}
.panel li{list-style:none;display:flex;gap:14px;align-items:baseline;padding:14px 0;border-top:1px solid rgba(255,255,255,.3);font-size:16px;line-height:1.45}
.panel li b{font-family:var(--tall);font-weight:400;font-size:26px;color:var(--ink);min-width:34px}
.contact{display:flex;align-items:center;gap:30px;padding:34px 40px;color:#fff;border-radius:48px}
.contact h2{font-weight:300;font-size:clamp(28px,3.8vw,46px);line-height:1.05;text-transform:uppercase;max-width:20ch}
.contact .btns{margin-left:auto;display:flex;flex-wrap:wrap;gap:10px;justify-content:flex-end}
footer{margin:60px 0 40px;color:rgba(255,255,255,.8);display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap}
.skip{position:absolute;left:-999px;top:8px;z-index:99;background:#fff;color:#151517;padding:10px 16px;border-radius:99px}.skip:focus{left:12px}
.faq{padding:34px;color:#fff}.faq details{border-top:1px solid rgba(255,255,255,.3);padding:18px 0}.faq details:first-of-type{border-top:0}.faq summary{cursor:pointer;list-style:none;display:flex;justify-content:space-between;gap:20px;font-size:19px;font-weight:500}.faq summary::-webkit-details-marker{display:none}.faq summary::after{content:"+";font-family:var(--body);font-weight:300;font-size:34px;line-height:.7;color:var(--ink);display:inline-block;transition:transform .25s}.faq details[open] summary::after{transform:rotate(45deg)}.faq p{margin-top:12px;font-size:16px;line-height:1.6;max-width:70ch;opacity:.95}
.note{position:fixed;left:16px;bottom:16px;z-index:50;background:var(--ink);color:#fff;border-radius:99px;padding:9px 16px;font-size:12px;opacity:.9}
@media (max-width:980px){.vtop{grid-template-columns:110px 1fr 1fr;}.vtop .logo{display:none}.vtop .act{grid-column:1/-1}.num{font-size:104px}.bottom .facts{display:none}.cards{grid-template-columns:1fr}.about{grid-template-columns:1fr}.back{width:80%}}
@media (max-width:720px){.bar{display:none}.stage::after{background:linear-gradient(180deg,rgba(20,18,18,.72),rgba(20,18,18,.2) 28%,rgba(20,18,18,.35) 48%,rgba(20,18,18,.86) 74%)}.nav nav{display:flex!important;gap:16px;margin-left:auto;font-size:13px}.nav nav a:nth-child(n+4){display:none}.nav .right{display:none}.status{display:none}.big br{display:none}.thumb .t .lab{display:none}.big{font-size:26px}.nav{gap:14px;padding:12px 18px}.nav nav,.nav .right .lab{display:none}.back{display:none}.viewer{margin-top:20px;padding:18px}.vtop{grid-template-columns:84px 1fr;min-height:0}.vtop .spec+.spec{display:none}.num{font-size:84px}.vgrid{grid-template-columns:1fr}.side{flex-direction:row;align-items:stretch}.thumb{height:120px;flex:1}.thumb .t b{font-size:15px}.refresh{width:auto;flex:none;padding-right:12px}.refresh .lab,.refresh em{display:none}.stage{height:330px}.stage .t b{font-size:22px}.stage .line{font-size:13.5px;right:22px;bottom:78px}.arrows{right:8px;top:auto;bottom:-22px;transform:none;grid-auto-flow:column}.bottom{border-radius:40px;gap:16px;padding:14px 18px 14px 14px;margin-top:40px}.bottom .round{width:70px;height:70px}.ring{width:60px;height:60px}.ring svg{width:22px;height:22px}.contact{flex-direction:column;align-items:flex-start;border-radius:34px;padding:26px}.contact .btns{margin-left:0;justify-content:flex-start}section{margin-top:64px}.head{flex-direction:column;align-items:flex-start}}
@media (prefers-reduced-motion:reduce){*{transition:none!important;scroll-behavior:auto!important}}
`;

const icon = { arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>', plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>', next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>', prev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m15 6-6 6 6 6"/></svg>', zoom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="6"/><path d="m20 20-4-4M11 8.5v5M8.5 11h5"/></svg>', grid: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="8" cy="8" r="1.6"/><circle cx="16" cy="8" r="1.6"/><circle cx="8" cy="16" r="1.6"/><circle cx="16" cy="16" r="1.6"/></svg>', cog: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="3.2"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/></svg>' };
const dunes = `<svg viewBox="0 0 1600 600" preserveAspectRatio="none" aria-hidden="true"><defs><filter id="bl"><feGaussianBlur stdDeviation="6"/></filter><linearGradient id="d1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b98a68"/><stop offset="1" stop-color="#5a4336"/></linearGradient><linearGradient id="d2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8f6a52"/><stop offset="1" stop-color="#2f2621"/></linearGradient></defs><g filter="url(#bl)"><path d="M0 330C220 250 420 300 640 340s420-90 640-60 240 60 320 50v270H0z" fill="url(#d1)" opacity=".9"/><path d="M0 430c260-70 420 10 700 20s520-110 900-40v190H0z" fill="url(#d2)"/></g></svg>`;

const services = c.services.map((s, i) => `<article class="card glass"><div class="n">0${i + 1}</div><h3>${esc(s.title)}</h3><p>${esc(s.desc)}</p><a class="pill dark" href="${o.base}/services/${s.slug}/">See this service ${icon.arrow.replace('<svg', '<svg width="16" height="16"')}</a></article>`).join('');
const steps = ['I look first. You send the URL and what is happening.', 'You get a fixed quote before I touch anything.', 'Backup, then the fix or the build, on staging where possible.', 'Tested, then a short note on what changed and where things live.'];

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${o.head}
<style>${css}</style></head><body>
<a class="skip" href="#top">Skip to content</a>
<div class="sky">${dunes}</div><div class="grain"></div>
<div class="wrap">
<header class="nav glass"><a class="logo" href="#top" aria-label="${esc(c.site.brand)}, home">AW<sup>©</sup></a>
<nav aria-label="Main"><a href="${o.base}/portfolio/">Work</a><a href="${o.base}/demos/">Demos</a><a href="#services">Services</a><a href="#about">About</a><a href="${o.base}/cv/">CV</a></nav>
<div class="right"><span class="status"><i></i>Taking new projects</span><span class="lab">${esc(c.site.brand)}<br><span class="dim">WordPress developer</span></span></div></header>

<main id="top">
<div class="hero">
  <div class="back" aria-hidden="true"><b>WORD PRESS</b></div>
  <div class="viewer glass" id="viewer" aria-roledescription="carousel" aria-label="Client projects">
    <div class="vtop">
      <span class="logo" style="color:#fff">AW<sup>©</sup></span>
      <div class="num" id="v-num" aria-hidden="true">01</div>
      <div class="spec lab" id="v-spec1"></div>
      <div class="spec lab" id="v-spec2"></div>
      <div class="act"><a class="pill light" href="${wa}">Tell me what's broken</a><a class="dot" href="${o.base}/portfolio/" aria-label="All 21 projects">${icon.grid}</a></div>
    </div>
    <div class="vgrid">
      <div class="side">
        <button class="thumb" id="v-thumb" aria-label="Show next project"><img id="v-timg" alt="" loading="lazy"><span class="t"><b id="v-tname"></b><span class="lab" id="v-tind"></span></span><span class="dot" aria-hidden="true">${icon.zoom}</span></button>
        <button class="refresh" id="v-next"><span class="dot" aria-hidden="true">${icon.cog}</span><span class="lab">Next project</span><em id="v-count"></em></button>
      </div>
      <div class="stage" id="v-stage" aria-live="polite"><img id="v-img" alt=""><span class="t"><b id="v-name"></b><span class="lab" id="v-ind"></span></span><span class="bar" aria-hidden="true"><i id="v-bar"></i></span><p class="line" id="v-line"></p><span class="go"><a class="pill dark" id="v-link" href="#">Read the case study</a><a class="dot" id="v-link2" href="#" aria-hidden="true" tabindex="-1">${icon.plus}</a></span></div>
    </div>
    <div class="arrows"><button class="dot" id="v-prevb" aria-label="Previous project">${icon.prev}</button><button class="dot" id="v-nextb" aria-label="Next project">${icon.next}</button></div>
  </div>
  <div class="bottom glass">
    <span class="round"><img src="${projects[0].img}" alt="" id="v-round"></span>
    <h1 class="big">Your site should take<br>orders, not errors <span class="ar">${icon.arrow.replace('<svg', '<svg width=".8em" height=".8em" style="vertical-align:-.04em"')}</span></h1>
    <div class="facts"><span class="lab">${projects.length} client<br>projects<br><span class="dim">since 2023</span></span><span class="lab">WordPress<br>WooCommerce<br><span class="dim">Elementor Pro</span></span></div>
    <a class="ring" href="${wa}" aria-label="Message me on WhatsApp">${icon.arrow}</a>
  </div>
</div>

<section id="services"><div class="head"><h2>Three things I do</h2><span class="lab">Free first look<br><span class="dim">Fixed quote before any work</span></span></div><div class="cards">${services}</div></section>

<section id="about" class="about">
  <div class="cream"><div class="tall">LOOK FIRST.<br>THEN FIX.</div><p>${esc(c.cv.profile)}</p><div class="chips">${c.cv.skills.map(s => `<span>${esc(s[1])}</span>`).join('')}</div></div>
  <div class="panel glass"><span class="lab">How a job runs</span><ul>${steps.map((s, i) => `<li><b>${i + 1}</b><span>${esc(s)}</span></li>`).join('')}</ul><a class="pill light" href="${o.base}/demos/" style="align-self:flex-start">Watch the seven scroll demos</a></div>
</section>

${o.qa && o.qa.length ? `<section id="faq"><div class="head"><h2>Questions people ask first</h2></div><div class="faq glass">${o.qa.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div></section>` : ''}

<section><div class="contact glass"><h2>Tell me what your site is doing</h2><div class="btns"><a class="pill light" href="${wa}">WhatsApp ${esc(c.site.phone)}</a><a class="pill dark" href="mailto:${c.site.email}">${c.site.email}</a></div></div></section>
</main>
<footer><span class="lab">${esc(c.site.name)}<br><span class="dim">Lahore, Pakistan</span></span><span class="lab"><a href="${c.site.linkedin}">LinkedIn</a> &nbsp; <a href="${c.site.github}">GitHub</a> &nbsp; <a href="${o.base}/cv/">CV</a></span></footer>
</div>
${o.note || ''}
<script>
const P=${JSON.stringify(projects)};let i=0;const $=id=>document.getElementById(id),pad=n=>String(n).padStart(2,'0');
const spec=rows=>rows.map(([k,v])=>'<p>'+k+':<br><span class="dim">'+v+'</span></p>').join('');
function show(n,first){i=(n+P.length)%P.length;const p=P[i],q=P[(i+1)%P.length],v=$('viewer');if(!first)v.classList.add('swap');
 setTimeout(()=>{$('v-num').textContent=pad(i+1);$('v-spec1').innerHTML=spec([['Client',p.name],['Industry',p.industry],['Where',p.location]]);$('v-spec2').innerHTML=spec([['Year',p.year],['Built with',p.stack.join('<br>')]]);
 $('v-img').src=p.img;$('v-img').alt='Screens from the '+p.name+' website';$('v-name').textContent=p.name;$('v-ind').textContent=p.industry;$('v-line').textContent=p.line;$('v-link').href=p.href;$('v-link2').href=p.href;
 $('v-timg').src=q.img;$('v-tname').textContent=q.name;$('v-tind').textContent=q.industry;$('v-count').textContent=pad(i+1)+' / '+P.length;$('v-bar').style.width=((i+1)/P.length*100)+'%';$('v-round').src=q.img;
 requestAnimationFrame(()=>v.classList.remove('swap'));},first?0:220);}
['v-next','v-nextb','v-thumb'].forEach(id=>$(id).addEventListener('click',()=>show(i+1)));$('v-prevb').addEventListener('click',()=>show(i-1));
$('viewer').addEventListener('keydown',e=>{if(e.key==='ArrowRight')show(i+1);if(e.key==='ArrowLeft')show(i-1);});show(0,true);
</script></body></html>`;

return html;
}

module.exports = { render };
if (require.main === module) {
  const html = render({ base: LIVE, fonts: '../src/fonts', img, wa: 'https://wa.me/' + c.site.wa, qa: [], note: '<div class="note">Preview only. The live site is unchanged.</div>',
    head: '<meta name="robots" content="noindex"><title>Glass home preview</title>' });
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, 'index.html'), html);
  console.log('wrote', path.join(OUT, 'index.html'), (html.length / 1024).toFixed(1) + ' KB');
}
