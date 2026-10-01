/* Extra motion layer (see pf-extra.css). No libraries; skipped under prefers-reduced-motion. */
(function () {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var small = window.innerWidth < 700;

  /* drifting puffs: heavier in heroes, lighter in every other section and the footer */
  var puffLayers = [];
  function addPuffs(host, count, isSection) {
    if (host.querySelector(":scope > .pf-puffs")) return;
    if (getComputedStyle(host).position === "static") host.style.position = "relative";
    if (isSection) host.style.isolation = "isolate";
    var layer = document.createElement("div");
    layer.className = "pf-puffs" + (isSection ? " is-section" : "");
    layer.setAttribute("aria-hidden", "true");
    for (var i = 0; i < count; i++) {
      var p = document.createElement("i");
      p.style.setProperty("--x", (4 + (i * 88 / count) + Math.random() * 6).toFixed(1) + "%");
      p.style.setProperty("--s", (10 + Math.random() * 18).toFixed(0) + "px");
      p.style.setProperty("--d", (9 + Math.random() * 9).toFixed(1) + "s");
      p.style.setProperty("--delay", (-Math.random() * 14).toFixed(1) + "s");
      p.style.setProperty("--dx", ((Math.random() - 0.5) * 120).toFixed(0) + "px");
      layer.appendChild(p);
    }
    host.insertBefore(layer, host.firstChild);
    puffLayers.push(layer);
  }
  document.querySelectorAll(".pf-hero, .hero-photo").forEach(function (h) { addPuffs(h, small ? 7 : 12, false); });
  document.querySelectorAll("main section, .site-footer").forEach(function (s) {
    if (s.matches(".pf-hero, .hero-photo, .lp-hero")) return;
    addPuffs(s, small ? 3 : 5, true);
  });
  if ("IntersectionObserver" in window) {
    var pio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.target.classList.toggle("is-paused", !e.isIntersecting); });
    });
    puffLayers.forEach(function (l) { pio.observe(l); });
  }

  /* ribbon above the footer on every page */
  var foot = document.querySelector(".site-footer");
  if (foot && !document.querySelector(".pf-ribbon")) {
    var words = ["Puffed, not fried", "Light", "Flavorful", "Anytime", "Made in Jaipur"];
    var set = words.map(function (w) { return "<span>" + w + "</span>"; }).join("");
    var rb = document.createElement("div");
    rb.className = "marquee pf-ribbon";
    rb.setAttribute("aria-hidden", "true");
    rb.innerHTML = '<div class="marquee-track">' + set + set + set + set + "</div>";
    foot.parentNode.insertBefore(rb, foot);
  }

  /* click ripple on buttons */
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".btn, .pf-btn, .pf-cta");
    if (!b) return;
    var r = b.getBoundingClientRect(), d = Math.max(r.width, r.height) * 2;
    var s = document.createElement("span");
    s.className = "pf-ripple";
    s.style.cssText = "width:" + d + "px;height:" + d + "px;left:" + (e.clientX - r.left - d / 2) + "px;top:" + (e.clientY - r.top - d / 2) + "px";
    b.appendChild(s);
    setTimeout(function () { s.remove(); }, 650);
  });

  /* footer columns stagger in */
  var fg = document.querySelector(".footer-grid");
  if (fg && "IntersectionObserver" in window) {
    Array.prototype.forEach.call(fg.children, function (c, i) { c.style.setProperty("--i", i); });
    var io = new IntersectionObserver(function (es) {
      if (es[0].isIntersecting) { fg.classList.add("pf-in"); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(fg);
  } else if (fg) { fg.classList.add("pf-in"); }

  /* rotating badge: homepage hero + every interior hero */
  var n = 0;
  function badge(host, text) {
    var id = "pf-circ-" + (n++);
    var b = document.createElement("div");
    b.className = "pf-badge";
    b.setAttribute("aria-hidden", "true");
    b.innerHTML = '<svg viewBox="0 0 120 120"><defs><path id="' + id + '" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"/></defs>' +
      '<circle cx="60" cy="60" r="58" fill="#141a5c"/>' +
      '<text font-family="Sora,sans-serif" font-weight="800" font-size="12" fill="#ffc257"><textPath href="#' + id + '" textLength="270" lengthAdjust="spacing">' + text + "</textPath></text></svg>";
    host.appendChild(b);
  }
  var home = document.querySelector(".pf-hero");
  if (home) badge(home, "PUFFED NOT FRIED • ");
  document.querySelectorAll(".hero-photo").forEach(function (h) { badge(h, "LIGHT • FLAVORFUL • ANYTIME • "); });
})();
