import type { DiamondPackage, PaymentMethod, OrderRecord, CatalogTab } from '../types/store.ts';

export const OFFICIAL_PHONE = '573016886549';
export const OFFICIAL_PHONE_FORMATTED = '+57 301 688 6549';
export const OFFICIAL_COMMUNITY_URL = 'https://whatsapp.com/channel/0029VbDccG0LNSa8QZ2BYe1o';

// Diamantes: `diamonds` = total que recibe el cliente (base + bono).
export const DIAMOND_PACKAGES: DiamondPackage[] = [
  { id: 'ff-110',  diamonds: 110,  bonusDiamonds: 10,  priceCOP: 3200,   tag: 'Para empezar', tagTone: 'popular', incentive: 'Entrega inmediata' },
  { id: 'ff-341',  diamonds: 341,  bonusDiamonds: 31,  priceCOP: 10000,  tag: 'Favorito',     tagTone: 'fav',     incentive: 'Ideal para eventos' },
  { id: 'ff-572',  diamonds: 572,  bonusDiamonds: 52,  priceCOP: 16000,  tag: 'Más comprado', tagTone: 'hot',     incentive: 'El más pedido hoy' },
  { id: 'ff-1166', diamonds: 1166, bonusDiamonds: 106, priceCOP: 32000,  tag: 'Top ventas',   tagTone: 'popular', highlight: true, incentive: 'Favorito gamers' },
  { id: 'ff-2398', diamonds: 2398, bonusDiamonds: 218, priceCOP: 60000,  tag: 'Ahorras más',  tagTone: 'value',   incentive: 'Ahorro extra COP' },
  { id: 'ff-6160', diamonds: 6160, bonusDiamonds: 560, priceCOP: 150000, tag: 'Mejor valor',  tagTone: 'value',   incentive: 'Máximo ahorro - 16%' },
];

export const ROBLOX_PACKAGES: DiamondPackage[] = [
  { id: 'robux-100',   diamonds: 100,   priceCOP: 4000,   priceUSD: 1 },
  { id: 'robux-400',   diamonds: 400,   priceCOP: 16000,  priceUSD: 4,   tag: 'Más comprado', tagTone: 'hot', highlight: true, incentive: 'El más pedido hoy' },
  { id: 'robux-800',   diamonds: 800,   priceCOP: 32000,  priceUSD: 8,   tag: 'Favorito',     tagTone: 'fav', incentive: 'Para gamepasses' },
  { id: 'robux-1700',  diamonds: 1700,  priceCOP: 68000,  priceUSD: 17 },
  { id: 'robux-4500',  diamonds: 4500,  priceCOP: 180000, priceUSD: 45 },
  { id: 'robux-10000', diamonds: 10000, priceCOP: 400000, priceUSD: 100, tag: 'Mejor valor', tagTone: 'value' },
];

export const FREE_FIRE_PASS_PACKAGE: DiamondPackage = {
  id: 'ff-pass',
  diamonds: 0,
  priceCOP: 6800,
  tag: 'Pase Free Fire',
  title: 'Pase',
  subtitle: 'Pase de temporada',
  incentive: 'Activación rápida',
  displayName: 'Pase de Free Fire',
  image: 'https://i.ibb.co/Z1hyMTxF/pase-card-removebg-preview.png',
};

export const SOCIAL_PACKAGES: DiamondPackage[] = [
  {
    id: 'netflix-estandar',
    diamonds: 0,
    priceCOP: 14000,
    tag: 'Netflix',
    title: 'Estándar',
    subtitle: 'Planes de entretenimiento',
    incentive: 'Entrega inmediata',
    displayName: 'Netflix Estándar',
    image: 'https://i.ibb.co/ksLWm7Cw/netflix.jpg',
  },
  {
    id: 'netflix-premium',
    diamonds: 0,
    priceCOP: 28000,
    tag: 'Netflix',
    title: 'Premium',
    subtitle: 'Planes de entretenimiento',
    incentive: 'Más pedido - Ultra HD',
    displayName: 'Netflix Premium',
    image: 'https://i.ibb.co/ksLWm7Cw/netflix.jpg',
  },
  {
    id: 'capcut-estandar',
    diamonds: 0,
    priceCOP: 20000,
    tag: 'CapCut',
    title: 'Estándar',
    subtitle: 'Herramientas para crear contenido',
    incentive: 'Activación rápida',
    displayName: 'CapCut Estándar',
    image: 'https://i.ibb.co/DXDPjfZ/capcut.jpg',
  },
  {
    id: 'capcut-pro',
    diamonds: 0,
    priceCOP: 40000,
    tag: 'CapCut',
    title: 'Pro',
    subtitle: 'Herramientas para crear contenido',
    incentive: 'Favorito creadores',
    displayName: 'CapCut Pro',
    image: 'https://i.ibb.co/DXDPjfZ/capcut.jpg',
  },
];

export interface GameInfo {
  name: string;
  unit: string;        // Diamantes o Robux
  unitLower: string;
  accountShort: string; // UID o Usuario
  accountLabel: string;
  accountField: string;
  placeholder: string;
  hint: string;
  stepTitle: string;
  stepSub: string;
  packagesTitle: string;
  packagesTab: string;
  deliveredIn: string;
}

export const GAME_INFO: Record<CatalogTab, GameInfo> = {
  freefire: {
    name: 'Free Fire',
    unit: 'Diamantes',
    unitLower: 'diamantes',
    accountShort: 'UID',
    accountLabel: 'ID de Jugador (UID)',
    accountField: 'ID de Cuenta Free Fire (UID)',
    placeholder: 'Ingresa tu ID de Free Fire',
    hint: 'Asegúrate de copiar tu UID exactamente como aparece en tu perfil',
    stepTitle: 'Ingresa tu ID de Jugador (UID)',
    stepSub: 'Recarga directa y segura por ID - No requerimos contraseñas ni accesos a tu cuenta',
    packagesTitle: 'Selecciona tu Cantidad de Diamantes',
    packagesTab: 'Diamantes Free Fire',
    deliveredIn: 'Tus diamantes se acreditan automáticamente en Garena Free Fire una vez confirmado el comprobante con nuestro asesor.',
  },
  roblox: {
    name: 'Roblox',
    unit: 'Robux',
    unitLower: 'Robux',
    accountShort: 'Usuario',
    accountLabel: 'Usuario de Roblox',
    accountField: 'Nombre de Usuario de Roblox',
    placeholder: 'Ingresa tu usuario de Roblox',
    hint: 'Escribe tu usuario exactamente como aparece en tu perfil de Roblox',
    stepTitle: 'Ingresa tu Usuario de Roblox',
    stepSub: 'Entrega de Robux por usuario - Nunca pedimos tu contraseña',
    packagesTitle: 'Selecciona tu Cantidad de Robux',
    packagesTab: 'Robux Roblox',
    deliveredIn: 'Tus Robux se entregan en tu cuenta de Roblox una vez confirmado el comprobante con nuestro asesor.',
  },
  social: {
    name: 'Social',
    unit: 'Plan',
    unitLower: 'planes',
    accountShort: 'Contacto',
    accountLabel: 'Correo o WhatsApp de entrega',
    accountField: 'Correo o WhatsApp',
    placeholder: 'Ej: tucorreo@gmail.com o 301 000 0000',
    hint: 'Ingresa tu correo o WhatsApp para enviarte tu plan al confirmar el pago',
    stepTitle: 'Ingresa tu Correo o WhatsApp',
    stepSub: 'Entrega digital directa - Nunca pedimos tu contraseña',
    packagesTitle: 'Selecciona tu Plan Social',
    packagesTab: 'Servicios Social',
    deliveredIn: 'Tu plan se activa y entrega por WhatsApp en minutos una vez confirmado el comprobante con nuestro asesor.',
  },
};

export function getPackageLabel(pkg: DiamondPackage, tab: CatalogTab): string {
  if (pkg.displayName) return pkg.displayName;
  return `${formatNumber(pkg.diamonds)} ${GAME_INFO[tab].unit}`;
}

export function validateRobloxUsername(user: string): { isValid: boolean; error?: string } {
  const trimmed = user.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Por favor ingresa tu usuario de Roblox' };
  }
  if (!/^[a-zA-Z0-9_]{3,20}$/.test(trimmed)) {
    return { isValid: false, error: 'El usuario de Roblox debe tener 3 a 20 caracteres (letras, números o _)' };
  }
  return { isValid: true };
}

export function validateSocialContact(contact: string): { isValid: boolean; error?: string } {
  const trimmed = contact.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Por favor ingresa tu correo o número de WhatsApp' };
  }
  if (trimmed.length < 4) {
    return { isValid: false, error: 'Ingresa un correo o WhatsApp válido (mínimo 4 caracteres)' };
  }
  return { isValid: true };
}

export function validateAccount(game: CatalogTab, id: string): { isValid: boolean; error?: string } {
  if (game === 'roblox') return validateRobloxUsername(id);
  if (game === 'social') return validateSocialContact(id);
  return validatePlayerId(id);
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'nequi',
    name: 'Nequi',
    shortDesc: 'Acreditación inmediata sin comisiones',
    badge: 'Más Utilizado',
    colorHex: '#38bdf8',
    instructions: 'Al confirmar tu pedido, te enviamos por WhatsApp los datos de Nequi para hacer el pago.',
    identifier: '',
    iconName: 'Smartphone',
  },
  {
    id: 'bancolombia',
    name: 'Bancolombia',
    shortDesc: 'Transferencia Bancolombia o A la Mano',
    badge: 'Cero Comisión',
    colorHex: '#0ea5e9',
    instructions: 'Al confirmar tu pedido, te enviamos por WhatsApp los datos de Bancolombia para hacer la transferencia.',
    identifier: '',
    iconName: 'Building2',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    shortDesc: 'Pago seguro con tu cuenta PayPal',
    colorHex: '#2563eb',
    instructions: 'Al confirmar tu pedido, te enviamos por WhatsApp los datos de PayPal para hacer el pago.',
    identifier: '',
    iconName: 'Wallet',
  },
];

export const VALID_COUPONS: Record<string, { code: string; discountPercent: number; label: string }> = {
  DAAV: { code: 'DAAV', discountPercent: 5, label: '5% de descuento' },
};

export function validateCoupon(rawCode: string | null | undefined): {
  isValid: boolean;
  code: string;
  discountPercent: number;
  message?: string;
} {
  const normalized = (rawCode || '').trim().toUpperCase().replace(/\s/g, '');
  if (!normalized) {
    return { isValid: false, code: '', discountPercent: 0, message: 'Escribe un código primero.' };
  }
  const found = VALID_COUPONS[normalized];
  if (!found) {
    return { isValid: false, code: normalized, discountPercent: 0, message: 'Código no válido o expirado.' };
  }
  return { isValid: true, code: found.code, discountPercent: found.discountPercent };
}

export function calculateOrderPricing(
  pkg: Pick<DiamondPackage, 'priceCOP' | 'priceUSD'>,
  couponCode?: string | null
): {
  subtotalCOP: number;
  discountCOP: number;
  finalCOP: number;
  discountPercent: number;
  appliedCode: string | null;
  finalUSD?: number;
} {
  const check = couponCode ? validateCoupon(couponCode) : null;
  const discountPercent = check?.isValid ? check.discountPercent : 0;
  const appliedCode = check?.isValid ? check.code : null;
  const discountCOP = discountPercent > 0 ? Math.round((pkg.priceCOP * discountPercent) / 100) : 0;
  const finalCOP = Math.max(0, pkg.priceCOP - discountCOP);
  const finalUSD =
    typeof pkg.priceUSD === 'number'
      ? Number((pkg.priceUSD * (1 - discountPercent / 100)).toFixed(2))
      : undefined;
  return { subtotalCOP: pkg.priceCOP, discountCOP, finalCOP, discountPercent, appliedCode, finalUSD };
}

/**
 * Format Colombian Pesos (COP)
 * Example: 3200 -> "$ 3.200 COP"
 */
export function formatCOP(amount: number): string {
  const formatted = new Intl.NumberFormat('es-CO', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(amount);
  return `$ ${formatted} COP`;
}

/**
 * Format numbers with dots for thousands
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('es-CO').format(num);
}

/**
 * Validates Free Fire Player ID
 * Must be numeric, between 8 and 12 digits
 */
export function validatePlayerId(id: string): { isValid: boolean; error?: string } {
  const trimmed = id.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Por favor ingresa tu ID' };
  }
  if (!/^\d+$/.test(trimmed)) {
    return { isValid: false, error: 'El ID de jugador solo debe contener números' };
  }
  if (trimmed.length < 8 || trimmed.length > 12) {
    return { isValid: false, error: 'El ID debe tener entre 8 y 12 dígitos' };
  }
  return { isValid: true };
}

/**
 * Generates an Order ID in standard Nuvem Shop format
 */
export function generateOrderId(): string {
  const randomPart = Math.floor(100000 + Math.random() * 900000);
  return `NUVEM-${randomPart}`;
}

/**
 * Generates direct WhatsApp message link for Nuvem Shop customer support
 * Target Phone: +57 301 688 6549
 */
export function generateWhatsAppLink(order: {
  orderId: string;
  playerId: string;
  diamonds: number;
  totalCOP: number;
  paymentMethod: string;
  game?: CatalogTab;
  packageName?: string;
  couponCode?: string;
  discountCOP?: number;
  usdTotal?: number;
}): string {
  const phone = OFFICIAL_PHONE; // 573016886549
  const tab: CatalogTab = order.game || 'freefire';
  const g = GAME_INFO[tab];
  const playerLine = order.playerId ? `🎮 ${g.accountLabel}: ${order.playerId}\n` : '';
  const itemLabel = order.packageName || `${formatNumber(order.diamonds)} ${g.unit}`;
  const couponLine = order.couponCode
    ? `🎟️ Cupón: ${order.couponCode}${order.discountCOP ? ` (-${formatCOP(order.discountCOP)})` : ''}\n`
    : '';
  const intro =
    tab === 'social'
      ? `👋 ¡Hola Nuvem Shop! Acabo de solicitar un plan de ${g.name}:`
      : `👋 ¡Hola Nuvem Shop! Acabo de solicitar una recarga para ${g.name}:`;
  const text = `${intro}
${playerLine}💎 Producto: ${itemLabel}
${couponLine}💰 Total: ${formatCOP(order.totalCOP)}${order.usdTotal ? ` (≈ US$ ${order.usdTotal.toFixed(2)})` : ''}
💳 Método de Pago: ${order.paymentMethod}
🏷️ Pedido: #${order.orderId}

Adjunto mi comprobante para la entrega inmediata. ¡Muchas gracias!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/**
 * Direct WhatsApp link for general inquiries
 */
export function getGeneralWhatsAppLink(message?: string): string {
  const text = message || 'Hola Nuvem Shop, quisiera realizar una recarga.';
  return `https://wa.me/${OFFICIAL_PHONE}?text=${encodeURIComponent(text)}`;
}

/**
 * Local Storage helpers for persisting customer orders
 */
const ORDERS_STORAGE_KEY = 'nuvem_shop_orders_v1';

export function getSavedOrders(): OrderRecord[] {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveOrder(order: OrderRecord): void {
  try {
    const current = getSavedOrders();
    const updated = [order, ...current.filter((o) => o.orderId !== order.orderId)].slice(0, 20);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving order', err);
  }
}
