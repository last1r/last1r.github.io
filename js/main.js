/* ============================================================
   MAIN — rendering + interactions
   ============================================================ */
const P = window.PORTFOLIO;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

/* ---------- Render: status + marquee ---------- */
document.getElementById("hero-status").textContent = P.status;

(function renderMarquee() {
  const track = document.getElementById("marquee-track");
  const items = [...P.marquee, ...P.marquee]; // duplicate for seamless loop
  track.innerHTML = items.map((t) => `<span class="marquee__item">${esc(t)}</span>`).join("");
})();

/* ---------- Render: about ---------- */
(function renderAbout() {
  document.getElementById("about-text").innerHTML =
    P.about.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("");
  document.getElementById("about-stats").innerHTML =
    P.about.stats.map((s) => `
      <div class="stat-card">
        <div class="stat-card__val">${esc(s.value)}</div>
        <div class="stat-card__unit">${esc(s.unit)}</div>
        <div class="stat-card__sub">${esc(s.sub)}</div>
      </div>`).join("");
})();

/* ---------- Render: education ---------- */
(function renderEdu() {
  const e = P.education;
  // Полоса снимков кампуса — третий ряд той же карточки, поэтому
  // образование и место учёбы читаются как один блок, а не как галерея.
  const shots = (e.photos || []).map((ph, i) => `
      <figure class="edu-shot${i === 0 ? " edu-shot--wide" : ""}">
        <img src="${ph.src}" width="${ph.w}" height="${ph.h}" alt="${esc(ph.alt)}" loading="lazy" decoding="async" />
        <figcaption>${esc(ph.tag)}</figcaption>
      </figure>`).join("");
  document.getElementById("edu-card").innerHTML = `
    <div>
      <div class="edu-card__badge">${esc(e.heading)}</div>
      <h3>${esc(e.org)}</h3>
      <span class="edu-card__status">${esc(e.status)}</span>
      <p class="edu-card__track">${esc(e.track)}</p>
    </div>
    <div class="edu-mono">
      <div class="edu-mono__title">SYSTEM_PROFILE // EDUCATION</div>
      ${e.mono.map(([k, v]) => `<div class="edu-mono__row"><span>${esc(k)}</span><span>${esc(v)}</span></div>`).join("")}
    </div>
    ${shots ? `<div class="edu-card__photos">${shots}</div>` : ""}`;
})();

/* ---------- Render: tech stack ---------- */
const LVL_MAP = { ADVANCED: 3, INTERMEDIATE: 2, BASIC: 1 };
(function renderStack() {
  const wrap = document.getElementById("stack-groups");
  wrap.innerHTML = P.stack.groups.map((g) => `
    <div class="stack-group">
      <div class="stack-group__head">
        <span class="stack-group__name">${esc(g.name)}</span>
        <span class="stack-group__count">${g.items.length} TECH</span>
        <span class="stack-group__rule"></span>
      </div>
      <div class="skill-grid">
        ${g.items.map((s) => {
          const lv = LVL_MAP[s.level] || 1;
          return `
          <div class="skill" data-tags="${esc(s.tags.join("|"))}">
            <div class="skill__top">
              <div>
                <div class="skill__tech">${esc(s.tech)}</div>
                <div class="skill__domain">${esc(s.domain)}</div>
              </div>
              <span class="skill__level lvl-${s.level}">${s.level}</span>
            </div>
            <div class="skill__level-dots">${[1,2,3].map((i) => `<i class="${i <= lv ? "on" : ""}"></i>`).join("")}</div>
            <div class="skill__tags">${s.tags.map((t) => `<span class="skill__tag">${esc(t)}</span>`).join("")}</div>
          </div>`;
        }).join("")}
      </div>
    </div>`).join("");

  // hub highlight on hover
  const hub = document.getElementById("hub");
  if (hub) {
    document.querySelectorAll(".skill").forEach((el) => {
      const tags = (el.dataset.tags || "").toLowerCase();
      el.addEventListener("mouseenter", () => {
        hub.querySelectorAll(".hub__node").forEach((n) => {
          if (tags.includes(n.dataset.hub)) n.classList.add("lit");
        });
      });
      el.addEventListener("mouseleave", () => {
        hub.querySelectorAll(".hub__node").forEach((n) => n.classList.remove("lit"));
      });
    });
  }
})();

/* ---------- Project side visuals (abstract, generated) ---------- */
function neuralSVG() {
  const layers = [3, 4, 4, 2];
  const W = 260, H = 220;
  const pts = layers.map((count, li) => {
    const x = 30 + (li * (W - 60)) / (layers.length - 1);
    return Array.from({ length: count }, (_, i) => [x, (H / (count + 1)) * (i + 1)]);
  });
  let lines = "";
  for (let l = 0; l < pts.length - 1; l++)
    for (const a of pts[l]) for (const b of pts[l + 1])
      lines += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" style="animation-delay:${(Math.random()*3).toFixed(2)}s"/>`;
  let nodes = "";
  for (const layer of pts) for (const p of layer)
    nodes += `<circle class="node" cx="${p[0]}" cy="${p[1]}" r="5" style="animation-delay:${(Math.random()*3).toFixed(2)}s"/>`;
  return `<svg class="neural" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">${lines}${nodes}</svg>`;
}
function skeletonSVG() {
  // abstract pose / skeletal tracking
  const dots = [[130,40],[130,80],[130,120],[100,105],[160,105],[110,180],[150,180]];
  const bones = [[0,1],[1,2],[1,3],[1,4],[2,5],[2,6],[3,5],[4,6]];
  return `<svg class="skeleton" viewBox="0 0 260 220" width="72%" preserveAspectRatio="xMidYMid meet">
    ${bones.map(([a,b]) => `<line x1="${dots[a][0]}" y1="${dots[a][1]}" x2="${dots[b][0]}" y2="${dots[b][1]}"/>`).join("")}
    ${dots.map((d,i) => `<circle cx="${d[0]}" cy="${d[1]}" r="${i===0?9:5}" style="animation:nn ${(2+i*0.2).toFixed(1)}s ease-in-out infinite"/>`).join("")}
  </svg>`;
}
function telegramSVG() {
  return `<svg class="tg-ico" viewBox="0 0 24 24"><path d="M21.9 4.3 2.9 11.6c-1.1.4-1.1 1.9 0 2.3l4.8 1.6 1.8 5.6c.3.9 1.4 1.1 2 .4l2.6-2.6 4.8 3.5c.7.5 1.7.1 1.9-.7L23.9 5.5c.2-1-.7-1.7-2-1.2Z"/><path d="m8 15 9-6-6.5 7"/></svg>`;
}

/* Мокап чата для проекта без скриншотов: собираем интерфейс из тех же
   подписей, что уже есть в описании бота, — чтобы картина не расходилась
   с реальным функционалом. */
function telegramMockup(m) {
  const btns = (m.buttons || []).slice(0, 4);
  const cell = (i) => {
    const x = 40 + (i % 2) * 114, y = 196 + Math.floor(i / 2) * 42;
    return `<rect class="tm-btn" x="${x}" y="${y}" width="106" height="34" rx="9"/>
      <text class="tm-btxt" x="${x + 53}" y="${y + 21}" text-anchor="middle">${esc(btns[i])}</text>`;
  };
  return `<svg class="tg-mock" viewBox="0 0 300 340" role="img" aria-label="${esc(m.aria)}">
    <rect class="tm-screen" x="26" y="10" width="248" height="320" rx="20"/>
    <path class="tm-head" d="M46 10h208a20 20 0 0 1 20 20v26H26V30a20 20 0 0 1 20-20Z"/>
    <circle class="tm-ava" cx="50" cy="32" r="12"/>
    <path class="tm-ava-mark" d="M46 26.5 51.5 32 46 37.5"/>
    <text class="tm-name" x="70" y="30">${esc(m.bot)}</text>
    <text class="tm-role" x="70" y="41">bot</text>
    <rect class="tm-out" x="126" y="68" width="130" height="30" rx="10"/>
    <text class="tm-txt" x="138" y="87">${esc(m.user)}</text>
    <rect class="tm-in" x="40" y="110" width="132" height="30" rx="10"/>
    <text class="tm-txt" x="52" y="129">${esc(m.reply)}</text>
    <text class="tm-hint" x="40" y="170">INLINE KEYBOARD</text>
    ${[0, 1, 2, 3].map(cell).join("")}
    <rect class="tm-bar" x="40" y="284" width="220" height="30" rx="15"/>
    <text class="tm-role" x="56" y="303">message…</text>
    <rect class="tm-caret" x="126" y="292" width="7" height="14"/>
    <rect class="tm-edge" x="26.5" y="10.5" width="247" height="319" rx="20"/>
  </svg>`;
}

/* ---------- Render: projects ---------- */
(function renderProjects() {
  const wrap = document.getElementById("projects-list");
  wrap.innerHTML = P.projects.items.map((p) => {
    const chain = p.chain ? `<div class="chain">${p.chain.map((c) => `<span>${esc(c)}</span>`).join("")}</div>` : "";
    const feat = p.features ? `<ul class="project__feat">${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>` : "";
    const badge = p.badge ? `<span class="project__badge">★ ${esc(p.badge)}</span>` : "";
    const ach = p.achievement ? `<p class="project__desc" style="margin-top:14px"><span class="project__highlight">Достижение:</span> ${esc(p.achievement)}<br><span style="color:var(--ink-mute);font-size:.9rem">Направление: ${esc(p.direction)}${p.extraAward ? " · " + esc(p.extraAward) : ""}</span></p>` : "";
    // Скриншот интерфейса важнее абстрактной схемы, поэтому векторная
    // графика остаётся только там, где реального экрана нет.
    const visual = p.shot
      ? `<img class="pv-shot" src="${p.shot.src}" width="${p.shot.w}" height="${p.shot.h}" alt="${esc(p.shot.alt)}" loading="lazy" decoding="async" />`
      : p.mock ? telegramMockup(p.mock)
      : p.visual === "ai" ? neuralSVG() : p.visual === "vision" ? skeletonSVG() : telegramSVG();
    const slide = p.slide ? `
        <figure class="pv-slide">
          <img src="${p.slide.src}" width="${p.slide.w}" height="${p.slide.h}" alt="${esc(p.slide.alt)}" loading="lazy" decoding="async" />
          <figcaption>${esc(p.slide.caption)}</figcaption>
        </figure>` : "";
    return `
    <article class="project reveal">
      <div class="project__body">
        <div class="project__code">
          <span>${esc(p.code)}</span>
          <span class="status">STATUS / ${esc(p.status)}</span>
          <span>STACK / ${esc(p.stackLine)}</span>
        </div>
        <h3 class="project__name">${esc(p.name)}</h3>
        <p class="project__sub">${esc(p.subtitle)}</p>
        <div class="project__cat">${esc(p.category)}</div>
        <p class="project__desc">${esc(p.description)}</p>
        ${p.highlight ? `<p class="project__desc"><span class="project__highlight">Ключевая особенность:</span> ${esc(p.highlight)}</p>` : ""}
        ${feat}${chain}${ach}${badge}
        <div class="project__stack">${p.tech.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
      </div>
      <div class="project__visual">
        <div class="pv pv--${p.visual}${p.shot || p.mock ? " pv--real" : ""}${p.slide ? " pv--stack" : ""}">${visual}${slide}<span class="pv-label">SYS_ID: ${esc(p.id.toUpperCase())}</span></div>
      </div>
    </article>`;
  }).join("");
})();

/* ---------- Render: achievements timeline ---------- */
(function renderTimeline() {
  const wrap = document.getElementById("timeline");
  wrap.innerHTML = `<div class="timeline__progress" id="tl-progress"></div>` +
    P.achievements.items.map((a) => `
      <div class="tl-item reveal">
        <span class="tl-item__dot"></span>
        <div class="tl-item__year">${esc(a.year)}</div>
        <div class="tl-item__card">
          <span class="tl-item__tag">${esc(a.tag)}</span>
          <div class="tl-item__title">${esc(a.title)}</div>
          <div class="tl-item__note">${esc(a.note)}</div>
        </div>
      </div>`).join("");
})();

/* ---------- Render: workflow ---------- */
(function renderWorkflow() {
  document.getElementById("workflow-track").innerHTML = P.workflow.steps.map((s, i) => `
    <div class="wf-step reveal">
      <div class="wf-step__n">${s.n}</div>
      <div class="wf-step__en">${esc(s.en)}</div>
      <div class="wf-step__ru">${esc(s.ru)}</div>
      <div class="wf-step__text">${esc(s.text)}</div>
      ${i < P.workflow.steps.length - 1 ? `<span class="wf-step__arrow" aria-hidden="true">→</span>` : ""}
    </div>`).join("");
})();

/* ---------- Render: contacts ---------- */
(function renderContacts() {
  // Показываем только название площадки: адреса, логины и почта на экране не светятся.
  document.getElementById("contact-grid").innerHTML = P.contact.links.map((l) => `
    <a class="contact-card reveal" href="${esc(l.url)}" aria-label="${esc(l.label)}"
       ${l.url.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>
      <span class="contact-card__mono" aria-hidden="true">${esc(l.mono)}</span>
      <span class="contact-card__label">${esc(l.label)}</span>
      <span class="contact-card__arrow" aria-hidden="true">→</span>
    </a>`).join("");
})();

/* ============================================================
   INTERACTIONS
   ============================================================ */

/* ---------- Nav: scrolled + burger + active link ---------- */
(function nav() {
  const el = document.getElementById("nav");
  const burger = document.getElementById("nav-burger");
  const links = document.getElementById("nav-links");
  const onScroll = () => el.classList.toggle("scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  burger.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("open"); burger.classList.remove("open");
      burger.setAttribute("aria-expanded", "false"); document.body.style.overflow = "";
    })
  );

  // active section highlighting
  const ids = P.nav.map((n) => n.id);
  const secs = ids.map((id) => document.getElementById(id)).filter(Boolean);
  const navLinks = [...links.querySelectorAll("a")];
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        navLinks.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  secs.forEach((s) => spy.observe(s));
})();

/* ---------- Scroll reveal ---------- */
(function reveal() {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        const sibs = en.target.parentElement ? [...en.target.parentElement.children].filter((c) => c.classList.contains("reveal")) : [];
        const idx = sibs.indexOf(en.target);
        en.target.style.transitionDelay = reduceMotion ? "0s" : `${Math.max(0, idx) * 70}ms`;
        en.target.classList.add("in");
        obs.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
})();

/* ---------- Timeline progress fill ---------- */
(function timelineProgress() {
  const tl = document.querySelector(".timeline");
  const bar = document.getElementById("tl-progress");
  if (!tl || !bar) return;
  const items = [...tl.querySelectorAll(".tl-item")];
  const upd = () => {
    const r = tl.getBoundingClientRect();
    const vh = window.innerHeight;
    const passed = Math.min(Math.max(vh * 0.55 - r.top, 0), r.height);
    bar.style.height = passed + "px";
    items.forEach((it) => {
      const ir = it.getBoundingClientRect();
      if (ir.top < vh * 0.6) it.classList.add("in");
    });
  };
  upd();
  window.addEventListener("scroll", upd, { passive: true });
  window.addEventListener("resize", upd);
})();

/* ---------- Typewriter for terminal mode ---------- */
(function typewriter() {
  const el = document.getElementById("type-mode");
  if (!el) return;
  const words = ["BUILDING SYSTEMS...", "TRAINING AI MODELS...", "DEPLOYING BACKEND...", "SHIPPING PRODUCTS..."];
  if (reduceMotion) { el.textContent = words[0]; return; }
  let w = 0, c = 0, del = false;
  const tick = () => {
    const word = words[w];
    if (!del) { c++; if (c >= word.length) { del = true; setTimeout(tick, 1500); el.textContent = word.slice(0, c); return; } }
    else { c--; if (c <= 0) { del = false; w = (w + 1) % words.length; } }
    el.textContent = word.slice(0, Math.max(0, c));
    setTimeout(tick, del ? 40 : 75);
  };
  tick();
})();

/* ---------- Custom cursor + cursor glow ---------- */
if (isDesktop && !reduceMotion) {
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  const glow = document.getElementById("cursor-glow");
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    document.body.classList.add("cursor-on");
    dot.style.transform = `translate(${mx}px, ${my}px)`;
    glow.style.transform = `translate(${mx}px, ${my}px)`;
    glow.style.opacity = "1";
  });
  document.addEventListener("mouseleave", () => document.body.classList.remove("cursor-on"));
  (function loop() {
    rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(loop);
  })();
  const hot = "a, button, .skill, .project, .contact-card, .stat-card, .wf-step, .tl-item__card, .hub__node, .edu-shot, .pv-slide";
  document.querySelectorAll(hot).forEach((el) => {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hot"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hot"));
  });
  // also for dynamically added
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hot)) document.body.classList.add("cursor-hot");
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hot)) document.body.classList.remove("cursor-hot");
  });
}

/* ---------- Parallax on portrait ---------- */
if (isDesktop && !reduceMotion) {
  const frame = document.querySelector(".portrait__frame");
  const hero = document.querySelector(".hero");
  if (frame && hero) {
    hero.addEventListener("mousemove", (e) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      frame.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translate(${x * 10}px, ${y * 10}px)`;
    });
    hero.addEventListener("mouseleave", () => { frame.style.transform = ""; });
    frame.style.transition = "transform 0.3s ease";
  }
}

/* ---------- Canvas node-network background ---------- */
(function bg() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w, h, dpr, nodes = [];
  const mouse = { x: -999, y: -999 };
  const COUNT = reduceMotion ? 0 : Math.min(72, Math.floor((innerWidth * innerHeight) / 22000));
  const LINK = 130;

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.width = innerWidth * dpr;
    h = canvas.height = innerHeight * dpr;
    canvas.style.width = innerWidth + "px";
    canvas.style.height = innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function init() {
    nodes = Array.from({ length: COUNT }, () => ({
      x: Math.random() * innerWidth, y: Math.random() * innerHeight,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > innerWidth) n.vx *= -1;
      if (n.y < 0 || n.y > innerHeight) n.vy *= -1;
    }
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.hypot(dx, dy);
        if (d < LINK) {
          ctx.strokeStyle = `rgba(53,224,255,${(1 - d / LINK) * 0.12})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      if (md < 160) {
        ctx.strokeStyle = `rgba(139,92,246,${(1 - md / 160) * 0.22})`;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
      ctx.fillStyle = "rgba(53,224,255,0.4)";
      ctx.beginPath(); ctx.arc(a.x, a.y, 1.4, 0, Math.PI * 2); ctx.fill();
    }
    if (!reduceMotion) requestAnimationFrame(draw);
  }
  window.addEventListener("resize", () => { resize(); init(); });
  if (isDesktop) window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  resize(); init();
  if (reduceMotion) draw(); else requestAnimationFrame(draw);
})();

/* ---------- Photo fallback ---------- */
(function photo() {
  const img = document.getElementById("hero-photo");
  const figure = img?.closest(".portrait");
  if (!img || !figure) return;
  const fail = () => figure.classList.add("no-photo");
  if (img.complete && img.naturalWidth === 0) fail();
  img.addEventListener("error", fail);
})();

console.log("%cARTEM BABANIN — portfolio loaded", "color:#35e0ff;font-family:monospace");
