import React from 'react';
import { DiamondIcon } from './DiamondIcon';
import { IMAGES } from '../config/images';
import type { DiamondPackage, GameId } from '../types/store.ts';
import { DIAMOND_PACKAGES, ROBLOX_PACKAGES, GAME_INFO, formatNumber, formatCOP } from '../utils/rechargeLogic.ts';
import { Check, Gift, Sparkles } from 'lucide-react';

interface PackagesGridProps { game: GameId; selectedPackage: DiamondPackage | null; onSelectPackage: (pkg: DiamondPackage) => void; }

export const PackagesGrid: React.FC<PackagesGridProps> = ({ game, selectedPackage, onSelectPackage }) => {
  const info = GAME_INFO[game];
  const list = game === 'roblox' ? ROBLOX_PACKAGES : DIAMOND_PACKAGES;

  return (
    <div className="packages-grid">
      {list.map((pkg, index) => {
        const selected = selectedPackage?.id === pkg.id;
        const base = pkg.bonusDiamonds ? pkg.diamonds - pkg.bonusDiamonds : null;
        const bonus = pkg.bonusDiamonds || 0;
        return (
          <button key={pkg.id} type="button" onClick={() => onSelectPackage(pkg)} aria-pressed={selected}
            className={`package-card ${selected ? 'package-card-selected' : ''} ${pkg.highlight ? 'package-card-highlight' : ''}`}>
            {pkg.tag && <span className="package-tag"><Sparkles size={10} /> {pkg.tag}</span>}
            {selected && <span className="package-check"><Check size={13} /></span>}
            <span className="package-art">
              {game === 'roblox' ? <img src={IMAGES.robux} alt="Robux" loading="lazy" /> : <DiamondIcon className="w-14 h-14" />}
            </span>
            <span className="package-amount">{formatNumber(pkg.diamonds)}</span>
            <span className="package-unit">{info.unit}</span>
            {base && <span className="package-bonus"><Gift size={11} /> {formatNumber(base)} + {formatNumber(bonus)} BONO</span>}
            {!base && <span className="package-bonus package-bonus-empty">Recarga digital</span>}
            <span className="package-price">{formatCOP(pkg.priceCOP).replace(' COP', '')}<small> COP</small></span>
            <span className={`package-select-label ${selected ? 'is-selected' : ''}`}>{selected ? 'SELECCIONADO' : 'ELEGIR PAQUETE'}</span>
          </button>
        );
      })}
    </div>
  );
};
