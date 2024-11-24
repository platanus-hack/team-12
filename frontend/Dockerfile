# Etapa 1: Instalación de dependencias
FROM node:22-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --frozen-lockfile

# Etapa 2: Construcción de la aplicación
FROM base AS builder
COPY . .
RUN npm run build

# Etapa 3: Imagen de producción
FROM base AS production
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Crear usuario no root para seguridad
RUN addgroup -S nextjs && adduser -S nextjs -G nextjs
USER nextjs

EXPOSE 3000

# Etapa 4: Imagen de desarrollo
FROM base AS development
ENV NODE_ENV=development
COPY . .
EXPOSE 3000