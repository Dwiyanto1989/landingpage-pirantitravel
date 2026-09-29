# 12 — Docker

## Goal

Build Astro statically in one stage and serve compiled files from nginx:alpine.

## Dockerfile

Recommended pattern:

```dockerfile
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine AS runtime
COPY docker/nginx-app.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
```

## Container Nginx config

`docker/nginx-app.conf`:

```nginx
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ $uri/index.html =404;
    }

    location ~* \.(?:css|js|jpg|jpeg|png|gif|svg|webp|avif|ico|woff2?)$ {
        expires 7d;
        add_header Cache-Control "public, max-age=604800, immutable";
        try_files $uri =404;
    }
}
```

Adjust caching if Astro generates fingerprinted vs non-fingerprinted assets.

## Docker Compose

Bind only to loopback:

```yaml
services:
  web:
    build:
      context: .
    container_name: piranti-travel-web
    restart: unless-stopped
    ports:
      - "127.0.0.1:8085:80"
```

Do not expose port 8085 on all interfaces unless specifically required.
