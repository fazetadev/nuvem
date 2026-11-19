import React, { useState } from 'react';
import { X, Send, ShieldCheck, CircleCheck, LockKeyhole, Smartphone, Building2, Wallet, Gem } from 'lucide-react';
import type { DiamondPackage, GameId, PaymentMethod } from '../types/store.ts';
import { GAME_INFO, PAYMENT_METHODS, formatCOP, formatNumber } from '../utils/rechargeLogic.ts';

interface CheckoutPanelProps {
  game: GameId;
  playerId: string;
  onPlayerIdChange: (id: string) => void;
  selectedPackage: DiamondPackage | null;
  selectedPayment: PaymentMethod | null;
  onSelectPayment: (m: PaymentMethod) => void;
  onProceed: () => void;
  error: string | null;
}

const PAY_ICONS: Record<string, React.ReactNode> = {
  nequi: <Smartphone size={16} />,
  bancolombia: <Building2 size={16} />,
  paypal: <Wallet size={16} />,
};

export const CheckoutPanel: React.FC<CheckoutPanelProps> = ({
  game,
  playerId,
  onPlayerIdChange,
  selectedPackage,
  selectedPayment,
  onSelectPayment,
  onProceed,
  error,
}) => {
  const [coupon, setCoupon] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const info = GAME_INFO[game];
  const isRoblox = game === 'roblox';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    onPlayerIdChange(
      isRoblox ? v.replace(/[^a-zA-Z0-9_]/g, '').slice(0, 20) : v.replace(/\D/g, '').slice(0, 12)
    );
  };

  return (
    <div className="checkout-card">
      <div className="checkout-card-top">
        <span>
          <LockKeyhole size={14} /> CHECKOUT SEGURO
        </span>
        <span className="checkout-encrypted">● PROTEGIDO</span>
      </div>

      <div className="checkout-field">
        <label htmlFor="player-id">
          <span className="field-step">1</span>
          {info.accountLabel}
        </label>
        <div className="input-wrap">
          <input
            id="player-id"
            type="text"
            inputMode={isRoblox ? 'text' : 'numeric'}
            autoCapitalize="none"
            autoCorrect="off"
            placeholder={info.placeholder}
            value={playerId}
            onChange={handleChange}
          />
          {playerId && (
            <button type="button" onClick={() => onPlayerIdChange('')} aria-label="Borrar">
              <X size={16} />
            </button>
          )}
        </div>
        <p className="field-helper">
          <ShieldCheck size={13} />
          {isRoblox
            ? 'No necesitamos tu contraseña, solo tu usuario.'
            : 'Copia tu UID directamente desde tu perfil.'}
        </p>
        {error && <p className="checkout-error">{error}</p>}
      </div>

      <div className="checkout-field">
        <label>
          <span className="field-step">2</span>
          Elige tu método de pago
        </label>
        <div className="payment-grid">
          {PAYMENT_METHODS.map((m) => {
            const on = selectedPayment?.id === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => onSelectPayment(m)}
                aria-pressed={on}
                className={`payment-option ${on ? 'payment-option-active' : ''}`}
              >
                <span className="payment-icon">{PAY_ICONS[m.id] || <Wallet size={16} />}</span>
                <b>{m.name}</b>
              </button>
            );
          })}
        </div>
        <p className="field-helper">
          <CircleCheck size={13} /> Selecciona el medio que te resulte más cómodo.
        </p>
      </div>

      <div className="coupon-box">
        <label htmlFor="coupon-code">¿Tienes un cupón de descuento?</label>
        <div className="coupon-entry">
          <input
            id="coupon-code"
            type="text"
            value={coupon}
            onChange={(e) => { setCoupon(e.target.value.toUpperCase().replace(/\\s/g, '').slice(0, 24)); setCouponMessage(''); }}
            placeholder="ESCRIBE TU CÓDIGO"
            autoCapitalize="characters"
          />
          <button type="button" onClick={() => setCouponMessage(coupon.trim() ? 'Compártelo con nuestro asesor al confirmar por WhatsApp.' : 'Escribe tu código primero.')}>
            Usar código
          </button>
        </div>
        <small>{couponMessage || 'Los cupones se verifican al confirmar tu compra por WhatsApp.'}</small>
      </div>

      <div className="checkout-total">
        <div className="total-caption">
          <span>RESUMEN DE TU COMPRA</span>
          <span className="total-live">
            <i /> ACTUALIZADO
          </span>
        </div>
        <div className="total-product">
          <div className={`total-product-icon ${isRoblox ? 'icon-robux' : 'icon-diamond'}`}>
            <Gem size={18} />
          </div>
          <div>
            <b>
              {selectedPackage ? formatNumber(selectedPackage.diamonds) : '—'} {info.unit}
            </b>
            <small>{selectedPackage ? 'Paquete seleccionado' : 'Elige un paquete para continuar'}</small>
          </div>
        </div>
        <div className="total-price-row">
          <span>Total a pagar</span>
          <strong>{selectedPackage ? formatCOP(selectedPackage.priceCOP) : '$ 0 COP'}</strong>
        </div>
      </div>

      <button type="button" onClick={onProceed} className="checkout-submit">
        <Send size={17} />
        REVISAR Y CONTINUAR
        <span>→</span>
      </button>
      <div className="checkout-reassurance">
        <ShieldCheck size={14} />
        Primero revisarás tu pedido. El mensaje de WhatsApp se abrirá al generar la orden.
      </div>
    </div>
  );
};
