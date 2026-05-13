# BaseWeb

A reusable full-stack Next.js starter template for quickly spinning up client websites. Derived from patterns across 9 real production projects. Fork it, run one command, and you have a fully branded site ready to deploy.

## Quick Start — New Client Project

### 1. One command to fork, clone, and customize

Open Claude Code anywhere and run:

```
/tl-project-start Smokeys variant:character primary:#8B4513 accent:#D4A574 pages:home,about,contact,shop features:stripe
```

This clones BaseWeb from the `TrippLisClients` org, creates a fresh public repo under your personal GitHub account (no fork link = Vercel free tier), and customizes everything — site config, variant, colors, data, pages, and nav — for your client. Pages you don't need get removed. One clean commit on top.

You can also just describe what you need:

> "Start a new site for a BBQ restaurant called Smokey's with a rustic western look, shop page with Stripe, and a contact form."

Or drop a logo in and let it figure out the colors:

> [paste logo image] "Analyze this and spin up a site"

**Requires:** [GitHub CLI (`gh`)](https://cli.github.com/) installed and authenticated (`gh auth login`).

### 2. Set environment variables

```bash
cp .env.example .env.local
# Fill in your keys (Neon, Resend, Stripe) — all optional for dev
```

### 3. Run it

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What's Included

- **Three-variant theming system** — `safe` (editorial), `character` (warm), `bold` (soft brutalist). Pick one in `site-config.ts` and the whole site swaps fonts, type weights, border weight, and section styling.
- **Three hero layouts** — `split` (headline + photo), `type-only` (centered headline), `fullbleed` (overlaid type on a photo). Default pairings: `safe + split`, `character + type-only`, `bold + fullbleed`. All nine combinations render.
- **Home** page with variant-aware Hero · ServicesPreview · RecentWork · ShopTeaser · Process · Testimonials · JournalTeaser · CTABanner
- **About** page with story section and values grid
- **Services** page with full grid and 4-step process section
- **Shop** page with category filter, cart drawer, product detail pages at `/shop/[slug]`, and Stripe Checkout
- **Blog** with listing grid and individual post pages (SSG)
- **Contact** page with form, honeypot spam protection, and Resend email delivery
- **Admin** dashboard shell with sidebar nav and stat cards
- **Checkout success** page for post-purchase confirmation

### Switching variants

Edit the top of `src/lib/site-config.ts`:

```ts
variant: "safe" as Variant,        // "safe" | "character" | "bold"
hero:    "split" as HeroLayout,    // "split" | "type-only" | "fullbleed"
```

Save → the dev server hot-reloads. Always pair `safe`+`split`, `character`+`type-only`, `bold`+`fullbleed` unless you have a reason to break it.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | **Next.js 16** (App Router) |
| Language | **TypeScript** (strict mode) |
| Styling | **Tailwind CSS v4** with `@theme` design tokens |
| Components | **shadcn/ui** (base-nova style, base-ui primitives) |
| Icons | **Lucide React** |
| Animations | **Framer Motion** |
| Payments | **Stripe** (Checkout Sessions with `price_data`) |
| Database | **Neon Postgres** + **Drizzle ORM** (serverless, HTTP mode) |
| Email | **Resend** (server-side via API route) |
| Testing | **Playwright** (desktop, mobile, Lighthouse) |
| Deployment | **Vercel** |

## Components

All UI is built on [shadcn/ui](https://ui.shadcn.com). Standard components like Button, Card, Badge, Sheet, Input, Textarea, Select, Dialog, and more are installed and ready to use.

Custom components ported across projects:

| Component | What it does |
|-----------|-------------|
| **PaginatedTable** | Generic sortable table with client-side or server-side pagination |
| **DataTableToolbar** | Search input + multi-filter popover (select, multi-select, date range, numeric range) |
| **Typeahead** | Combobox with single/multi-select, search, loading state |
| **DatePicker** | Calendar-based date picker with clearable selection |
| **PageHeader** | Compact left-aligned title + eyebrow + subtitle, variant-aware. Used on all sub-routes. |
| **Placeholder** | Striped slab — a slot for a real photo. Looks intentional without one. |

## Project Structure

```
src/
  app/
    page.tsx              # Home
    about/page.tsx        # About
    services/page.tsx     # Services
    shop/page.tsx         # Shop with cart + Stripe checkout
    shop/success/page.tsx # Post-checkout confirmation
    blog/page.tsx         # Blog listing
    blog/[slug]/page.tsx  # Individual blog posts (SSG)
    contact/page.tsx      # Contact form
    admin/page.tsx        # Admin dashboard shell
    api/
      contact/route.ts        # POST: send email via Resend
      stripe/checkout/route.ts # POST: create Stripe Checkout Session
      stripe/webhook/route.ts  # POST: handle Stripe webhooks
  components/
    layout/    # Navigation, Footer (each switches by variant)
    sections/  # Hero, ServicesPreview, RecentWork, ShopTeaser, Process,
               # Testimonials, JournalTeaser, CTABanner (each switches by variant)
    ui/        # shadcn + custom components (Placeholder, PageHeader, ...)
  data/
    home.ts    # Homepage section content (services, work, products, posts, etc.)
  db/
    schema.ts       # Drizzle table definitions
    queries.ts      # Data access layer (falls back to static data)
    index.ts        # Neon connection
    seed.ts         # Seed script
  data/        # Static fallback data + seed source
  lib/
    site-config.ts  # One file to rebrand the entire site
    stripe.ts       # Stripe server client
    utils.ts        # cn() class merge helper
tests/
  pages.spec.ts       # Smoke tests across desktop + mobile
  lighthouse.spec.ts  # Performance, a11y, SEO audits
```

## Environment Variables

Copy the example and fill in your keys:

```bash
cp .env.example .env.local
```

```
# Database (optional — app uses static data without it)
DATABASE_URL=postgresql://user:pass@ep-xxxx.us-east-2.aws.neon.tech/neondb?sslmode=require

# Email
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=contact@yourdomain.com
RESEND_TO_EMAIL=hello@yourdomain.com

# Payments
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
```

Everything works without external keys in dev mode — the contact form logs to console without Resend, and pages serve static data without a database.

## Database

The app uses **Neon Postgres** with **Drizzle ORM**. Tables: `products`, `blog_posts`, `orders`, `order_items`, `contact_messages`.

**Without a database**, the app falls back to static data from `src/data/` automatically. No setup required to start developing.

**To connect a database:**

```bash
# 1. Create a free project at https://console.neon.tech
# 2. Add the connection string to .env.local
# 3. Push schema and seed data
npm run db:push
npm run db:seed

# 4. Browse your data
npm run db:studio
```

| Script | What it does |
|--------|-------------|
| `npm run db:push` | Push schema to DB (fast, for dev) |
| `npm run db:generate` | Generate migration SQL files |
| `npm run db:migrate` | Apply pending migrations |
| `npm run db:seed` | Seed DB from `src/data/` arrays |
| `npm run db:studio` | Open Drizzle Studio web UI |

## `/tl-logo-analyze` — Brand Extraction from Logos

Have a client logo but don't know the exact hex values or design style? Drop the logo image into Claude Code and run:

```
/tl-logo-analyze
```

The skill analyzes the logo and extracts:

- **Brand colors** — primary, secondary, and accent hex values
- **Typography style** — serif vs sans-serif, weight, geometry, mapped to a Google Font recommendation
- **Design aesthetic** — mapped to a `/tl-project-start` preset (modern, bold, elegant, minimal, etc.)
- **Industry** — inferred from the company name and visual motifs
- **Client name and tagline** — extracted from the logo text

It outputs a brand profile table and a ready-to-paste `/tl-project-start` command:

```
/tl-project-start "Vandy Construction" primary:#2D2B70 secondary:#A0A0A0 accent:#4A4494 design:bold font:montserrat tagline:"Quality & Integrity" pages:home,about,services,contact
```

You can also chain them: "Here's the client's logo — analyze it and spin up a site."

## `/tl-project-start` Parameters

| Parameter | Required | Default | Example |
|-----------|----------|---------|---------|
| `clientName` | Yes | — | `"Smokeys BBQ"` |
| `primary` | Yes | `#3b82f6` | `#002C63` |
| `secondary` | No | `#4b5563` | `#B31942` |
| `accent` | No | `#7c3aed` | `#ffffff` |
| `design` | No | `modern` | `western`, `elegant`, `minimal`, `bold`, `earthy`, `playful` |
| `pages` | No | `home,about,contact,services` | `home,contact,shop,admin,blog` |
| `features` | No | none | `stripe`, `blog`, `admin` |
| `font` | No | `Inter` | `playfair-display`, `poppins`, `garamond`, `lora` |
| `tagline` | No | Auto-generated | `"The Best BBQ in Town"` |
| `description` | No | Auto-generated | `"Family-owned BBQ since 1985"` |
| `email` | No | `hello@example.com` | `info@smokeys.com` |
| `phone` | No | `(555) 123-4567` | `(864) 555-1234` |

### Examples

```bash
# Rustic BBQ restaurant with shop and Stripe payments
/tl-project-start Smokeys primary:#8B4513 secondary:#2F1810 accent:#D4A574 design:rustic pages:home,about,contact,shop features:stripe font:playfair-display

# Earthy yoga studio with blog
/tl-project-start "Sacred Space Yoga" primary:#6B8F71 secondary:#D4CBBA accent:#8B6914 design:earthy pages:home,about,services,contact,blog font:lora

# Bold engineering firm
/tl-project-start "Clemson Engineering" primary:#F24906 secondary:#000000 design:bold pages:home,about,services,contact font:inter

# Elegant design studio with full feature set
/tl-project-start BrelizDesigns primary:#E8B4C8 secondary:#2C2C2C accent:#C9A96E design:elegant pages:home,about,shop,contact,blog,admin features:stripe font:cormorant-garamond
```

## Testing

```bash
# Page tests across desktop Chrome, iPhone 14, Pixel 7, iPad
npm test

# Lighthouse audits (performance, accessibility, SEO, best practices)
npm run test:lighthouse

# Everything
npm run test:all
```

**88 page tests** covering smoke tests, navigation, mobile menu, contact form, shop cart, blog, footer, and accessibility across 4 device profiles.

**12 Lighthouse audits** on 6 pages (desktop + mobile) with thresholds for performance, accessibility, best practices, and SEO.

## Deploy

```bash
vercel
```

No `vercel.json` needed. Set environment variables via `vercel env add`.

See `BASEWEB-SPEC.md` for the full specification.
