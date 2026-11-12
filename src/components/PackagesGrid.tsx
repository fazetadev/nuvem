import React from 'react';
import { DiamondIcon } from './DiamondIcon';
import { IMAGES } from '../config/images';
import type { DiamondPackage, GameId } from '../types/store.ts';
import { DIAMOND_PACKAGES, ROBLOX_PACKAGES, GAME_INFO, formatNumber, formatCOP } from '../utils/rechargeLogic.ts';

interface PackagesGridProps {
  game: GameId;
  selectedPackage: DiamondPackage | null;
  onSelectPackage: (pkg: DiamondPackage) => void;
}

export const PackagesGrid: React.FC<PackagesGridProps> = ({ game, selectedPackage, onSelectPackage }) => {
  const info = GAME_INFO[game];
  const list = game === 'roblox' ? ROBLOX_PACKAGES : DIAMOND_PACKAGES;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {list.map((pkg) => {
        const selected = selectedPackage?.id === pkg.id;
        const base = pkg.bonusDiamonds ? pkg.diamonds - pkg.bonusDiamonds : null;

        return (
          <button
            key={pkg.id}
            type="button"
            onClick={() => onSelectPackage(pkg)}
            aria-pressed={selected}
            className={`relative rounded-2xl px-3 pt-5 pb-4 flex flex-col items-center text-center cursor-pointer select-none transition-all duration-150 ${
              selected
                ? 'bg-gradient-to-b from-red-950/80 to-[#120306] border-2 border-red-500 shadow-xl shadow-red-950/70'
                : 'bg-[#0b0407] border border-red-950 hover:border-red-600/60'
            }`}
          >
            {pkg.tag && (
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider">
                {pkg.tag}
              </span>
            )}

            {game === 'roblox' ? (
              <img src={IMAGES.robux} alt="Robux" className="w-12 h-12 object-contain" loading="lazy" decoding="async" />
            ) : (
              <DiamondIcon className="w-12 h-12" />
            )}

            <span className="mt-2 font-display text-2xl font-black text-white leading-none">
              {formatNumber(pkg.diamonds)}
            </span>
            <span className="mt-1 text-[11px] text-slate-400 min-h-[16px]">
              {base ? `${formatNumber(base)} + ${formatNumber(pkg.bonusDiamonds!)} bono` : info.unit}
            </span>
            <span className={`mt-2 font-display text-lg font-black ${selected ? 'text-red-400' : 'text-white'}`}>
              {formatCOP(pkg.priceCOP).replace(' COP', '')}
              <span className="ml-1 text-[10px] font-bold text-slate-500">COP</span>
            </span>
          </button>
        );
      })}
    </div>
  );
};
