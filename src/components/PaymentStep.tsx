import { useI18n } from '../i18n.tsx';
import React from 'react';
import { CreditCard, Smartphone, Wallet, Building2, Banknote, ShieldCheck, Check, MessageSquare } from 'lucide-react';
import { PaymentMethod } from '../types/store.ts';
import { PAYMENT_METHODS } from '../utils/rechargeLogic.ts';

interface PaymentStepProps {
  selectedPayment: PaymentMethod | null;
  onSelectPayment: (method: PaymentMethod) => void;
  phone: string;
  onPhoneChange: (val: string) => void;
  email: string;
  onEmailChange: (val: string) => void;
  canProceed: boolean;
  stepNumber?: number;
  onProceed: () => void;
}

export const PaymentStep: React.FC<PaymentStepProps> = ({
  selectedPayment,
  onSelectPayment,
  phone,
  onPhoneChange,
  email,
  onEmailChange,
  stepNumber = 3,
}) => {
  const { t } = useI18n();

  const getMethodIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-4 h-4 text-rose-400" />;
      case 'Wallet':
        return <Wallet className="w-4 h-4 text-amber-400" />;
      case 'Building2':
        return <Building2 className="w-4 h-4 text-red-400" />;
      case 'CreditCard':
        return <CreditCard className="w-4 h-4 text-rose-400" />;
      default:
        return <Banknote className="w-4 h-4 text-red-400" />;
    }
  };

  return (
    <div id="metodos-pago" className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#100609] border border-red-950/80 shadow-lg shadow-black/40 space-y-4">
      
      {/* Step Header (matching Screenshot 2: "3 Método de pago") */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3.5 border-b border-red-950/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-red-600/25 border border-red-500/40 flex items-center justify-center text-red-400 font-bold font-mono text-sm shadow-sm">
            {stepNumber}
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              {t("Método de pago")}
            </h2>
            <p className="text-xs text-red-300/80">
              {t("Aceptamos transferencias locales e internacionales sin comisiones extras")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
          <ShieldCheck className="w-4 h-4 text-red-400" />
          <span>{t("Verificación Inmediata")}</span>
        </div>
      </div>

      {/* Payment Methods Grid matching Screenshot 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedPayment?.id === method.id;

          return (
            <div
              key={method.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelectPayment(method)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectPayment(method);
                }
              }}
              className={`relative p-4 rounded-2xl text-left transition-all duration-150 cursor-pointer flex flex-col justify-between group select-none min-h-[110px] ${
                isSelected
                  ? 'bg-gradient-to-b from-red-950/80 via-[#1d070b] to-[#120306] border-2 border-red-500 shadow-xl shadow-red-950/70 ring-2 ring-red-500/40 -translate-y-0.5'
                  : 'bg-[#090305] hover:bg-[#15060a] border border-red-950 hover:border-red-600/60'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'bg-red-950/60 text-red-300 border border-red-900/60'
                    }`}
                  >
                    {getMethodIcon(method.iconName)}
                  </div>
                  <div>
                    <span className="font-extrabold text-white text-sm block">
                      {method.name}
                    </span>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                    isSelected
                      ? 'bg-red-600 border-red-500 text-white shadow-sm'
                      : 'border-red-950 group-hover:border-red-700'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>

              <div className="mt-2.5">
                <p className="text-[11px] text-slate-400 leading-snug">
                  {t(method.shortDesc)}
                </p>
              </div>

              {method.badge && (
                <div className="mt-2">
                  <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-red-300 bg-red-950/90 border border-red-800/40 px-2 py-0.5 rounded">
                    {t(method.badge)}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* WhatsApp / Contact Inputs to receive the voucher */}
      <div className="pt-3 border-t border-red-950/40 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="space-y-1.5">
          <label htmlFor="customer-phone" className="block text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-red-400" />
            <span>{t("Tu WhatsApp / Celular")}</span>
            <span className="text-red-400">*</span>
          </label>
          <input
            id="customer-phone"
            type="tel"
            placeholder={t("Ej: 301 688 6549")}
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl bg-[#080305] border border-red-950/70 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-white placeholder-slate-500 text-xs sm:text-sm font-medium outline-none"
          />
          <span className="text-[10px] text-slate-400 block">
            {t("Para enviarte el comprobante digital de recarga al instante")}
          </span>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="customer-email" className="block text-xs font-bold text-slate-300">
            {t("Correo Electrónico (Opcional)")}
          </label>
          <input
            id="customer-email"
            type="email"
            placeholder={t("tucorreo@ejemplo.com")}
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl bg-[#080305] border border-red-950/70 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-white placeholder-slate-500 text-xs sm:text-sm font-medium outline-none"
          />
          <span className="text-[10px] text-slate-400 block">
            {t("Respaldo digital de tu orden de compra")}
          </span>
        </div>
      </div>

    </div>
  );
};
