# IdeaMerch Backend

Express + Prisma + Neon Postgres. Admin login (single admin, env-based) + product/category/type CRUD + stats.

## Setup

```bash
npm install
cp .env.example .env
```

Fill in `.env`:
- `DATABASE_URL` — your Neon connection string
- `JWT_SECRET` — `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

Push the schema, seed starter categories/types, and create your first admin:

```bash
npx prisma migrate dev --name init
npm run seed
npm run create-admin -- you@example.com yourpassword "Your Name"
```

Run it:

```bash
npm run dev
```

## Admins

Admins live in the `Admin` table (email, passwordHash, active flag) — not `.env`. Log in
with `POST /api/admin/login` to get a token, then manage other admins with that token:

```
GET    /api/admin/admins           list admins
POST   /api/admin/admins           { name, email, password } — add one
PATCH  /api/admin/admins/:id       update name/email/password/active
DELETE /api/admin/admins/:id       remove one
```

Rules: can't delete yourself while logged in as that account, can't delete the last active
admin. `npm run create-admin -- <email> <password> ["Name"]` also works any time you need
to add someone or reset a password directly against the DB (handy if everyone's locked out).

## Routes

Public:
```
GET  /api/products              ?category=slug&type=slug
GET  /api/products/:slug
GET  /api/categories
GET  /api/product-types
```

Admin (`Authorization: Bearer <token>`):
```
POST   /api/admin/login         { email, password } -> { token }
GET    /api/admin/stats
GET    /api/admin/admins        (see "Admins" section above for the full set)

POST   /api/products
PATCH  /api/products/:id
DELETE /api/products/:id

POST   /api/categories
PATCH  /api/categories/:id
DELETE /api/categories/:id

POST   /api/product-types
PATCH  /api/product-types/:id
DELETE /api/product-types/:id
```

`listProducts` only returns `active: true` products unless you pass `?includeInactive=true`
(use that in the admin panel so you can see deactivated products too).

Categories/types refuse to delete while products still reference them (400, not a crash) —
reassign or delete those products first.

## Not built yet (matches the phased plan)

Orders, custom requests, image upload. Product CRUD here only takes a `thumbnail` URL string —
wire up actual file upload (S3/Cloudinary/etc.) when you get to that phase.
