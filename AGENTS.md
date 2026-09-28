# Retro Arcade 44 — Base44 Dev Notes

A React + Vite arcade app (Snake, Memory Match, Whack-a-Pixel). No backend, no database, no auth, no secrets.

## Running

- `docker compose -f docker-compose.base44.yml up -d` starts the Vite dev server on host port 3000 (container port 5173).
- Source is bind-mounted; edits hot-reload without rebuilds.
- `npm install` runs at container startup (deps live in a named volume).

## Stack

- React 19, Vite 8, plain CSS. No external services or credentials needed.

## Verify

- `curl http://localhost:3000/` returns the Vite-served HTML with `/@vite/client` (confirms live dev mode, not a production build).
- `curl http://localhost:3000/src/main.jsx` returns transformed JSX (confirms source is served live).
