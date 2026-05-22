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
| `/portafolio` | LogoCodeX portfolio (client component) |
| `/portafolio/[slug]` | Individual case study — slug maps to a custom component |
| `/origen` | Long-form narrative page about the brand's origin |

### Page Pattern

Every route uses a server wrapper → client component split:
```
app/portafolio/page.tsx  →  imports LogoCodexClient (client component)
app/origen/page.tsx      →  imports OrigenClient (client component)
```

### Navigation

**Never use `<Link>` or `router.push` directly.** All navigation goes through `customNavigate` from `useLoading()`. This triggers the full-screen preloader transition between pages. Hash links (`/#contacto`) are handled automatically — if already on `/`, it smooth-scrolls; otherwise navigates home first.

### Portfolio Data Flow

Adding a new project requires touching four places:
1. Create `data/projects/<name>.ts` — exports a `PortfolioProject` object (see `types.ts` for shape)
2. Register in `constants.ts` — import and add to `portfolioProjects` array
3. Create `components/casestudies/<Name>CaseStudy.tsx` — full custom case study component
4. Add `case '<slug>':` to the `renderPage` switch in `app/portafolio/[slug]/page.tsx`

### Design System (Tailwind tokens)

| Token | Use |
|---|---|
| `symbolic-*` | Pink accent scale — CTAs, highlights (`symbolic-600` = #db2777) |
| `deep-*` | Neutral dark/slate scale — backgrounds, text |
| `creative-*` | Yellow/gold scale — secondary accents |
| `font-display` | Barlow Condensed — headings, hero text |
| `font-body` | Epilogue — body copy |
| `text-fluid-hero` | Clamp-based hero size |
| `text-fluid-section` | Clamp-based section heading size |

### Environment Variables

```
RESEND_API_KEY        # Email sending (contact form)
RESEND_AUDIENCE_ID    # Optional: Resend audience for contact creation
CONTACT_EMAIL         # Override destination email (default: sergio.areman@gmail.com)
```

`/api/contact` gracefully no-ops if `RESEND_API_KEY` is absent, simulating success for local dev.

### Key Patterns

- **Framer Motion** for all animations. Always check `useReducedMotion()` and disable/skip animations when true.
- **`useMenu`** (`hooks/useMenu.ts`) manages mobile menu state — used by every page's Header + ElegantMenu pair.
- **Static generation**: `generateStaticParams` in `app/portafolio/[slug]/page.tsx` pre-renders all slugs at build time from `portfolioProjects`.
- **Redirects**: legacy `/logocodex/*` → `/portafolio/*` slugs live in `next.config.mjs`.
