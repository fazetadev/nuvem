import { useI18n } from '../i18n.tsx';
import { IMAGES } from "../config/images";
import React from 'react';
import { MessageCircle, Gem, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenTracker: () => void;
  onScrollToRecharge: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTracker, onScrollToRecharge }) => {
  const { t } = useI18n();

  return (
    <footer className="bg-[#050203] border-t border-red-950/70 text-slate-400 text-xs relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* 4 Columns matching Screenshot 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-red-950/60">
          
          {/* Column 1: Brand & Schedule matching Screenshot 3 */}
          <div className="lg:col-span-4 space-y-4">
            <a href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-950/80 via-[#180509] to-black border border-red-500/40 p-1.5 flex items-center justify-center shadow-lg shadow-red-950/60 shrink-0">
                <img
                  decoding="async"
                  src={IMAGES.logo}
                  alt="nuvemGG"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(239,68,68,0.7)]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display text-xl font-black text-white uppercase tracking-tight">
                nuvem<span className="text-red-500 font-extrabold ml-0.5">GG</span>
              </span>
            </a>

            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              {t("Tu tienda de recargas gamer favorita. Entregas directas y seguras sin intermediarios.")}
            </p>

            {/* Active Schedule with green dot matching Screenshot 3 */}
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>{t("Atención activa: Lunes a Domingo · 9:00 AM a 11:00 PM")}</span>
            </div>
          </div>

          {/* Column 2: APARTADOS Y SERVICIOS matching Screenshot 3 */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider font-display">
              {t("APARTADOS Y SERVICIOS")}
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li>
                <button
                  onClick={onScrollToRecharge}
                  className="hover:text-red-400 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <Gem className="w-3.5 h-3.5 text-red-400" />
                  <span>{t("Recargar Diamantes")}</span>
                </button>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-red-400">·</span>
                <span>{t("Entrega 100% digital e inmediata")}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-red-400">·</span>
                <span>{t("Atención directa vía WhatsApp")}</span>
              </li>
              <li>
                <a
                  href="#faq"
                  className="hover:text-red-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-red-400">·</span>
                  <span>{t("Preguntas Frecuentes")}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: MÉTODOS DE PAGO matching Screenshot 3 */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider font-display">
              {t("MÉTODOS DE PAGO")}
            </h4>
            <p className="text-[11px] text-slate-400 leading-snug">
              {t("Aceptamos transferencias locales e internacionales sin comisiones abusivas:")}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-300 bg-[#120508] border border-red-900/40">
                Bancolombia
              </span>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-300 bg-[#120508] border border-red-900/40">
                Nequi
              </span>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-300 bg-[#120508] border border-red-900/40">
                PayPal
              </span>
            </div>
          </div>

          {/* Column 4: ATENCIÓN DIRECTA */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider font-display">
              {t("ATENCIÓN DIRECTA")}
            </h4>
            <p className="text-xs text-slate-400">
              {t("¿Tienes preguntas sobre un pedido o necesitas atención personalizada?")}
            </p>
            <a
              href="https://wa.me/573016886549?text=Hola%20Nuvem%20Store%2C%20tengo%20una%20consulta%20sobre%20una%20recarga"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/60 border border-emerald-500/40 text-emerald-300 hover:text-white hover:bg-emerald-950/40 text-xs font-bold transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp: +57 301 688 6549</span>
            </a>
          </div>

        </div>

        {/* Reseller Disclaimer Card */}
        <div className="my-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-950/40 via-[#140608] to-red-950/20 border border-red-900/40 flex flex-col sm:flex-row items-center gap-3.5 text-center sm:text-left shadow-lg shadow-black/40">
          <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-500/40 flex items-center justify-center shrink-0 text-red-400 shadow-md">
            <ShieldCheck className="w-5 h-5 text-red-400" />
          </div>
          <div className="space-y-1">
            <p className="text-xs sm:text-sm font-bold text-white tracking-wide">
              {t("Aviso:")}{' '}
              <span className="text-red-400 font-extrabold uppercase">
                {t("Nuvem Store NO es una tienda oficial de Garena")}
              </span>
              <span className="text-slate-300">
                {t(", somos revendedores independientes.")}
              </span>
            </p>
            <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
              {t("Nuvem Store es un servicio independiente de gestión y distribución de recargas digitales mediante UID público y sistemas autorizados. No tenemos afiliación corporativa directa con Garena. Todas las marcas registradas, nombres de juegos y logotipos son propiedad de sus respectivos dueños.")}
            </p>
          </div>
        </div>

        {/* Bottom row matching user screenshot */}
        <div className="pt-6 border-t border-red-950/40 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p className="text-center md:text-left max-w-2xl leading-relaxed">
            © 2026 Nuvem Store (nuvemGG). {t("Nuvem Store NO es una tienda oficial de Garena, somos revendedores independientes. Todos los derechos reservados.")}
          </p>
          <div className="flex items-center gap-1.5 text-slate-300 font-medium shrink-0 bg-red-950/30 px-3 py-1.5 rounded-full border border-red-900/40">
            <span>{t("Hecho con")}</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
            <span className="text-white font-semibold">{t("para gamers")}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
