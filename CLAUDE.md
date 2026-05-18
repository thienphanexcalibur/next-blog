# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev       # Start dev server at http://localhost:3000
yarn build     # Production build
yarn start     # Run production build
yarn lint      # ESLint via next lint
```

Package manager is **Yarn 4** (Berry). Use `yarn` not `npm`.

## Environment Variables

Copy `.env.local` with:
- `NOTION_ROOT_PAGE_ID` — root Notion page ID (server-side)
- `NEXT_PUBLIC_ROOT_PAGE_ID` — same page ID exposed to client (used by `react-notion-x` renderer)
- `NOTION_ROOT_SPACE_ID` — Notion workspace/space ID

## Architecture

This is a **Next.js 16 App Router** blog backed by **Notion as a CMS**.

### Data flow for blog posts

1. `src/utils/notion.ts` wraps the unofficial `notion-client` (`NotionAPI`) with two helpers:
   - `getAllPagesInSpace()` — fetches the full page tree under `NOTION_ROOT_PAGE_ID` using `notion-utils`
   - `getPage(pageId)` — fetches a single Notion page record map
2. `src/app/page.tsx` (home) calls `getAllPagesInSpace()`, sorts pages by `created_time`, and renders a grid of `<NotionPost>` cards. `revalidate = 60` — ISR with 60-second cache.
3. `src/app/posts/[id]/page.tsx` calls `getPage(id)` and passes the record map to `<NotionPage>`. The `id` segment is the Notion page UUID.

### Rendering Notion content

`<NotionPage>` (`src/components/NotionPage.tsx`) is a **client component** that uses `react-notion-x`'s `<NotionRenderer>`. Code blocks are lazy-loaded via `next/dynamic` with Prism syntax highlighting (JSX, JavaScript, Bash, Solidity). Comments are rendered via an Utterances script injected by `<Comment>` (GitHub Issues–backed, theme-aware).

### Powerlifting page (`/powerlifting`)

A standalone interactive guide at `src/app/powerlifting/page.tsx`. It is a client component that:
- Uses `chart.js` for a volume dose-response bar chart (theme-aware, destroys/recreates on theme change)
- Uses IntersectionObserver for active nav section tracking
- Includes an **AI Coach** (`src/components/powerlifting/AICoachForm.tsx`) that calls the Gemini API directly from the browser — the API key is intentionally left blank in the source and must be supplied at runtime.

### UI components

`src/components/ui/` — shadcn/ui primitives (Radix UI + Tailwind CVA). Custom powerlifting sub-components live in `src/components/powerlifting/`.

### Theming

`next-themes` with `attribute="class"` (dark/light/system). The `<ThemeProvider>` wraps the entire app in `src/app/layout.tsx`. Components that depend on theme (charts, Notion renderer, Utterances) consume `useTheme()` from `next-themes`.

### Path aliases

`@/` maps to `src/` (configured in `tsconfig.json`).
