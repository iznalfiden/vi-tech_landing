# Vi-Tech Landing Project — Agent Guide

## Project Overview

**Vi-Tech Landing** is a corporate marketing website for "Virtuous Improvement Technologies" — a company providing Lean/AI manufacturing software solutions. The website showcases four main products:

- **GoSeeiT** — Workplace Audit tool
- **StandardiziT** — Work Standards and SWC
- **Resolvit** — AI-powered standardized problem solving
- **ImproviT** — Structured Idea Generation & Implementation

The site is a bilingual (EN/RU) landing page with product descriptions, an about page, demo booking form, and legal pages (Privacy, GDPR, Copyright).

## Technology Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 15](https://nextjs.org) (App Router, React Server Components) |
| React | React 19.1.0 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + CSS Variables |
| UI Components | shadcn/ui (New York style) |
| Animation | Framer Motion |
| Icons | Lucide React |
| Validation | Zod |
| Email | Nodemailer |
| Analytics | Vercel Analytics |
| SEO | next-seo, next-sitemap |
| Build Tool | Turbopack (via `--turbopack` flag) |

## Project Structure

```
/Users/madiariznalfiden/Desktop/vi-tech_landing/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Home page (renders LandingAnimated)
│   │   ├── layout.tsx          # Root layout with fonts, metadata, header/footer
│   │   ├── globals.css         # Tailwind CSS theme variables
│   │   ├── about/              # About page
│   │   ├── book-demo/          # Demo booking form (client component)
│   │   ├── products/           # Product pages
│   │   │   ├── page.tsx        # Products overview
│   │   │   ├── goseeit/        # GoSeeiT product page
│   │   │   ├── improvit/       # ImproviT product page
│   │   │   ├── resolvit/       # Resolvit product page
│   │   │   └── standardizit/   # StandardiziT product page
│   │   ├── api/book-demo/      # API route for form submission
│   │   ├── privacy/            # Privacy policy page
│   │   ├── gdpr/               # GDPR compliance page
│   │   └── copyright/          # Copyright notice page
│   ├── components/             # React components
│   │   ├── ui/                 # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   └── separator.tsx
│   │   ├── header.tsx          # Site navigation header
│   │   ├── footer.tsx          # Site footer
│   │   ├── landing-animated.tsx # Main landing page with animations
│   │   ├── MainPageProductsOverviewFlow.tsx
│   │   ├── FeatureGrid.tsx
│   │   ├── motion.tsx          # Framer Motion wrapper components
│   │   └── PrintButton.tsx
│   └── lib/
│       └── utils.ts            # Utility functions (cn helper)
├── public/                     # Static assets
│   ├── locales/                # i18n translation files
│   │   ├── en/landing.json
│   │   └── ru/landing.json
│   ├── *.svg                   # Product logos and icons
│   ├── *.png                   # Client logos (Allur, Alstom, Timet, etc.)
│   ├── hero.jpg                # Hero background image
│   └── logo.svg                # Site logo
├── next.config.ts              # Next.js configuration
├── next-seo.config.ts          # Default SEO configuration
├── next-sitemap.config.js      # Sitemap generation config
├── components.json             # shadcn/ui configuration
├── tsconfig.json               # TypeScript configuration
├── eslint.config.mjs           # ESLint configuration (Flat Config)
├── postcss.config.mjs          # PostCSS configuration (Tailwind v4)
└── package.json
```

## Build and Development Commands

```bash
# Development server with Turbopack
npm run dev
# or: next dev --turbopack

# Production build
npm run build
# or: next build --turbopack

# Start production server
npm run start

# Linting
npm run lint
# or: eslint

# Generate sitemap (runs automatically after build)
npm run postbuild
# or: next-sitemap
```

The development server runs on http://localhost:3000 by default.

## Code Style Guidelines

### TypeScript

- Strict mode is enabled (`strict: true` in tsconfig.json)
- Target: ES2017
- Module resolution: `bundler`
- Path alias: `@/*` maps to `./src/*`

### Styling Conventions

1. **Tailwind CSS v4** with inline theme configuration in `globals.css`
2. Uses CSS custom properties (variables) for theming (light/dark modes defined)
3. Custom color brand: `--brand-navy: #120E2F`
4. Fonts:
   - `--font-sans`: Montserrat (with Cyrillic support)
   - `--font-display`: Comfortaa (with Cyrillic support)

### Component Patterns

- **shadcn/ui components** are located in `src/components/ui/`
- Use the `cn()` utility from `@/lib/utils` for conditional class merging
- Client components use `'use client'` directive at the top
- Animations use Framer Motion with consistent patterns (see `mk()` helper in components)

### File Naming

- Components: PascalCase (e.g., `LandingAnimated.tsx`)
- Utilities: camelCase (e.g., `utils.ts`)
- Pages: `page.tsx` inside route directories
- API routes: `route.ts` inside API directories

## Key Components Reference

### Header (`src/components/header.tsx`)
- Sticky navigation with scroll-aware styling
- Products dropdown with animated cards
- Mobile sheet menu for responsive design
- External link to login at `demonstration.vi-tech.io`

### Demo Booking Form (`src/app/book-demo/`)
- Client-side form with validation
- Honeypot field (`website`) for bot protection
- Submits to `/api/book-demo` endpoint
- Uses Zod schema validation on both client and server

### API Route (`src/app/api/book-demo/route.ts`)
- Node.js runtime (required for Nodemailer)
- Zod validation for input sanitization
- SMTP email sending via Office365
- Optional Slack webhook notifications

## Environment Variables

Required environment variables (defined in `.env.local`):

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Public site URL for sitemap/SEO |
| `SMTP_HOST` | SMTP server host (e.g., smtp.office365.com) |
| `SMTP_PORT` | SMTP server port (587 for TLS) |
| `SMTP_USER` | SMTP authentication username |
| `SMTP_PASS` | SMTP authentication password |
| `BOOKDEMO_TO` | Recipient email for demo requests |
| `BOOKDEMO_FROM` | Sender display name for emails |
| `SLACK_WEBHOOK_URL` | Optional: Slack notifications |

## Internationalization (i18n)

The project uses `react-i18next` for bilingual support (English/Russian):

- Translation files located in `public/locales/{en,ru}/landing.json`
- Sitemap configuration supports hreflang alternate references
- Both Cyrillic and Latin font subsets are loaded (Montserrat, Comfortaa)

**Note**: Some hardcoded Russian comments exist in the codebase.

## SEO and Metadata

- Default SEO config in `next-seo.config.ts`
- Per-page metadata exported from `page.tsx` files
- Sitemap auto-generated via `next-sitemap` with EN/RU alternates
- Open Graph and Twitter card metadata configured

## Security Considerations

1. **Honeypot protection**: Form includes hidden `website` field to catch bots
2. **Input validation**: All API inputs validated with Zod schemas
3. **Environment secrets**: SMTP credentials stored in `.env.local` (not committed)
4. **Type safety**: Strict TypeScript configuration prevents common runtime errors

## Testing

Currently, the project does not have automated tests configured. When adding tests:

- Consider Vitest or Jest for unit testing
- React Testing Library for component testing
- Playwright or Cypress for E2E testing of the booking flow

## Deployment

The project is configured for deployment on Vercel:

1. Set all environment variables in Vercel dashboard
2. Build command: `next build --turbopack`
3. Output: Static export or serverless functions
4. Analytics automatically enabled via `@vercel/analytics`

## Dependencies to Note

- `@radix-ui/*` — Headless UI primitives (used by shadcn)
- `class-variance-authority` — Component variant management
- `tailwind-merge` + `clsx` — Conditional class utilities
- `zod` — Schema validation (used in API routes and forms)
- `framer-motion` — Animation library
- `lucide-react` — Icon library

## Common Tasks

### Adding a new product page

1. Create directory under `src/app/products/{product-name}/`
2. Add `page.tsx` with metadata export
3. Add `{ProductName}Client.tsx` for interactive content
4. Update `src/components/header.tsx` products array
5. Add product icon to `public/`

### Adding a new UI component

1. Use shadcn CLI: `npx shadcn add {component-name}`
2. Or manually create in `src/components/ui/` following existing patterns
3. Use `cn()` utility for class merging
4. Support both light and dark modes via CSS variables

### Modifying the demo form

1. Update `src/app/book-demo/BookDemoClient.tsx` for UI changes
2. Update `src/app/api/book-demo/route.ts` for API changes
3. Update Zod schema in both files
4. Test email delivery via Office365 SMTP

## Comments Language in Code

The codebase contains comments in both English and Russian. New code should preferably use English for comments to maintain consistency for international collaborators.
