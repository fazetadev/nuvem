import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import type { DiamondPackage } from '../types/store.ts';
import { SOCIAL_PACKAGES, formatCOP } from '../utils/rechargeLogic.ts';

interface ServiceCatalogGridProps {
  selectedPackage: DiamondPackage | null;
  onSelectPackage: (pkg: DiamondPackage) => void;
}

export const ServiceCatalogGrid: React.FC<ServiceCatalogGridProps> = ({
  selectedPackage,
  onSelectPackage,
}) => (
  <div className="packages-grid theme-social">
    {SOCIAL_PACKAGES.map((plan, index) => {
      const selected = selectedPackage?.id === plan.id;
      return (
        <button
          key={plan.id}
          type="button"
          onClick={() => onSelectPackage(plan)}
          aria-pressed={selected}
          aria-label={`${plan.displayName} ${formatCOP(plan.priceCOP)}`}
          className={`package-card pass-package-card ${selected ? 'is-selected' : ''}`}
          style={{ animationDelay: `${index * 55}ms` }}
        >
          {plan.tag && (
            <span className="package-tag pass-tag">
              <Sparkles size={10} />
              {plan.tag.toUpperCase()}
            </span>
          )}
          {selected && (
            <span className="package-check">
              <Check size={12} strokeWidth={3} />
            </span>
          )}
          <div className="package-art pass-art">
            <img src={plan.image} alt={plan.displayName || plan.tag} loading="lazy" />
          </div>
          <div className="package-amount pass-title">{plan.title}</div>
          <div className="package-bonus muted">{plan.subtitle}</div>
          <div className="package-price">
            {formatCOP(plan.priceCOP).replace(' COP', '')}
            <small> COP</small>
          </div>
          {plan.incentive && (
            <div className="package-incentive">{plan.incentive}</div>
          )}
        </button>
      );
    })}
  </div>
);
