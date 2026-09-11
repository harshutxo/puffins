/**
 * Editable product/content data, loaded as a plain script so pages work
 * with or without a web server (no fetch()/CORS dependency on file://).
 * Mirrors assets/data/products.json — update both together, or swap this
 * for a real CMS/API call later without touching page markup.
 */
window.PUFFINS_PRODUCTS = {
  "products": [
    {
      "id": "rice-cakes",
      "name": "Puffins Rice Cakes",
      "slug": "rice-cakes",
      "shortDescription": "Puffed, not fried. Light, crunchy puffed-rice cakes made for anytime snacking.",
      "format": "Cylindrical tube pack",
      "heroImage": "assets/img/brand/packshot-sea-salt.jpg",
      "galleryImages": [
        "assets/img/brand/packshot-sea-salt.jpg",
        "assets/img/brand/plain-rice-cakes.webp",
        "assets/img/brand/topped-four-ways.webp",
        "assets/img/brand/lifestyle-topped-egg-prosciutto.jpg"
      ],
      "status": "available",
      "flavors": [
        { "name": "Sea Salt", "status": "available", "swatch": "#0F2740" },
        { "name": "Peri Peri", "status": "coming-soon", "swatch": "#E2472B" },
        { "name": "Herb & Garlic", "status": "coming-soon", "swatch": "#4F8A3D" },
        { "name": "Tomato Basil", "status": "coming-soon", "swatch": "#C0392B" },
        { "name": "Chaat Masala", "status": "coming-soon", "swatch": "#C77C1E" }
      ],
      "packSize": { "value": "8 cakes per sleeve, 6 g each (48 g net)", "confirmed": true },
      "price": { "amount": null, "currency": "INR", "confirmed": false, "note": "Pricing to be confirmed by SIF before checkout goes live." },
      "attributes": ["Puffed, not fried", "Gluten free", "100% vegetarian", "No added preservatives"],
      "attributesConfirmed": false,
      "ingredients": { "text": "Rice — that's it. Whole grains are pressed at 200°C; the pressure drop expands the grain and binds it to itself. No syrup, no oil, no flour, nothing else added.", "confirmed": true },
      "allergens": { "text": null, "confirmed": false },
      "nutrition": { "perServing": null, "confirmed": false },
      "shelfLife": { "text": null, "confirmed": false },
      "storage": { "text": "Store in a cool, dry place. Reseal after opening to keep the crunch.", "confirmed": false },
      "faqs": [
        { "q": "Are Puffins Rice Cakes puffed or fried?", "a": "Puffed, not fried — that's how we keep them light without losing crunch." },
        { "q": "Are they gluten free?", "a": "Yes, made from puffed rice. Final allergen statement will be published once SIF confirms manufacturing details." },
        { "q": "How should I store them?", "a": "Keep the pack sealed in a cool, dry place, and reseal it after opening to keep every cake crunchy." }
      ]
    },
    {
      "id": "rice-chips",
      "name": "Puffins Rice Chips",
      "slug": "rice-chips",
      "shortDescription": "Thin, crispy puffed-rice chips in a sealed bag — a snackier bite for on-the-go moments.",
      "format": "Sealed bag",
      "heroImage": "assets/img/brand/topped-four-ways.webp",
      "galleryImages": [
        "assets/img/brand/topped-four-ways.webp",
        "assets/img/brand/plain-rice-cakes.webp"
      ],
      "status": "coming-soon",
      "flavors": [
        { "name": "Flavour 1", "status": "coming-soon", "swatch": "#FF8A00" },
        { "name": "Flavour 2", "status": "coming-soon", "swatch": "#FFC257" },
        { "name": "Flavour 3", "status": "coming-soon", "swatch": "#17b3a3" }
      ],
      "packSize": { "value": null, "confirmed": false },
      "price": { "amount": null, "currency": "INR", "confirmed": false, "note": "Pricing to be confirmed by SIF." },
      "attributes": ["Puffed, not fried", "Gluten free", "100% vegetarian"],
      "attributesConfirmed": false,
      "ingredients": { "text": null, "confirmed": false },
      "allergens": { "text": null, "confirmed": false },
      "nutrition": { "perServing": null, "confirmed": false },
      "shelfLife": { "text": null, "confirmed": false },
      "storage": { "text": "Store in a cool, dry place.", "confirmed": false },
      "faqs": [
        { "q": "When will Rice Chips launch?", "a": "Rice Chips are next on our roadmap. Join the list on our Contact page and we'll let you know the moment they're available." }
      ]
    }
  ]
};
