src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   │
│   ├── home/
│   │   ├── Hero.jsx
│   │   ├── ProductCarousel.jsx
│   │   ├── Marquee.jsx
│   │   ├── FeaturedProducts.jsx
│   │   ├── ProductCard.jsx
│   │   ├── Materials.jsx
│   │   └── CustomOrder.jsx
│   │
│   ├── cart/
│   │   ├── CartDrawer.jsx
│   │   ├── CartItem.jsx
│   │   └── CartSummary.jsx
│   │
│   └── ui/
│       ├── Button.jsx
│       └── SectionTitle.jsx
│
├── context/
│   └── CartContext.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Shop.jsx
│   └── Product.jsx
│
├── data/
│   └── products.js
│
├── utils/
│   └── whatsapp.js
│
├── App.jsx
├── main.jsx
└── index.css

backend/
├── prisma/
│   └── schema.prisma       (Models: User, Product, Category, Order)
├── src/
│   ├── controllers/        (productController.js, authController.js)
│   ├── routes/             (Express endpoints: /api/products, /api/auth)
│   ├── middleware/         (JWT verification, Admin route protection)
│   └── server.js           (Express app entry point)
└── .env                    (DATABASE_URL from Neon dashboard)


# Neo-Brutalist Merchandise Shop — build log

## Status
Phase 1 done: backend skeleton + Prisma schema.

## Key decisions
- Order = single row, cart frozen as JSON at checkout (no OrderItem table). No payment gateway — checkout hands off to WhatsApp.
- Products have variants (size/color), each variant has its own SKU/price/stock.
- Categories are a separate table (admin-manageable).
- Soft-hide via `Product.isActive` instead of hard delete (same pattern as AMS).
- Auth: single/multi admin `User` only — no customer accounts.

## Phases
1. ✅ Repo skeleton + Prisma schema (Neon Postgres)
2. ⏳ Express routes + JWT admin middleware
3. ⏳ Vite/React scaffold + Tailwind v4 + shadcn/ui neobrutal tokens
4. ⏳ Shop UI: ProductCard, Fuse.js search, CartContext, WhatsApp checkout
5. ⏳ Admin dashboard: inventory CRUD, protected routes

## Open items
- Need Neon Postgres connection string to run first migration.
- WhatsApp checkout message format not yet decided (what fields go into the pre-filled message).