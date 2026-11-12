import React from 'react';
import { getGeneralWhatsAppLink, OFFICIAL_PHONE_FORMATTED } from '../utils/rechargeLogic.ts';
import { MessageCircle, ShieldCheck, Zap, LockKeyhole } from 'lucide-react';
import { IMAGES } from '../config/images';

export const Footer: React.FC = () => (
  <footer className="site-footer">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 footer-main">
      <div className="footer-brand">
        <a href="/" className="brand-lockup">
          <span className="brand-logo">
            <img src={IMAGES.logo} alt="NuvemGG" />
          </span>
          <span className="brand-name">
            nuvem<span>GG</span>
          </span>
        </a>
        <p>Tu tienda gamer de confianza. Recargas digitales para que nunca pares de jugar.</p>
      </div>
      <div className="footer-column">
        <b>TIENDA</b>
        <a href="#recargas">Free Fire</a>
        <a href="#recargas">Roblox</a>
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
          <MessageCircle size={14} /> WHATSAPP · {OFFICIAL_PHONE_FORMATTED} ↗
        </a>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <span>© {new Date().getFullYear()} nuvemGG Store. Todos los derechos reservados.</span>
        <span>Hecho para gamers <b>♥</b></span>
      </div>
    </div>
  </footer>
);
