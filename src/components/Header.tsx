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
  { id: 'freefire', label: 'Free Fire' },
  { id: 'roblox', label: 'Robux' },
];

export const Header: React.FC<HeaderProps> = ({ game, onSelectGame }) => (
  <header className="sticky top-0 z-40 w-full bg-[#090306]/95 border-b border-red-900/40">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
      <a href="/" className="flex items-center gap-2 shrink-0">
        <img src={IMAGES.logo} alt="nuvemGG" className="w-9 h-9 object-contain" />
        <span className="hidden sm:block font-display text-xl font-black text-white uppercase tracking-tight">
          nuvem<span className="text-red-500">GG</span>
        </span>
      </a>

      <nav className="flex items-center gap-1 p-1 rounded-xl bg-black/50 border border-red-950" aria-label="Juego">
        {GAMES.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => onSelectGame(g.id)}
            aria-pressed={game === g.id}
            className={`px-4 py-1.5 rounded-lg text-sm font-bold cursor-pointer transition-colors ${
              game === g.id ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {g.label}
          </button>
        ))}
      </nav>

      <a
        href={getGeneralWhatsAppLink()}
        target="_blank"
        rel="noreferrer"
        className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-red-900/50 text-xs font-bold text-slate-200 hover:border-red-500 hover:text-white transition-colors"
      >
        <MessageCircle className="w-4 h-4 text-emerald-400" />
        <span className="hidden sm:inline">Soporte</span>
      </a>
    </div>
  </header>
);
