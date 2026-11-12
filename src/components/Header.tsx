import React from 'react';
import { IMAGES } from '../config/images';
import { getGeneralWhatsAppLink } from '../utils/rechargeLogic.ts';
import { MessageCircle } from 'lucide-react';
import type { GameId } from '../types/store.ts';

interface HeaderProps {
  game: GameId;
  onSelectGame: (g: GameId) => void;
}

const GAMES: { id: GameId; label: string }[] = [
  { id: 'freefire', label: 'DIAMONDS' },
  { id: 'roblox', label: 'ROBUX' },
];

export const Header: React.FC<HeaderProps> = ({ game, onSelectGame }) => (
  <header className="site-header sticky top-0 z-50 w-full">
    <div className="header-bar max-w-6xl mx-auto px-4 sm:px-6">
      <a href="/" className="brand-lockup" aria-label="NuvemGG inicio">
        <span className="brand-logo">
          <img src={IMAGES.logo} alt="" />
        </span>
        <span className="brand-name">
          nuvem<span>GG</span>
        </span>
      </a>

      <div className="header-right">
        <div className="game-pills">
          {GAMES.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => onSelectGame(g.id)}
              className={game === g.id ? 'pill-active' : ''}
              aria-pressed={game === g.id}
            >
              {g.label}
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
