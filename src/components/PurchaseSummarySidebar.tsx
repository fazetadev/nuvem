import React from 'react';
import { useI18n } from '../i18n.tsx';
import type { GameId, DiamondPackage, PaymentMethod } from '../types/store.ts';
import { GAME_INFO, formatNumber } from '../utils/rechargeLogic.ts';
import { Send, ShieldCheck, Zap, AlertCircle } from 'lucide-react';

interface PurchaseSummarySidebarProps {
  game: GameId;
  selectedPackage: DiamondPackage | null;
  selectedPayment: PaymentMethod | null;
  playerId: string;
  onProceed: () => void;
  canProceed: boolean;
  isSubmitting?: boolean;
}

export const PurchaseSummarySidebar: React.FC<PurchaseSummarySidebarProps> = ({
  game,
  selectedPackage,
  selectedPayment,
  playerId,
  onProceed,
  canProceed,
  isSubmitting = false,
}) => {
  const { t, formatPrice } = useI18n();
  const info = GAME_INFO[game] || GAME_INFO.freefire;

  const gameBadgeName = game === 'roblox' ? 'ROBLOX' : 'FREE FIRE';
  const playerDisplay = playerId.trim()
    ? playerId.trim()
    : t('Sin ingresar');

  return (
    <div className="lg:sticky lg:top-24 space-y-4">
      {/* Main Resumen Card matching Screenshot 2 */}
      <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-[#110508] border border-blue-950/80 shadow-lg shadow-black/40 space-y-5">
        
        {/* Card Header matching Screenshot 2 */}
        <div className="flex items-center justify-between pb-3.5 border-b border-blue-950/60">
          <h3 className="font-display text-lg sm:text-xl font-black text-white tracking-tight">
            {t("Resumen de Compra")}
          </h3>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-600/30 text-blue-300 border border-blue-500/40">
            {gameBadgeName}
          </span>
        </div>

        {/* Breakdown Items matching Screenshot 2 */}
        <div className="space-y-3.5 text-xs sm:text-sm">
          <div className="flex items-center justify-between text-slate-300">
            <span className="text-slate-400 font-medium">{t("Juego:")}</span>
            <span className="font-bold text-white">{info.name}</span>
          </div>

          <div className="flex items-center justify-between text-slate-300">
            <span className="text-slate-400 font-medium">{t("Paquete:")}</span>
            <span className="font-bold text-white">
              {selectedPackage
                ? `${formatNumber(selectedPackage.diamonds)} ${t(info.unit)}`
                : t("Ninguno seleccionado")}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-300">
            <span className="text-slate-400 font-medium">{game === 'roblox' ? t("Usuario:") : t("ID de jugador:")}</span>
            <span className={`font-mono font-bold ${playerId ? 'text-blue-300' : 'text-slate-400'}`}>
              {playerDisplay}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-300">
            <span className="text-slate-400 font-medium">{t("Método de pago:")}</span>
            <span className="font-bold text-white">
              {selectedPayment?.name || t("Por seleccionar")}
            </span>
          </div>
        </div>

        {/* Total Price Section matching Screenshot 2 */}
        <div className="pt-4 border-t border-blue-950/60 space-y-1">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {t("Total a Pagar")}
            </span>
            <div className="text-right">
              <span className="font-mono text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500 tracking-tight block">
                {selectedPackage ? formatPrice(selectedPackage.priceCOP, selectedPackage.priceUSD) : '$0 COP'}
              </span>
            </div>
          </div>
          <span className="text-[11px] text-blue-400/90 font-medium block text-right">
            {t("Directo en WhatsApp")}
          </span>
        </div>

        {/* Primary CTA Button matching Screenshot 2 */}
        <button
          type="button"
          onClick={onProceed}
          disabled={isSubmitting}
          className="w-full py-3.5 px-5 rounded-xl font-extrabold text-sm text-white btn-blood transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-blue-950/70"
        >
          <Send className="w-4 h-4 text-white -rotate-12" />
          <span>{isSubmitting ? t("Procesando...") : t("Mandar mensaje a DM")}</span>
        </button>

        {/* Security badges */}
        <div className="pt-2 flex items-center justify-center gap-3 text-[11px] text-slate-400 border-t border-blue-950/40">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            {t("100% Seguro")}
          </span>
          <span aria-hidden="true" className="text-blue-900">·</span>
          <span className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-sky-400" />
            {t("Entrega < 2 Minutos")}
          </span>
        </div>

      </div>

    </div>
  );
};
