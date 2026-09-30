const siteEnvironment = import.meta.env.PUBLIC_SITE_ENV ?? 'development';

export const siteConfig = {
  brandName: 'Piranti Travel',
  siteEnvironment,
  isProduction: siteEnvironment === 'production',
  devOrigin: 'https://piranti.east.local',
  prodOrigin: 'https://pirantitravel.web.id',
  whatsappNumber: import.meta.env.PUBLIC_WHATSAPP_NUMBER || '6283873355999',
  email: import.meta.env.PUBLIC_CONTACT_EMAIL ?? '',
  legalName: import.meta.env.PUBLIC_LEGAL_NAME ?? '',
  officeAddress: import.meta.env.PUBLIC_OFFICE_ADDRESS ?? '',
  analytics: {
    gtmId: import.meta.env.PUBLIC_GTM_ID ?? '',
    ga4Id: import.meta.env.PUBLIC_GA4_ID ?? '',
    googleAdsId: import.meta.env.PUBLIC_GOOGLE_ADS_ID ?? '',
    googleAdsLabel: import.meta.env.PUBLIC_GOOGLE_ADS_LABEL ?? '',
  },
  get origin() {
    return this.isProduction ? this.prodOrigin : this.devOrigin;
  },
} as const;
