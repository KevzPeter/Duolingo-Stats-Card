# Repository Guidelines

## Project Structure & Module Organization

This is a TypeScript Next.js 15 application using the Pages Router. `pages/` contains UI routes and API handlers; keep endpoint logic under `pages/api/`. Reusable React UI belongs in `components/`, shared data and helpers in `utils/`, SCSS in `styles/`, and browser-served assets in `public/`. Documentation images live in `media/`. Deployments use Vercel.

## Build, Test, and Development Commands

Use one package manager per change; pnpm is preferred because `pnpm-lock.yaml` contains the newest dependency updates.

- `pnpm install --frozen-lockfile` installs locked dependencies.
- `pnpm dev` runs the development server at `http://localhost:3000`.
- `pnpm lint` runs the configured Next.js Core Web Vitals ESLint rules.
- `pnpm build` creates the production bundle and performs framework checks.
- `pnpm start` serves a completed production build.

## Coding Style & Naming Conventions

Match nearby TypeScript, React, and SCSS rather than reformatting unrelated code. Use two-space indentation, functional components, PascalCase component names (for example, `StatsCard.tsx`), camelCase variables and helpers, and lowercase filenames for Next.js routes. Keep API query parsing and external Duolingo data handling typed and centralized in `utils/`. Run `pnpm lint` before committing.

## Testing Guidelines

The repository currently has no automated test framework, test script, or coverage threshold. Validate every change with `pnpm lint` and `pnpm build`. Manually exercise UI changes in the browser and API changes with representative requests such as `/api?username=John_Smith&theme=dark`. Check success, missing-input, invalid-user, and theme-rendering paths. If adding tests, use `*.test.ts` or `*.test.tsx` beside the covered module and add the runner command to `package.json`.

## Commit & Pull Request Guidelines

History uses brief outcome-focused subjects, sometimes with an emoji (`✨ Duo GIF integration`) and increasingly Conventional Commit prefixes (`feat: add avatar and join date...`). Prefer `feat:`, `fix:`, `docs:`, or `chore:` with a concise imperative summary; keep each commit focused. Create branches such as `feature/custom-theme`. Pull requests should explain motivation and behavior, link relevant issues, list verification performed, and include screenshots for card or page changes. Call out API-contract, dependency, or deployment changes explicitly.

## Security & Configuration

Never commit credentials or populated environment files. Treat usernames and upstream API responses as untrusted input, preserve safe error handling, and avoid logging personal profile data. Review lockfile changes and pin production dependencies deliberately.
