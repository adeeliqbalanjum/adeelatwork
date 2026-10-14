/* Portfolio V4 motion: the "Portfolio V4 / Motion spec" frame, built with the vanilla Motion library (window.Motion) + Lenis.
   Every entrance is transform and opacity only. prefers-reduced-motion: entrances become plain fades, loops stop, pinned sections scroll normally. */
(function () {
  'use strict';
  var M = window.Motion, doc = document.documentElement;
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mobile = matchMedia('(max-width: 900px)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var EASE = [0.22, 1, 0.36, 1], SPRING = { type: 'spring', stiffness: 300, damping: 30 };
  if (!M || reduced) { doc.classList.remove('motion'); }
  var on = !!M && !reduced;
  var animate = on ? M.animate : function () { return { finished: Promise.resolve() }; };
  var inView = on ? M.inView : function (t, cb) { $$(typeof t === 'string' ? t : '').forEach(function (el) { cb(el); }); if (t && t.nodeType) cb(t); };
  var stagger = on ? M.stagger : function () { return 0; };

  /* ---------- Lenis smooth scroll (desktop only) ---------- */
  var lenis = null;
  if (on && !mobile && window.Lenis) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
    $$('a[href^="#"]').forEach(function (a) { a.addEventListener('click', function (e) { var id = a.getAttribute('href').slice(1); var t = id && document.getElementById(id); if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -80, duration: 1.2 }); closeMenu(); } }); });
  }

  /* ---------- 1 Nav: glass after 40 px, hides on scroll down, active pill ---------- */
  var nav = $('#nav'), lastY = 0, links = $$('#links a'), pill = $('.nav-pill');
  function onScroll() {
    var y = window.scrollY;
    nav.classList.toggle('scrolled', y > 40);
    nav.classList.toggle('hide', y > 300 && y > lastY + 4 && !menuOpen);
    if (y < lastY - 4) nav.classList.remove('hide');
    lastY = y;
    stickyCheck();
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  function movePill(a) {
    if (!a || !pill) return;
    links.forEach(function (l) { l.classList.toggle('on', l === a); });
    var r = a.getBoundingClientRect(), p = a.parentElement.getBoundingClientRect();
    pill.classList.add('is-on');
    animate(pill, { x: r.left - p.left - 6, width: r.width }, on ? SPRING : { duration: 0 });
  }
  var secIds = links.map(function (l) { return l.getAttribute('href').slice(1); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { var i = secIds.indexOf(e.target.id); if (i > -1) movePill(links[i]); } }); }, { rootMargin: '-40% 0px -50% 0px' });
    secIds.forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  }
  links.forEach(function (l) { l.addEventListener('click', function () { movePill(l); }); });

  /* mobile menu */
  var menuOpen = false, burger = $('.burger'), menu = $('#menu');
  function closeMenu() { if (!menuOpen) return; menuOpen = false; burger.setAttribute('aria-expanded', 'false'); menu.hidden = true; if (lenis) lenis.start(); }
  if (burger) burger.addEventListener('click', function () { menuOpen = !menuOpen; burger.setAttribute('aria-expanded', String(menuOpen)); menu.hidden = !menuOpen; if (lenis) menuOpen ? lenis.stop() : lenis.start(); if (menuOpen) animate($$('#menu nav a'), { opacity: [0, 1], y: [16, 0] }, { delay: stagger(0.05), duration: 0.5, ease: EASE }); });
  $$('#menu a').forEach(function (a) { a.addEventListener('click', closeMenu); });

  /* ---------- 2 Hero copy: words rise and unblur, then CTAs spring in ---------- */
  var h1 = $('#h1');
  if (h1 && on) {
    var nodes = Array.prototype.slice.call(h1.childNodes), out = [];
    nodes.forEach(function (n) {
      if (n.nodeType === 3) { n.textContent.split(/\s+/).filter(Boolean).forEach(function (w) { out.push('<span class="w">' + w + '</span> '); }); }
      else { out.push('<span class="' + n.className + '">' + n.textContent.split(/\s+/).filter(Boolean).map(function (w) { return '<span class="w">' + w + '</span>'; }).join(' ') + '</span>'); }
    });
    h1.innerHTML = out.join('');
    var words = $$('.w', h1);
    words.forEach(function (w) { w.style.opacity = 0; w.style.transform = 'translateY(28px)'; w.style.filter = 'blur(8px)'; });
    h1.style.opacity = 1;
    animate(words, { opacity: [0, 1], y: [28, 0], filter: ['blur(8px)', 'blur(0px)'] }, { delay: stagger(0.06, { startDelay: 0.25 }), duration: 0.7, ease: EASE });
  }
  var heroBits = $$('[data-h]').filter(function (e) { return e !== h1; });
  heroBits.forEach(function (e, i) { animate(e, { opacity: [0, 1], y: [20, 0] }, { delay: 0.15 + i * 0.25, duration: 0.7, ease: EASE }); });
  if (on) $$('.ctas [data-magnet], .ctas .btn', $('.hero')).forEach(function (b) { b.style.opacity = 0; animate(b, { opacity: [0, 1], scale: [0.9, 1] }, { delay: 1.1, duration: 0.6, ...SPRING }); });

  /* ---------- 3 Device cluster: rises and tilts in, cursor parallax, shimmer then real screenshot ---------- */
  var cluster = $('#cluster');
  if (cluster) {
    var devs = $$('.dev', cluster), floats = $$('.float', cluster);
    if (on) {
      cluster.style.perspective = '1600px';
      devs.forEach(function (d, i) { animate(d, { opacity: [0, 1], y: [60, 0], rotateX: [18, 0] }, { delay: 0.6 + i * 0.1, duration: 1, ease: EASE }); });
      floats.forEach(function (f, i) { animate(f, { opacity: [0, 1], scale: [0.85, 1] }, { delay: 1.3 + i * 0.15, duration: 0.6, ...SPRING }).finished.then(function () {
        animate(f, { y: [0, -4, 0] }, { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: i * 1.2 });
      }); });
      if (!mobile) {
        var all = devs.concat(floats), targets = all.map(function () { return { x: 0, y: 0 }; });
        cluster.addEventListener('mousemove', function (e) {
          var r = cluster.getBoundingClientRect(), dx = (e.clientX - r.left) / r.width - 0.5, dy = (e.clientY - r.top) / r.height - 0.5;
          all.forEach(function (el, i) { var depth = +el.getAttribute('data-depth') || 10; animate(el, { x: dx * depth * 2, y: dy * depth * 2 }, { type: 'spring', stiffness: 120, damping: 20 }); });
        });
        cluster.addEventListener('mouseleave', function () { all.forEach(function (el) { animate(el, { x: 0, y: 0 }, { type: 'spring', stiffness: 120, damping: 20 }); }); });
      }
    }
    $$('.skel img', cluster).forEach(function (img) { var done = function () { setTimeout(function () { img.parentElement.classList.add('loaded'); }, on ? 600 : 0); }; img.complete ? done() : img.addEventListener('load', done); });
  }

  /* ---------- 4 / 9 Count-ups ---------- */
  function countUp(el) {
    var to = parseFloat(el.getAttribute('data-count')); if (isNaN(to)) return;
    if (!on) { el.textContent = to; return; }
    animate(0, to, { duration: 1.2, ease: 'easeOut', onUpdate: function (v) { el.textContent = Math.round(v); } });
  }
  inView('[data-count]', function (el) { countUp(el); }, { amount: 0.6 });

  /* ---------- 6 / 11 / 12 / 13 / 15 Reveals with stagger ---------- */
  var revealed = new Set();
  function reveal(el, delay) { if (revealed.has(el)) return; revealed.add(el); animate(el, { opacity: [0, 1], y: [40, 0] }, { delay: delay || 0, duration: 0.8, ease: EASE }); }
  $$('[data-stagger]').forEach(function (group) {
    var kids = $$('[data-reveal]', group);
    inView(group, function () { kids.forEach(function (k, i) { reveal(k, i * 0.1); }); }, { amount: 0.2 });
  });
  inView('[data-reveal]', function (el) { reveal(el); }, { amount: 0.25 });
  if (!on) $$('[data-reveal],[data-h]').forEach(function (e) { e.style.opacity = 1; e.style.transform = 'none'; });

  /* ---------- 7 Work showcase: pinned, scroll drives the track ---------- */
  var work = $('#work'), track = $('#track'), pfill = $('#pfill'), pcount = $('#pcount'), cards = $$('.show');
  function setupWork() {
    if (!work || !track) return;
    if (mobile || !on) { work.style.height = ''; track.style.transform = ''; return; }
    var dist = track.scrollWidth - window.innerWidth + 120;
    work.style.height = (window.innerHeight + dist) + 'px';
    M.scroll(function (progress) {
      var p = progress.y ? progress.y.progress : progress;
      track.style.transform = 'translateX(' + (-dist * p) + 'px)';
      pfill.style.transform = 'scaleX(' + (0.2 + 0.8 * p) + ')';
      var idx = Math.min(cards.length - 1, Math.round(p * (cards.length - 1)));
      pcount.textContent = String(idx + 1).padStart(2, '0') + ' / ' + String(cards.length).padStart(2, '0');
      var cx = window.innerWidth / 2;
      cards.forEach(function (c) { var r = c.getBoundingClientRect(); var d = Math.min(1, Math.abs(r.left + r.width / 2 - cx) / window.innerWidth); c.style.transform = 'scale(' + (1 - d * 0.04) + ')'; });
    }, { target: work, offset: ['start start', 'end end'] });
  }
  setupWork();
  $$('.arrow').forEach(function (b) { b.addEventListener('click', function () {
    var dir = +b.getAttribute('data-dir');
    if (mobile || !on) { $('.track-wrap').scrollBy({ left: dir * 420, behavior: 'smooth' }); return; }
    var r = work.getBoundingClientRect(), total = work.offsetHeight - window.innerHeight, cur = Math.min(1, Math.max(0, -r.top / total));
    var idx = Math.round(cur * (cards.length - 1)) + dir; idx = Math.max(0, Math.min(cards.length - 1, idx));
    var y = window.scrollY + r.top + total * (idx / (cards.length - 1));
    lenis ? lenis.scrollTo(y, { duration: 1 }) : window.scrollTo({ top: y, behavior: 'smooth' });
  }); });

  /* ---------- 8 Case studies: stacking cards, inner blocks reveal, device tilts to cursor ---------- */
  var cases = $$('.case');
  cases.forEach(function (c, i) {
    var next = cases[i + 1];
    if (next && on && !mobile) M.scroll(M.animate(c, { scale: [1, 0.94], opacity: [1, 0.6] }, { ease: 'linear' }), { target: next, offset: ['start end', 'start 110px'] });
    var blocks = $$('.ctext > *', c);
    inView(c, function () { animate(blocks, { opacity: [0, 1], y: [16, 0] }, { delay: stagger(0.12), duration: 0.6, ease: EASE }); }, { amount: 0.35 });
    if (!on) blocks.forEach(function (b) { b.style.opacity = 1; b.style.transform = 'none'; });
    var st = $('.cstage', c), dev = $('.browser, .graphic', c);
    if (st && dev && on && !mobile) {
      st.addEventListener('mousemove', function (e) { var r = st.getBoundingClientRect(); var dx = (e.clientX - r.left) / r.width - 0.5, dy = (e.clientY - r.top) / r.height - 0.5; dev.style.transform = 'perspective(1200px) rotateY(' + (dx * 6) + 'deg) rotateX(' + (-dy * 6) + 'deg)'; });
      st.addEventListener('mouseleave', function () { dev.style.transform = ''; });
    }
  });

  /* ---------- 10 Speed compare: drag handle, auto-sweep once, rings ---------- */
  var cmp = $('#compare'), after = $('#after'), handle = $('#handle');
  if (cmp) {
    var pos = 50, dragging = false;
    function setPos(p) { pos = Math.max(4, Math.min(96, p)); after.style.clipPath = 'inset(0 0 0 ' + pos + '%)'; handle.style.left = pos + '%'; handle.setAttribute('aria-valuenow', Math.round(pos)); }
    function fromEvent(e) { var r = cmp.getBoundingClientRect(); var x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left; setPos(x / r.width * 100); }
    cmp.addEventListener('pointerdown', function (e) { dragging = true; cmp.setPointerCapture(e.pointerId); fromEvent(e); });
    cmp.addEventListener('pointermove', function (e) { if (dragging) fromEvent(e); });
    cmp.addEventListener('pointerup', function () { dragging = false; }); cmp.addEventListener('pointercancel', function () { dragging = false; });
    handle.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') setPos(pos - 4); if (e.key === 'ArrowRight') setPos(pos + 4); });
    inView(cmp, function () { if (on) animate(20, 55, { duration: 1.6, ease: EASE, onUpdate: setPos }); else setPos(50); }, { amount: 0.5 });
  }

  /* ---------- 11 Agency board: columns stagger, tasks drop in, update bubble springs in and floats ---------- */
  var board = $('#board');
  if (board) inView(board, function () {
    if (!on) return;
    animate($$('.col', board), { opacity: [0, 1], y: [24, 0] }, { delay: stagger(0.12), duration: 0.6, ease: EASE });
    animate($$('.task', board), { opacity: [0, 1], y: [-12, 0] }, { delay: stagger(0.08, { startDelay: 0.3 }), duration: 0.5, ease: EASE });
    var u = $('#update'); animate(u, { opacity: [0, 1], scale: [0.9, 1] }, { delay: 0.9, ...SPRING }).finished.then(function () { if (!mobile) animate(u, { y: [0, -5, 0] }, { duration: 3, repeat: Infinity, ease: 'easeInOut' }); });
  }, { amount: 0.4 });

  /* ---------- 13 Process: line draws with scroll, nodes fill ---------- */
  var proc = $('#process'), lfill = $('#lfill'), nodes = $$('.node');
  if (proc && lfill && on && !mobile) M.scroll(function (p) {
    var v = p.y ? p.y.progress : p; lfill.style.transform = 'scaleX(' + v + ')';
    nodes.forEach(function (n, i) { n.classList.toggle('on', v >= (i + 0.5) / nodes.length); });
  }, { target: proc, offset: ['start 70%', 'end 70%'] });
  else if (lfill) { lfill.style.transform = 'scaleX(1)'; nodes.forEach(function (n) { n.classList.add('on'); }); }

  /* ---------- 14 Reviews: muted preview on hover, lightbox on click, stars fill ---------- */
  var player = $('#player'), preview = $('#preview'), lb = $('#lightbox'), lbv = $('#lbvideo');
  if (player) {
    player.addEventListener('mouseenter', function () { if (on && !mobile) { preview.currentTime = 0; preview.play().catch(function () {}); setTimeout(function () { preview.pause(); }, 3000); } });
    player.addEventListener('mouseleave', function () { preview.pause(); });
    player.addEventListener('click', function () { lb.hidden = false; if (lenis) lenis.stop(); animate($('.lb-in'), { opacity: [0, 1], scale: [0.96, 1] }, { duration: 0.4, ease: EASE }); lbv.play().catch(function () {}); });
    function closeLb() { lb.hidden = true; lbv.pause(); if (lenis) lenis.start(); }
    $('.lb-close').addEventListener('click', closeLb); lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); }); addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lb.hidden) closeLb(); });
  }
  inView('.stars', function (s) { if (on) animate($$('i', s), { opacity: [0.2, 1], scale: [0.6, 1] }, { delay: stagger(0.08), duration: 0.4, ease: EASE }); }, { amount: 0.8 });

  /* ---------- 15 About: portrait clip reveal ---------- */
  var portrait = $('.portrait');
  if (portrait && on) { portrait.style.clipPath = 'inset(0 100% 0 0 round 36px)'; inView(portrait, function () { animate(portrait, { clipPath: ['inset(0 100% 0 0 round 36px)', 'inset(0 0% 0 0 round 36px)'] }, { duration: 1, ease: EASE }); }, { amount: 0.3 }); }

  /* ---------- 16 FAQ: one open at a time, height animation ---------- */
  var qas = $$('.qa');
  qas.forEach(function (qa) {
    var q = $('.q', qa), a = $('.a', qa);
    if (qa.classList.contains('open')) a.style.height = 'auto';
    q.addEventListener('click', function () {
      var open = qa.classList.contains('open');
      qas.forEach(function (o) { if (o !== qa && o.classList.contains('open')) toggle(o, false); });
      toggle(qa, !open);
    });
  });
  function toggle(qa, open) {
    var q = $('.q', qa), a = $('.a', qa); q.setAttribute('aria-expanded', String(open));
    if (!on) { qa.classList.toggle('open', open); a.style.height = open ? 'auto' : '0px'; return; }
    var h = a.scrollHeight;
    if (open) { qa.classList.add('open'); a.style.height = '0px'; animate(a, { height: ['0px', h + 'px'], opacity: [0, 1] }, { duration: 0.45, ease: EASE }).finished.then(function () { a.style.height = 'auto'; }); }
    else { a.style.height = h + 'px'; animate(a, { height: [h + 'px', '0px'], opacity: [1, 0] }, { duration: 0.35, ease: EASE }).finished.then(function () { qa.classList.remove('open'); }); }
  }

  /* ---------- 17 Final CTA: glow follows the cursor, URL form becomes a WhatsApp message ---------- */
  var dark = $('#darkblock'), glow = $('#ctaglow');
  if (dark && glow && on && !mobile) dark.addEventListener('mousemove', function (e) { var r = dark.getBoundingClientRect(); animate(glow, { x: e.clientX - r.left - 400 - 450, y: e.clientY - r.top + 380 - 450 }, { type: 'spring', stiffness: 60, damping: 20 }); });
  var form = $('#urlform');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault(); var url = ($('#url').value || '').trim();
    var msg = 'Hi Adeel, please take a free first look at my site: ' + (url || '(I will send the URL)');
    window.open('https://wa.me/' + form.getAttribute('data-wa') + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    form.classList.add('done'); var b = $('.btn', form); b.innerHTML = 'Sent'; animate(b, { scale: [0.96, 1] }, SPRING);
  });

  /* ---------- 18 Sticky CTA: after the hero, hidden over the final CTA ---------- */
  var sticky = $('#sticky'), hero = $('.hero'), contact = $('#contact');
  function stickyCheck() { if (!sticky) return; var past = hero.getBoundingClientRect().bottom < 0, atEnd = contact.getBoundingClientRect().top < window.innerHeight * 0.7; sticky.classList.toggle('show', past && !atEnd); }
  stickyCheck();

  /* resize: the pinned showcase height depends on the track width */
  var rt; addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { mobile = matchMedia('(max-width: 900px)').matches; setupWork(); }, 150); });
})();
