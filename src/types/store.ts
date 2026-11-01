export type GameId = 'freefire' | 'roblox';

export interface DiamondPackage {
  id: string;
  diamonds: number;
  bonusDiamonds?: number;
  priceCOP: number;
  priceUSD?: number; // precio fijo en USD (si no existe se calcula con la tasa)
  tag?: string;
  highlight?: boolean;
  category: 'diamonds' | 'membership';
  description: string;
  iconType: 'single' | 'handful' | 'chest' | 'vault' | 'booyah' | 'card_week' | 'card_month';
}

export interface PaymentMethod {
  id: string;
  name: string;
  shortDesc: string;
  badge?: string;
  colorHex: string;
  instructions: string;
  identifier: string;
  iconName: string;
}

export interface OrderRecord {
  orderId: string;
  playerId: string;
  packageId: string;
  packageName: string;
  diamonds: number;
  totalCOP: number;
  totalUSD?: number;
  paymentMethodId: string;
  paymentMethodName: string;
  customerPhone: string;
  customerEmail?: string;
  game?: GameId;
  status: 'PENDIENTE' | 'PROCESANDO' | 'ENTREGADO';
  createdAt: string;
}
