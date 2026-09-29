# 13 — Host Nginx for `piranti.east.local`

## Assumptions

- Ubuntu 24.04 host
- Nginx runs on host
- wildcard certificate for `*.east.local` already exists
- DNS/hosts resolution for `piranti.east.local` is already handled separately
- container is bound to `127.0.0.1:8085`

## Example vhost

Create a site such as:
`/etc/nginx/sites-available/piranti.east.local`

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name piranti.east.local;

    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;

    server_name piranti.east.local;

    ssl_certificate     /PATH/TO/WILDCARD/fullchain.pem;
    ssl_certificate_key /PATH/TO/WILDCARD/privkey.pem;

    add_header X-Robots-Tag "noindex, nofollow" always;

    location / {
        proxy_pass http://127.0.0.1:8085;
        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Enable

```bash
sudo ln -s /etc/nginx/sites-available/piranti.east.local \
  /etc/nginx/sites-enabled/piranti.east.local

sudo nginx -t
sudo systemctl reload nginx
```

## Test

```bash
curl -Ik https://piranti.east.local/
```

Verify:
- HTTP 200
- HTTPS valid in your local trust environment
- `X-Robots-Tag: noindex, nofollow`
