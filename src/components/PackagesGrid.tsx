import React from 'react';
import { IMAGES } from '../config/images';
import type { DiamondPackage, GameId } from '../types/store.ts';
import { GAME_INFO, formatNumber, formatCOP, DIAMOND_PACKAGES as FREEFIRE, ROBLOX_PACKAGES as ROBLOX } from '../utils/rechargeLogic.ts';
import { Check, Sparkles, Gift } from 'lucide-react';

interface PackagesGridProps {
  game: GameId;
  selectedPackage: DiamondPackage | null;
  onSelectPackage: (pkg: DiamondPackage) => void;
}

export const PackagesGrid: React.FC<PackagesGridProps> = ({ game, selectedPackage, onSelectPackage }) => {
  const info = GAME_INFO[game];
  const packages = game === 'roblox' ? ROBLOX : FREEFIRE;
  const isRoblox = game === 'roblox';
  const diamondArtByPackage: Record<string, string> = {
    'ff-110': 'https://i.ibb.co/4ySTpkN/10.png',
    'ff-341': 'https://i.ibb.co/B5ynkq2k/300.png',
    'ff-572': 'https://i.ibb.co/WWFMXBts/500.png',
    'ff-1166': 'https://i.ibb.co/gM4ssZCx/1000.png',
    'ff-2398': 'https://i.ibb.co/GvFCrV2t/2000.png',
    'ff-6160': 'https://i.ibb.co/G3T1TXFQ/5000.png',
  };

  return (
    <div className={`packages-grid ${isRoblox ? 'theme-robux' : 'theme-diamonds'}`}>
      {packages.map((pkg, index) => {
        const selected = selectedPackage?.id === pkg.id;
        const base = pkg.bonusDiamonds ? pkg.diamonds - pkg.bonusDiamonds : null;

        return (
          <button
            key={pkg.id}
            type="button"
            onClick={() => onSelectPackage(pkg)}
            aria-pressed={selected}
            className={`package-card ${selected ? 'is-selected' : ''} ${pkg.highlight ? 'is-popular' : ''}`}
            style={{ animationDelay: `${index * 55}ms` }}
          >
            {pkg.tag && (
              <span className="package-tag">
                <Sparkles size={10} />
                {pkg.tag.toUpperCase()}
              </span>
            )}
            {selected && (
              <span className="package-check">
                <Check size={12} strokeWidth={3} />
              </span>
            )}

            <div className="package-art">
              {isRoblox ? (
                <img src={IMAGES.robux} alt="Robux" className="pkg-robux" loading="lazy" />
              ) : (
                <img
                  src={diamondArtByPackage[pkg.id] || IMAGES.diamond}
                  alt={`${formatNumber(pkg.diamonds)} diamantes`}
                  className="pkg-diamond"
                  loading="lazy"
                />
              )}
              <div className="art-glow" />
            </div>

            <div className="package-amount">{formatNumber(pkg.diamonds)}</div>
            {base ? (
              <div className="package-bonus">
                <Gift size={11} />
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
