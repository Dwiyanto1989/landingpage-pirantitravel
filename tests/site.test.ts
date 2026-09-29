import assert from 'node:assert/strict';
import test from 'node:test';

import { formatCurrency } from '../src/lib/format.ts';
import {
  buildWhatsAppLink,
  buildWhatsAppMessage,
} from '../src/lib/whatsapp.ts';
import { bangkok } from '../src/data/destinations/bangkok.ts';
import { japan } from '../src/data/destinations/japan.ts';
import { korea } from '../src/data/destinations/korea.ts';
import { singapore } from '../src/data/destinations/singapore.ts';
import { readFileSync } from 'node:fs';

test('formats IDR prices consistently', () => {
  assert.equal(formatCurrency(7_450_000), 'Rp\u00a07.450.000');
});

test('builds an encoded destination inquiry only with a configured number', () => {
  assert.equal(buildWhatsAppLink('', 'Japan'), undefined);
  assert.match(buildWhatsAppMessage('Japan'), /Destinasi: Japan/);
  assert.equal(
    buildWhatsAppLink('+62 812-345', 'Japan'),
    `https://wa.me/62812345?text=${encodeURIComponent(buildWhatsAppMessage('Japan'))}`,
  );
});

test('destination data preserves every normalized source price', () => {
  const source = JSON.parse(
    readFileSync(
      new URL('../workflow/content/normalized-pricing.json', import.meta.url),
      'utf8',
    ),
  );

  assert.deepEqual(
    japan.services,
    source.japan.services.map(({ service, alphard, hiace }: any) => ({
      service,
      prices: { Alphard: alphard, HiAce: hiace },
    })),
  );
  assert.deepEqual(bangkok.services, source.bangkok.services);
  assert.deepEqual(
    korea.services?.map(({ service, price, display }) => ({
      service,
      ...(price ? { price } : {}),
      ...(display ? { display } : {}),
    })),
    source.korea.services.map(({ service, price, display }: any) => ({
      service,
      ...(price ? { price } : {}),
      ...(display ? { display } : {}),
    })),
  );
  assert.deepEqual(
    singapore.vehicles?.map(({ capacity, services }) => ({
      capacity,
      services,
    })),
    source.singapore.vehicles.map(({ capacity, services }: any) => ({
      capacity,
      services,
    })),
  );
});
