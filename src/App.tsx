/**
 * Nuvem Store — storefront refresh
 * Keeps the existing ordering, validation, payment and tracking flows.
 */
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ShieldCheck, Zap, Headphones, Clock3, ArrowDown, Sparkles, BadgeCheck, Gamepad2 } from 'lucide-react';
import { Header } from './components/Header.tsx';
import { PackagesGrid } from './components/PackagesGrid.tsx';
import { CheckoutPanel } from './components/CheckoutPanel.tsx';
import { CheckoutSummaryModal } from './components/CheckoutSummaryModal.tsx';
import { OrderSuccessModal } from './components/OrderSuccessModal.tsx';
import { Footer } from './components/Footer.tsx';
import { DiamondPackage, PaymentMethod, OrderRecord, GameId } from './types/store.ts';
import {
  DIAMOND_PACKAGES,
  ROBLOX_PACKAGES,
  GAME_INFO,
  PAYMENT_METHODS,
  validateAccount,
  generateOrderId,
  saveOrder,
} from './utils/rechargeLogic.ts';
import freeFireBanner from './assets/images/freefire_halloween_banner_1792710416162.jpg';
import robloxBanner from './assets/images/arcade_store_banner_1792703005959.jpg';

const DEFAULT_FF = DIAMOND_PACKAGES[3];
const DEFAULT_ROBLOX = ROBLOX_PACKAGES[1];

export default function App() {
  const [game, setGame] = useState<GameId>('freefire');
  const [playerId, setPlayerId] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<DiamondPackage | null>(DEFAULT_FF);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(PAYMENT_METHODS[0]);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<OrderRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const info = GAME_INFO[game];
  const banner = game === 'roblox' ? robloxBanner : freeFireBanner;

  const handleSelectGame = (g: GameId) => {
    if (g === game) return;
    setGame(g);
    setPlayerId('');
    setError(null);
    setSelectedPackage(g === 'roblox' ? DEFAULT_ROBLOX : DEFAULT_FF);
  };

  const handleProceed = () => {
    const v = validateAccount(game, playerId);
    if (!v.isValid) {
      setError(v.error || 'Ingresa tu ID');
      return;
    }
    if (!selectedPackage || !selectedPayment) return;
    setError(null);
    setIsSummaryOpen(true);
  };

  const handleConfirmOrder = () => {
    if (!selectedPackage || !selectedPayment) return;
    setIsSubmitting(true);
    setTimeout(() => {
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
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 }, colors: ['#ef4444', '#dc2626', '#fbbf24', '#ffffff'] });
      } catch { /* sin confeti */ }
    }, 450);
  };

  return (
    <div className="min-h-screen flex flex-col text-slate-100">
      <Header game={game} onSelectGame={handleSelectGame} />

      <main className="flex-1">
        <section className="hero-wrap">
          <div className="hero-backdrop" style={{ backgroundImage: `url(${banner})` }} />
          <div className="hero-vignette" />
          <div className="hero-inner max-w-6xl mx-auto px-4 sm:px-6">
            <div className="hero-copy">
              <div className="hero-kicker"><span className="pulse-dot" /> TU TIENDA GAMER EN COLOMBIA</div>
              <h1 className="font-display hero-title">
                SUBE DE NIVEL.<br />
                <span>RECARGA</span> SIN LÍMITES.
              </h1>
              <p className="hero-description">
                {game === 'freefire'
                  ? 'Tus diamantes de Free Fire, al mejor precio y sin complicaciones.'
                  : 'Consigue tus Robux de forma fácil, rápida y segura.'}
                <strong> Tú eliges el paquete, nosotros hacemos el resto.</strong>
              </p>
              <div className="hero-actions">
                <a href="#recargas" className="btn-blood hero-cta">ELEGIR RECARGA <ArrowDown size={17} /></a>
                <div className="hero-safe"><ShieldCheck size={17} /> Sin contraseñas · Compra protegida</div>
              </div>
              <div className="hero-proof">
                <div><strong>1–3 min</strong><span>Entrega promedio*</span></div>
                <i />
                <div><strong>24/7</strong><span>Pedidos online</span></div>
                <i />
                <div><strong>CO</strong><span>Atención Colombia</span></div>
              </div>
              <p className="hero-footnote">*Después de confirmar el pago.</p>
            </div>
            <div className="hero-side-card">
              <div className="hero-side-top"><Sparkles size={15} /> RECARGA DESTACADA</div>
              <div className="hero-side-art">
                <img src={game === 'roblox' ? '/images/robux.png' : '/images/diamantes.png'} alt="" />
              </div>
              <div className="hero-side-label">{game === 'roblox' ? 'ROBLOX' : 'FREE FIRE'}</div>
              <div className="hero-side-title">Tu próxima partida<br />empieza aquí.</div>
              <a href="#recargas">Ver paquetes <span>↗</span></a>
            </div>
          </div>
          <div className="hero-bottom-line" />
        </section>

        <section className="trust-strip max-w-6xl mx-auto px-4 sm:px-6" aria-label="Beneficios">
          <div className="trust-item"><span className="trust-icon"><Zap /></span><div><b>Entrega rápida</b><small>Tras confirmar tu pago</small></div></div>
          <div className="trust-item"><span className="trust-icon"><ShieldCheck /></span><div><b>Compra segura</b><small>Nunca pedimos contraseñas</small></div></div>
          <div className="trust-item"><span className="trust-icon"><Headphones /></span><div><b>Soporte humano</b><small>Te ayudamos por WhatsApp</small></div></div>
          <div className="trust-item"><span className="trust-icon"><BadgeCheck /></span><div><b>Precios claros</b><small>Sin costos sorpresa</small></div></div>
        </section>

        <section id="recargas" className="store-section max-w-6xl mx-auto px-4 sm:px-6">
          <div className="section-heading">
            <div>
              <div className="section-eyebrow"><span /> TIENDA NU VEM</div>
              <h2>ELIGE TU <span>RECARGA</span></h2>
              <p>Selecciona tu paquete favorito y completa tu pedido en pocos pasos.</p>
            </div>
            <div className="secure-note"><ShieldCheck size={16} /> Pago acompañado por nuestro equipo</div>
          </div>

          <div className="store-layout grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-7">
              <div className="panel-heading">
                <div className="step-number">01</div>
                <div><h3>Selecciona tu paquete</h3><p>Elige la cantidad que quieres recibir</p></div>
                <span className="step-status">PAQUETES</span>
              </div>
              <PackagesGrid
                game={game}
                selectedPackage={selectedPackage}
                onSelectPackage={(pkg) => { setSelectedPackage(pkg); setError(null); }}
              />
              <div className="package-hint"><Sparkles size={14} /> Tip: los paquetes con bono te dan más por tu compra.</div>
            </div>

            <div className="lg:col-span-5">
              <div className="panel-heading checkout-heading">
                <div className="step-number">02</div>
                <div><h3>Completa tu pedido</h3><p>Solo necesitamos los datos de entrega</p></div>
              </div>
              <CheckoutPanel
                game={game}
                playerId={playerId}
                onPlayerIdChange={(id) => { setPlayerId(id); if (error) setError(null); }}
                selectedPackage={selectedPackage}
                selectedPayment={selectedPayment}
                onSelectPayment={setSelectedPayment}
                onProceed={handleProceed}
                error={error}
              />
            </div>
          </div>
        </section>

        <section className="how-section">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="how-title">
              <div className="section-eyebrow"><span /> ASÍ DE FÁCIL</div>
              <h2>¿CÓMO FUNCIONA <span>NUVEM?</span></h2>
              <p>En tres pasos estás listo para volver al juego.</p>
            </div>
            <div className="how-grid">
              <article className="how-card"><span className="how-index">01</span><div className="how-icon"><Gamepad2 /></div><h3>Elige tu recarga</h3><p>Selecciona Free Fire o Roblox y el paquete que más te convenga.</p></article>
              <article className="how-card"><span className="how-index">02</span><div className="how-icon"><ShieldCheck /></div><h3>Confirma tus datos</h3><p>Escribe tu UID o usuario y selecciona tu método de pago favorito.</p></article>
              <article className="how-card"><span className="how-index">03</span><div className="how-icon"><Zap /></div><h3>Recibe y disfruta</h3><p>Te acompañamos por WhatsApp para validar el pago y gestionar tu recarga.</p></article>
            </div>
          </div>
        </section>

        <section className="bottom-promo max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bottom-promo-inner">
            <div><span className="promo-kicker">¿NECESITAS UNA MANO?</span><h2>Estamos aquí para <span>ayudarte.</span></h2><p>Resuelve tus dudas antes, durante o después de tu compra.</p></div>
            <a href="#recargas" className="promo-link">VOLVER A RECARGAR <span>↗</span></a>
          </div>
        </section>
      </main>

      <Footer />

      {selectedPackage && selectedPayment && (
        <CheckoutSummaryModal
          isOpen={isSummaryOpen}
          onClose={() => setIsSummaryOpen(false)}
          playerId={playerId}
          selectedPackage={selectedPackage}
          selectedPayment={selectedPayment}
          phone=""
          email=""
          onConfirmOrder={handleConfirmOrder}
          isSubmitting={isSubmitting}
          game={game}
        />
      )}
      {currentOrder && <OrderSuccessModal isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} order={currentOrder} />}
    </div>
  );
}
