export type ServicePrice = {
  service: string;
  price?: number;
  display?: string;
  prices?: Record<string, number>;
  note?: string;
  unit?: string;
};

export type Vehicle = {
  name: string;
  capacity?: string;
  services?: ServicePrice[];
  includes?: string[];
  excludes?: string[];
};

export type FAQ = { question: string; answer: string };

export type CTAConfig = {
  destination?: string;
  placement:
    | 'hero'
    | 'pricing'
    | 'sticky-mobile'
    | 'footer'
    | 'final'
    | 'catalog-empty'
    | 'rental-page';
  label?: string;
};

export type Destination = {
  slug: 'japan' | 'korea' | 'bangkok' | 'singapore';
  name: string;
  eyebrow: string;
  title: string;
  description: string;
  summary: string;
  accent: string;
  heroImage?: string;
  bookingImage?: string;
  highlights: string[];
  fleet: string[];
  services?: ServicePrice[];
  vehicles?: Vehicle[];
  priceColumns?: string[];
  inclusions?: string[];
  exclusions?: string[];
  additional?: string[];
  terms?: string[];
  faqs: FAQ[];
  seo: { title: string; description: string };
};
