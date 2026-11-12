import React from 'react';
import { DiamondIcon } from './DiamondIcon';
import { IMAGES } from '../config/images';
import type { DiamondPackage, GameId } from '../types/store.ts';
import { GAME_INFO, formatNumber, formatCOP, DIAMOND_PACKAGES as FREEFIRE, ROBLOX_PACKAGES as ROBLOX } from '../utils/rechargeLogic.ts';
import { Check } from 'lucide-react';

interface PackagesGridProps {
  game: GameId;
  selectedPackage: DiamondPackage | null;
  onSelectPackage: (pkg: DiamondPackage) => void;
}

export const PackagesGrid: React.FC<PackagesGridProps> = ({ game, selectedPackage, onSelectPackage }) => {
  const info = GAME_INFO[game];
  const packages = game === 'roblox' ? ROBLOX : FREEFIRE;

  return (
    <div className="packages-grid">
      {packages.map((pkg, index) => {
        const selected = selectedPackage?.id === pkg.id;
        const base = pkg.bonusDiamonds ? pkg.diamonds - pkg.bonusDiamonds : null;
        const isBig = pkg.diamonds >= 1166;

        return (
          <button
            key={pkg.id}
            type="button"
            onClick={() => onSelectPackage(pkg)}
            aria-pressed={selected}
            className={`package-card ${selected ? 'is-selected' : ''} ${pkg.highlight ? 'is-popular' : ''}`}
            style={{ animationDelay: `${index * 60}ms` }}
          >
            {pkg.tag && <span className="package-tag">{pkg.tag.toUpperCase()}</span>}
            {selected && (
              <span className="package-check">
                <Check size={12} strokeWidth={3} />
              </span>
            )}

            <div className={`package-art ${isBig ? 'art-chest' : 'art-gems'}`}>
              {game === 'roblox' ? (
                <img src={IMAGES.robux} alt="Robux" loading="lazy" />
              ) : (
                <DiamondIcon className="pkg-diamond" />
              )}
              {isBig && <div className="art-glow" />}
            </div>

            <div className="package-amount">{formatNumber(pkg.diamonds)}</div>
            {base ? (
              <div className="package-bonus">
                {formatNumber(base)} + {formatNumber(pkg.bonusDiamonds || 0)} bonus
              </div>
            ) : (
              <div className="package-bonus muted">Recarga digital</div>
            )}

            <div className="package-price">
              {formatCOP(pkg.priceCOP).replace(' COP', '')}
              <small> COP</small>
            </div>
          </button>
        );
      })}
    </div>
  );
};
