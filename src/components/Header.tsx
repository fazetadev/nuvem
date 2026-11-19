import React from 'react';
import { IMAGES } from '../config/images';
import { getGeneralWhatsAppLink } from '../utils/rechargeLogic.ts';
import { MessageCircle } from 'lucide-react';
import type { CatalogTab } from '../types/store.ts';

interface HeaderProps {
  activeTab: CatalogTab;
  onSelectTab: (g: CatalogTab) => void;
}

const TABS: { id: CatalogTab; label: string }[] = [
  { id: 'freefire', label: 'DIAMANTES' },
  { id: 'roblox', label: 'ROBUX' },
  { id: 'social', label: 'SOCIALES' },
];

export const Header: React.FC<HeaderProps> = ({ activeTab, onSelectTab }) => (
  <header className="site-header sticky top-0 z-50 w-full">
    <div className="header-bar max-w-6xl mx-auto px-4 sm:px-6">
      <a href="/" className="brand-lockup" aria-label="Nuvem Store inicio">
        <span className="brand-logo">
          <img src={IMAGES.logo} alt="" />
        </span>
        <span className="brand-name">
          Nuvem <span>Store</span>
        </span>
      </a>

      <div className="header-right">
        <div className="game-pills">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={activeTab === tab.id ? 'pill-active' : ''}
              aria-pressed={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <a href={getGeneralWhatsAppLink()} target="_blank" rel="noreferrer" className="btn-support">
          <MessageCircle size={15} />
          <span>SOPORTE</span>
        </a>
      </div>
    </div>
  </header>
);
