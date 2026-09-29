# 08 — WhatsApp Conversion Flow

## CTA URL

Use:
`https://wa.me/<number>?text=<urlencoded-message>`

Phone number:
- digits only
- country code included
- supplied later via environment variable

## Destination-specific message template

Example:

```
Halo Piranti Travel, saya ingin cek transport Jepang.

Destinasi: Japan
Layanan:
Tanggal:
Jumlah penumpang:
Pickup:
Drop-off:
Catatan:
```

For each destination, prefill only destination name.
Do not guess route/date/passenger count.

## Tracking

Every WhatsApp CTA should have:
- consistent data attribute, e.g. `data-conversion="whatsapp"`
- destination context
- CTA placement context:
  - hero
  - pricing
  - sticky-mobile
  - footer

Prepare an event hook:
`whatsapp_click`

Do not fire Google Ads conversion scripts until IDs are configured.
