# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Dev server on port 3000
npm run build      # Production build
npm run start      # Run production build
npm run lint       # ESLint
npx tsc --noEmit   # TypeScript check (no test suite exists)
```

## Architecture

**AREM4N** is a personal branding/portfolio site. Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion.

### Routes

| Route | Description |
|---|---|
| `/` | Homepage — Hero, Services, Portfolio grid, FAQ, Contact |
| `/portafolio` | LogoCodeX portfolio viewer (tab-based, hash-driven) |
| `/portafolio/[slug]` | Individual case study full page |
| `/origen` | Long-form interactive narrative about the brand's origin |

### Page Pattern

Every route uses a server wrapper → client component split:
```
app/portafolio/page.tsx  →  LogoCodexClient  →  LogoCodex (tab viewer)
app/origen/page.tsx      →  OrigenClient
app/page.tsx             →  HomePageClient
```

`app/layout.tsx` wraps everything in `ClientWrapper` → `LoadingProvider` + `Preloader`.

### Navigation

**Never use `<Link>` or `router.push` directly.** All navigation goes through `customNavigate` from `useLoading()`. This triggers the full-screen preloader transition. Hash links (`/#contacto`) auto-handle: smooth-scroll if already on `/`, otherwise navigate home first, using `sessionStorage` key from `lib/storageKeys.ts`.

### Portfolio: Two Rendering Paths

`/portafolio` has two independent rendering paths that **both** need a `case` entry per project:

1. **Tab viewer** (`components/LogoCodex.tsx` → `renderCaseStudy` switch) — renders inline at `/portafolio#<slug>`
2. **Full page** (`app/portafolio/[slug]/page.tsx` → `renderPage` switch) — renders at `/portafolio/<slug>`

### Adding a New Project (5 steps)

1. Create `data/projects/<name>.ts` — export a `PortfolioProject` (see `types.ts`)
2. Register in `constants.ts` — add to `portfolioProjects` array
3. Create `components/casestudies/<Name>CaseStudy.tsx`
4. Add `case '<slug>':` to `renderCaseStudy` in `components/LogoCodex.tsx`
5. Add `case '<slug>':` to `renderPage` in `app/portafolio/[slug]/page.tsx`

When renaming a slug, add a permanent redirect in `next.config.mjs`.

### Origen Page

Self-contained component library under `app/origen/components/`: `HTimeline`, `VTimeline`, `Modal`, `PeriodSection`, `DashboardSection`, `CTASection`, `TLNode`. Period data is defined inline in `OrigenClient.tsx` (not in a separate data file).

### Design System (Tailwind tokens)

| Token | Use |
|---|---|
| `symbolic-*` | Pink accent — CTAs, highlights (`symbolic-600` = #db2777) |
| `deep-*` | Neutral dark/slate — backgrounds, text |
| `creative-*` | Yellow/gold — secondary accents |
| `font-display` | Barlow Condensed — headings |
| `font-body` | Epilogue — body copy |
| `font-mono` | JetBrains Mono |
| `text-fluid-hero` | Clamp-based hero size |
| `text-fluid-section` | Clamp-based section heading size |

`text-gradient` is used in case study headers but is **not defined** in Tailwind or globals.css — it has no visual effect and is safe to remove.

### Analytics

`analytics.ts` exports `trackEvent()` wrapping Vercel Analytics. Use it for custom events instead of calling `track()` directly.

### API Routes

| Route | Purpose |
|---|---|
| `/api/contact` | Contact form — sends email via Resend |
| `/api/newsletter` | Newsletter signup — creates Resend contact |

Both no-op gracefully (simulate success) if `RESEND_API_KEY` is absent.

### Environment Variables

```
RESEND_API_KEY        # Email sending
RESEND_AUDIENCE_ID    # Optional: Resend audience for newsletter contacts
CONTACT_EMAIL         # Override destination email (default: sergio.areman@gmail.com)
```

### Key Patterns

- **Framer Motion** for all animations. Always check `useReducedMotion()` and skip animations when true.
- **`useMenu`** (`hooks/useMenu.ts`) manages mobile menu state — used by every page's Header + ElegantMenu pair.
- **Static generation**: `generateStaticParams` in `app/portafolio/[slug]/page.tsx` pre-renders all slugs from `portfolioProjects` at build time.
- **Images**: all in `public/images/` as `.webp`. Remote images allowed only from `i.postimg.cc` (configured in `next.config.mjs`).
