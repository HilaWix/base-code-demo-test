# Retro Arcade 44 — Base44 dev notes

## Stack
- Vite 8 + React 19, plain CSS, no backend, no database, no auth, no secrets.

## Run
- `docker compose -f docker-compose.base44.yml up -d` — starts Vite dev server (live reload) on host port 3000.
- The compose service runs `npm install` then `vite dev` from the bind-mounted source, so edits hot-reload without rebuilds.
- Vite is bound to 0.0.0.0 and `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` is passed from the sandbox env so the preview origin is allowed.

## Verify
- `curl localhost:3000/` returns the index with `/src/main.jsx` (dev server, not a production build).
- Healthcheck: node fetch to `http://localhost:5173/`.
