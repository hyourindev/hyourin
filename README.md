# hyourin.dev

## Commands

```bash
pnpm dev        # Start dev server
pnpm build      # Build for production
pnpm deploy     # Build and deploy to Cloudflare Workers
pnpm preview    # Preview build locally
pnpm lint       # Run linter
```

## Blog

Add posts in `src/content/<slug>/en.mdx` and `ja.mdx`.

The `prebuild` script generates `src/lib/posts-registry.json` automatically before each build.
