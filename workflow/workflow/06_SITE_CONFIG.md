# 06 — Site Configuration

Create `src/config/site.ts`.

Suggested structure:

```ts
export const siteConfig = {
  brandName: "Piranti Travel",
  devOrigin: "https://piranti.east.local",
  prodOrigin: "https://piranti-travel.com",
  whatsappNumber: import.meta.env.PUBLIC_WHATSAPP_NUMBER ?? "",
  email: import.meta.env.PUBLIC_CONTACT_EMAIL ?? "",
  analytics: {
    gtmId: import.meta.env.PUBLIC_GTM_ID ?? "",
    ga4Id: import.meta.env.PUBLIC_GA4_ID ?? "",
    googleAdsId: import.meta.env.PUBLIC_GOOGLE_ADS_ID ?? "",
    googleAdsLabel: import.meta.env.PUBLIC_GOOGLE_ADS_LABEL ?? "",
  },
};
```

## `.env.example`

Include:

```env
PUBLIC_SITE_ENV=development
PUBLIC_WHATSAPP_NUMBER=
PUBLIC_CONTACT_EMAIL=
PUBLIC_GTM_ID=
PUBLIC_GA4_ID=
PUBLIC_GOOGLE_ADS_ID=
PUBLIC_GOOGLE_ADS_LABEL=
```

If WhatsApp number is empty:
- CTA may render disabled in dev, or use a clear placeholder warning.
- Do not invent a number.
