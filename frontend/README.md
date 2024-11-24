# FRONT

## Ejecusión

Para ejecutar el proyecto en local, se debe ejecutar el siguiente comando:

```bash
npm install
npm run dev
```

### Docker

Para ejecutar en producción:

```bash
docker compose --profile production up --build -d
```

Para ejecutar en desarrollo:

```bash
docker compose --profile development up --build -d
```

Si se necesita un reinicio forzado esto borrara todo:

```bash
docker compose down -v
docker system prune -af
```
