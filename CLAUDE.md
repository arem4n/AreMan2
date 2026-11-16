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

Every internal destination must still be a real `<a href>` so crawlers can follow it (before 2026-11 `/origen`, the case studies and `/en` were only reachable through `onClick` buttons). The pattern: `href={localizedHref('/origen')}` from `useLocalizedHref()` plus an `onClick` that returns early unless `isPlainLeftClick(e)`, then `preventDefault()` and `customNavigate(...)` (both helpers in `hooks/useLocalizedHref.ts`). Ctrl/Cmd-click keeps working, and `customNavigate` always receives the path **without** locale prefix.

### SEO

- `lib/seo.ts` is the single source for the canonical domain (`SITE_URL`, with `www`), locale-aware paths, hreflang maps and `pageMetadata()`. Every page's `generateMetadata` must return `pageMetadata({ locale, path, title, description })`: Next replaces `openGraph` wholesale when a page defines it, so building metadata by hand drops the share image and `og:url`.
- `app/sitemap.ts` and `app/robots.ts` are generated from `indexablePaths()` in the same file; a new top-level route has to be added there (case studies are picked up from `portfolioProjects`). `tests/seo.test.ts` covers this.
- Share images are `public/images/og-arem4n.jpg` (es) and `og-arem4n-en.jpg` (en), 1200×630 JPG.
- 404: `app/[locale]/[...rest]/page.tsx` catches unknown URLs and calls `notFound()`, which renders `app/[locale]/not-found.tsx`. `app/not-found.tsx` (own `<html>`, inline styles) only serves requests that skip the locale middleware, e.g. paths with a file extension. With `notFound()` Next 14 answers 404 + `noindex` but paints the page client-side, which is why the localized page sets `document.title` itself.

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
| `/api/contact` | Contact form — sends email via Resend, has a honeypot field + Cloudflare Turnstile verification |
| `/api/newsletter` | Newsletter signup — creates a Resend contact + Cloudflare Turnstile verification |

Both no-op gracefully (simulate success) if `RESEND_API_KEY` is absent. Both treat a Resend "contact already exists" error as success rather than failure. Both reject with a 400 if `lib/verifyTurnstile.ts` can't confirm the submission came from a real browser — it fails closed if `TURNSTILE_SECRET_KEY` is set but Cloudflare's `siteverify` call errors out, and no-ops (like the Resend key) if `TURNSTILE_SECRET_KEY` is absent. See `tests/api-contact.test.ts` / `tests/api-newsletter.test.ts` for the full behavior matrix, including how to mock the `resend` module.

### Copy and forms (2026-11)

- **One call to action:** "Hablemos de tu marca" / "Let's talk about your brand" (header: "Hablemos" / "Let's talk"). Don't bring back the "auditoría" variants. The form sends a message, it doesn't book a call; the only promise made is the 24–48 business-hour reply (`Contact.nextStep`, same window as the Resend auto-reply).
- **Voice:** first person singular and "tú" (no company "we", no voseo). The brand is always written `LogoCodeX™` in visible text.
- **Process:** four steps everywhere (`Process` namespace). `/portafolio` groups the six method tasks inside those four steps (`phases` in `components/LogoCodex.tsx`); the FAQ refers to steps by name.
- **Turnstile:** both forms use `components/LazyTurnstile.tsx` (dark theme, `interaction-only`, mounted when the form nears the viewport). The widget is usually invisible, so each form shows a `role="status"` line while there is no token (`captchaPending` / `captchaInteract` / `captchaError`). To test by hand, build with Cloudflare's test site keys in `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: `1x00000000000000000000AA` (always passes) and `3x00000000000000000000FF` (forces the checkbox).
- **Naming:** the section and menu entry are "Portafolio" (one menu entry, pointing to `/portafolio`); LogoCodeX™ is only the name of the method.
- **Portfolio order:** `portfolioProjects` in `constants.ts` drives the home carousel and the default tab of `/portafolio` (first item): external clients first, family projects next, own brand last. `testimonial` is optional (own projects have none).
- **FAQ JSON-LD** in `app/[locale]/page.tsx` is built from the `FAQ` messages in the page's locale; don't hard-code a copy.

### Environment Variables

```
RESEND_API_KEY                  # Email sending
RESEND_AUDIENCE_ID              # Optional: Resend audience for newsletter contacts
CONTACT_EMAIL                   # Override destination email (default: sergio.areman@gmail.com)
NEXT_PUBLIC_TURNSTILE_SITE_KEY  # Cloudflare Turnstile site key (public, sent to the client)
TURNSTILE_SECRET_KEY            # Cloudflare Turnstile secret key (server-side verification)
```

Set both Turnstile variables together, not just one — setting only `TURNSTILE_SECRET_KEY` on the server without also setting `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (and redeploying) means the server will reject every submission, since the client can never obtain a token. `NEXT_PUBLIC_*` values are inlined into the client bundle at build time, so changing them in Vercel requires a new deployment to take effect, not just an env var update.

### Key Patterns

- **Framer Motion** for all animations. Always check `useReducedMotion()` and skip animations when true.
- **`useMenu`** (`hooks/useMenu.ts`) manages mobile menu state — used by every page's Header + ElegantMenu pair. Toggling it sets `modal-open` on `<html>` and `inert`/`aria-hidden` on `<main>`, cleaned up on unmount.
- **Static generation**: `generateStaticParams` in `app/[locale]/portafolio/[slug]/page.tsx` pre-renders every `locale × portfolioProjects.slug` combination at build time.
- **Images**: all in `public/images/` as `.webp`. Remote images allowed only from `i.postimg.cc` (configured in `next.config.mjs`).
