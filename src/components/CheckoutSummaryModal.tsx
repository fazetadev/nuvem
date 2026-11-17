import { useI18n } from '../i18n.tsx';
import React from 'react';
import { X, ShieldCheck, CheckCircle2, ArrowRight, Gem } from 'lucide-react';
import { DiamondPackage, PaymentMethod } from '../types/store.ts';
import { formatNumber, GAME_INFO } from '../utils/rechargeLogic.ts';
import type { GameId } from '../types/store.ts';

interface CheckoutSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerId: string;
  selectedPackage: DiamondPackage;
  selectedPayment: PaymentMethod;
  phone: string;
  email?: string;
  onConfirmOrder: () => void;
  isSubmitting: boolean;
  game: GameId;
}

export const CheckoutSummaryModal: React.FC<CheckoutSummaryModalProps> = ({
  isOpen,
  onClose,
  playerId,
  selectedPackage,
  selectedPayment,
  phone,
  email,
  onConfirmOrder,
  isSubmitting,
  game,
}) => {
  const { t, formatPrice, rate, lang } = useI18n();
  const info = GAME_INFO[game];
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#071525] border border-blue-800/60 shadow-2xl shadow-blue-950/90 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 pb-4 border-b border-blue-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white tracking-tight">
                {t("Resumen de tu Recarga")}
              </h3>
              <p className="text-xs text-blue-300/80">
                {t("Verifica los datos antes de proceder al pago")}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-blue-950/50 transition-colors cursor-pointer"
            aria-label={t("Cerrar resumen")}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 text-sm">
          
          {/* Game Account Summary Box */}
          <div className="p-4 rounded-2xl bg-[#050d18] border border-blue-950/70 space-y-2.5">
            <div className="flex items-center justify-between text-xs text-blue-300/80 font-semibold uppercase tracking-wider">
              <span>{t('Cuenta {game}', { game: info.name })}</span>
              <span className="text-emerald-400 font-bold normal-case flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {game === 'roblox' ? t("Usuario Verificado") : t("ID Verificado")}
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-xs text-slate-400 block">{t(info.accountLabel)}</span>
                <span className="font-mono text-lg font-black text-white tracking-wider">
                  {playerId}
                </span>
              </div>
              <span className="text-xs text-blue-300 font-medium bg-blue-950/80 px-2.5 py-1 rounded-lg border border-blue-800/40">
                {t("Recarga Directa")}
              </span>
            </div>
          </div>

          {/* Package and Amount Details */}
          <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-800/40 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gem className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-white">
                  {formatNumber(selectedPackage.diamonds)} {t(info.unit)} {info.name}
                </span>
              </div>
              <span className="font-mono font-bold text-white">
                {formatPrice(selectedPackage.priceCOP, selectedPackage.priceUSD)}
              </span>
            </div>
            {lang === 'en' && (
              <p className="text-[11px] text-slate-500 text-right">
                {t('Precio base: {cop} COP · tasa referencial 1 USD ≈ {rate} COP', {
                  cop: new Intl.NumberFormat('es-CO').format(selectedPackage.priceCOP),
                  rate: new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 }).format(rate),
                })}
              </p>
            )}

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-blue-950/60">
              <span>{t("Método de Pago:")}</span>
              <span className="font-semibold text-blue-200">{selectedPayment.name}</span>
            </div>

            {phone && (
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{t("Tu WhatsApp:")}</span>
                <span className="font-mono text-slate-200">{phone}</span>
              </div>
            )}

            {email && (
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{t("Correo de Respaldo:")}</span>
                <span className="text-slate-200">{email}</span>
              </div>
            )}

            <div className="pt-3 border-t border-blue-950/70 flex items-baseline justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                {lang === 'en' ? t('Total a Pagar (USD)') : t('Total a Pagar (COP)')}
              </span>
              <span className="font-mono text-2xl font-black text-blue-400 tabular-nums">
                {formatPrice(selectedPackage.priceCOP, selectedPackage.priceUSD)}
              </span>
            </div>
          </div>

          {/* Guarantee notice */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-950/20 border border-blue-900/30 text-xs text-blue-300/90">
            <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <p>
              {t(info.deliveredIn)}
            </p>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 pt-2 border-t border-blue-950/60 flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 text-xs font-bold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          >
            {t("Modificar Datos")}
          </button>

          <button
            type="button"
            onClick={onConfirmOrder}
            disabled={isSubmitting}
            className="flex-1 py-3 text-xs sm:text-sm font-bold text-white btn-blood rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isSubmitting ? t('Procesando...') : t('Generar Pedido')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
