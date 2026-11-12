import React from 'react';
import { X, Send } from 'lucide-react';
import type { DiamondPackage, GameId, PaymentMethod } from '../types/store.ts';
import { GAME_INFO, PAYMENT_METHODS, formatCOP, formatNumber } from '../utils/rechargeLogic.ts';

interface CheckoutPanelProps {
  game: GameId;
  playerId: string;
  onPlayerIdChange: (id: string) => void;
  selectedPackage: DiamondPackage | null;
  selectedPayment: PaymentMethod | null;
  onSelectPayment: (m: PaymentMethod) => void;
  onProceed: () => void;
  error: string | null;
}

export const CheckoutPanel: React.FC<CheckoutPanelProps> = ({
  game,
  playerId,
  onPlayerIdChange,
  selectedPackage,
  selectedPayment,
  onSelectPayment,
  onProceed,
  error,
}) => {
  const info = GAME_INFO[game];
  const isRoblox = game === 'roblox';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    onPlayerIdChange(isRoblox ? v.replace(/[^a-zA-Z0-9_]/g, '').slice(0, 20) : v.replace(/\D/g, '').slice(0, 12));
  };

  return (
    <div className="lg:sticky lg:top-20 rounded-3xl bg-[#100609] border border-red-950/80 shadow-lg shadow-black/40 p-5 sm:p-6 space-y-5">
      <div className="space-y-2">
        <label htmlFor="player-id" className="text-xs font-bold uppercase tracking-wider text-slate-300">
          {info.accountLabel}
        </label>
        <div className="relative">
          <input
            id="player-id"
            type="text"
            inputMode={isRoblox ? 'text' : 'numeric'}
            autoCapitalize="none"
            autoCorrect="off"
            placeholder={info.placeholder}
            value={playerId}
            onChange={handleChange}
            className="w-full h-12 pl-4 pr-10 rounded-xl bg-[#080305] border border-red-950/80 focus:border-red-500 text-white placeholder-slate-500 font-mono tracking-wider outline-none"
          />
          {playerId && (
            <button
              type="button"
              onClick={() => onPlayerIdChange('')}
              aria-label="Borrar"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        {error && <p className="text-xs font-semibold text-red-400">{error}</p>}
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Pago</span>
        <div className="grid grid-cols-3 gap-2">
          {PAYMENT_METHODS.map((m) => {
            const on = selectedPayment?.id === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => onSelectPayment(m)}
                aria-pressed={on}
                className={`h-11 rounded-xl text-sm font-bold cursor-pointer transition-colors ${
                  on
                    ? 'bg-red-600/25 border-2 border-red-500 text-white'
                    : 'bg-[#080305] border border-red-950 text-slate-300 hover:border-red-700'
                }`}
              >
                {m.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-4 border-t border-red-950/60 space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-slate-400">
              {selectedPackage ? `${formatNumber(selectedPackage.diamonds)} ${info.unit}` : 'Elige un paquete'}
            </p>
            <p className="text-[11px] text-slate-500">Total</p>
          </div>
          <p className="font-display text-3xl font-black text-white">
            {selectedPackage ? formatCOP(selectedPackage.priceCOP) : '$ 0 COP'}
          </p>
        </div>

        <button
          type="button"
          onClick={onProceed}
          className="w-full py-3.5 rounded-xl font-extrabold text-white btn-blood cursor-pointer flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4 -rotate-12" />
          Comprar por WhatsApp
        </button>
      </div>
    </div>
  );
};
