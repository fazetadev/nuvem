import type { DiamondPackage, PaymentMethod, OrderRecord, GameId } from '../types/store.ts';

export const OFFICIAL_PHONE = '573016886549';
export const OFFICIAL_PHONE_FORMATTED = '+57 301 688 6549';

// Diamantes: `diamonds` = total que recibe el cliente (base + bono).
export const DIAMOND_PACKAGES: DiamondPackage[] = [
  { id: 'ff-110',  diamonds: 110,  bonusDiamonds: 10,  priceCOP: 3200 },
  { id: 'ff-341',  diamonds: 341,  bonusDiamonds: 31,  priceCOP: 10000 },
  { id: 'ff-572',  diamonds: 572,  bonusDiamonds: 52,  priceCOP: 16000 },
  { id: 'ff-1166', diamonds: 1166, bonusDiamonds: 106, priceCOP: 32000, tag: 'Popular', highlight: true },
  { id: 'ff-2398', diamonds: 2398, bonusDiamonds: 218, priceCOP: 60000 },
  { id: 'ff-6160', diamonds: 6160, bonusDiamonds: 560, priceCOP: 150000 },
];

export const ROBLOX_PACKAGES: DiamondPackage[] = [
  { id: 'robux-100',   diamonds: 100,   priceCOP: 4000,   priceUSD: 1 },
  { id: 'robux-400',   diamonds: 400,   priceCOP: 16000,  priceUSD: 4,   tag: 'Popular', highlight: true },
  { id: 'robux-800',   diamonds: 800,   priceCOP: 32000,  priceUSD: 8 },
  { id: 'robux-1700',  diamonds: 1700,  priceCOP: 68000,  priceUSD: 17 },
  { id: 'robux-4500',  diamonds: 4500,  priceCOP: 180000, priceUSD: 45 },
  { id: 'robux-10000', diamonds: 10000, priceCOP: 400000, priceUSD: 100 },
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

export const GAME_INFO: Record<GameId, GameInfo> = {
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
    stepSub: 'Recarga directa y segura por ID · No requerimos contraseñas ni accesos a tu cuenta',
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
    stepSub: 'Entrega de Robux por usuario · Nunca pedimos tu contraseña',
    packagesTitle: 'Selecciona tu Cantidad de Robux',
    packagesTab: 'Robux Roblox',
    deliveredIn: 'Tus Robux se entregan en tu cuenta de Roblox una vez confirmado el comprobante con nuestro asesor.',
  },
};

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

export function validateAccount(game: GameId, id: string): { isValid: boolean; error?: string } {
  return game === 'roblox' ? validateRobloxUsername(id) : validatePlayerId(id);
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'nequi',
    name: 'Nequi',
    shortDesc: 'Acreditación inmediata sin comisiones',
    badge: 'Más Utilizado',
    colorHex: '#e11d48',
    instructions: 'Al confirmar tu pedido, te enviamos por WhatsApp los datos de Nequi para hacer el pago.',
    identifier: '',
    iconName: 'Smartphone',
  },
  {
    id: 'bancolombia',
    name: 'Bancolombia',
    shortDesc: 'Transferencia Bancolombia o A la Mano',
    badge: 'Cero Comisión',
    colorHex: '#facc15',
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
 * Generates an Order ID in standard Nuvem Store format
 */
export function generateOrderId(): string {
  const randomPart = Math.floor(100000 + Math.random() * 900000);
  return `NUVEM-${randomPart}`;
}

/**
 * Generates direct WhatsApp message link for Nuvem Store customer support
 * Target Phone: +57 301 688 6549
 */
export function generateWhatsAppLink(order: {
  orderId: string;
  playerId: string;
  diamonds: number;
  totalCOP: number;
  paymentMethod: string;
  game?: GameId;
  usdTotal?: number;
}): string {
  const phone = OFFICIAL_PHONE; // 573016886549
  const g = GAME_INFO[order.game || 'freefire'];
  const playerLine = order.playerId ? `🎮 ${g.accountLabel}: ${order.playerId}\n` : '';
  const text = `👋 ¡Hola Nuvem Store! Acabo de solicitar una recarga para ${g.name}:
${playerLine}💎 Recarga: ${formatNumber(order.diamonds)} ${g.unit}
💰 Total: ${formatCOP(order.totalCOP)}${order.usdTotal ? ` (≈ US$ ${order.usdTotal.toFixed(2)})` : ''}
💳 Método de Pago: ${order.paymentMethod}
🏷️ Pedido: #${order.orderId}

Adjunto mi comprobante para la entrega inmediata. ¡Muchas gracias!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/**
 * Direct WhatsApp link for general inquiries
 */
export function getGeneralWhatsAppLink(message?: string): string {
  const text = message || 'Hola Nuvem Store, quisiera realizar una recarga de diamantes para Free Fire.';
  return `https://wa.me/${OFFICIAL_PHONE}?text=${encodeURIComponent(text)}`;
}

/**
 * Local Storage helpers for persisting customer orders
 */
const ORDERS_STORAGE_KEY = 'nuvem_store_orders_v1';

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

export function findOrder(query: string): OrderRecord | undefined {
  const trimmed = query.trim().toUpperCase();
  const orders = getSavedOrders();
  return orders.find(
    (o) => o.orderId.toUpperCase() === trimmed || o.playerId === query.trim()
  );
}
