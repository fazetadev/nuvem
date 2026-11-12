/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
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

const DEFAULT_FF = DIAMOND_PACKAGES[3]; // 1.166 (Popular)
const DEFAULT_ROBLOX = ROBLOX_PACKAGES[1]; // 400 (Popular)

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
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#ef4444', '#dc2626', '#fbbf24', '#ffffff'],
        });
      } catch {
        /* sin confeti */
      }
    }, 450);
  };

  return (
    <div className="min-h-screen flex flex-col text-slate-100">
      <Header game={game} onSelectGame={handleSelectGame} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="font-display text-4xl sm:text-5xl font-black uppercase leading-none text-white">
          Recarga <span className="text-red-500">{info.name}</span>
        </h1>
        <p className="mt-2 mb-7 text-sm text-slate-400">
          Elige tu paquete, paga y recibe tus {info.unitLower} en minutos.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            <PackagesGrid
              game={game}
              selectedPackage={selectedPackage}
              onSelectPackage={(pkg) => {
                setSelectedPackage(pkg);
                setError(null);
              }}
            />
          </div>

          <div className="lg:col-span-5">
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
          </div>
        </div>
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

      {currentOrder && (
        <OrderSuccessModal isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} order={currentOrder} />
      )}
    </div>
  );
}
