# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev         # Dev server on port 3000
npm run build       # Production build
npm run start       # Run production build
npm run lint        # ESLint
npx tsc --noEmit    # TypeScript check
npm test            # Vitest suite (single run)
npm run test:watch  # Vitest in watch mode
```

Run a single test file: `npx vitest run tests/loading-context.test.tsx`. See `tests/README.md` for what each file covers and two gotchas worth knowing before adding more: mocking a class invoked with `new` (like `Resend`) requires `vi.fn().mockImplementation(function () {...})`, not an arrow function; and avoid `[...iterable]` spread on `Set`/`RegExpStringIterator` in test files — the project's `tsconfig.json` has no `downlevelIteration`, so `tsc --noEmit` (which the team already runs) flags it even though Vitest runs it fine. Use `Array.from(iterable)` instead.

## Architecture

**AREM4N** is a personal branding/portfolio site. Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion. Routing is locale-prefixed via `next-intl` — every page lives under `app/[locale]/`, with `middleware.ts` + `i18n/routing.ts` defining the two locales (`es` default, `en`) and `as-needed` prefix (no `/es` prefix for the default locale).

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
app/[locale]/portafolio/page.tsx  →  LogoCodexClient  →  LogoCodex (tab viewer)
app/[locale]/origen/page.tsx      →  OrigenClient
app/[locale]/page.tsx             →  HomePageClient
```

`app/layout.tsx` wraps everything in `ClientWrapper` → `LoadingProvider` + `Preloader`.

### Navigation

**Never use `<Link>` or `router.push` directly.** All navigation goes through `customNavigate` from `useLoading()` (`components/LoadingContext.tsx`). This triggers the full-screen preloader transition. Hash links (`/#contacto`) auto-handle: smooth-scroll if already on `/`, otherwise navigate home first, using the `sessionStorage` key from `lib/storageKeys.ts`. If the hash target doesn't exist in the DOM, `customNavigate` returns without navigating anywhere (it used to fall through to `router.push('#hash')` — a pathless URL — before this was fixed; see `tests/loading-context.test.tsx`).

### Portfolio: Two Rendering Paths

`/portafolio` has two independent rendering paths that **both** need a `case` entry per project — nothing throws if you forget one (both switches have a `GenericCaseStudy` default), so the omission is easy to miss without the test that checks it (`tests/data-integrity.test.ts`):

1. **Tab viewer** (`components/LogoCodex.tsx` → `renderCaseStudy` switch) — renders inline at `/portafolio#<slug>`
2. **Full page** (`app/[locale]/portafolio/[slug]/page.tsx` → `renderPage` switch) — renders at `/portafolio/<slug>`

### Adding a New Project (5 steps)

1. Create `data/projects/<name>.ts` — export a `PortfolioProject` (see `types.ts`)
2. Register in `constants.ts` — add to `portfolioProjects` array
3. Create `components/casestudies/<Name>CaseStudy.tsx`
4. Add `case '<slug>':` to `renderCaseStudy` in `components/LogoCodex.tsx`
5. Add `case '<slug>':` to `renderPage` in `app/[locale]/portafolio/[slug]/page.tsx`

When renaming a slug, add a permanent redirect in `next.config.mjs`.

### Origen Page

Self-contained component library under `app/[locale]/origen/components/`: `HTimeline`, `VTimeline`, `Modal`, `PeriodSection`, `DashboardSection`, `CTASection`, `TLNode`. Period data is defined inline in `OrigenClient.tsx` (not in a separate data file).

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

Deeper brand/design-system context (target users, emotional arc, aesthetic direction) lives in `.impeccable.md` and `logocodex.md` — check these before making visual/copy decisions, not just this file.

### Analytics

`analytics.ts` exports `trackEvent()` wrapping Vercel Analytics. Use it for custom events instead of calling `track()` directly.

### API Routes

| Route | Purpose |
|---|---|
| `/api/contact` | Contact form — sends email via Resend, has a honeypot field |
| `/api/newsletter` | Newsletter signup — creates a Resend contact |

Both no-op gracefully (simulate success) if `RESEND_API_KEY` is absent. Both treat a Resend "contact already exists" error as success rather than failure. See `tests/api-contact.test.ts` / `tests/api-newsletter.test.ts` for the full behavior matrix, including how to mock the `resend` module.

### Environment Variables

```
RESEND_API_KEY        # Email sending
RESEND_AUDIENCE_ID    # Optional: Resend audience for newsletter contacts
CONTACT_EMAIL         # Override destination email (default: sergio.areman@gmail.com)
```

### Key Patterns

- **Framer Motion** for all animations. Always check `useReducedMotion()` and skip animations when true.
- **`useMenu`** (`hooks/useMenu.ts`) manages mobile menu state — used by every page's Header + ElegantMenu pair. Toggling it sets `modal-open` on `<html>` and `inert`/`aria-hidden` on `<main>`, cleaned up on unmount.
- **Static generation**: `generateStaticParams` in `app/[locale]/portafolio/[slug]/page.tsx` pre-renders every `locale × portfolioProjects.slug` combination at build time.
- **Images**: all in `public/images/` as `.webp`. Remote images allowed only from `i.postimg.cc` (configured in `next.config.mjs`).
