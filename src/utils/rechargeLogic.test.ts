import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DIAMOND_PACKAGES,
  OFFICIAL_PHONE,
  OFFICIAL_PHONE_FORMATTED,
  formatCOP,
  formatNumber,
  validatePlayerId,
  generateOrderId,
  generateWhatsAppLink,
  getGeneralWhatsAppLink,
  ROBLOX_PACKAGES,
  PAYMENT_METHODS,
  validateAccount,
} from './rechargeLogic.ts';
import { EN } from '../translations.ts';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

test('diamond packages match user specifications exactly', () => {
  const p100 = DIAMOND_PACKAGES.find((p) => p.diamonds === 100);
  assert.ok(p100, '100 diamonds pack must exist');
  assert.equal(p100.priceCOP, 3200);

  const p310 = DIAMOND_PACKAGES.find((p) => p.diamonds === 310);
  assert.ok(p310, '310 diamonds pack must exist');
  assert.equal(p310.priceCOP, 10000);

  const p520 = DIAMOND_PACKAGES.find((p) => p.diamonds === 520);
  assert.ok(p520, '520 diamonds pack must exist');
  assert.equal(p520.priceCOP, 16000);

  const p1060 = DIAMOND_PACKAGES.find((p) => p.diamonds === 1060);
  assert.ok(p1060, '1060 diamonds pack must exist');
  assert.equal(p1060.priceCOP, 30000);

  const p2180 = DIAMOND_PACKAGES.find((p) => p.diamonds === 2180);
  assert.ok(p2180, '2180 diamonds pack must exist');
  assert.equal(p2180.priceCOP, 60000);

  const p5600 = DIAMOND_PACKAGES.find((p) => p.diamonds === 5600);
  assert.ok(p5600, '5600 diamonds pack must exist');
  assert.equal(p5600.priceCOP, 160000);
});

test('official phone number matches user request +57 301 688 6549', () => {
  assert.equal(OFFICIAL_PHONE, '573016886549');
  assert.equal(OFFICIAL_PHONE_FORMATTED, '+57 301 688 6549');
});

test('formatCOP produces Colombian Peso format', () => {
  const result = formatCOP(3200);
  assert.ok(result.includes('3.200') || result.includes('3,200') || result.includes('3200'));
  assert.ok(result.includes('COP'));
  assert.ok(result.includes('$'));
});

test('validatePlayerId handles numeric Free Fire UIDs', () => {
  assert.equal(validatePlayerId('').isValid, false);
  assert.equal(validatePlayerId('   ').isValid, false);
  assert.equal(validatePlayerId('abc123456').isValid, false);
  assert.equal(validatePlayerId('12345').isValid, false);
  assert.equal(validatePlayerId('1048291048').isValid, true);
  assert.equal(validatePlayerId('87261928').isValid, true);
});

test('generateWhatsAppLink sends message to +57 301 688 6549', () => {
  const link = generateWhatsAppLink({
    orderId: 'NUVEM-902184',
    playerId: '1048291048',
    diamonds: 520,
    totalCOP: 16000,
    paymentMethod: 'Nequi',
  });
  assert.ok(link.includes('573016886549'), 'Must contain official target phone number');
  assert.ok(link.includes('NUVEM-902184'));
  assert.ok(link.includes('1048291048'));
});

test('getGeneralWhatsAppLink points to +57 301 688 6549', () => {
  const link = getGeneralWhatsAppLink();
  assert.ok(link.startsWith('https://wa.me/573016886549'));
});

test('Robux packages exist for Roblox store', () => {
  assert.ok(ROBLOX_PACKAGES.length > 0, 'Robux packages must exist');
  assert.equal(ROBLOX_PACKAGES.find((p) => p.diamonds === 100)?.priceCOP, 4000);
  assert.equal(ROBLOX_PACKAGES.find((p) => p.diamonds === 400)?.priceCOP, 16000);
});

test('payment methods: Nequi, Bancolombia and PayPal, with no payment data', () => {
  assert.deepEqual(PAYMENT_METHODS.map((m) => m.id), ['nequi', 'bancolombia', 'paypal']);
  for (const m of PAYMENT_METHODS) {
    assert.equal(m.identifier, '');
    assert.ok(!/\d{3}[- ]?\d{3}/.test(m.instructions), 'instructions must not contain numbers');
  }
});

test('validateAccount validates Free Fire numeric player ID and Roblox username', () => {
  assert.equal(validateAccount('freefire', '1048291048').isValid, true);
  assert.equal(validateAccount('freefire', 'abc').isValid, false);
  assert.equal(validateAccount('roblox', 'GamerPro_99').isValid, true);
  assert.equal(validateAccount('roblox', 'ab').isValid, false);
});

test('every t("...") text in the source has an English translation', () => {
  const files: string[] = [];
  const walk = (dir: string) => {
    for (const f of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, f.name);
      if (f.isDirectory()) walk(p);
      else if (/\.tsx$/.test(f.name)) files.push(p);
    }
  };
  walk(new URL('..', import.meta.url).pathname);
  const re = /\bt\(\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")/g;
  const missing: string[] = [];
  for (const f of files) {
    const src = readFileSync(f, 'utf8');
    for (const m of src.matchAll(re)) {
      const key = (m[1] ?? m[2]).replace(/\\'/g, "'");
      if (!(key in EN)) missing.push(key);
    }
  }
  assert.deepEqual(missing, []);
});

test('Free Fire USD prices are fixed per package', () => {
  const usd: Record<number, number> = { 100: 1.03, 310: 3.09, 520: 3.8, 1060: 7.59, 2180: 15.84, 5600: 37.99 };
  for (const [d, price] of Object.entries(usd)) {
    assert.equal(DIAMOND_PACKAGES.find((p) => p.diamonds === Number(d))?.priceUSD, price);
  }
});
