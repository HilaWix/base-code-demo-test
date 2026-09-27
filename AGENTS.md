# Development notes

- The Base44 Compose service serves bind-mounted source; verify `/src/App.jsx` responds with the current heading to distinguish live development from a stale build.
- Check lint with `docker compose -f docker-compose.base44.yml exec -T web npm run lint`.
- No secrets, migrations, or backend services are required.
