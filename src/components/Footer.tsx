import React from 'react';
import { getGeneralWhatsAppLink, OFFICIAL_PHONE_FORMATTED } from '../utils/rechargeLogic.ts';

export const Footer: React.FC = () => (
  <footer className="border-t border-red-950/70 bg-[#050203] py-6 text-center text-xs text-slate-500">
    <a href={getGeneralWhatsAppLink()} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
      WhatsApp {OFFICIAL_PHONE_FORMATTED}
    </a>
    <span className="mx-2 text-red-900">·</span>
    <span>© nuvemGG</span>
  </footer>
);
