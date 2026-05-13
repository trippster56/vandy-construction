# Vandy Construction Website

Built from BaseWeb (single-variant client build — `bold` + `fullbleed`).
Next.js 16, TypeScript, Tailwind v4, shadcn/ui.

## Key files
- `src/lib/site-config.ts` — branding, contact info, nav links
- `src/app/globals.css` — color tokens
- `src/data/home.ts` — homepage section content
- `src/data/services.ts` — services page data

## Architecture rules

### Components first
Always use existing components before building custom ones. Check in this order:
1. **shadcn/ui** — default primitives (Button, Card, Badge, Input, Sheet, …)
2. **src/components/ui/** — project-level components (Placeholder, PageHeader, …)
3. **Only then** build something new — and make it reusable.

Never hand-roll buttons, cards, inputs, badges, dialogs, sheets, selects, or any other primitive that shadcn already provides. Import from `@/components/ui/*`.
