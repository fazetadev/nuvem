import React, { useEffect, useState } from 'react';
import { X, Gift, Trophy, MessageCircle, ArrowRight, BellOff } from 'lucide-react';
import { IMAGES } from '../config/images';
import { OFFICIAL_COMMUNITY_URL } from '../utils/rechargeLogic.ts';

const HIDE_TODAY_KEY = 'nuvem_shop_welcome_hide_date';
const CHARACTER_IMG =
  'https://i.ibb.co/PGgBMS3f/824b8260-5396-4dbe-8fd2-3e1c40c9ce53-removebg-preview.png';

function getTodayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export const WelcomeModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    try {
      return localStorage.getItem(HIDE_TODAY_KEY) !== getTodayKey();
    } catch {
      return true;
    }
  });
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (!isOpen) return;
    if (secondsLeft <= 0) {
      setIsOpen(false);
      return;
    }
    const timer = window.setTimeout(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [isOpen, secondsLeft]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => setIsOpen(false);

  const handleHideToday = () => {
    try {
      localStorage.setItem(HIDE_TODAY_KEY, getTodayKey());
    } catch {
      // Ignore storage failures in private browsing
    }
    setIsOpen(false);
  };

  const communityUrl = OFFICIAL_COMMUNITY_URL;

  return (
    <div
      className="welcome-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-modal-title"
      onClick={handleClose}
    >
      <div className="welcome-modal" onClick={(e) => e.stopPropagation()}>
        <div className="welcome-controls">
          <span className="welcome-countdown" aria-label={`Se cierra en ${secondsLeft} segundos`}>
            {secondsLeft}
          </span>
          <button
            type="button"
            className="welcome-close-btn"
            onClick={handleClose}
            aria-label="Cerrar bienvenida"
          >
            <X size={16} />
          </button>
        </div>

        <div className="welcome-art-col">
          <div className="welcome-art-glow" />
          <div className="welcome-art-slash" />
          <img
            src={CHARACTER_IMG}
            alt="Personaje oficial de Nuvem Shop"
            className="welcome-character-img"
          />
        </div>

        <div className="welcome-body-col">
          <div className="welcome-brand-pill">
            <img src={IMAGES.logo} alt="" />
            <span>
              Nuvem <b>Shop</b>
            </span>
          </div>

          <h2 id="welcome-modal-title" className="welcome-title">
            ¡Únete a nuestra
            <span>comunidad!</span>
          </h2>

          <div className="welcome-divider-bar">
            <i />
            <b />
          </div>

          <p className="welcome-subtitle">
            Recibe promos exclusivas, sorteos y soporte directo por WhatsApp.
          </p>

          <div className="welcome-perks">
            <div className="welcome-perk">
              <span className="welcome-perk-icon">
                <Gift size={14} />
              </span>
              <strong>PROMOS EXCLUSIVAS</strong>
            </div>
            <div className="welcome-perk">
              <span className="welcome-perk-icon">
                <Trophy size={14} />
              </span>
              <strong>SORTEOS ÉPICOS</strong>
            </div>
            <div className="welcome-perk">
              <span className="welcome-perk-icon">
                <MessageCircle size={14} />
              </span>
              <strong>SOPORTE DIRECTO</strong>
            </div>
          </div>

          <a
            href={communityUrl}
            target="_blank"
            rel="noreferrer"
            onClick={handleClose}
            className="welcome-cta"
          >
            <span className="welcome-cta-wa">
              <MessageCircle size={15} />
            </span>
            <span>UNIRME AL CANAL</span>
            <ArrowRight size={15} className="welcome-cta-arrow" />
          </a>

          <div className="welcome-secondary-row">
            <button type="button" className="welcome-btn-continue" onClick={handleClose}>
              Continuar a la página
            </button>
            <button type="button" className="welcome-btn-mute" onClick={handleHideToday}>
              <BellOff size={13} />
              <span>No mostrar más por hoy</span>
            </button>
          </div>

          <div className="welcome-foot-tagline">
            <span>RECARGA - JUEGA - GANA - SEGURO Y RAPIDO</span>
          </div>
        </div>
      </div>
    </div>
  );
};
