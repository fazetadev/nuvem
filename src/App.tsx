import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ShieldCheck, Zap, Sparkles, ChevronRight, Gem, Gift, ArrowRight, LockKeyhole } from 'lucide-react';
import { Header } from './components/Header.tsx';
import { PackagesGrid } from './components/PackagesGrid.tsx';
import { CheckoutPanel } from './components/CheckoutPanel.tsx';
import { CheckoutSummaryModal } from './components/CheckoutSummaryModal.tsx';
import { OrderSuccessModal } from './components/OrderSuccessModal.tsx';
import { Footer } from './components/Footer.tsx';
import type { DiamondPackage, PaymentMethod, OrderRecord, GameId } from './types/store.ts';
import { DIAMOND_PACKAGES, ROBLOX_PACKAGES, GAME_INFO, PAYMENT_METHODS, validateAccount, generateOrderId, saveOrder, formatNumber, formatCOP } from './utils/rechargeLogic.ts';
import { IMAGES } from './config/images.ts';

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
  const packages = game === 'roblox' ? ROBLOX_PACKAGES : DIAMOND_PACKAGES;

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
    }, 90);
  };

  const handleProceed = () => {
    const result = validateAccount(game, playerId);
    if (!result.isValid) { setError(result.error || 'Revisa los datos de tu cuenta'); return; }
    if (!selectedPackage || !selectedPayment) return;
    setError(null);
    setIsSummaryOpen(true);
  };

  const handleConfirmOrder = () => {
    if (!selectedPackage || !selectedPayment) return;
    setIsSubmitting(true);
    window.setTimeout(() => {
      const order: OrderRecord = {
        orderId: generateOrderId(), playerId: playerId.trim(), packageId: selectedPackage.id,
        packageName: `${selectedPackage.diamonds} ${info.unit}`, game, diamonds: selectedPackage.diamonds,
        totalCOP: selectedPackage.priceCOP, totalUSD: selectedPackage.priceUSD,
        paymentMethodId: selectedPayment.id, paymentMethodName: selectedPayment.name,
        customerPhone: 'WhatsApp', status: 'PENDIENTE', createdAt: new Date().toISOString(),
      };
      saveOrder(order);
      setCurrentOrder(order);
      setIsSubmitting(false);
      setIsSummaryOpen(false);
      setIsSuccessOpen(true);
      try { confetti({ particleCount: 75, spread: 68, origin: { y: 0.65 }, colors: ['#ef3039', '#b90f20', '#f7c56b', '#ffffff'] }); } catch { /* opcional */ }
    }, 350);
  };

  return (
    <div className="app-shell min-h-screen flex flex-col">
      <Header game={game} onSelectGame={handleSelectGame} />
      <main className="flex-1">
        <div className="activity-ribbon" aria-label="Beneficios de Nuvem">
          <div className="activity-track">
            {Array.from({ length: 2 }).map((_, i) => <div className="activity-set" key={i}>
              <span><i /> RECARGAS DIGITALES</span><b>✦</b><span><ShieldCheck /> COMPRA ACOMPAÑADA</span><b>✦</b><span><Zap /> PROCESO SENCILLO</span><b>✦</b><span><LockKeyhole /> NUNCA PEDIMOS TU CONTRASEÑA</span><b>✦</b><span>NUVEMGG STORE</span><b>✦</b>
            </div>)}
          </div>
        </div>

        <section className="shop-hero max-w-6xl mx-auto px-4 sm:px-6">
          <div className="hero-copy-block">
            <div className="eyebrow"><span className="live-dot" /> TU RECARGA, A TU MANERA</div>
            <h1>RECARGA Y<br /><em>VUELVE AL JUEGO.</em></h1>
            <p>Diamantes y Robux sin vueltas. Escoge tu paquete, ingresa tus datos y solicita tu recarga en unos pocos pasos.</p>
            <div className="hero-mini-benefits"><span><ShieldCheck /> Compra segura</span><span><Zap /> Atención rápida</span></div>
            <a href="#recargas" className="hero-jump">VER PAQUETES <ChevronRight size={16} /></a>
          </div>
          <div className="hero-art-panel">
            <div className="hero-art-glow" />
            <div className="hero-art-label"><span>{game === 'roblox' ? 'ROBLOX' : 'FREE FIRE'}</span><b>NUVEM SELECT</b></div>
            <img key={game} src={game === 'roblox' ? IMAGES.robux : IMAGES.diamond} alt={game === 'roblox' ? 'Robux' : 'Diamantes Free Fire'} />
            <div className="hero-art-bottom"><strong>{game === 'roblox' ? 'ROBux' : 'DIAMANTES'}</strong><span>ELIGE · RECARGA · DISFRUTA</span></div>
          </div>
        </section>

        <section id="recargas" className="catalog-section max-w-6xl mx-auto px-4 sm:px-6">
          <div className="catalog-heading">
            <div><div className="eyebrow"><span className="eyebrow-line" /> CATÁLOGO NUVEM</div><h2>ELIGE TU <em>PAQUETE</em></h2><p>Precios claros. Selecciona una opción para ver el resumen de tu pedido.</p></div>
            <div className="catalog-count"><Gem size={16} /><span>{packages.length} PAQUETES DISPONIBLES</span></div>
          </div>

          <div className="catalog-layout">
            <div className="catalog-main">
              <PackagesGrid game={game} selectedPackage={selectedPackage} onSelectPackage={(pkg) => { setSelectedPackage(pkg); setError(null); }} />
              <div className="catalog-footnote"><Sparkles size={14} /><span>Elige un paquete para ver aquí el total de tu recarga.</span></div>
            </div>

            <aside className="order-rail">
              <div className="order-rail-top"><span className="order-rail-icon"><Gem /></span><div><b>TU PEDIDO</b><small>Resumen en tiempo real</small></div><span className="order-rail-live"><i /> LISTO</span></div>
              <div className="order-rail-game">{game === 'roblox' ? 'ROBLOX' : 'FREE FIRE'}</div>
              <div className="order-rail-product">
                <img src={game === 'roblox' ? IMAGES.robux : IMAGES.diamond} alt="" />
                <div><b>{selectedPackage ? formatNumber(selectedPackage.diamonds) : '—'} {info.unit}</b><small>{selectedPackage ? 'Paquete seleccionado' : 'Selecciona un paquete'}</small></div>
              </div>
              {selectedPackage?.bonusDiamonds ? <div className="order-rail-bonus"><Gift size={13} /> Incluye {formatNumber(selectedPackage.bonusDiamonds)} de bono</div> : <div className="order-rail-bonus muted"><ShieldCheck size={13} /> Recarga digital</div>}
              <div className="order-rail-total"><span>Total</span><strong>{selectedPackage ? formatCOP(selectedPackage.priceCOP) : '—'}</strong></div>
              <button type="button" onClick={handleStartCheckout} className="order-rail-cta">CONTINUAR <ArrowRight size={15} /></button>
              <p className="order-rail-note"><ShieldCheck size={12} /> Sin contraseña · Confirmas antes de pagar</p>
            </aside>
          </div>
        </section>

        {isCheckoutVisible && (
          <section id="checkout" className="checkout-section checkout-enter max-w-6xl mx-auto px-4 sm:px-6">
            <div className="checkout-section-heading"><div className="step-bubble">02</div><div><div className="eyebrow"><span className="eyebrow-line" /> SIGUIENTE PASO</div><h2>COMPLETA TU <em>RECARGA</em></h2><p>Ingresa tu ID, elige el medio de pago y revisa el resumen antes de generar el pedido.</p></div></div>
            <div className="checkout-progress"><span className="checkout-progress-done"><i>✓</i> Paquete elegido</span><b></b><span className="checkout-progress-current"><i>2</i> Datos y pago</span><b></b><span><i>3</i> Confirmación</span></div>
            <div className="checkout-layout checkout-layout-clean">
              <div className="checkout-form-wrap"><CheckoutPanel game={game} playerId={playerId} onPlayerIdChange={(id) => { setPlayerId(id); if (error) setError(null); }} selectedPackage={selectedPackage} selectedPayment={selectedPayment} onSelectPayment={setSelectedPayment} onProceed={handleProceed} error={error} /></div>
            </div>
          </section>
        )}

      </main>
      <Footer />
      {selectedPackage && selectedPayment && <CheckoutSummaryModal isOpen={isSummaryOpen} onClose={() => setIsSummaryOpen(false)} playerId={playerId} selectedPackage={selectedPackage} selectedPayment={selectedPayment} phone="" email="" onConfirmOrder={handleConfirmOrder} isSubmitting={isSubmitting} game={game} />}
      {currentOrder && <OrderSuccessModal isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} order={currentOrder} />}
    </div>
  );
}
