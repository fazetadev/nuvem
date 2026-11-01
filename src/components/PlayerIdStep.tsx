import { useI18n } from '../i18n.tsx';
import React, { useState } from 'react';
import { HelpCircle, Check, X, Sparkles, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';
import { GAME_INFO, validateAccount } from '../utils/rechargeLogic.ts';
import type { GameId } from '../types/store.ts';

interface PlayerIdStepProps {
  playerId: string;
  onPlayerIdChange: (id: string) => void;
  game?: GameId;
}

export const PlayerIdStep: React.FC<PlayerIdStepProps> = ({
  playerId,
  onPlayerIdChange,
  game = 'freefire',
}) => {
  const { t } = useI18n();
  const info = GAME_INFO[game] || GAME_INFO.freefire;
  const [showGuide, setShowGuide] = useState(false);

  // Estados locales para la validación visual del ID
  const [isValidating, setIsValidating] = useState(false);
  const [isValidated, setIsValidated] = useState(false);

  const validation = validateAccount(game, playerId);
  const isInputValid = validation.isValid;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val: string;
    if (game === 'roblox') {
      val = e.target.value.replace(/[^a-zA-Z0-9_]/g, '').slice(0, 20);
    } else {
      val = e.target.value.replace(/\D/g, '').slice(0, 12);
    }
    onPlayerIdChange(val);
    if (isValidated) {
      setIsValidated(false);
    }
  };

  const handleClear = () => {
    onPlayerIdChange('');
    setIsValidated(false);
    setIsValidating(false);
  };

  const handleValidateClick = () => {
    if (!isInputValid || isValidating) return;
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      setIsValidated(true);
    }, 450);
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#100609] border border-red-950/80 shadow-lg shadow-black/40 space-y-4">
      
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3.5 border-b border-red-950/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-red-600/25 border border-red-500/40 flex items-center justify-center text-red-400 font-bold font-mono text-sm shadow-sm">
            1
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                {t("Ingresar")}
              </h2>
              <span className="hidden sm:inline-block text-[10px] font-bold text-red-400 bg-red-950/80 border border-red-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                {t("100% Automático")}
              </span>
            </div>
            <p className="text-xs text-red-300/80">
              {t(info.stepSub)}
            </p>
          </div>
        </div>

        {/* How to find ID button */}
        <button
          type="button"
          onClick={() => setShowGuide(!showGuide)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-300 transition-colors cursor-pointer self-start sm:self-auto py-1 px-2.5 rounded-lg hover:bg-red-950/50"
        >
          <HelpCircle className="w-4 h-4" />
          <span>{showGuide ? t('Ocultar guía') : (game === 'roblox' ? t('¿Dónde encuentro mi usuario?') : t('¿Dónde encuentro mi ID?'))}</span>
        </button>
      </div>

      {/* Guide expander */}
      {showGuide && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-red-950/60 via-[#18080c] to-[#0e0406] border border-red-700/40 text-xs text-slate-300 space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Sparkles className="w-4 h-4 text-red-400" />
            <span>{game === 'roblox' ? t('¿Cómo encontrar tu usuario en Roblox?') : t('¿Cómo encontrar tu ID en Free Fire?')}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {(game === 'roblox'
              ? [
                  ['PASO 1', 'Abre Roblox e inicia sesión en tu cuenta.'],
                  ['PASO 2', 'En tu pantalla de inicio o perfil, tu nombre de usuario empieza con @.'],
                  ['PASO 3', 'Escribe aquí tu nombre de usuario sin contraseñas.'],
                ]
              : [
                  ['PASO 1', 'Abre Free Fire y toca tu Perfil / Avatar en la esquina superior izquierda.'],
                  ['PASO 2', 'En la pestaña Básica, localiza tu UID debajo de tu nombre.'],
                  ['PASO 3', 'Toca el botón Copiar al lado del número y pégalo aquí.'],
                ]
            ).map(([label, desc]) => (
              <div key={label} className="p-3 rounded-xl bg-[#080204] border border-red-950/70 space-y-1">
                <span className="font-mono text-red-400 font-bold block text-[11px]">{t(label)}</span>
                <p className="text-slate-300 text-xs">{t(desc)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Input Form with Validar ID button for Free Fire */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label htmlFor="player-id-input" className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <span>{t(info.accountField)}</span>
            <span className="text-red-400">*</span>
            <HelpCircle className="w-3.5 h-3.5 text-slate-400 cursor-pointer" onClick={() => setShowGuide(!showGuide)} />
          </label>
          <span className="text-[11px] text-red-400 font-mono">
            {game === 'roblox'
              ? (playerId ? t('{n} caracteres', { n: playerId.length }) : t('3 a 20 caracteres'))
              : (playerId ? t('{n} dígitos', { n: playerId.length }) : t('8 a 12 dígitos'))}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 items-stretch">
          <div className="relative flex-1">
            <input
              id="player-id-input"
              type="text"
              inputMode={game === 'roblox' ? 'text' : 'numeric'}
              autoCapitalize="none"
              autoCorrect="off"
              placeholder={t(info.placeholder)}
              value={playerId}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && game === 'freefire') {
                  e.preventDefault();
                  handleValidateClick();
                }
              }}
              className={`w-full h-12 pl-4 pr-10 rounded-xl bg-[#080305] border text-white placeholder-slate-500 font-mono text-sm sm:text-base tracking-wider transition-all outline-none ${
                isValidated
                  ? 'border-emerald-500/70 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20'
                  : isInputValid
                  ? 'border-red-800/80 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                  : playerId
                  ? 'border-red-950/90 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                  : 'border-red-950/70 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
              }`}
            />

            {playerId && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-red-950/60 transition-colors cursor-pointer"
                title={t("Borrar ID")}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Botón Validar ID para Free Fire */}
          {game === 'freefire' && (
            <button
              type="button"
              onClick={handleValidateClick}
              disabled={!isInputValid || isValidating}
              className={`h-12 px-6 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 shrink-0 cursor-pointer flex items-center justify-center gap-2 shadow-md select-none ${
                isValidating
                  ? 'bg-red-950/70 text-red-300 border border-red-800/50 cursor-wait opacity-80'
                  : isValidated
                  ? 'bg-emerald-600 text-white shadow-emerald-950/50 ring-1 ring-emerald-400/40'
                  : isInputValid
                  ? 'bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white shadow-red-950/60 active:scale-95'
                  : 'bg-red-950/40 text-slate-500 border border-red-950/60 cursor-not-allowed opacity-60'
              }`}
            >
              {isValidating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-red-300" />
                  <span>{t("Validando ID...")}</span>
                </>
              ) : isValidated ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{t("ID Validado")}</span>
                </>
              ) : (
                <span>{t("Validar ID")}</span>
              )}
            </button>
          )}
        </div>

        {/* Caption */}
        <div className="flex items-center justify-between text-xs pt-0.5">
          <p className="text-slate-400 text-[11px] sm:text-xs">
            {game === 'roblox'
              ? t("Escribe tu nombre de usuario de Roblox. No requerimos contraseña ni datos de acceso a tu cuenta.")
              : t("Encuentra tu ID numérico en la esquina superior de tu perfil dentro del juego.")}
          </p>

          <div className="hidden sm:flex items-center gap-1.5 text-slate-400 text-[11px] shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
            <span>{t("Anti-Ban Garantizado")}</span>
          </div>
        </div>

        {/* Tarjeta verde de confirmación con aviso para verificar en el chat de WhatsApp */}
        {(isValidated || (game === 'roblox' && isInputValid)) && (
          <div
            aria-live="polite"
            className="p-3.5 sm:p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/60 text-emerald-200 shadow-xl shadow-emerald-950/40 space-y-1.5 animate-in fade-in duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="font-extrabold text-white text-sm tracking-wide">
                  {game === 'roblox' ? t("Usuario verificado") : t("ID verificado")}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                {game === 'roblox' ? t("Usuario Válido") : t("ID Válido")}
              </span>
            </div>

            <p className="text-xs text-emerald-200/90 leading-relaxed pl-7">
              {game === 'roblox'
                ? t("Confirmaremos tu usuario por WhatsApp al enviar tu comprobante.")
                : t("Confirmaremos tu nombre por WhatsApp al enviar tu comprobante.")}
            </p>
          </div>
        )}

      </div>

    </div>
  );
};
