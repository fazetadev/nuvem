import React from 'react';
import { Zap, Clock, MessageCircle, ShieldCheck, Wallet, Lock, Globe, BadgeCheck, Sparkles, ArrowRight, Headphones } from 'lucide-react';
import { useI18n } from '../i18n.tsx';

/** Franja de datos clave justo debajo del Hero */
export const StatsStrip: React.FC = () => {
  const { t } = useI18n();
  const items = [
    { icon: <Clock className="w-5 h-5 text-blue-400" />, big: '1–3 min', small: 'Entrega promedio' },
    { icon: <Headphones className="w-5 h-5 text-blue-400" />, big: '24/7', small: 'Soporte por WhatsApp' },
    { icon: <Lock className="w-5 h-5 text-blue-400" />, big: '0', small: 'Contraseñas solicitadas' },
    { icon: <Wallet className="w-5 h-5 text-blue-400" />, big: '3', small: 'Métodos de pago' },
  ];
  return (
    <section className="relative -mt-2 pb-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {items.map((it) => (
            <div key={it.small} className="bg-[#100508]/90 border border-blue-950/70 rounded-2xl px-4 py-4 sm:px-5 sm:py-5 flex items-center gap-3 sm:gap-4 shadow-lg shadow-black/40">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600/30 to-sky-950/40 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                {it.icon}
              </div>
              <div className="min-w-0">
                <div className="font-display text-xl sm:text-2xl font-black text-white leading-none">{it.big}</div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-1 leading-snug">{t(it.small)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/** Por qué elegir Nuvem Store */
export const WhyUs: React.FC = () => {
  const { t } = useI18n();
  const feats = [
    { icon: <Zap className="w-6 h-6 text-blue-400" />, title: 'Entrega rápida', desc: 'Recibes tu recarga en minutos una vez confirmado el pago.' },
    { icon: <ShieldCheck className="w-6 h-6 text-blue-400" />, title: 'Cuenta 100% segura', desc: 'Nunca pedimos contraseñas ni accesos a tu cuenta de juego.' },
    { icon: <MessageCircle className="w-6 h-6 text-blue-400" />, title: 'Soporte humano', desc: 'Te atendemos por WhatsApp para resolver dudas y revisar tu comprobante.' },
    { icon: <BadgeCheck className="w-6 h-6 text-blue-400" />, title: 'Precios claros', desc: 'Tarifas fijas, sin comisiones ocultas ni costos sorpresa.' },
    { icon: <Globe className="w-6 h-6 text-blue-400" />, title: 'Pesos o dólares', desc: 'Cambia entre COP y USD con un clic, desde Colombia o el exterior.' },
    { icon: <Sparkles className="w-6 h-6 text-blue-400" />, title: 'Especial Free Fire', desc: 'Recarga diamantes oficiales al instante directamente por tu ID de jugador.' },
  ];
  return (
    <section id="beneficios" className="py-14 sm:py-20 border-b border-blue-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-[0.18em]">
            <span>{t('Por qué elegirnos')}</span>
          </div>
          <h2 className="title-grad-red font-display text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
            {t('Una tienda hecha para jugadores')}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t('Rapidez, seguridad y atención real en cada recarga.')}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {feats.map((f) => (
            <div key={f.title} className="bg-[#100508]/90 border border-blue-950/70 rounded-3xl p-6 group transition-all duration-300 hover:-translate-y-1 hover:border-blue-600/50">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600/30 to-sky-950/40 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-105 transition-transform">
                {f.icon}
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-1.5">{t(f.title)}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{t(f.desc)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/** Franja de métodos de pago */
export const PaymentsStrip: React.FC = () => {
  const { t } = useI18n();
  const methods = ['Bancolombia', 'Nequi', 'PayPal'];
  return (
    <section className="py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#100508]/95 border border-blue-950/70 rounded-3xl px-6 py-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
          <div className="text-center sm:text-left">
            <div className="font-display text-lg font-bold text-white">{t('Paga como prefieras')}</div>
            <div className="text-xs sm:text-sm text-slate-400">{t('Métodos locales e internacionales, con tus datos de pago por WhatsApp.')}</div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {methods.map((m) => (
              <span key={m} className="px-4 py-2 rounded-full text-sm font-bold text-white bg-black/40 border border-blue-900/40 shadow-sm">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/** Llamado final a la acción */
export const FinalCTA: React.FC<{ onScrollToRecharge: () => void }> = ({ onScrollToRecharge }) => {
  const { t } = useI18n();
  return (
    <section className="py-14 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] p-8 sm:p-12 text-center border border-blue-500/30 bg-gradient-to-br from-blue-950/70 via-[#140508] to-[#0c0406] shadow-xl shadow-black/60">
          <div className="relative space-y-4">
            <h2 className="font-display text-2xl sm:text-4xl font-black text-white tracking-tight">
              {t('¿Listo para tu próxima recarga?')}
            </h2>
            <p className="text-slate-200 text-sm sm:text-base max-w-xl mx-auto">
              {t('Ingresa tu ID, escoge tu paquete y recibe tus diamantes en minutos.')}
            </p>
            <button
              onClick={onScrollToRecharge}
              className="mt-2 inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold text-white btn-blood rounded-xl transition-all duration-200 cursor-pointer"
            >
              <span>{t('Recargar Ahora')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
