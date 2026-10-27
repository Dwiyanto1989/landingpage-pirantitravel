import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const money = z.number().int().nonnegative().nullable().optional();
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine((value) => {
    const parsed = new Date(`${value}T00:00:00Z`);
    return (
      !Number.isNaN(parsed.valueOf()) &&
      parsed.toISOString().slice(0, 10) === value
    );
  }, 'Tanggal harus valid dalam format YYYY-MM-DD');
const priceSchema = z.strictObject({
  general: money,
  adultTwinTriple: money,
  childWithExtraBed: money,
  childNoBed: money,
  singleSupplement: money,
});
const departureSchema = z.strictObject({
  date: isoDate,
  seasonTags: z.array(z.string()),
  prices: priceSchema,
  dateNeedsVerification: z.boolean().optional(),
  airline: z.string().optional(),
  airlineCode: z.string().optional(),
  airlineNameAsSource: z.string().optional(),
  departureCities: z.array(z.string()).optional(),
  itineraryVariant: z.string().optional(),
  note: z.string().optional(),
  origin: z.string().optional(),
  originScope: z.string().optional(),
  reverseSchedule: z.boolean().optional(),
  sourceLabel: z.string().optional(),
  sourceYearAsPrinted: z.string().optional(),
});
const feeSchema = z.strictObject({
  label: z.string(),
  amountIdr: money,
  percentage: z.number().nonnegative().optional(),
  calculationBasis: z.string().nullable().optional(),
  unit: z.string().nullable().optional(),
  note: z.string().nullable().optional(),
});

const tours = defineCollection({
  loader: glob({
    base: './content/tour-sources/paket-wisata',
    pattern:
      '{wisata-indonesia,wisata-asia,wisata-multi-negara,promo-dan-liburan}/*.md',
  }),
  schema: z
    .strictObject({
      title: z.string().min(3),
      description: z.string().min(20),
      category: z.enum([
        'wisata-indonesia',
        'wisata-asia',
        'wisata-multi-negara',
        'promo-dan-liburan',
      ]),
      date: z.coerce.date(),
      author: z.string(),
      tags: z.array(z.string()),
      keywords: z.array(z.string()),
      image: z.string(),
      ogImage: z.string(),
      images: z.array(z.object({ src: z.string(), alt: z.string() })),
      featured: z.boolean(),
      published: z.boolean(),
      primaryDestination: slug,
      destinations: z.array(slug),
      countries: z.array(slug),
      duration: z.object({
        days: z.number().int().positive(),
        nights: z.number().int().nonnegative().nullable(),
      }),
      bookingMode: z.enum(['scheduled', 'by-request']),
      currency: z.literal('IDR'),
      priceUnit: z.enum(['per-person', 'per-package']),
      startingPrice: money,
      departures: z.array(departureSchema),
      highlights: z.array(z.string()),
      inclusions: z.array(z.string()),
      exclusions: z.array(z.string()),
      mandatoryFees: z.array(feeSchema),
      optionalFees: z.array(feeSchema),
      criticalNotices: z.array(z.string()),
      source: z.object({
        filename: z.string(),
        archivePath: z.string().nullable().optional(),
        importStatus: z.string(),
      }),
      airlines: z.array(z.string()).optional(),
      availabilityNote: z.string().optional(),
      departureCityOptions: z.array(z.string()).optional(),
      depositAmountIdr: z.number().int().nonnegative().optional(),
      finalPaymentDaysBefore: z.number().int().nonnegative().optional(),
      minParticipants: z.number().int().positive().optional(),
      minimumPax: z.number().int().positive().optional(),
      participantPricing: z
        .array(
          z.strictObject({
            pax: z.number().int().positive(),
            amountIdr: z.number().int().nonnegative(),
          }),
        )
        .optional(),
      priceUnitUnverified: z.boolean().optional(),
      tourType: z.string().optional(),
      visaFees: z.array(feeSchema).optional(),
    })
    .superRefine((data, context) => {
      if (data.bookingMode === 'scheduled' && data.departures.length === 0) {
        context.addIssue({
          code: 'custom',
          path: ['departures'],
          message: 'Paket terjadwal wajib memiliki minimal satu keberangkatan',
        });
      }
    }),
});

export const collections = { tours };
