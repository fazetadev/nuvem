/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from './i18n.tsx';
import confetti from 'canvas-confetti';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { GameSelector } from './components/GameSelector.tsx';
import { PlayerIdStep } from './components/PlayerIdStep.tsx';
import { PackagesGrid } from './components/PackagesGrid.tsx';
import { PaymentStep } from './components/PaymentStep.tsx';
import { PurchaseSummarySidebar } from './components/PurchaseSummarySidebar.tsx';
import { CheckoutSummaryModal } from './components/CheckoutSummaryModal.tsx';
import { OrderSuccessModal } from './components/OrderSuccessModal.tsx';
import { TrustAndFaqSection } from './components/TrustAndFaqSection.tsx';
import { StarParticles } from './components/StarParticles.tsx';
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
import { AlertCircle } from 'lucide-react';

export default function App() {
  const { t } = useI18n();

  // Selected game: default to Free Fire
  const [game, setGame] = useState<GameId>('freefire');
  const [playerId, setPlayerId] = useState('');
  
  // Default selected package: 520 diamonds ($16.000 COP)
  const [selectedPackage, setSelectedPackage] = useState<DiamondPackage | null>(DIAMOND_PACKAGES[2]);
  
  // Default payment: Bancolombia
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(
    PAYMENT_METHODS.find((p) => p.name === 'Bancolombia') || PAYMENT_METHODS[0]
  );
  
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Modals
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<OrderRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationAlert, setValidationAlert] = useState<string | null>(null);

  const rechargeSectionRef = useRef<HTMLDivElement>(null);

  const handleSelectGame = (g: GameId) => {
    if (g === game) return;
    setGame(g);
    setPlayerId('');
    setValidationAlert(null);
    setSelectedPackage(g === 'roblox' ? ROBLOX_PACKAGES[1] : DIAMOND_PACKAGES[2]);
  };

  const scrollToRecharge = () => {
    rechargeSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenProceed = () => {
    setValidationAlert(null);
    const idValidation = validateAccount(game, playerId);
    if (!idValidation.isValid) {
      setValidationAlert(t(idValidation.error || 'Por favor ingresa tu ID de jugador antes de continuar.'));
      scrollToRecharge();
      return;
    }
    if (!selectedPackage) {
      setValidationAlert(t('Por favor selecciona un paquete de {item}', { item: t(GAME_INFO[game].unitLower) }));
      scrollToRecharge();
      return;
    }
    if (!selectedPayment) {
      setValidationAlert(t('Por favor selecciona un método de pago'));
      return;
    }

    setIsSummaryOpen(true);
  };

  const handleConfirmOrder = () => {
    if (!selectedPackage || !selectedPayment) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const newOrderId = generateOrderId();
      const orderData: OrderRecord = {
        orderId: newOrderId,
        playerId: playerId.trim(),
        packageId: selectedPackage.id,
        packageName: `${selectedPackage.diamonds} ${GAME_INFO[game].unit}`,
        game,
        diamonds: selectedPackage.diamonds,
        totalCOP: selectedPackage.priceCOP,
        totalUSD: selectedPackage.priceUSD,
        paymentMethodId: selectedPayment.id,
        paymentMethodName: selectedPayment.name,
        customerPhone: phone.trim() || 'WhatsApp',
        customerEmail: email.trim(),
        status: 'PENDIENTE',
        createdAt: new Date().toISOString(),
      };

      saveOrder(orderData);
      setCurrentOrder(orderData);
      setIsSubmitting(false);
      setIsSummaryOpen(false);
      setIsSuccessOpen(true);

      // Trigger celebratory Halloween confetti in ruby red, pumpkin orange, and gold
      try {
        confetti({
          particleCount: 100,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#ef4444', '#dc2626', '#f97316', '#fbbf24', '#ffffff', '#991b1b'],
        });
      } catch (err) {
        console.log('Confetti effect triggered', err);
      }
    }, 450);
  };

  const canProceed = Boolean(
    validateAccount(game, playerId).isValid && selectedPackage && selectedPayment
  );

  return (
    <>
      <StarParticles game={game} />

      <div className="relative z-10 min-h-screen text-slate-100 flex flex-col selection:bg-red-600 selection:text-white">
        {/* Top Navigation: logo, enlaces y selector de moneda */}
        <Header onScrollToRecharge={scrollToRecharge} />

        {/* Main Content */}
        <main className="flex-1">
          {/* Hero Banner with Carousel & Title */}
          <Hero
            onScrollToRecharge={scrollToRecharge}
            game={game}
            onSelectGame={handleSelectGame}
          />

          {/* Recharge Workflow Container (Matching Screenshot 1 & 2 Layout) */}
          <section
            ref={rechargeSectionRef}
            id="recargar"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8"
          >
            {/* Game Selector matching Screenshot 1 */}
            <GameSelector selected={game} onSelect={handleSelectGame} />

            {/* Validation Alert Message if present */}
            {validationAlert && (
              <div className="max-w-3xl mx-auto p-4 rounded-2xl bg-red-950/80 border border-red-500/70 flex items-center justify-between text-sm text-red-200 shadow-xl shadow-red-950">
                <div className="flex items-center gap-2.5">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <span className="font-semibold">{validationAlert}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setValidationAlert(null)}
                  className="text-xs font-bold text-red-300 hover:text-white px-2 py-1 rounded bg-black/40 hover:bg-black/60 cursor-pointer transition-colors"
                >
                  {t("Entendido")}
                </button>
              </div>
            )}

            {/* 2-Column Split: Left = Steps 1, 2, 3 | Right = Resumen de Compra Sidebar (Matching Screenshot 2) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Recharge Steps (8 columns) */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Step 1: Player ID / User Account */}
                <PlayerIdStep
                  playerId={playerId}
                  game={game}
                  onPlayerIdChange={(id) => {
                    setPlayerId(id);
                    if (validationAlert) setValidationAlert(null);
                  }}
                />

                {/* Step 2: Package Grid (100, 310, 520, 1.060, 2.180, 5.600) */}
                <PackagesGrid
                  game={game}
                  selectedPackage={selectedPackage}
                  onSelectPackage={(pkg) => {
                    setSelectedPackage(pkg);
                    if (validationAlert) setValidationAlert(null);
                  }}
                  stepNumber={2}
                />

                {/* Step 3: Payment Method (Bancolombia, Nequi, PayPal) & Contact */}
                <PaymentStep
                  selectedPayment={selectedPayment}
                  onSelectPayment={(pm) => {
                    setSelectedPayment(pm);
                    if (validationAlert) setValidationAlert(null);
                  }}
                  phone={phone}
                  onPhoneChange={(val) => {
                    setPhone(val);
                    if (validationAlert) setValidationAlert(null);
                  }}
                  email={email}
                  onEmailChange={setEmail}
                  stepNumber={3}
                  canProceed={canProceed}
                  onProceed={handleOpenProceed}
                />

              </div>

              {/* Right Column: Sticky Resumen de Compra Sidebar (4 columns, Matching Screenshot 2) */}
              <div className="lg:col-span-4">
                <PurchaseSummarySidebar
                  game={game}
                  selectedPackage={selectedPackage}
                  selectedPayment={selectedPayment}
                  playerId={playerId}
                  onProceed={handleOpenProceed}
                  canProceed={canProceed}
                  isSubmitting={isSubmitting}
                />
              </div>

            </div>

          </section>

          {/* Sección de preguntas frecuentes: Preguntas Frecuentes */}
          <TrustAndFaqSection />
        </main>

        {/* Footer */}
        <Footer
          onOpenTracker={() => {}}
          onScrollToRecharge={scrollToRecharge}
        />

        {/* Checkout Summary Confirmation Modal */}
        {selectedPackage && selectedPayment && (
          <CheckoutSummaryModal
            isOpen={isSummaryOpen}
            onClose={() => setIsSummaryOpen(false)}
            playerId={playerId}
            selectedPackage={selectedPackage}
            selectedPayment={selectedPayment}
            phone={phone}
            email={email}
            onConfirmOrder={handleConfirmOrder}
            isSubmitting={isSubmitting}
            game={game}
          />
        )}

        {/* Order Success Voucher Modal */}
        {currentOrder && (
          <OrderSuccessModal
            isOpen={isSuccessOpen}
            onClose={() => setIsSuccessOpen(false)}
            order={currentOrder}
          />
        )}
      </div>
    </>
  );
}
