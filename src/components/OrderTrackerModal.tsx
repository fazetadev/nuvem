import { useI18n } from '../i18n.tsx';
import React, { useState, useEffect } from 'react';
import { X, Search, Clock, AlertCircle, Gem, ExternalLink } from 'lucide-react';
import { OrderRecord } from '../types/store.ts';
import { getSavedOrders, formatNumber, generateWhatsAppLink } from '../utils/rechargeLogic.ts';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t, formatPrice, toUSD, lang } = useI18n();
  const [query, setQuery] = useState('');
  const [orders, setOrders] = useState<OrderRecord[]>([]);

  useEffect(() => {
    if (isOpen) {
      setOrders(getSavedOrders());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredOrders = orders.filter((o) => {
    if (!query.trim()) return true;
    const q = query.trim().toUpperCase();
    return o.orderId.toUpperCase().includes(q) || o.playerId.toUpperCase().includes(q);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] flex flex-col rounded-3xl bg-[#120609] border border-red-800/70 shadow-2xl shadow-red-950/90 overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="p-6 pb-4 border-b border-red-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-600/30 border border-red-500/40 flex items-center justify-center text-red-400">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white tracking-tight">
                {t("Consultar Estado de Recarga")}
              </h3>
              <p className="text-xs text-red-300/80">
                {t("Rastrea tu recarga con tu número de pedido o ID o usuario de juego")}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-red-950/50 transition-colors cursor-pointer"
            aria-label={t("Cerrar rastreo")}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input */}
        <div className="p-6 pb-2">
          <div className="relative">
            <input
              type="text"
              placeholder={t("Buscar por # Pedido (NUVEM-...) o ID o usuario de juego...")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#080204] border border-red-950/70 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-white placeholder-slate-500 text-sm outline-none"
            />
            <Search className="w-5 h-5 text-red-400 absolute left-3.5 top-3.5" />
          </div>
        </div>

        {/* Orders list container */}
        <div className="p-6 pt-2 flex-1 overflow-y-auto space-y-3">
          {filteredOrders.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-red-950/40 border border-red-800/40 flex items-center justify-center text-red-400 mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-white">{t("No se encontraron pedidos")}</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                {t("Si acabas de realizar una recarga en otro dispositivo, puedes consultar directamente por WhatsApp a soporte.")}
              </p>
              <a
                href="https://wa.me/573016886549?text=Hola%20Nuvem%20Store%2C%20quisiera%20consultar%20el%20estado%20de%20mi%20recarga%20de%20Free%20Fire"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 rounded-xl hover:bg-emerald-900/60 transition-colors"
              >
                <span>{t("Consultar con Asesor WhatsApp")}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : (
            filteredOrders.map((ord) => (
              <div
                key={ord.orderId}
                className="p-4 rounded-2xl bg-[#090305] border border-red-950/60 hover:border-red-700/60 transition-colors space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white text-sm">
                      #{ord.orderId}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(ord.createdAt).toLocaleDateString('es-CO', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-950 border border-red-600/40 text-red-300 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-red-400" />
                    <span>{ord.status}</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
                  {ord.playerId && (
                    <div>
                      <span className="text-[10px] text-slate-400 block">{t("ID Jugador (UID):")}</span>
                      <span className="font-mono font-bold text-white">{ord.playerId}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-[10px] text-slate-400 block">{t("Recarga:")}</span>
                    <span className="font-semibold text-red-300 flex items-center gap-1">
                      <Gem className="w-3.5 h-3.5" />
                      {formatNumber(ord.diamonds)} {t('Diamantes')}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-red-950 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 mr-1">{t("Total:")}</span>
                    <span className="font-mono font-bold text-emerald-400">{formatPrice(ord.totalCOP, ord.totalUSD)}</span>
                  </div>

                  <a
                    href={generateWhatsAppLink({
                      orderId: ord.orderId,
                      playerId: ord.playerId,
                      diamonds: ord.diamonds,
                      totalCOP: ord.totalCOP,
                      paymentMethod: ord.paymentMethodName,
                      game: ord.game,
                      usdTotal: lang === 'en' ? toUSD(ord.totalCOP, ord.totalUSD) : undefined,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-400 hover:text-red-300 font-semibold flex items-center gap-1"
                  >
                    <span>{t("Abrir en WhatsApp")}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#080204] border-t border-red-950/60 text-center">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 text-xs font-semibold text-slate-300 hover:text-white rounded-xl transition-colors cursor-pointer"
          >
            {t("Cerrar")}
          </button>
        </div>

      </div>
    </div>
  );
};
