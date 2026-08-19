const labels = {
  vi: {
    about: "Về chúng tôi", 
    ecosystem: "Ecosystem", 
    publishing: "Phát hành", 
    share: "We Share", 
    library: "Thư viện", 
    contact: "Liên hệ", 
    footer: "CREATIONS FOR BILLIONS", 
    what: "SẢN PHẨM", 
    who: "VỀ CHÚNG TÔI", 
    mobileApps: "Mobile Apps", 
    aiApps: "AI Apps", 
    privacy: "Chính sách bảo mật", 
    terms: "Điều khoản sử dụng", 
    cookies: "Quản lý cookies",
    // Additional translations
    products: "Sản phẩm",
    technology: "Công nghệ",
    partners: "Đối tác",
    resources: "Tài nguyên",
    documentation: "Tài liệu",
    support: "Hỗ trợ",
    blog: "Blog",
    careers: "Tuyển dụng",
    press: "Báo chí",
    legal: "Pháp lý",
    allRightsReserved: "© {{year}} SONA-GLOBAL. Bảo lưu mọi quyền.",
    createdInVietnam: "Made with ❤️ in Vietnam",
    scalingGlobally: "Scaling globally"
  },
  en: {
    about: "About us", 
    ecosystem: "Ecosystem", 
    publishing: "Publishing", 
    share: "We Share", 
    library: "Library", 
    contact: "Contact", 
    footer: "CREATIONS FOR BILLIONS", 
    what: "PRODUCTS", 
    who: "ABOUT US", 
    mobileApps: "Mobile Apps", 
    aiApps: "AI Apps", 
    privacy: "Privacy Policy", 
    terms: "Terms of Use", 
    cookies: "Manage Cookies",
    // Additional translations
    products: "Products",
    technology: "Technology",
    partners: "Partners",
    resources: "Resources",
    documentation: "Documentation",
    support: "Support",
    blog: "Blog",
    careers: "Careers",
    press: "Press",
    legal: "Legal",
    allRightsReserved: "© {{year}} SONA-GLOBAL. All rights reserved.",
    createdInVietnam: "Made with ❤️ in Vietnam",
    scalingGlobally: "Scaling globally"
  }
};

const pages = ["about", "ecosystem", "publishing", "share", "library", "contact"];
const pageUrls = { about: "./index.html", ecosystem: "./ecosystem.html", publishing: "./publishing.html", share: "./share.html", library: "./library.html", contact: "./contact.html" };
const page = document.body.dataset.page || "about";
let locale = localStorage.getItem("sona-global-locale") === "en" ? "en" : "vi";

function renderChrome() {
  const copy = labels[locale];
  const header = document.querySelector("#site-header");
  const footer = document.querySelector("#site-footer");
  if (header) {
    header.className = "site-header";
    
    // Tạo nav links với dropdown cho Ecosystem
    let navLinksHTML = '';
    pages.forEach((key) => {
      if (key === 'ecosystem') {
        navLinksHTML += `
          <div class="nav-dropdown">
            <a href="${pageUrls[key]}" class="${page === key ? "active" : ""}">${copy[key]} ▾</a>
            <div class="dropdown-content">
              <a href="./ai-apps.html">${copy.aiApps}</a>
              <a href="./mobile-apps.html">${copy.mobileApps}</a>
            </div>
          </div>
        `;
      } else {
        navLinksHTML += `<a href="${pageUrls[key]}" class="${page === key ? "active" : ""}">${copy[key]}</a>`;
      }
    });
    
    header.innerHTML = `<div class="nav-shell">
      <a class="brand" href="./index.html" aria-label="SONA-GLOBAL home"><span class="brand-mark" aria-hidden="true"></span>SONA-GLOBAL</a>
      <div class="nav-actions"><nav class="nav-links" aria-label="Primary navigation">${navLinksHTML}</nav><div class="locale-switcher" aria-label="Language"><button type="button" class="${locale === "vi" ? "active" : ""}" data-locale="vi" aria-pressed="${locale === "vi"}">VI</button><button type="button" class="${locale === "en" ? "active" : ""}" data-locale="en" aria-pressed="${locale === "en"}">EN</button></div></div>
      <button class="nav-toggle" type="button" aria-label="Menu" aria-expanded="false">☰</button>
    </div>`;
    header.querySelector(".nav-toggle")?.addEventListener("click", (event) => {
      const toggle = event.currentTarget;
      const nav = header.querySelector(".nav-links");
      nav?.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(nav?.classList.contains("open")));
    });
    header.querySelectorAll("[data-locale]").forEach((button) => button.addEventListener("click", () => setLocale(button.dataset.locale)));
  }
  if (footer) {
    footer.className = "site-footer";
    const year = new Date().getFullYear();
    const copyrightText = copy.allRightsReserved.replace('{{year}}', year);
    
    footer.innerHTML = `<div class="footer-shell">
      <a class="footer-brand" href="./index.html" aria-label="SONA-GLOBAL home">
        <span class="brand-mark" aria-hidden="true"></span>
        <span>SONA-GLOBAL<small>${copy.footer}</small></span>
      </a>
      <div class="footer-columns">
        <section>
          <p>${copy.what}</p>
          <a href="./ai-apps.html">${copy.aiApps}</a>
          <a href="./mobile-apps.html">${copy.mobileApps}</a>
          <a href="./publishing.html">${copy.publishing}</a>
        </section>
        <section>
          <p>${copy.who}</p>
          <a href="./index.html">${copy.about}</a>
          <a href="./share.html">${copy.share}</a>
          <a href="./library.html">${copy.library}</a>
        </section>
        <section>
          <p>${copy.resources}</p>
          <a href="./library.html">${copy.documentation}</a>
          <a href="./contact.html">${copy.support}</a>
          
        </section>
      </div>
      <div class="footer-legal">
        <span>${copyrightText}</span>
        <div>
          <span>${copy.privacy}</span>
          <span>${copy.terms}</span>
          <span>${copy.cookies}</span>
        </div>
        <small style="color: var(--muted); font-size: 10px; margin-top: 8px; display: block;">
          ${copy.createdInVietnam} · ${copy.scalingGlobally}
        </small>
      </div>
    </div>`;
  }
}

function translatePage() {
  document.documentElement.lang = locale;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = element.dataset[locale];
    if (value) element.innerHTML = value;
  });
  document.querySelectorAll("[data-placeholder]").forEach((element) => {
    const value = element.dataset[locale];
    if (value) element.placeholder = value;
  });
  document.querySelectorAll("title[data-vi], meta[name='description'][data-vi]").forEach((element) => {
    const value = element.dataset[locale];
    if (!value) return;
    if (element.tagName === "TITLE") document.title = value.replace(/<[^>]+>/g, "");
    else element.setAttribute("content", value);
  });
}

function setLocale(nextLocale) {
  locale = nextLocale === "en" ? "en" : "vi";
  localStorage.setItem("sona-global-locale", locale);
  translatePage();
  refreshMetricFormatting();
  renderChrome();
}

function refreshMetricFormatting() {
  const formatter = new Intl.NumberFormat(locale === "vi" ? "vi-VN" : "en-US");
  document.querySelectorAll("[data-count][data-counted]").forEach((card) => {
    const output = card.querySelector("strong");
    if (output) output.textContent = `${formatter.format(Number(card.dataset.count))}${card.dataset.suffix || ""}`;
  });
}

function setRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) return elements.forEach((element) => element.classList.add("is-visible"));
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
  }), { threshold: .12 });
  elements.forEach((element) => observer.observe(element));
}

function setMetricAnimations() {
  const cards = document.querySelectorAll("[data-count]");
  const number = new Intl.NumberFormat(locale === "vi" ? "vi-VN" : "en-US");
  const animate = (card) => {
    if (card.dataset.counted) return;
    card.dataset.counted = "true";
    const target = Number(card.dataset.count);
    const output = card.querySelector("strong");
    const start = performance.now();
    const run = (now) => {
      const progress = Math.min((now - start) / 1100, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      output.textContent = `${number.format(Math.round(target * eased))}${progress === 1 ? card.dataset.suffix || "" : ""}`;
      if (progress < 1) requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  };
  if (!("IntersectionObserver" in window)) return cards.forEach(animate);
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { animate(entry.target); observer.unobserve(entry.target); }
  }), { threshold: .5 });
  cards.forEach((card) => observer.observe(card));
}

const statMotionKinds = [
  [/DATABRICKS VALUATION/, "candles"],
  [/COMPLETION TIME/, "timeline"],
  [/HUMAN INTERVENTION/, "verification"],
  [/AI AGENT MARKET/, "circuit"],
  [/BRINK LIST/, "selection"],
  [/AI SAFETY INVESTMENT/, "growth"],
  [/AVERAGE SERIES A/, "funding"],
  [/PARADIGM SHIFT/, "segments"],
  [/AI TOOL CONSOLIDATION/, "merge"],
  [/AI ENERGY CONSUMPTION/, "wave"],
  [/THỐNG KÊ FUNDING/, "inflow"],
  [/ANTHROPIC VALUATION/, "ramp"],
  [/NEW BILLIONAIRES/, "constellation"],
  [/CHINA AI CHIP/, "chip"],
  [/ENTERPRISE AI ADOPTION/, "gauge"],
  [/AI GOVERNANCE/, "shield"],
];

function getStatMotionKind(visual, index) {
  const label = visual.querySelector("h4")?.textContent?.toUpperCase() || "";
  return statMotionKinds.find(([pattern]) => pattern.test(label))?.[1] || ["growth", "orbit", "wave"][index % 3];
}

function statMotionMarkup(kind) {
  const templates = {
    candles: "<span class=\"motion-candles\"><i></i><i></i><i></i><i></i><i></i></span><span class=\"motion-spark motion-spark--one\"></span><span class=\"motion-spark motion-spark--two\"></span>",
    timeline: "<span class=\"motion-timeline\"><i></i><i></i><i></i><i></i><b></b></span><span class=\"motion-clock\"></span>",
    verification: "<span class=\"motion-verification\"><i>✓</i><i>✓</i><i>✓</i><b>✓</b></span><span class=\"motion-verify-line\"></span>",
    circuit: "<svg class=\"motion-circuit\" viewBox=\"0 0 220 150\" fill=\"none\"><path d=\"M16 111 H59 V68 H104 V34 H186\"/><path d=\"M28 34 H75 V110 H155 V76 H202\"/><circle cx=\"59\" cy=\"111\" r=\"5\"/><circle cx=\"104\" cy=\"68\" r=\"5\"/><circle cx=\"155\" cy=\"110\" r=\"5\"/><circle class=\"motion-circuit__beacon\" cx=\"186\" cy=\"34\" r=\"8\"/></svg>",
    selection: "<span class=\"motion-selection\"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><b></b></span>",
    growth: "<svg class=\"motion-growth\" viewBox=\"0 0 220 150\" fill=\"none\"><path d=\"M9 124 C30 116 37 82 55 95 S80 111 98 67 S126 95 145 55 S174 80 194 28 S208 40 214 18\"/><circle cx=\"55\" cy=\"95\" r=\"3\"/><circle cx=\"145\" cy=\"55\" r=\"3\"/><circle cx=\"214\" cy=\"18\" r=\"4\"/></svg><span class=\"motion-growth-glow\"></span>",
    funding: "<span class=\"motion-funding\"><i></i><i></i><i></i><i></i><b>$</b></span><span class=\"motion-funding-line\"></span>",
    segments: "<span class=\"motion-segments\"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><b>8</b></span>",
    merge: "<svg class=\"motion-merge\" viewBox=\"0 0 220 150\" fill=\"none\"><path d=\"M10 25 C78 25 64 74 145 74 H210\"/><path d=\"M10 75 H210\"/><path d=\"M10 125 C78 125 64 76 145 76 H210\"/><circle cx=\"182\" cy=\"75\" r=\"12\"/></svg>",
    wave: "<span class=\"motion-wave motion-wave--one\"></span><span class=\"motion-wave motion-wave--two\"></span><span class=\"motion-wave motion-wave--three\"></span><span class=\"motion-energy-core\"></span>",
    inflow: "<span class=\"motion-inflow\"><i></i><i></i><i></i><b></b></span><span class=\"motion-inflow-pulse\"></span>",
    ramp: "<span class=\"motion-ramp\"><i></i><i></i><i></i><i></i><i></i><b></b></span><span class=\"motion-ramp-dot\"></span>",
    constellation: "<svg class=\"motion-constellation\" viewBox=\"0 0 220 150\" fill=\"none\"><path d=\"M25 115 L58 53 L112 88 L166 32 L201 83 L112 88 L25 115\"/><circle cx=\"25\" cy=\"115\" r=\"5\"/><circle cx=\"58\" cy=\"53\" r=\"5\"/><circle cx=\"112\" cy=\"88\" r=\"5\"/><circle cx=\"166\" cy=\"32\" r=\"6\"/><circle cx=\"201\" cy=\"83\" r=\"5\"/></svg><span class=\"motion-star motion-star--one\"></span><span class=\"motion-star motion-star--two\"></span>",
    chip: "<span class=\"motion-chip\"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><b>AI</b></span><span class=\"motion-chip-scan\"></span>",
    gauge: "<span class=\"motion-gauge\"><i></i><b></b></span><span class=\"motion-gauge-needle\"></span>",
    shield: "<span class=\"motion-shield\"><i>✓</i></span><span class=\"motion-shield-ring motion-shield-ring--one\"></span><span class=\"motion-shield-ring motion-shield-ring--two\"></span>",
    orbit: "<span class=\"motion-orbit\"><i></i><i></i><b></b></span>",
  };
  return templates[kind] || templates.growth;
}

function metricMotionMarkup(kind) {
  const templates = {
    products: "<span class=\"metric-motion-products\"><i></i><i></i><i></i><b></b></span>",
    audience: "<span class=\"metric-motion-audience\"><i></i><i></i><b></b></span>",
    research: "<span class=\"metric-motion-research\"><i></i><i></i><i></i><i></i><b></b></span>",
  };
  return templates[kind];
}

function setAnimatedDataVisuals() {
  const statVisuals = document.querySelectorAll(".stats-visual");
  const metricCards = document.querySelectorAll(".metric-card");
  const animatedElements = [];

  statVisuals.forEach((visual, index) => {
    if (visual.querySelector(".stats-motion")) return;

    const copy = document.createElement("div");
    copy.className = "stats-copy";
    while (visual.firstChild) copy.append(visual.firstChild);

    const motion = document.createElement("div");
    const kind = getStatMotionKind(visual, index);
    motion.className = `stats-motion stats-motion--${kind}`;
    motion.setAttribute("aria-hidden", "true");
    motion.innerHTML = statMotionMarkup(kind);

    visual.classList.add("has-motion", `stats-visual--${kind}`);
    visual.append(copy, motion);
    animatedElements.push(visual);
  });

  metricCards.forEach((card, index) => {
    if (card.querySelector(".metric-card__motion")) return;

    const motion = document.createElement("div");
    const kind = ["products", "audience", "research"][index % 3];
    motion.className = `metric-card__motion metric-card__motion--${kind}`;
    motion.setAttribute("aria-hidden", "true");
    motion.innerHTML = metricMotionMarkup(kind);
    card.classList.add("has-metric-motion");
    card.append(motion);
    animatedElements.push(card);
  });

  if (!animatedElements.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    animatedElements.forEach((element) => element.classList.add("is-animated"));
    return;
  }

  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-animated");
    observer.unobserve(entry.target);
  }), { threshold: .2 });
  animatedElements.forEach((element) => observer.observe(element));
}

function setInteractiveMotion() {
  const isMobile = window.innerWidth <= 720;
  const isLowEnd = navigator.deviceMemory && navigator.deviceMemory <= 2;
  
  // Skip tilt on low-end devices
  if (isLowEnd || isMobile) {
    document.querySelectorAll("[data-tilt]").forEach(card => {
      card.style.transform = 'none';
      // Simple touch feedback instead
      card.addEventListener("touchstart", () => card.style.transform = "scale(0.98)", { passive: true });
      card.addEventListener("touchend", () => card.style.transform = "scale(1)", { passive: true });
    });
    return;
  }
  
  // Optimized tilt with requestAnimationFrame batching
  const tiltElements = document.querySelectorAll("[data-tilt]");
  let tiltRAF = null;
  const pendingTilts = new Map();
  
  const processTilts = () => {
    pendingTilts.forEach((data, element) => {
      element.style.setProperty("--tilt-y", `${data.rotateY}deg`);
      element.style.setProperty("--tilt-x", `${data.rotateX}deg`);
    });
    pendingTilts.clear();
    tiltRAF = null;
  };
  
  tiltElements.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const rotateY = ((event.clientX - rect.left) / rect.width - .5) * 5;
      const rotateX = ((event.clientY - rect.top) / rect.height - .5) * -4;
      
      pendingTilts.set(card, { rotateY, rotateX });
      
      if (!tiltRAF) {
        tiltRAF = requestAnimationFrame(processTilts);
      }
    }, { passive: true });
    
    card.addEventListener("pointerleave", () => { 
      pendingTilts.delete(card);
      card.style.setProperty("--tilt-y", "0deg"); 
      card.style.setProperty("--tilt-x", "0deg"); 
    });
  });
  
  // Highly optimized parallax with Intersection Observer
  const parallaxElements = document.querySelectorAll("[data-parallax]");
  if (!parallaxElements.length) return;
  
  let scrollRAF = null;
  let isScrolling = false;
  
  // Only track visible elements
  const visibleElements = new Set();
  
  const parallaxObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        visibleElements.add(entry.target);
      } else {
        visibleElements.delete(entry.target);
      }
    });
  }, { rootMargin: '100px' });
  
  parallaxElements.forEach(el => parallaxObserver.observe(el));
  
  const updateParallax = () => {
    if (!isScrolling) return;
    
    const scrollY = window.scrollY;
    visibleElements.forEach(element => {
      const speed = Number(element.dataset.parallax);
      element.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
    });
    
    scrollRAF = null;
    isScrolling = false;
  };
  
  window.addEventListener("scroll", () => {
    isScrolling = true;
    if (!scrollRAF) {
      scrollRAF = requestAnimationFrame(updateParallax);
    }
  }, { passive: true });
}

function drawNetwork() {
  const canvas = document.querySelector("#network");
  if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  
  // Performance optimizations
  const isMobile = window.innerWidth <= 720;
  const isLowEnd = navigator.deviceMemory && navigator.deviceMemory <= 2;
  
  if (isLowEnd) {
    canvas.style.display = 'none';
    return;
  }
  
  const context = canvas.getContext("2d", { 
    alpha: true, 
    desynchronized: true,
    powerPreference: "low-power" // Battery optimization
  });
  
  // Adaptive particle count
  const baseCount = isMobile ? 20 : 32;
  const points = Array.from({ length: baseCount }, () => ({ 
    x: Math.random(), 
    y: Math.random(), 
    vx: (Math.random() - .5) * .0002, 
    vy: (Math.random() - .5) * .0002 
  }));
  
  let resizeRAF = null;
  const resize = () => { 
    if (resizeRAF) return;
    resizeRAF = requestAnimationFrame(() => {
      const dpr = Math.min(window.devicePixelRatio, 2); // Cap DPR for performance
      canvas.width = window.innerWidth * dpr; 
      canvas.height = window.innerHeight * dpr; 
      canvas.style.width = `${window.innerWidth}px`; 
      canvas.style.height = `${window.innerHeight}px`; 
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      resizeRAF = null;
    });
  };
  
  let lastFrameTime = 0;
  const targetFPS = isMobile ? 20 : 30; // Reduced from 60fps
  const frameInterval = 1000 / targetFPS;
  
  const render = (currentTime) => {
    const elapsed = currentTime - lastFrameTime;
    
    if (elapsed < frameInterval) {
      requestAnimationFrame(render);
      return;
    }
    
    lastFrameTime = currentTime - (elapsed % frameInterval);
    
    const width = window.innerWidth, height = window.innerHeight;
    context.clearRect(0, 0, width, height);
    
    // Update positions (batch operations)
    points.forEach((point) => { 
      point.x += point.vx; 
      point.y += point.vy; 
      if (point.x < 0 || point.x > 1) point.vx *= -1; 
      if (point.y < 0 || point.y > 1) point.vy *= -1; 
    });
    
    // Optimized drawing with reduced distance checks
    const maxDistance = isMobile ? 100 : 120;
    context.strokeStyle = "rgba(85,228,255,0.08)";
    context.fillStyle = "rgba(216,255,94,.32)";
    
    // Batch path operations
    context.beginPath();
    for (let i = 0; i < points.length; i += 1) {
      for (let j = i + 1; j < points.length; j += 1) { 
        const a = points[i], b = points[j];
        const dx = (a.x - b.x) * width;
        const dy = (a.y - b.y) * height;
        const d = Math.hypot(dx, dy);
        
        if (d < maxDistance) { 
          context.globalAlpha = .08 * (1 - d / maxDistance);
          context.moveTo(a.x * width, a.y * height); 
          context.lineTo(b.x * width, b.y * height); 
        } 
      }
    }
    context.stroke();
    
    // Batch circle drawing
    points.forEach((point) => { 
      context.globalAlpha = .32;
      context.beginPath(); 
      context.arc(point.x * width, point.y * height, 1.2, 0, Math.PI * 2); 
      context.fill(); 
    });
    
    requestAnimationFrame(render);
  };
  
  resize(); 
  window.addEventListener("resize", resize, { passive: true }); 
  requestAnimationFrame(render);
}

function setContactForm() {
  const form = document.querySelector("[data-contact-form]");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const values = new FormData(form);
    const subject = `${values.get("topic")} — ${values.get("name")}`;
    const body = `${locale === "vi" ? "Họ và tên" : "Name"}: ${values.get("name")}\nEmail: ${values.get("email")}\n${locale === "vi" ? "Nội dung" : "Message"}:\n${values.get("message")}`;
    window.location.href = `mailto:nguyenhoainam.090801@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

function loadFooterStyles() {
  if (document.querySelector("#sona-footer-styles")) return;
  const stylesheet = document.createElement("link");
  stylesheet.id = "sona-footer-styles";
  stylesheet.rel = "stylesheet";
  stylesheet.href = "./footer.css?v=20260817-2";
  document.head.append(stylesheet);
}

function initRotatingProducts() {
  // Sử dụng CHÍNH XÁC 8 ảnh bạn đã cung cấp
  const productImages = [
    './media/product1-popcorn.jpg',      // Ảnh popcorn maker
    './media/product2-videomaker.jpg',   // Ảnh V video maker  
    './media/product3-vivaone.jpg',      // Ảnh viva one logo
    './media/product4-beauty.jpg',       // Ảnh beauty face editor
    './media/product5-genius.jpg',       // Ảnh Genius AI Art Photo Editor
    './media/product6-lovecalls.jpg',    // Ảnh love calls/heart
    './media/product7-voicelock.jpg',    // Ảnh voice lock/phone
    './media/product8-camera.jpg'        // Ảnh camera purple icon
  ];

  // Shuffle để random mỗi lần load
  const shuffled = [...productImages].sort(() => Math.random() - 0.5);
  
  const productOrbits = document.querySelectorAll('.product-orbit');
  productOrbits.forEach((orbit, index) => {
    const img = orbit.querySelector('img');
    if (img && shuffled[index]) {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.8s ease';
      
      img.src = shuffled[index];
      img.alt = `Sản phẩm ${index + 1}`;
      
      img.addEventListener('load', () => {
        setTimeout(() => {
          img.style.opacity = '1';
        }, index * 150);
      });
      
      img.addEventListener('error', (e) => {
        console.error('Không load được ảnh:', img.src);
        img.style.opacity = '0.3';
      });
    }
  });
}

document.body.id = "top";
loadFooterStyles();
translatePage();
renderChrome();
setRevealAnimations();
setMetricAnimations();
setAnimatedDataVisuals();
setInteractiveMotion();
setContactForm();
drawNetwork();
initRotatingProducts();
window.addEventListener("scroll", () => document.querySelector(".site-header")?.classList.toggle("is-scrolled", window.scrollY > 12), { passive: true });

// Register Service Worker for performance
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => {
        console.log('🚀 SW registered successfully');
        
        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('📦 New version available');
              // Could show update notification here
            }
          });
        });
      })
      .catch(error => console.log('❌ SW registration failed:', error));
  });
}
