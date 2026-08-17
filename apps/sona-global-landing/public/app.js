const labels = {
  vi: {
    about: "Về chúng tôi", ecosystem: "Ecosystem", publishing: "Phát hành", share: "We Share", library: "Thư viện", contact: "Liên hệ", footer: "CREATIONS FOR BILLIONS", what: "WHAT", who: "WHO", mobileApps: "Mobile Apps", aiApps: "AI Apps", privacy: "Chính sách bảo mật", terms: "Điều khoản sử dụng", cookies: "Quản lý cookies"
  },
  en: {
    about: "About us", ecosystem: "Ecosystem", publishing: "Publishing", share: "We Share", library: "Library", contact: "Contact", footer: "CREATIONS FOR BILLIONS", what: "WHAT", who: "WHO", mobileApps: "Mobile Apps", aiApps: "AI Apps", privacy: "Privacy Policy", terms: "Terms of Use", cookies: "Manage Cookies"
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
    footer.innerHTML = `<div class="footer-shell"><a class="footer-brand" href="./index.html" aria-label="SONA-GLOBAL home"><span class="brand-mark" aria-hidden="true"></span><span>SONA-GLOBAL<small>${copy.footer}</small></span></a><div class="footer-columns"><section><p>${copy.what}</p><a href="./ecosystem.html#products-title">${copy.mobileApps}</a><a href="./ecosystem.html#products-title">${copy.aiApps}</a><a href="./publishing.html">${copy.publishing}</a></section><section><p>${copy.who}</p><a href="./index.html">${copy.about}</a><a href="./share.html">${copy.share}</a><a href="./library.html">${copy.library}</a></section></div><div class="footer-legal"><span>© ${new Date().getFullYear()} SONA-GLOBAL</span><div><span>${copy.privacy}</span><span>${copy.terms}</span><span>${copy.cookies}</span></div></div></div>`;
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

function setInteractiveMotion() {
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--tilt-y", `${((event.clientX - rect.left) / rect.width - .5) * 5}deg`);
      card.style.setProperty("--tilt-x", `${((event.clientY - rect.top) / rect.height - .5) * -4}deg`);
    });
    card.addEventListener("pointerleave", () => { card.style.setProperty("--tilt-y", "0deg"); card.style.setProperty("--tilt-x", "0deg"); });
  });
  const parallax = document.querySelectorAll("[data-parallax]");
  const move = () => parallax.forEach((element) => element.style.transform = `translateY(${window.scrollY * Number(element.dataset.parallax)}px)`);
  window.addEventListener("scroll", move, { passive: true });
  move();
}

function drawNetwork() {
  const canvas = document.querySelector("#network");
  if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const context = canvas.getContext("2d");
  const points = Array.from({ length: 42 }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - .5) * .00022, vy: (Math.random() - .5) * .00022 }));
  const resize = () => { canvas.width = window.innerWidth * devicePixelRatio; canvas.height = window.innerHeight * devicePixelRatio; canvas.style.width = `${window.innerWidth}px`; canvas.style.height = `${window.innerHeight}px`; context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0); };
  const render = () => {
    const width = window.innerWidth, height = window.innerHeight;
    context.clearRect(0, 0, width, height);
    points.forEach((point) => { point.x += point.vx; point.y += point.vy; if (point.x < 0 || point.x > 1) point.vx *= -1; if (point.y < 0 || point.y > 1) point.vy *= -1; });
    for (let i = 0; i < points.length; i += 1) for (let j = i + 1; j < points.length; j += 1) { const a = points[i], b = points[j], dx = (a.x - b.x) * width, dy = (a.y - b.y) * height, d = Math.hypot(dx, dy); if (d < 145) { context.strokeStyle = `rgba(85,228,255,${.08 * (1 - d / 145)})`; context.beginPath(); context.moveTo(a.x * width, a.y * height); context.lineTo(b.x * width, b.y * height); context.stroke(); } }
    points.forEach((point) => { context.fillStyle = "rgba(216,255,94,.32)"; context.beginPath(); context.arc(point.x * width, point.y * height, 1.2, 0, Math.PI * 2); context.fill(); });
    requestAnimationFrame(render);
  };
  resize(); window.addEventListener("resize", resize); render();
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
setInteractiveMotion();
setContactForm();
drawNetwork();
initRotatingProducts();
window.addEventListener("scroll", () => document.querySelector(".site-header")?.classList.toggle("is-scrolled", window.scrollY > 12), { passive: true });
