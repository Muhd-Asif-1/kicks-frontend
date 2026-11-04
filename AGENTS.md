<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Styling — Tailwind CSS

- Use Tailwind CSS as the primary styling solution for KICKS.
- Prefer utility classes for layout, sizing, positioning, typography, spacing, backgrounds, responsiveness, and hover effects. Use arbitrary values and responsive variants where needed.
- Do not add new standalone CSS files for the hero.
- Preserve existing CSS variables where they provide useful theme configuration.
- Use GSAP for advanced JavaScript-driven animations. Keep GSAP animated transforms on separate nested elements from Tailwind positioning transforms to avoid conflicts.
- Use custom CSS only where Tailwind would make the implementation unnecessarily complex or difficult to maintain.
- Do not rewrite working styles solely to convert existing CSS into Tailwind. Keep changes targeted and avoid unnecessary refactoring.
