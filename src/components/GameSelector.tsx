import React from 'react';
import { useI18n } from '../i18n.tsx';
import { IMAGES } from '../config/images';
import type { GameId } from '../types/store.ts';
import { Sparkles, Check } from 'lucide-react';
export type { GameId };

interface Props {
  selected?: GameId;
  onSelect?: (g: GameId) => void;
}

export const GameSelector: React.FC<Props> = ({ selected = 'freefire', onSelect }) => {
  const { t } = useI18n();

  return (
    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-1">
      {/* Title with sparkles */}
      <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-widest">
        <Sparkles className="w-4 h-4 text-blue-400" />
        <span>{t("Selección de Juego")}</span>
      </div>

      {/* Game Selector Buttons */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full sm:w-auto">
        {/* Free Fire Button */}
        <button
          type="button"
          onClick={() => onSelect?.('freefire')}
          aria-pressed={selected === 'freefire'}
          className={`relative px-3 sm:px-4 py-2.5 rounded-2xl cursor-pointer flex items-center justify-between gap-2.5 transition-all outline-none select-none ${
            selected === 'freefire'
              ? 'bg-gradient-to-r from-blue-950/90 via-[#0b2944] to-[#071525] border-2 border-blue-500 shadow-xl shadow-blue-950/70 ring-1 ring-blue-500/40'
              : 'bg-[#071525]/80 hover:bg-[#0b2238] border border-blue-950 hover:border-blue-800/60 opacity-80 hover:opacity-100'
          }`}
        >
          {/* Text on left side */}
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-extrabold text-white tracking-wide">
                Free Fire
              </span>
              {selected === 'freefire' && (
                <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm shrink-0">
                  <Check className="w-2 sm:w-2.5 h-2 sm:h-2.5 stroke-[3]" />
                </div>
              )}
            </div>
            <span className="text-[10px] sm:text-[11px] text-blue-300/80 font-medium block">
              {t("Diamantes por UID")}
            </span>
          </div>

          {/* Small Free Fire Logo positioned to the right */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-blue-500 via-sky-400 to-cyan-500 shadow-sm shrink-0">
            <img
              decoding="async"
              loading="lazy"
              src={IMAGES.freefireLogo}
              alt="Free Fire"
              className="w-full h-full object-cover rounded-[9px]"
              referrerPolicy="no-referrer"
            />
          </div>
        </button>

        {/* Roblox Button */}
        <button
          type="button"
          onClick={() => onSelect?.('roblox')}
          aria-pressed={selected === 'roblox'}
          className={`relative px-3 sm:px-4 py-2.5 rounded-2xl cursor-pointer flex items-center justify-between gap-2.5 transition-all outline-none select-none ${
            selected === 'roblox'
              ? 'bg-gradient-to-r from-blue-950/90 via-[#0b2944] to-[#071525] border-2 border-blue-500 shadow-xl shadow-blue-950/70 ring-1 ring-blue-500/40'
              : 'bg-[#071525]/80 hover:bg-[#0b2238] border border-blue-950 hover:border-blue-800/60 opacity-80 hover:opacity-100'
          }`}
        >
          {/* Text on left side */}
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-extrabold text-white tracking-wide">
                Roblox
              </span>
              {selected === 'roblox' && (
                <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm shrink-0">
                  <Check className="w-2 sm:w-2.5 h-2 sm:h-2.5 stroke-[3]" />
                </div>
              )}
            </div>
            <span className="text-[10px] sm:text-[11px] text-blue-300/80 font-medium block">
              {t("Robux por Usuario")}
            </span>
          </div>

          {/* Small Roblox Game Logo positioned to the right */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-neutral-800 via-zinc-700 to-zinc-900 shadow-sm shrink-0">
            <img
              decoding="async"
              loading="lazy"
              src={IMAGES.robloxLogo}
              alt="Roblox"
              className="w-full h-full object-cover rounded-[9px]"
              referrerPolicy="no-referrer"
            />
          </div>
        </button>
      </div>
    </div>
  );
};
