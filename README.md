# Sun Rich Paradise

A multi-page React storefront built with Next.js. The site includes the home page, a product catalog and product details, wishlist, cart and checkout flows, account screens, company information, and contact details.

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
- `/cart` — Shopping cart with saved items and quantity controls
- `/billing` — Checkout form that prepares an order request email
- `/login` — Sign in
- `/create-account` — Create account
- `/contact` — Contact Sun Rich Paradise
- `/about` — Company information

Product images and other static assets are served from `public/`.

All products are currently priced at $14.99 USD. Cart and checkout subtotals are calculated from the selected quantities; shipping is confirmed separately. Checkout collects billing and shipping details, order notes, and a payment preference, then opens an email draft to `exports@sunrich.org`. It does not process payments.
