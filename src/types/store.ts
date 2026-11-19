export type GameId = 'freefire' | 'roblox';

/** Pestaña activa del catálogo: los dos juegos con flujo de compra, más el catálogo de servicios. */
export type CatalogTab = GameId | 'social';

export interface DiamondPackage {
  id: string;
  /** Total que recibe el cliente (incluye bono si lo hay) */
  diamonds: number;
  bonusDiamonds?: number;
  priceCOP: number;
  priceUSD?: number; // precio fijo en USD (si no existe se calcula con la tasa)
  tag?: string;
  tagTone?: 'hot' | 'fav' | 'value' | 'popular';
  incentive?: string;
  highlight?: boolean;
  title?: string;
  subtitle?: string;
  displayName?: string;
  image?: string;
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
  couponCode?: string;
  discountCOP?: number;
  paymentMethodId: string;
  paymentMethodName: string;
  customerPhone: string;
  customerEmail?: string;
  game?: CatalogTab;
  status: 'PENDIENTE' | 'PROCESANDO' | 'ENTREGADO';
  createdAt: string;
}
