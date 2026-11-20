import { useI18n } from '../i18n.tsx';
import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const TrustAndFaqSection: React.FC = () => {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: t('¿Piden mi contraseña o datos de acceso a Free Fire?'),
      a: t('Nunca. En Nuvem Store jamás solicitamos contraseñas, correos de Google, Facebook ni accesos privados. La recarga se realiza de forma directa mediante tu UID (ID de Jugador público) en Free Fire. Tu cuenta permanece completamente segura en tus manos.'),
    },
    {
      q: t('¿Cuánto tiempo tarda en llegar mi recarga de diamantes?'),
      a: t('El proceso toma en promedio entre 1 y 3 minutos una vez validado tu pago. En casos de eventos masivos o actualizaciones puede tardar hasta 5 minutos como máximo.'),
    },
    {
      q: t('¿Qué medios de pago puedo utilizar en Colombia?'),
      a: t('Aceptamos Nequi, transferencias directas por App Bancolombia (o código QR) y PayPal internacional. Sin comisiones abusivas.'),
    },
    {
      q: t('¿Puedo sufrir baneo o suspensión en Free Fire?'),
      a: t('Para nada. Nuestras recargas se procesan mediante canales legítimos y pasarelas de recarga autorizadas. Cuentas con 0% riesgo de baneo o diamantes negativos.'),
    },
    {
      q: t('¿Nuvem Store es una tienda oficial de Garena?'),
      a: t('Nuvem Store NO es una tienda oficial de Garena; somos revendedores independientes. Distribuimos recargas directas por UID y métodos legítimos para ofrecerte tarifas justas en Colombia con máxima rapidez, sin intermediarios riesgosos ni pedir jamás contraseñas.'),
    },
    {
      q: t('¿Qué hago si escribí mal mi ID o tengo un problema?'),
      a: t('Nuestro equipo de soporte humano está disponible todos los días en WhatsApp (+57 301 420 0366). Si nos contactas inmediatamente antes de procesar el pedido, corregimos tu ID al instante.'),
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-12 sm:py-16 border-b border-blue-950/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* FAQ Section */}
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-blue-400" />
              <span>{t("Resuelve tus Dudas")}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black title-grad-red tracking-tight">
              {t("Preguntas Frecuentes")}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
              {t("Todo lo que necesitas saber sobre nuestras recargas, tiempos de entrega y métodos de pago.")}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={idx}
                  className={`rounded-2xl transition-all border ${
                    isOpen
                      ? 'bg-[#15070a] border-blue-700/60 shadow-lg shadow-blue-950/40'
                      : 'bg-[#0d0406] border-blue-950/60 hover:border-blue-800/60'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-sm sm:text-base font-bold text-white tracking-tight">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-blue-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-blue-300' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-blue-950/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
