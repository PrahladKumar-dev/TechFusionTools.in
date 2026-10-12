# TechFusion Tools — Modular React Website

## Run locally
1. Extract the ZIP.
2. Open this folder in VS Code.
3. Run `npm install`.
4. Run `npm run dev` and open the Local URL shown by Vite.

## Where to edit things
Each page section has its own JSX and CSS file under `src/components/`:

- `Header.jsx` / `Header.css` — navigation and logo
- `HeroSlider.jsx` / `HeroSlider.css` — main hero slider, arrows, side thumbnails and slide timing
- `Categories.jsx` / `Categories.css` — category cards and category images
- `Products.jsx` / `Products.css` — search, category filters, product cards, details modal and quote action
- `About.jsx` / `About.css` — about section
- `WhyUs.jsx` / `WhyUs.css` — benefits
- `Contact.jsx` / `Contact.css` — contact panel
- `Footer.jsx` / `Footer.css` — footer and social links
- `src/data.jsx` — hero slide text/images and category card content
- `public/products.json` — product names, descriptions, category names, specs and product image paths
- `public/assets/` — logo, hero, category and product images
- `public/admin.html`, `public/admin.js`, `public/admin.css` — admin page

The product grid uses the original `products.json` and assets. The hero changes one full image at a time; use the arrows, dots or right-side image thumbnails to navigate.
