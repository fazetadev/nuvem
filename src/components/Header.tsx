import React from 'react';
import { IMAGES } from '../config/images';
import { getGeneralWhatsAppLink } from '../utils/rechargeLogic.ts';
import { MessageCircle, ShoppingBag } from 'lucide-react';
import type { GameId } from '../types/store.ts';

interface HeaderProps { game: GameId; onSelectGame: (g: GameId) => void; }
const GAMES: { id: GameId; label: string }[] = [{ id: 'freefire', label: 'FREE FIRE' }, { id: 'roblox', label: 'ROBLOX' }];

export const Header: React.FC<HeaderProps> = ({ game, onSelectGame }) => (
  <header className="site-header sticky top-0 z-40 w-full">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 header-inner">
      <a href="/" className="brand-lockup" aria-label="NuvemGG inicio"><span className="brand-logo"><img src={IMAGES.logo} alt="" /></span><span className="brand-name">nuvem<span>GG</span><small>STORE</small></span></a>
      <nav className="game-switch" aria-label="Seleccionar juego">{GAMES.map((g) => <button key={g.id} type="button" onClick={() => onSelectGame(g.id)} aria-pressed={game === g.id} className={game === g.id ? 'game-switch-active' : ''}>{g.label}</button>)}</nav>
      <div className="header-actions"><a href="#recargas" className="header-shop"><ShoppingBag size={15} /><span>RECARGAR</span></a><a href={getGeneralWhatsAppLink()} target="_blank" rel="noreferrer" className="header-support"><MessageCircle size={16} /><span>SOPORTE</span></a></div>
    </div>
  </header>
);
