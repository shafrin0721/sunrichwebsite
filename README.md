# Sun Rich Paradise

A multi-page React storefront built with Next.js. The site includes the home page, a product catalog and product details, wishlist and quote request flows, account screens, company information, and contact details.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production

```bash
npm run build
npm start
```

## Pages

- `/` — Home
- `/products` — Product catalog with search, categories, sorting, and quick view
- `/products/[id]` — Product details
- `/wishlist` — Saved products
- `/billing` — Quote request
- `/login` — Sign in
- `/create-account` — Create account
- `/contact` — Contact Sun Rich Paradise
- `/about` — Company information

Product images and other static assets are served from `public/`.
