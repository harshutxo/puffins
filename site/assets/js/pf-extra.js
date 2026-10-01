/* Extra motion layer (see pf-extra.css). No libraries; skipped under prefers-reduced-motion. */
(function () {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var small = window.innerWidth < 700;

  /* drifting puffs in every hero; paused while the hero is off screen */
  document.querySelectorAll(".pf-hero, .hero-photo").forEach(function (hero) {
    var layer = document.createElement("div");
    layer.className = "pf-puffs";
    layer.setAttribute("aria-hidden", "true");
    var n = small ? 7 : 12;
    for (var i = 0; i < n; i++) {
      var p = document.createElement("i");
      p.style.setProperty("--x", (4 + (i * 83 / n) + Math.random() * 6).toFixed(1) + "%");
      p.style.setProperty("--s", (10 + Math.random() * 18).toFixed(0) + "px");
      p.style.setProperty("--d", (9 + Math.random() * 9).toFixed(1) + "s");
      p.style.setProperty("--delay", (-Math.random() * 14).toFixed(1) + "s");
      p.style.setProperty("--dx", ((Math.random() - 0.5) * 120).toFixed(0) + "px");
      layer.appendChild(p);
    }
    hero.insertBefore(layer, hero.firstChild);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        layer.classList.toggle("is-paused", !es[0].isIntersecting);
      }).observe(hero);
    }
  });

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

  /* rotating "puffed, not fried" badge on the homepage hero */
  var home = document.querySelector(".pf-hero");
  if (home) {
    var t = "PUFFED NOT FRIED • PUFFED NOT FRIED • ";
    var badge = document.createElement("div");
    badge.className = "pf-badge";
    badge.setAttribute("aria-hidden", "true");
    badge.innerHTML = '<svg viewBox="0 0 120 120"><defs><path id="pf-circ" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"/></defs>' +
      '<circle cx="60" cy="60" r="58" fill="#141a5c"/>' +
      '<text font-family="Sora,sans-serif" font-weight="800" font-size="11.5" letter-spacing="1.6" fill="#ffc257"><textPath href="#pf-circ">' + t + '</textPath></text></svg>';
    home.appendChild(badge);
  }
})();
