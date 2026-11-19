import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DIAMOND_PACKAGES,
  OFFICIAL_PHONE,
  OFFICIAL_PHONE_FORMATTED,
  OFFICIAL_COMMUNITY_URL,
  formatCOP,
  formatNumber,
  validatePlayerId,
  generateOrderId,
  generateWhatsAppLink,
  getGeneralWhatsAppLink,
  ROBLOX_PACKAGES,
  PAYMENT_METHODS,
  validateAccount,
  FREE_FIRE_PASS_PACKAGE,
  SOCIAL_PACKAGES,
  getPackageLabel,
  validateCoupon,
  calculateOrderPricing,
} from './rechargeLogic.ts';
import { EN } from '../translations.ts';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

test('diamond packages match the price list exactly', () => {
  const expected: [number, number, number][] = [
    [110, 10, 3200],
    [341, 31, 10000],
    [572, 52, 16000],
    [1166, 106, 32000],
    [2398, 218, 60000],
    [6160, 560, 150000],
  ];
  assert.equal(DIAMOND_PACKAGES.length, expected.length);
  for (const [total, bonus, price] of expected) {
    const pkg = DIAMOND_PACKAGES.find((p) => p.diamonds === total);
    assert.ok(pkg, `${total} diamonds pack must exist`);
    assert.equal(pkg.priceCOP, price);
    assert.equal(pkg.bonusDiamonds, bonus);
  }
});

test('official phone number and WhatsApp channel match configured links', () => {
  assert.equal(OFFICIAL_PHONE, '573016886549');
  assert.equal(OFFICIAL_PHONE_FORMATTED, '+57 301 688 6549');
  assert.equal(OFFICIAL_COMMUNITY_URL, 'https://whatsapp.com/channel/0029VbDccG0LNSa8QZ2BYe1o');
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

test('Free Fire Pass and Social packages behave as selectable checkout packages', () => {
  assert.equal(FREE_FIRE_PASS_PACKAGE.id, 'ff-pass');
  assert.equal(FREE_FIRE_PASS_PACKAGE.priceCOP, 6800);
  assert.equal(getPackageLabel(FREE_FIRE_PASS_PACKAGE, 'freefire'), 'Pase de Free Fire');

  assert.equal(SOCIAL_PACKAGES.length, 4);
  const netflix = SOCIAL_PACKAGES.find((p) => p.id === 'netflix-estandar');
  assert.ok(netflix);
  assert.equal(netflix.priceCOP, 14000);
  assert.equal(getPackageLabel(netflix, 'social'), 'Netflix Estándar');
});

test('validateAccount validates social contact and generateWhatsAppLink handles pass/social', () => {
  assert.equal(validateAccount('social', '').isValid, false);
  assert.equal(validateAccount('social', 'ab').isValid, false);
  assert.equal(validateAccount('social', 'cliente@gmail.com').isValid, true);

  const passLink = generateWhatsAppLink({
    orderId: 'NUVEM-123456',
    playerId: '1048291048',
    diamonds: 0,
    totalCOP: 6800,
    paymentMethod: 'Nequi',
    game: 'freefire',
    packageName: 'Pase de Free Fire',
  });
  assert.ok(passLink.includes('Pase%20de%20Free%20Fire'));

  const socialLink = generateWhatsAppLink({
    orderId: 'NUVEM-654321',
    playerId: 'cliente@gmail.com',
    diamonds: 0,
    totalCOP: 14000,
    paymentMethod: 'Bancolombia',
    game: 'social',
    packageName: 'Netflix Estándar',
  });
  assert.ok(socialLink.includes('Netflix%20Est%C3%A1ndar'));
  assert.ok(socialLink.includes('Social'));
});

test('diamond packages carry purchase-incentive badges and micro-copy', () => {
  for (const pkg of DIAMOND_PACKAGES) {
    assert.ok(pkg.tag && pkg.tag.trim().length > 0, `${pkg.id} should have an incentive tag`);
    assert.ok(pkg.incentive && pkg.incentive.trim().length > 0, `${pkg.id} should have incentive copy`);
  }
  const tags = DIAMOND_PACKAGES.map((p) => p.tag);
  assert.ok(tags.includes('Más comprado'));
  assert.ok(tags.includes('Favorito'));
});

test('DAAV coupon validates case-insensitively and applies 5% discount', () => {
  assert.equal(validateCoupon('').isValid, false);
  const invalid = validateCoupon('NOPE');
  assert.equal(invalid.isValid, false);
  assert.equal(invalid.message?.includes('DAAV'), false);

  const ok = validateCoupon(' daav ');
  assert.equal(ok.isValid, true);
  assert.equal(ok.code, 'DAAV');
  assert.equal(ok.discountPercent, 5);

  const pack572 = DIAMOND_PACKAGES.find((p) => p.id === 'ff-572');
  assert.ok(pack572);
  const priced = calculateOrderPricing(pack572, 'DAAV');
  assert.equal(priced.subtotalCOP, 16000);
  assert.equal(priced.discountCOP, 800);
  assert.equal(priced.finalCOP, 15200);
  assert.equal(priced.appliedCode, 'DAAV');

  const wa = generateWhatsAppLink({
    orderId: 'NUVEM-999111',
    playerId: '1048291048',
    diamonds: 572,
    totalCOP: priced.finalCOP,
    paymentMethod: 'Nequi',
    game: 'freefire',
    packageName: '572 Diamantes',
    couponCode: priced.appliedCode || undefined,
    discountCOP: priced.discountCOP,
  });
  assert.ok(wa.includes('Nuvem%20Shop'));
  assert.ok(wa.includes('DAAV'));
});
