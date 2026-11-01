import { useI18n } from '../i18n.tsx';
import { DiamondIcon } from "./DiamondIcon";
import { IMAGES } from "../config/images";
import type { GameId } from "../types/store.ts";
import React from 'react';
import { Check } from 'lucide-react';
import { DiamondPackage } from '../types/store.ts';
import { DIAMOND_PACKAGES, ROBLOX_PACKAGES, GAME_INFO, formatNumber } from '../utils/rechargeLogic.ts';

interface PackagesGridProps {
  selectedPackage: DiamondPackage | null;
  onSelectPackage: (pkg: DiamondPackage) => void;
  game?: GameId;
  stepNumber?: number;
}

export const PackagesGrid: React.FC<PackagesGridProps> = ({
  selectedPackage,
  onSelectPackage,
  game = 'freefire',
  stepNumber = 2,
}) => {
  const { t, formatPrice } = useI18n();
  const info = GAME_INFO[game] || GAME_INFO.freefire;
  const currentList = game === 'roblox' ? ROBLOX_PACKAGES : DIAMOND_PACKAGES;

  const getTagStyle = (tag?: string) => {
    if (!tag) return '';
    if (tag.includes('POPULAR')) {
      return 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-sm shadow-red-900/60 border-red-400/40';
    }
    if (tag.includes('VALOR')) {
      return 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-sm border-amber-400/40';
    }
    return 'bg-gradient-to-r from-rose-700 to-red-900 text-white shadow-sm border-rose-500/40';
  };

  return (
    <div id="paquetes" className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#100609] border border-red-950/80 shadow-lg shadow-black/40 space-y-4">
      
      {/* Step Header (matching Screenshot 2: "2 Monto de recarga") */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3.5 border-b border-red-950/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-red-600/25 border border-red-500/40 flex items-center justify-center text-red-400 font-bold font-mono text-sm shadow-sm">
            {stepNumber}
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              {t("Monto de recarga")}
            </h2>
            <p className="text-xs text-red-300/80">
              {game === 'roblox'
                ? t("Selecciona la cantidad de Robux oficiales para tu cuenta de Roblox")
                : t("Selecciona la cantidad de Diamantes para tu cuenta de Free Fire")}
            </p>
          </div>
        </div>

        <div className="text-[11px] text-slate-400 font-medium">
          {t("Precios con entrega inmediata en Colombia")}
        </div>
      </div>

      {/* Product Packages Grid (matching Screenshot 2) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-3.5">
        {currentList.map((pkg) => {
          const isSelected = selectedPackage?.id === pkg.id;

          return (
            <div
              key={pkg.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelectPackage(pkg)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectPackage(pkg);
                }
              }}
              className={`relative rounded-2xl p-4 text-center transition-all duration-150 cursor-pointer flex flex-col justify-between group select-none min-h-[140px] sm:min-h-[155px] ${
                isSelected
                  ? 'bg-gradient-to-b from-red-950/80 via-[#1e070c] to-[#120306] border-2 border-red-500 shadow-xl shadow-red-950/70 ring-2 ring-red-500/40 -translate-y-0.5'
                  : 'bg-[#090305] hover:bg-[#15060a] border border-red-950 hover:border-red-600/60'
              }`}
            >
              {/* Corner Tag matching Screenshot 2 */}
              {pkg.tag && (
                <div className={`absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border whitespace-nowrap z-10 ${getTagStyle(pkg.tag)}`}>
                  {t(pkg.tag)}
                </div>
              )}

              {/* Selected checkmark in top right matching Screenshot 2 */}
              <div className="absolute top-2.5 right-2.5">
                {isSelected ? (
                  <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-red-950">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border border-red-950 group-hover:border-red-700/60 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-red-800" />
                  </div>
                )}
              </div>

              {/* Card Center: Jewel + Number + Unit */}
              <div className="flex flex-col items-center justify-center pt-2 pb-1 space-y-1">
                <div className="flex items-center justify-center gap-1.5">
                  {game === 'roblox' ? (
                    <img
                      src={IMAGES.robux}
                      alt="Robux"
                      className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <DiamondIcon className="w-7 h-7 sm:w-8 sm:h-8" />
                  )}
                  <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {formatNumber(pkg.diamonds)}
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-widest block">
                  {t(info.unit)}
                </span>
              </div>

              {/* Price Box matching Screenshot 2 */}
              <div className={`mt-2 py-1.5 px-2 rounded-xl text-center font-bold text-xs sm:text-sm font-mono transition-colors ${
                isSelected
                  ? 'bg-red-600/20 text-white border border-red-500/50'
                  : 'bg-black/40 text-slate-200 border border-red-950/60 group-hover:border-red-800'
              }`}>
                {formatPrice(pkg.priceCOP, pkg.priceUSD)}
              </div>
            </div>
          );
        })}
      </div>



    </div>
  );
};
