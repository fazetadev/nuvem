import React from 'react';
import { getGeneralWhatsAppLink, OFFICIAL_PHONE_FORMATTED } from '../utils/rechargeLogic.ts';
import { MessageCircle, ShieldCheck, Zap, LockKeyhole } from 'lucide-react';
import { IMAGES } from '../config/images';

import type { CatalogTab } from '../types/store.ts';

interface FooterProps {
  onSelectTab?: (tab: CatalogTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const goToTab = (tab: CatalogTab) => {
    onSelectTab?.(tab);
    window.setTimeout(() => {
      document.getElementById('recargas')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 40);
  };

  return (
  <footer className="site-footer">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 footer-main">
      <div className="footer-brand">
        <a href="/" className="brand-lockup">
          <span className="brand-logo">
            <img src={IMAGES.logo} alt="Nuvem Shop" />
          </span>
          <span className="brand-name">
            Nuvem <span>Shop</span>
          </span>
        </a>
        <p>Nuvem Shop - Seguro Y Rapido. Recargas digitales para que nunca pares de jugar.</p>
      </div>
      <div className="footer-column">
        <b>TIENDA</b>
        <button type="button" className="footer-link-btn" onClick={() => goToTab('freefire')}>Free Fire</button>
        <button type="button" className="footer-link-btn" onClick={() => goToTab('roblox')}>Roblox</button>
        <button type="button" className="footer-link-btn" onClick={() => goToTab('social')}>Social</button>
        <a href="#recargas">Métodos de pago</a>
      </div>
      <div className="footer-column">
        <b>COMPRA SEGURA</b>
        <span><LockKeyhole size={14} /> Sin contraseñas</span>
        <span><Zap size={14} /> Proceso sencillo</span>
        <span><ShieldCheck size={14} /> Soporte humano</span>
      </div>
      <div className="footer-contact">
        <b>¿NECESITAS AYUDA?</b>
        <p>Estamos para ayudarte con tu recarga.</p>
        <a href={getGeneralWhatsAppLink()} target="_blank" rel="noreferrer">
          <MessageCircle size={14} /> WHATSAPP - {OFFICIAL_PHONE_FORMATTED} ↗
        </a>
      </div>
    </div>
    <div className="footer-disclaimer">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p>
          <strong>Aviso importante:</strong> Nuvem Shop es una tienda independiente y no es una tienda oficial ni autorizada de Garena Free Fire, Roblox Corporation, Netflix ni CapCut. Todas las marcas registradas pertenecen a sus respectivos dueños.
        </p>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <span>© {new Date().getFullYear()} Nuvem Shop - Seguro Y Rapido. Todos los derechos reservados.</span>
        <span>Hecho para gamers <b>♥</b></span>
      </div>
    </div>
  </footer>
  );
};
