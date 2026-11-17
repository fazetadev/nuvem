import React, { useState } from 'react';
import {
  ShieldCheck,
  Zap,
  LockKeyhole,
  ArrowRight,
  ArrowLeft,
  Clock,
  MessageCircle,
  Star,
  BadgeCheck,
} from 'lucide-react';
import { Header } from './components/Header.tsx';
import { PackagesGrid } from './components/PackagesGrid.tsx';
import { CheckoutPanel } from './components/CheckoutPanel.tsx';
import { CheckoutSummaryModal } from './components/CheckoutSummaryModal.tsx';
import { OrderSuccessModal } from './components/OrderSuccessModal.tsx';
import { Footer } from './components/Footer.tsx';
import { LiveFeed } from './components/LiveFeed.tsx';
import type { DiamondPackage, PaymentMethod, OrderRecord, GameId } from './types/store.ts';
import {
  GAME_INFO,
  PAYMENT_METHODS,
  validateAccount,
  generateOrderId,
  saveOrder,
  formatNumber,
  formatCOP,
  getGeneralWhatsAppLink,
} from './utils/rechargeLogic.ts';

export default function App() {
  const [game, setGame] = useState<GameId>('freefire');
  const [playerId, setPlayerId] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<DiamondPackage | null>(null);
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
    setSelectedPackage(null);
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
    window.setTimeout(
      () => document.getElementById('recargas')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      80
    );
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
    }, 350);
  };

  return (
    <div className="app-shell min-h-screen flex flex-col">
      <Header game={game} onSelectGame={handleSelectGame} />
      <LiveFeed />

      <main className="flex-1">
        {!isCheckoutVisible && (
          <>
            <section className="hero-section max-w-6xl mx-auto px-4 sm:px-6">
              <div className="hero-intro">
                <div className="hero-badge">
                  <span className="live-dot" />
                  Entrega en minutos · Soporte real
                </div>
                <h1 className="hero-title">
                  {game === 'roblox' ? (
                    <>
                      ROBLOX
                      <br />
                      <em>RECHARGE</em>
                    </>
                  ) : (
                    <>
                      FREE FIRE
                      <br />
                      <em>RECHARGE</em>
                    </>
                  )}
                </h1>
                <p className="hero-sub">
                  Elige tu paquete, paga como quieras y recibe tus {game === 'roblox' ? 'Robux' : 'diamantes'} sin
                  complicaciones. Sin contraseñas. Sin vueltas.
                </p>

                <ol className="hero-steps">
                  <li>
                    <span className="step-num">1</span>
                    <div>
                      <strong>Elige tu paquete</strong>
                      <small>Precios claros, bonos incluidos</small>
                    </div>
                  </li>
                  <li>
                    <span className="step-num">2</span>
                    <div>
                      <strong>Paga fácil</strong>
                      <small>Nequi · Bancolombia · PayPal</small>
                    </div>
                  </li>
                  <li>
                    <span className="step-num">3</span>
                    <div>
                      <strong>Recibe al instante</strong>
                      <small>Entrega por WhatsApp en minutos</small>
                    </div>
                  </li>
                </ol>

                <div className="hero-trust-row">
                  <span>
                    <LockKeyhole size={14} /> Sin contraseña
                  </span>
                  <span>
                    <Clock size={14} /> Rápido
                  </span>
                  <span>
                    <BadgeCheck size={14} /> Seguro
                  </span>
                </div>
              </div>

              <div className="hero-catalog" id="recargas">
                <div className="choose-label">
                  <div>
                    <span>ELIGE TU RECARGA</span>
                    <small>Selecciona un paquete para continuar</small>
                  </div>
                  <div className="choose-meta">
                    <Star size={12} />
                    Más vendido marcado
                  </div>
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
                  <button
                    type="button"
                    className="btn-continue"
                    onClick={handleStartCheckout}
                    disabled={!selectedPackage}
                  >
                    CONTINUAR
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </section>

            <section className="benefits-strip">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 benefits-grid">
                <div className="benefit-card">
                  <div className="benefit-icon">
                    <Zap size={20} />
                  </div>
                  <div>
                    <strong>Entrega rápida</strong>
                    <p>Tus {game === 'roblox' ? 'Robux' : 'diamantes'} en minutos tras confirmar el pago.</p>
                  </div>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">
                    <LockKeyhole size={20} />
                  </div>
                  <div>
                    <strong>100% seguro</strong>
                    <p>Nunca pedimos tu contraseña. Solo tu ID o usuario.</p>
                  </div>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <strong>Soporte humano</strong>
                    <p>Te acompañamos por WhatsApp en todo el proceso.</p>
                  </div>
                </div>
                <div className="benefit-card">
                  <div className="benefit-icon">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <strong>Pago flexible</strong>
                    <p>Nequi, Bancolombia o PayPal. Tú eliges.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="cta-banner max-w-6xl mx-auto px-4 sm:px-6">
              <div className="cta-banner-inner">
                <div>
                  <h2>¿Listo para recargar?</h2>
                  <p>Elige tu paquete arriba o escríbenos si tienes dudas.</p>
                </div>
                <div className="cta-banner-actions">
                  <a href="#recargas" className="btn-continue">
                    Ver paquetes
                    <ArrowRight size={16} />
                  </a>
                  <a href={getGeneralWhatsAppLink()} target="_blank" rel="noreferrer" className="btn-ghost-wa">
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>
                </div>
              </div>
            </section>
          </>
        )}

        {isCheckoutVisible && (
          <section className="checkout-section max-w-4xl mx-auto px-4 sm:px-6" id="checkout">
            <button type="button" className="checkout-back" onClick={handleBackToPackages}>
              <ArrowLeft size={16} />
              <span>Volver a paquetes</span>
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
