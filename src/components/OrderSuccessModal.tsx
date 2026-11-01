import { useI18n } from '../i18n.tsx';
import React, { useState } from 'react';
import { X, Check, Copy, MessageCircle, Clock, CheckCircle2, ExternalLink } from 'lucide-react';
import { OrderRecord } from '../types/store.ts';
import { formatNumber, generateWhatsAppLink, GAME_INFO } from '../utils/rechargeLogic.ts';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderRecord;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  const { t, formatPrice, toUSD, lang } = useI18n();
  const [copiedId, setCopiedId] = useState(false);

  if (!isOpen) return null;

  const info = GAME_INFO[order.game || 'freefire'];

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const whatsappUrl = generateWhatsAppLink({
    orderId: order.orderId,
    playerId: order.playerId,
    diamonds: order.diamonds,
    totalCOP: order.totalCOP,
    paymentMethod: order.paymentMethodName,
    game: order.game,
    usdTotal: lang === 'en' ? toUSD(order.totalCOP, order.totalUSD) : undefined,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-lg my-8 rounded-3xl bg-[#120609] border border-red-800/80 shadow-2xl shadow-red-950/90 overflow-hidden text-slate-100">
        
        {/* Top Glow bar in Blood Red */}
        <div className="h-2 w-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-500" />

        {/* Header */}
        <div className="p-6 pb-4 border-b border-red-950/60 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-950/50">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                {t("¡Pedido Generado con Éxito!")}
              </span>
              <h3 className="font-display text-xl font-black text-white tracking-tight">
                {order.orderId}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-red-950/50 transition-colors cursor-pointer"
            aria-label={t("Cerrar modal")}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-4 text-sm">
          
          {/* Instructions banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-red-950/50 via-[#18070b] to-[#0e0305] border border-red-700/50 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-red-300 uppercase tracking-wider">
                {t("Paso Final para tu Entrega")}
              </span>
              <span className="text-xs text-red-400 font-mono font-bold">
                {formatPrice(order.totalCOP, order.totalUSD)}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {t("Realiza el pago desde")} <strong className="text-white font-semibold">{order.paymentMethodName}</strong> {t("con los datos que te enviamos por WhatsApp y envía la captura para acreditación inmediata:")}
            </p>

            <div className="p-3 rounded-xl bg-[#080204] border border-red-950/70 text-xs text-slate-300">
              {t('Toca el botón de WhatsApp: te enviamos los datos de {method} para que hagas el pago.', { method: order.paymentMethodName })}
            </div>
          </div>

          {/* WhatsApp Direct Action Button (Dominant CTA) */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-2xl shadow-xl shadow-emerald-950/60 transition-all flex items-center justify-center gap-2.5 text-sm cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{t("Enviar Comprobante por WhatsApp")}</span>
            <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
          </a>

          {/* Order Summary Details */}
          <div className="p-4 rounded-2xl bg-[#090305] border border-red-950/60 space-y-2 text-xs">
            {order.playerId && (
              <div className="flex items-center justify-between py-1 border-b border-red-950">
                <span className="text-slate-400">{t(info.accountLabel)}:</span>
                <span className="font-mono font-bold text-white">{order.playerId}</span>
              </div>
            )}
            <div className="flex items-center justify-between py-1 border-b border-red-950">
              <span className="text-slate-400">{t("Recarga:")}</span>
              <span className="font-bold text-white">{formatNumber(order.diamonds)} {t(info.unit)}</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-red-950">
              <span className="text-slate-400">{t("Total a Pagar:")}</span>
              <span className="font-mono font-bold text-emerald-400">{formatPrice(order.totalCOP, order.totalUSD)}</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-400">{t("Código de Seguimiento:")}</span>
              <button
                type="button"
                onClick={handleCopyOrderId}
                className="font-mono text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
              >
                <span>{order.orderId}</span>
                {copiedId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {/* Delivery speed guarantee */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5 text-red-400" />
            <span>{t("Tiempo promedio de entrega:")} <strong>{t("1 a 3 minutos")}</strong> {t("tras confirmación")}</span>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#080204] border-t border-red-950/60 text-center">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-red-950/50 rounded-xl transition-colors cursor-pointer"
          >
            {t("Cerrar y volver a la tienda")}
          </button>
        </div>

      </div>
    </div>
  );
};
