import type { DiamondPackage, PaymentMethod, OrderRecord, GameId } from '../types/store.ts';

export const OFFICIAL_PHONE = '573016886549';
export const OFFICIAL_PHONE_FORMATTED = '+57 301 688 6549';

export const DIAMOND_PACKAGES: DiamondPackage[] = [
  {
    id: 'pack-100',
    diamonds: 100,
    priceCOP: 3200,
    priceUSD: 1.03,
    tag: 'Económico',
    category: 'diamonds',
    description: '100 Diamantes para recargas rápidas o eventos del día',
    iconType: 'single',
  },
  {
    id: 'pack-310',
    diamonds: 310,
    priceCOP: 10000,
    priceUSD: 3.09,
    category: 'diamonds',
    description: '310 Diamantes directos a tu cuenta de Free Fire',
    iconType: 'handful',
  },
  {
    id: 'pack-520',
    diamonds: 520,
    priceCOP: 16000,
    priceUSD: 3.80,
    tag: 'Recomendado',
    highlight: true,
    category: 'diamonds',
    description: '520 Diamantes para ruletas y cajas de armas',
    iconType: 'chest',
  },
  {
    id: 'pack-1060',
    diamonds: 1060,
    priceCOP: 30000,
    priceUSD: 7.59,
    tag: 'Más Vendido',
    highlight: true,
    category: 'diamonds',
    description: '1.060 Diamantes para conseguir pases y skins legendarias',
    iconType: 'chest',
  },
  {
    id: 'pack-2180',
    diamonds: 2180,
    priceCOP: 60000,
    priceUSD: 15.84,
    category: 'diamonds',
    description: '2.180 Diamantes para coleccionistas y jugadores competitivos',
    iconType: 'vault',
  },
  {
    id: 'pack-5600',
    diamonds: 5600,
    priceCOP: 160000,
    priceUSD: 37.99,
    tag: 'Máximo Ahorro',
    category: 'diamonds',
    description: '5.600 Diamantes al mejor costo por diamante en Colombia',
    iconType: 'vault',
  },
];

export const MEMBERSHIP_PACKAGES: DiamondPackage[] = [
  {
    id: 'pack-pase-booyah',
    diamonds: 499,
    priceCOP: 14500,
    tag: 'Pase Élite',
    category: 'membership',
    description: 'Desbloquea todos los niveles y premios exclusivos de temporada',
    iconType: 'booyah',
  },
  {
    id: 'pack-tarjeta-semanal',
    diamonds: 450,
    priceCOP: 7900,
    tag: 'Acumulable',
    category: 'membership',
    description: 'Recibe 450 diamantes repartidos en 7 días + insignia VIP',
    iconType: 'card_week',
  },
  {
    id: 'pack-tarjeta-mensual',
    diamonds: 2600,
    priceCOP: 38000,
    tag: 'VIP Mensual',
    category: 'membership',
    description: '2.600 diamantes durante 30 días + doble tarjeta privilegio',
    iconType: 'card_month',
  },
];


export const ROBLOX_PACKAGES: DiamondPackage[] = [
  {
    id: 'robux-100',
    diamonds: 100,
    priceCOP: 4000,
    priceUSD: 1.00,
    tag: 'Económico',
    category: 'diamonds',
    description: '100 Robux para accesorios y pases básicos',
    iconType: 'single',
  },
  {
    id: 'robux-400',
    diamonds: 400,
    priceCOP: 16000,
    priceUSD: 4.00,
    tag: 'Recomendado',
    highlight: true,
    category: 'diamonds',
    description: '400 Robux para personalizar tu avatar o comprar gamepasses',
    iconType: 'handful',
  },
  {
    id: 'robux-800',
    diamonds: 800,
    priceCOP: 32000,
    priceUSD: 8.00,
    tag: 'Más Vendido',
    highlight: true,
    category: 'diamonds',
    description: '800 Robux para las mejores experiencias y animaciones',
    iconType: 'chest',
  },
  {
    id: 'robux-1700',
    diamonds: 1700,
    priceCOP: 68000,
    priceUSD: 17.00,
    category: 'diamonds',
    description: '1.700 Robux para creadores y jugadores frecuentes',
    iconType: 'vault',
  },
  {
    id: 'robux-4500',
    diamonds: 4500,
    priceCOP: 180000,
    priceUSD: 45.00,
    tag: 'Máximo Robux',
    category: 'diamonds',
    description: '4.500 Robux al mejor precio para compras masivas',
    iconType: 'vault',
  },
  {
    id: 'robux-10000',
    diamonds: 10000,
    priceCOP: 400000,
    priceUSD: 100.00,
    tag: 'Máximo Ahorro',
    category: 'diamonds',
    description: '10.000 Robux para los fanáticos y desarrolladores de Roblox',
    iconType: 'vault',
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
