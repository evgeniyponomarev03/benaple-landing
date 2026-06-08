# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Payload CMS website template** built with Next.js 15, React 19, and TypeScript. It's designed as a full-stack solution combining a headless CMS backend with a production-ready website frontend.

**Key Architecture Components:**
- **Backend:** Payload CMS with MongoDB database
- **Frontend:** Next.js App Router with SSR/SSG
- **Styling:** TailwindCSS with shadcn/ui components
- **Database:** MongoDB via Mongoose adapter
- **Rich Text:** Lexical editor
- **Testing:** Vitest for integration tests, Playwright for e2e tests

## Development Commands

### Essential Commands
```bash
# Development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Linting
pnpm lint
pnpm lint:fix

# Testing
pnpm test           # Run both integration and e2e tests
pnpm test:int       # Run integration tests only (Vitest)
pnpm test:e2e       # Run e2e tests only (Playwright)

# Payload commands
pnpm generate:types         # Generate TypeScript types from Payload config
pnpm generate:importmap     # Generate admin import map
pnpm payload                # Access Payload CLI
```

### Database & Schema
```bash
# For SQL databases (when using Postgres):
pnpm payload migrate:create  # Create migration files
pnpm payload migrate         # Run pending migrations
```

## Architecture Overview

### Directory Structure

**Core Application:**
- `src/app/(frontend)/` - Next.js frontend pages and layouts
- `src/app/(payload)/` - Payload admin panel and API routes
- `src/collections/` - Payload CMS collections (Pages, Posts, Media, Categories, Users)
- `src/blocks/` - Layout builder blocks for content composition
- `src/heros/` - Different hero section variants
- `src/components/` - Reusable React components including shadcn/ui components

**Configuration & Utilities:**
- `src/payload.config.ts` - Main Payload CMS configuration
- `src/providers/` - React context providers (HeaderTheme)
- `src/utilities/` - Helper functions and utilities
- `src/fields/` - Custom Payload field configurations
- `src/hooks/` - Payload hooks for data processing
- `src/access/` - Access control functions

### Layout Builder System

The project uses a **block-based layout builder** allowing editors to compose pages using predefined blocks:

- `ArchiveBlock` - Display collection archives
- `CallToAction` - CTA sections
- `Content` - Rich text content
- `MediaBlock` - Images/videos
- `Form` - Contact forms
- `FeaturesGrid` - Feature showcase
- `Testimonials` - Customer testimonials
- `LogoCloud` - Partner/client logos

Blocks are registered in `src/blocks/RenderBlocks.tsx` and each has its own component and config files.

### Collections Architecture

**Main Collections:**
- `Pages` - Static pages with layout builder
- `Posts` - Blog posts/articles with categories
- `Media` - File uploads with automatic image resizing
- `Categories` - Taxonomy for organizing posts
- `Users` - Authentication and admin access

**Globals:**
- `Header` - Site navigation configuration
- `Footer` - Site footer configuration

### Key Features

**Content Management:**
- Draft/publish workflow with preview functionality
- Live preview in admin panel
- Scheduled publishing via job queue
- SEO plugin integration
- Search plugin with full-text search
- Redirect management
- Form builder for contact forms

**Frontend Features:**
- SSR/SSG with Next.js App Router
- On-demand revalidation when content changes
- Responsive design with TailwindCSS
- shadcn/ui component library
- Admin bar for authenticated users
- Image optimization with Sharp

## Development Workflow

### Making Changes

1. **Content Structure Changes:** When modifying Payload collections or fields, run `pnpm generate:types` to update TypeScript definitions
2. **Frontend Changes:** The dev server auto-reloads. Use `pnpm lint` to check code quality
3. **Testing:** Run `pnpm test:int` for API/integration tests, `pnpm test:e2e` for full browser tests

### Adding New Blocks

1. Create component in `src/blocks/[BlockName]/Component.tsx`
2. Create config in `src/blocks/[BlockName]/config.ts`
3. Register in `src/blocks/RenderBlocks.tsx`
4. Update block configurations in relevant collections

### Environment Variables

Key environment variables needed:
- `DATABASE_URI` - MongoDB connection string
- `PAYLOAD_SECRET` - Secret key for Payload
- `CRON_SECRET` - For scheduled job authentication (Vercel deployments)

### Testing Strategy

- **Integration Tests:** Located in `tests/int/`, test API endpoints and data operations
- **E2E Tests:** Located in `tests/e2e/`, test full user workflows in browser
- **Test Commands:** Always run tests before committing significant changes

## Code Conventions

- **TypeScript:** Strict mode enabled, use generated types from `payload-types.ts`
- **React:** Functional components with hooks, use `use client` directive for client components
- **Styling:** TailwindCSS with CSS-in-JS for dynamic styles, follow shadcn/ui patterns
- **File Naming:** PascalCase for components, kebab-case for directories
- **Imports:** Use path aliases (`@/` for src directory)

## Deployment Notes

- **Production Build:** Always run `pnpm build` and verify no errors before deployment
- **Database:** Run migrations with `pnpm payload migrate` for SQL databases
- **Caching:** Next.js caching is disabled by default for Payload Cloud compatibility
- **Job Queue:** Scheduled publishing requires cron job setup on hosting platform