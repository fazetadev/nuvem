import React, { useState } from 'react';
import { X, Send, ShieldCheck, CircleCheck, LockKeyhole, Smartphone, Building2, Wallet, Gem, Check } from 'lucide-react';
import type { DiamondPackage, CatalogTab, PaymentMethod } from '../types/store.ts';
import { GAME_INFO, PAYMENT_METHODS, formatCOP, getPackageLabel, calculateOrderPricing } from '../utils/rechargeLogic.ts';

interface CheckoutPanelProps {
  game: CatalogTab;
  playerId: string;
  onPlayerIdChange: (id: string) => void;
  selectedPackage: DiamondPackage | null;
  selectedPayment: PaymentMethod | null;
  onSelectPayment: (m: PaymentMethod) => void;
  appliedCoupon: string | null;
  onApplyCoupon: (code: string) => { isValid: boolean; code: string; discountPercent: number; message?: string };
  onRemoveCoupon: () => void;
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
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  onProceed,
  error,
}) => {
  const [coupon, setCoupon] = useState(appliedCoupon || '');
  const [couponFeedback, setCouponFeedback] = useState<{ type: 'ok' | 'err'; text: string } | null>(
    appliedCoupon ? { type: 'ok', text: `Código ${appliedCoupon} aplicado - 5% de descuento activo` } : null
  );
  const info = GAME_INFO[game];
  const isRoblox = game === 'roblox';
  const isSocial = game === 'social';
  const pricing = selectedPackage ? calculateOrderPricing(selectedPackage, appliedCoupon) : null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (isSocial) {
      onPlayerIdChange(v.slice(0, 80));
      return;
    }
    onPlayerIdChange(
      isRoblox ? v.replace(/[^a-zA-Z0-9_]/g, '').slice(0, 20) : v.replace(/\D/g, '').slice(0, 12)
    );
  };

  const applyCode = (raw: string) => {
    const result = onApplyCoupon(raw);
    if (result.isValid) {
      setCoupon(result.code);
      setCouponFeedback({
        type: 'ok',
        text: `Código ${result.code} aplicado - ${result.discountPercent}% de descuento en tu compra`,
      });
    } else {
      setCouponFeedback({
        type: 'err',
        text: result.message || 'Código no válido o expirado.',
      });
    }
  };

  const handleClearCoupon = () => {
    setCoupon('');
    setCouponFeedback(null);
    onRemoveCoupon();
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
            inputMode={isSocial ? 'email' : isRoblox ? 'text' : 'numeric'}
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
          {isSocial
            ? 'No pedimos contraseñas. Te enviamos el acceso por WhatsApp o correo.'
            : isRoblox
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
            onChange={(e) => {
              const next = e.target.value.toUpperCase().replace(/\s/g, '').slice(0, 24);
              setCoupon(next);
              if (!next && appliedCoupon) onRemoveCoupon();
              setCouponFeedback(null);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                applyCode(coupon);
              }
            }}
            placeholder="ESCRIBE TU CÓDIGO"
            autoCapitalize="characters"
          />
          {appliedCoupon ? (
            <button type="button" onClick={handleClearCoupon}>
              Quitar
            </button>
          ) : (
            <button type="button" onClick={() => applyCode(coupon)}>
              Aplicar
            </button>
          )}
        </div>
        {couponFeedback ? (
          <small className={couponFeedback.type === 'ok' ? 'coupon-msg-ok' : 'coupon-msg-err'}>
            {couponFeedback.type === 'ok' && <Check size={12} />} {couponFeedback.text}
          </small>
        ) : (
          <small>Ingresa tu código promocional si cuentas con uno.</small>
        )}
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
              {selectedPackage ? getPackageLabel(selectedPackage, game) : `- ${info.unit}`}
            </b>
            <small>{selectedPackage ? 'Entrega rápida garantizada' : 'Elige un paquete para continuar'}</small>
          </div>
        </div>
        {pricing && pricing.discountCOP > 0 && (
          <div className="total-discount-row">
            <span>Descuento ({pricing.appliedCode} - {pricing.discountPercent}%)</span>
            <strong>- {formatCOP(pricing.discountCOP)}</strong>
          </div>
        )}
        <div className="total-price-row">
          <span>Total a pagar</span>
          <div className="total-price-values">
            {pricing && pricing.discountCOP > 0 && (
              <s className="total-old-price">{formatCOP(pricing.subtotalCOP)}</s>
            )}
            <strong>{pricing ? formatCOP(pricing.finalCOP) : '$ 0 COP'}</strong>
          </div>
        </div>
      </div>

      <button type="button" onClick={onProceed} className="checkout-submit">
        <Send size={17} />
        CONTINUAR AL PAGO
        <span>→</span>
      </button>
      <div className="checkout-reassurance">
        <ShieldCheck size={14} />
        Primero revisarás tu pedido. El mensaje de WhatsApp se abrirá al confirmar.
      </div>
    </div>
  );
};
