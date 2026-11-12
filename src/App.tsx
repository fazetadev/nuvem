import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ShieldCheck, Zap, LockKeyhole, ArrowRight } from 'lucide-react';
import { Header } from './components/Header.tsx';
import { PackagesGrid } from './components/PackagesGrid.tsx';
import { CheckoutPanel } from './components/CheckoutPanel.tsx';
import { CheckoutSummaryModal } from './components/CheckoutSummaryModal.tsx';
import { OrderSuccessModal } from './components/OrderSuccessModal.tsx';
import { Footer } from './components/Footer.tsx';
import { LiveFeed } from './components/LiveFeed.tsx';
import { TopBuyers } from './components/TopBuyers.tsx';
import { HallOfFame } from './components/HallOfFame.tsx';
import type { DiamondPackage, PaymentMethod, OrderRecord, GameId } from './types/store.ts';
import {
  DIAMOND_PACKAGES,
  ROBLOX_PACKAGES,
  GAME_INFO,
  PAYMENT_METHODS,
  validateAccount,
  generateOrderId,
  saveOrder,
  formatNumber,
  formatCOP,
} from './utils/rechargeLogic.ts';

const DEFAULT_FF = DIAMOND_PACKAGES[3];
const DEFAULT_ROBLOX = ROBLOX_PACKAGES[1];

export default function App() {
  const [game, setGame] = useState<GameId>('freefire');
  const [playerId, setPlayerId] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<DiamondPackage | null>(DEFAULT_FF);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(PAYMENT_METHODS[0]);
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<OrderRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const info = GAME_INFO[game];

  const handleSelectGame = (next: GameId) => {
    if (next === game) return;
    setGame(next);
    setPlayerId('');
    setError(null);
    setSelectedPackage(next === 'roblox' ? DEFAULT_ROBLOX : DEFAULT_FF);
    setIsCheckoutVisible(false);
  };

  const handleStartCheckout = () => {
    if (!selectedPackage) return;
    setIsCheckoutVisible(true);
    window.setTimeout(() => {
      document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.getElementById('player-id')?.focus({ preventScroll: true });
    }, 180);
  };

  const handleBackToPackages = () => {
    setIsCheckoutVisible(false);
    setError(null);
    window.setTimeout(() => document.getElementById('recargas')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  };

  const handleProceed = () => {
    const result = validateAccount(game, playerId);
    if (!result.isValid) {
      setError(result.error || 'Revisa los datos de tu cuenta');
      return;
    }
    if (!selectedPackage || !selectedPayment) return;
    setError(null);
    setIsSummaryOpen(true);
  };

  const handleConfirmOrder = () => {
    if (!selectedPackage || !selectedPayment) return;
    setIsSubmitting(true);
    window.setTimeout(() => {
      const order: OrderRecord = {
        orderId: generateOrderId(),
        playerId: playerId.trim(),
        packageId: selectedPackage.id,
        packageName: `${selectedPackage.diamonds} ${info.unit}`,
        game,
        diamonds: selectedPackage.diamonds,
        totalCOP: selectedPackage.priceCOP,
        totalUSD: selectedPackage.priceUSD,
        paymentMethodId: selectedPayment.id,
        paymentMethodName: selectedPayment.name,
        customerPhone: 'WhatsApp',
        status: 'PENDIENTE',
        createdAt: new Date().toISOString(),
      };
      saveOrder(order);
      setCurrentOrder(order);
      setIsSubmitting(false);
      setIsSummaryOpen(false);
      setIsSuccessOpen(true);
      try {
        confetti({
          particleCount: 90,
          spread: 72,
          origin: { y: 0.62 },
          colors: ['#ef3039', '#b90f20', '#f7c56b', '#ffffff'],
        });
      } catch {
        /* optional */
      }
    }, 350);
  };

  return (
    <div className="app-shell min-h-screen flex flex-col">
      <Header game={game} onSelectGame={handleSelectGame} />
      <LiveFeed />

      <main className="flex-1">
        {!isCheckoutVisible && (
          <section className="hero-section max-w-7xl mx-auto px-4 sm:px-6">
            <div className="hero-left">
              <h1 className="hero-title">
                {game === 'roblox' ? (
                  <>
                    ROBLOX
                    <br />
                    <em>RECHARGE</em>
                  </>
                ) : (
                  <>
                    FREE
                    <br />
                    FIRE
                    <br />
                    <em>RECHARGE</em>
                  </>
                )}
              </h1>

              <ol className="hero-steps">
                <li>
                  <span className="step-num">1</span>
                  Choose your package
                </li>
                <li>
                  <span className="step-num">2</span>
                  Pay with 3+ payment options
                </li>
                <li>
                  <span className="step-num">3</span>
                  Receive your {game === 'roblox' ? 'Robux' : 'diamonds'} in minutes
                </li>
              </ol>

              <div className="payment-badges">
                <span className="pay-label">PAYMENT METHODS</span>
                <div className="pay-chips">
                  <span>Nequi</span>
                  <span>Bancolombia</span>
                  <span>PayPal</span>
                </div>
              </div>
            </div>

            <div className="hero-center" id="recargas">
              <div className="choose-label">
                <span>CHOOSE YOUR RECHARGE</span>
                <small>PLAYER ID → PAYMENT → DELIVERY</small>
              </div>
              <PackagesGrid
                game={game}
                selectedPackage={selectedPackage}
                onSelectPackage={(pkg) => {
                  setSelectedPackage(pkg);
                  setError(null);
                }}
              />
              <div className="hero-cta-row">
                <div className="selected-summary">
                  {selectedPackage ? (
                    <>
                      <span className="sel-amount">
                        {formatNumber(selectedPackage.diamonds)} {info.unit}
                      </span>
                      <span className="sel-price">{formatCOP(selectedPackage.priceCOP)}</span>
                    </>
                  ) : (
                    <span className="sel-empty">Selecciona un paquete</span>
                  )}
                </div>
                <button type="button" className="btn-continue" onClick={handleStartCheckout} disabled={!selectedPackage}>
                  CONTINUAR
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            <div className="hero-right">
              <TopBuyers />
            </div>
          </section>
        )}

        {isCheckoutVisible && (
          <section className="checkout-section max-w-4xl mx-auto px-4 sm:px-6" id="checkout">
            <button type="button" className="checkout-back" onClick={handleBackToPackages}>
              ← VOLVER A PAQUETES
            </button>
            <div className="checkout-progress">
              <span className="done">
                <i>✓</i> Paquete
              </span>
              <b />
              <span className="current">
                <i>2</i> Datos y pago
              </span>
              <b />
              <span>
                <i>3</i> Confirmación
              </span>
            </div>
            <CheckoutPanel
              game={game}
              playerId={playerId}
              onPlayerIdChange={(id) => {
                setPlayerId(id);
                if (error) setError(null);
              }}
              selectedPackage={selectedPackage}
              selectedPayment={selectedPayment}
              onSelectPayment={setSelectedPayment}
              onProceed={handleProceed}
              error={error}
            />
            <div className="checkout-trust">
              <span>
                <ShieldCheck size={14} /> Compra protegida
              </span>
              <span>
                <LockKeyhole size={14} /> No pedimos contraseñas
              </span>
              <span>
                <Zap size={14} /> Atención por WhatsApp
              </span>
            </div>
          </section>
        )}

        {!isCheckoutVisible && <HallOfFame />}
      </main>

      <Footer />

      {isSummaryOpen && selectedPackage && selectedPayment && (
        <CheckoutSummaryModal
          isOpen={isSummaryOpen}
          onClose={() => setIsSummaryOpen(false)}
          onConfirmOrder={handleConfirmOrder}
          isSubmitting={isSubmitting}
          game={game}
          playerId={playerId}
          selectedPackage={selectedPackage}
          selectedPayment={selectedPayment}
          phone=""
        />
      )}
      {isSuccessOpen && currentOrder && (
        <OrderSuccessModal isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} order={currentOrder} />
      )}
    </div>
  );
}
