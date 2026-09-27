# Development environment notes

- Use `docker compose -f docker-compose.base44.yml up -d --build` for the Base44 preview. The web service runs the bind-mounted source, installs locked dependencies at startup, and isolates node_modules in a Docker volume.
- No backend, database, migrations, or external credentials are required.
- Vite receives the platform-provided `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS`; do not hardcode a sandbox hostname.
- Verify with `docker compose -f docker-compose.base44.yml ps`, a request to `http://localhost:3000/`, and `/src/App.jsx`. The HTML should contain `/@vite/client` and source module entries, not a production bundle.
- Run checks inside the runtime: `docker compose -f docker-compose.base44.yml exec -T web npm run lint` and `docker compose -f docker-compose.base44.yml exec -T web npm run build`.
- Browser smoke test: the Base Code Demo heading and two cards render; clicking the counter increments its label.
