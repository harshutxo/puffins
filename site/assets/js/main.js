/* PUFFINS — shared site behaviour: nav, accordion, tabs, forms, product rendering */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initAccordions();
    initTabs();
    initForms();
    initFlavorChips();
    initYear();
    renderProductCards();
    renderProductDetail();
    initHeaderScroll();
    initBackToTop();
    initScrollReveal();
  });

  /* ---------------- Header shadow on scroll ---------------- */
  function initHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------- Back to top ---------------- */
  function initBackToTop() {
    var btn = document.createElement("button");
    btn.className = "back-to-top";
    btn.type = "button";
    btn.setAttribute("aria-label", "Back to top");
    btn.innerHTML = "↑";
    document.body.appendChild(btn);
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    window.addEventListener("scroll", function () {
      btn.classList.toggle("is-visible", window.scrollY > 600);
    }, { passive: true });
  }

  /* ---------------- Scroll-reveal for section content ---------------- */
  function initScrollReveal() {
    var selector = [
      "main section .section-head", "main .card", "main .product-card",
      "main .quote-card", "main .team-card", "main .step",
      ".hero-copy", ".hero-media", "main .cta-band"
    ].join(",");
    var targets = document.querySelectorAll(selector);
    if (!targets.length) return;
    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("reveal", "is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    targets.forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = (i % 4) * 70 + "ms";
      io.observe(el);
    });
  }

  /* ---------------- Mobile nav ---------------- */
  function initNav() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var menu = document.querySelector("[data-nav-mobile]");
    if (!toggle || !menu) return;
    toggle.addEventListener("click", function () {
      var open = toggle.classList.toggle("is-open");
      menu.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        toggle.classList.remove("is-open");
        menu.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------------- FAQ accordions ---------------- */
  function initAccordions() {
    document.querySelectorAll(".accordion-item").forEach(function (item) {
      var q = item.querySelector(".accordion-q");
      if (!q) return;
      q.addEventListener("click", function () {
        var isOpen = item.getAttribute("data-open") === "true";
        item.closest(".accordion").querySelectorAll(".accordion-item").forEach(function (other) {
          if (other !== item && other.dataset.singleOpen !== "false") {
            other.setAttribute("data-open", "false");
            other.querySelector(".accordion-q").setAttribute("aria-expanded", "false");
          }
        });
        item.setAttribute("data-open", isOpen ? "false" : "true");
        q.setAttribute("aria-expanded", isOpen ? "false" : "true");
      });
    });
  }

  /* ---------------- Tabs (product detail) ---------------- */
  function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach(function (wrap) {
      var buttons = wrap.querySelectorAll(".tabs-nav button");
      var panels = wrap.querySelectorAll(".tab-panel");
      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          buttons.forEach(function (b) { b.setAttribute("aria-selected", "false"); });
          panels.forEach(function (p) { p.classList.remove("active"); });
          btn.setAttribute("aria-selected", "true");
          var target = wrap.querySelector('[data-panel="' + btn.dataset.tab + '"]');
          if (target) target.classList.add("active");
        });
      });
    });
  }

  /* ---------------- Flavour chip selection (visual only, no live inventory yet) ---------------- */
  function initFlavorChips() {
    document.querySelectorAll(".flavor-row").forEach(function (row) {
      row.querySelectorAll(".flavor-chip").forEach(function (chip) {
        if (chip.classList.contains("soon")) return;
        chip.addEventListener("click", function () {
          row.querySelectorAll(".flavor-chip").forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
          chip.setAttribute("aria-pressed", "true");
        });
      });
    });
  }

  /* ---------------- Forms: client-side validation + honeypot spam guard ---------------- */
  function initForms() {
    document.querySelectorAll("form[data-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        var honeypot = form.querySelector('input[name="website"]');
        if (honeypot && honeypot.value) return; // silently drop bots

        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        var successEl = form.parentElement.querySelector(".form-success") || form.querySelector(".form-success");
        form.reset();
        if (successEl) {
          successEl.classList.add("show");
          successEl.setAttribute("role", "status");
          successEl.focus && successEl.focus();
        }
        // NOTE for developer: wire this submit handler to the chosen backend
        // (form API, serverless function, or CMS) before go-live. Currently
        // simulates success client-side only.
      });
    });
  }

  function initYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------------- Product catalogue rendering ---------------- */
  function getProducts() {
    return (window.PUFFINS_PRODUCTS && window.PUFFINS_PRODUCTS.products) || [];
  }

  function priceLabel(p) {
    if (p.price && p.price.confirmed && p.price.amount != null) {
      return "₹" + p.price.amount;
    }
    return "Price coming soon";
  }

  function renderProductCards() {
    var grid = document.querySelector("[data-product-grid]");
    if (!grid) return;
    var products = getProducts();
    grid.innerHTML = products.map(function (p) {
      var soon = p.status === "coming-soon";
      return (
        '<div class="product-card">' +
          '<div class="media"><img src="' + p.heroImage + '" alt="' + p.name + ' pack" loading="lazy"></div>' +
          '<div class="body">' +
            '<div class="badges">' +
              (soon ? '<span class="badge orange">Coming soon</span>' : '<span class="badge orange">Available</span>') +
              '<span class="badge">' + p.format + '</span>' +
            '</div>' +
            '<h3>' + p.name + '</h3>' +
            '<p>' + p.shortDescription + '</p>' +
            '<div class="price">' +
              '<span>' + priceLabel(p) + '</span>' +
              '<a class="btn btn-outline btn-sm" href="product-' + p.slug + '.html">' + (soon ? 'Notify me' : 'View product') + '</a>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }).join("");
  }

  function renderProductDetail() {
    var root = document.querySelector("[data-product-detail]");
    if (!root) return;
    var slug = root.getAttribute("data-product-detail");
    var product = getProducts().filter(function (p) { return p.slug === slug; })[0];
    if (!product) return;

    // Hero image + gallery thumbs
    var heroImg = root.querySelector("[data-hero-img]");
    if (heroImg) heroImg.src = product.heroImage;
    var thumbs = root.querySelector("[data-gallery-thumbs]");
    if (thumbs) {
      thumbs.innerHTML = product.galleryImages.map(function (src, i) {
        return '<button type="button" class="gallery-thumb" data-src="' + src + '" aria-label="Show image ' + (i + 1) + '"><img src="' + src + '" alt=""></button>';
      }).join("");
      thumbs.querySelectorAll("button").forEach(function (btn) {
        btn.addEventListener("click", function () { if (heroImg) heroImg.src = btn.dataset.src; });
      });
    }

    // Flavours
    var flavorRow = root.querySelector("[data-flavor-row]");
    if (flavorRow) {
      flavorRow.innerHTML = product.flavors.map(function (f, i) {
        var soon = f.status === "coming-soon";
        return '<button type="button" class="flavor-chip' + (soon ? ' soon' : '') + '" ' +
          (soon ? 'disabled title="Coming soon"' : 'aria-pressed="' + (i === 0 ? "true" : "false") + '"') +
          '>' + f.name + (soon ? ' · soon' : '') + '</button>';
      }).join("");
    }

    // Price + pack size
    var priceEl = root.querySelector("[data-price]");
    if (priceEl) priceEl.textContent = priceLabel(product);
    var packEl = root.querySelector("[data-pack-size]");
    if (packEl) packEl.textContent = product.packSize.value || "Pack size to be confirmed";

    // Attributes
    var attrsEl = root.querySelector("[data-attributes]");
    if (attrsEl) {
      attrsEl.innerHTML = product.attributes.map(function (a) {
        return '<span class="badge">' + a + '</span>';
      }).join("");
    }

    // Regulated fields (ingredients/allergens/nutrition/shelf life) — show pending notice unless confirmed
    setRegulatedField(root, "ingredients", product.ingredients);
    setRegulatedField(root, "allergens", product.allergens);
    setRegulatedField(root, "shelf-life", product.shelfLife);
    setRegulatedField(root, "nutrition", product.nutrition, true);

    var storageEl = root.querySelector("[data-storage]");
    if (storageEl) storageEl.textContent = product.storage.text;

    // FAQs
    var faqEl = root.querySelector("[data-product-faqs]");
    if (faqEl) {
      faqEl.innerHTML = product.faqs.map(function (f, i) {
        return (
          '<div class="accordion-item" data-open="' + (i === 0 ? "true" : "false") + '">' +
            '<button class="accordion-q" aria-expanded="' + (i === 0 ? "true" : "false") + '">' + f.q + '<span class="plus">+</span></button>' +
            '<div class="accordion-a"><p>' + f.a + '</p></div>' +
          '</div>'
        );
      }).join("");
      initAccordions();
    }

    // CTA label
    var ctaBtn = root.querySelector("[data-cta-buy]");
    if (ctaBtn) ctaBtn.textContent = product.status === "coming-soon" ? "Notify me at launch" : "Where to buy";

    document.title = product.name + " — Puffins";
  }

  function setRegulatedField(root, key, field, isNutrition) {
    var el = root.querySelector('[data-field="' + key + '"]');
    if (!el) return;
    if (field && field.confirmed && (isNutrition ? field.perServing : field.text)) {
      el.innerHTML = isNutrition ? field.perServing : field.text;
    } else {
      el.innerHTML = '<p class="pending"><strong>Pending SIF approval —</strong> final, lab-verified information will appear here before launch.</p>';
    }
  }
})();
