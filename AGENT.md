# Agent Rules

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS 4 + @tailwindcss/typography
- next-intl for i18n (English + Japanese)
- Cloudflare Workers via @opennextjs/cloudflare
- Kode Mono (Latin), Noto Sans JP (Japanese)

## Commands

```bash
pnpm dev        # Start dev server
pnpm build      # Prebuild posts + next build
pnpm deploy     # Generate posts + opennextjs-cloudflare build + deploy
pnpm preview    # Generate posts + opennextjs-cloudflare preview
pnpm lint       # ESLint
```

## Project Structure

```
src/
├── app/[locale]/           # Locale-routed pages (en, ja)
│   ├── layout.tsx          # Root layout with fonts, i18n provider
│   ├── page.tsx            # Homepage
│   └── blog/[slug]/page.tsx
├── components/             # Shared components (lang-switcher, social-links)
├── content/<slug>/         # Blog posts as MDX (en.mdx, ja.mdx per slug)
├── i18n/                   # routing.ts, request.ts
├── lib/
│   ├── posts.ts            # Post helpers (reads posts-registry.json)
│   └── posts-registry.json # Auto-generated, do NOT edit
├── messages/               # en.json, ja.json translation files
├── middleware.ts            # next-intl locale detection (Edge runtime)
└── globals.css             # Tailwind + prose styles
scripts/
└── generate-posts.mjs      # Converts MDX → HTML at build time
```

## Blog Posts

Posts live in `src/content/<slug>/en.mdx` and `ja.mdx`. Each file has frontmatter:

```yaml
---
title: "Post Title"
date: "YYYY-MM-DD"
---
```

The `prebuild` script (`scripts/generate-posts.mjs`) parses MDX, renders markdown to HTML with remark/rehype/shiki (One Dark Pro theme), and writes `src/lib/posts-registry.json`. This file is auto-generated — never edit it by hand.

After adding or editing a post, run `pnpm build` or `node scripts/generate-posts.mjs` to regenerate.

## Cloudflare Workers Constraints

- No `fs` or Node.js filesystem APIs at runtime. All file reading must happen at build time.
- MDX compilation and syntax highlighting happen in the build script, not at runtime.
- The middleware uses Edge runtime (`middleware.ts`). Do NOT rename to `proxy.ts` — Cloudflare requires Edge, not Node.js.
- Worker size limit: 3 MiB (free plan). Avoid adding large runtime dependencies.

## i18n

- Locales: `en` (default), `ja`
- Translations in `src/messages/en.json` and `ja.json`
- Middleware auto-detects locale from `Accept-Language` header
- Both locales must be provided for every translation key and blog post

## Code Style

- Tabs for indentation
- No comments unless the logic is non-obvious
- Use `@/*` path alias for imports from `src/`
- Tailwind utility classes for all styling
- White mode only — no dark mode
