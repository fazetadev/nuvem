import { useI18n } from '../i18n.tsx';
import { IMAGES } from "../config/images";
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onScrollToRecharge?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onScrollToRecharge }) => {
  const { t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener('scroll', close, { passive: true, once: true });
    return () => window.removeEventListener('scroll', close);
  }, [menuOpen]);

  const navLinks: { label: string; href: string; action?: () => void }[] = [
    { label: 'Paquetes de Recarga', href: '#recargar', action: onScrollToRecharge },
    { label: 'Medios de Pago', href: '#metodos-pago' },
    { label: 'Preguntas Frecuentes', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#090306]/95 border-b border-red-900/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-4">
        
        {/* Brand Zone */}
        <a href="/" className="flex items-center gap-2.5 text-left shrink-0 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-red-950/80 via-[#180509] to-black border border-red-500/40 p-1.5 flex items-center justify-center shadow-lg shadow-red-950/60 group-hover:border-red-500 group-hover:shadow-red-600/40 transition-all shrink-0">
            <img
              decoding="async"
              src={IMAGES.logo}
              alt={t("nuvemGG")}
              className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(239,68,68,0.7)] group-hover:scale-110 transition-transform"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex items-baseline">
            <span className="font-display text-lg sm:text-2xl font-black tracking-tight text-white uppercase whitespace-nowrap">
              nuvem<span className="text-red-500 font-extrabold ml-0.5">GG</span>
            </span>
          </div>
        </a>

        {/* 4 Center Navigation Links matching image_8614bee8.png */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                if (link.action) {
                  e.preventDefault();
                  link.action();
                }
              }}
              className="hover:text-red-400 transition-colors whitespace-nowrap"
            >
              {t(link.label)}
            </a>
          ))}
        </nav>

        {/* Right Zone: Status Badge (COP to USD removed) */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          
          {/* Entrega Inmediata Badge matching Screenshot */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-emerald-500/30 text-[11px] sm:text-xs font-semibold text-emerald-400 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t("Entrega Inmediata")}</span>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            className="lg:hidden p-2 rounded-xl border border-red-900/40 bg-black/40 text-slate-200"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer with the 4 links */}
      {menuOpen && (
        <nav className="lg:hidden border-t border-red-900/30 px-4 py-3 bg-[#090306]/98 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                setMenuOpen(false);
                if (link.action) link.action();
              }}
              className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:bg-red-950/40 hover:text-red-300"
            >
              {t(link.label)}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};
