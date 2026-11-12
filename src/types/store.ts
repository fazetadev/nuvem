export type GameId = 'freefire' | 'roblox';

export interface DiamondPackage {
  id: string;
  /** Total que recibe el cliente (incluye bono si lo hay) */
  diamonds: number;
  bonusDiamonds?: number;
  priceCOP: number;
  priceUSD?: number; // precio fijo en USD (si no existe se calcula con la tasa)
  tag?: string;
  highlight?: boolean;
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
