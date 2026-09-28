# Agent notes

- Frontend-only Vite 8 + React 19 app; no backend, DB, or secrets.
- Dev: `docker compose -f docker-compose.base44.yml up -d` (node:22 — Vite 8 needs Node >= 20.19). Serves Vite dev on host port 3000; `node_modules` lives in a named volume, `npm ci` runs on container start.
- Verify: `docker compose -f docker-compose.base44.yml exec -T web npx vite build` and `npx oxlint` (2 pre-existing set-state-in-effect warnings, 0 errors).
