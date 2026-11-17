import { useI18n } from '../i18n.tsx';
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Clock, Flame, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GameId } from '../types/store.ts';

import { IMAGES } from '../config/images';

interface HeroProps {
  onScrollToRecharge: () => void;
  game: GameId;
  onSelectGame: (g: GameId) => void;
}

interface SlideItem {
  id: string;
  game: GameId;
  title: string;
  sub: string;
  img: string;
}

// 3 banners actualizados por el usuario
const SLIDES: SlideItem[] = [
  {
    id: 'slide1',
    game: 'freefire',
    title: 'Nuvem Store - Recargas Para Free Fire & Robux',
    sub: 'Recargas directas con entrega inmediata 24/7',
    img: IMAGES.slide1,
  },
  {
    id: 'slide2',
    game: 'freefire',
    title: 'Nuvem Store - Recargas Para Free Fire & Robux',
    sub: 'Precios justos en COP y atención rápida',
    img: IMAGES.slide2,
  },
  {
    id: 'slide3',
    game: 'freefire',
    title: 'Nuvem Store - Recargas Para Free Fire & Robux',
    sub: 'Entrega en minutos sin intermediarios',
    img: IMAGES.slide3,
  },
];

export const Hero: React.FC<HeroProps> = ({ onScrollToRecharge, onSelectGame }) => {
  const { t } = useI18n();
  const slides = SLIDES;

  // Default active slide: 0
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto rotate carousel every 6s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((curr) => (curr + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrev = () => {
    setActiveSlide((curr) => (curr - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setActiveSlide((curr) => (curr + 1) % slides.length);
  };

  const prevIdx = (activeSlide - 1 + slides.length) % slides.length;
  const nextIdx = (activeSlide + 1) % slides.length;

  const prevSlide = slides[prevIdx];
  const currSlide = slides[activeSlide];
  const nextSlide = slides[nextIdx];

  const handleSlideClick = (item: SlideItem) => {
    onSelectGame(item.game);
    onScrollToRecharge();
  };

  return (
    <section className="relative overflow-hidden pt-4 pb-10 sm:pt-6 sm:pb-14 border-b border-blue-950/40">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 relative z-10">
        
        {/* COVERFLOW CAROUSEL (Matching image_492b0cd2.png exactly: 3 slides visible) */}
        <div className="relative w-full overflow-hidden py-2 select-none">
          <div className="relative w-full max-w-6xl mx-auto h-[200px] sm:h-[280px] md:h-[340px] lg:h-[370px] flex items-center justify-center">
            
            {/* Left Slide (Peek - Dimmed) */}
            <div
              onClick={handlePrev}
              title={prevSlide.title}
              className="absolute left-1/2 -translate-x-[150%] w-[72%] sm:w-[58%] h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl opacity-30 brightness-[0.3] hover:opacity-50 hover:brightness-50 transition-all duration-500 ease-out cursor-pointer z-10 border border-blue-950/40 bg-black"
            >
              <img
                src={prevSlide.img}
                alt={prevSlide.title}
                className="w-full h-full object-cover object-center"
                decoding="async"
              />
            </div>

            {/* Center Slide (Active - Pure Clean Banner Graphic) */}
            <div
              onClick={() => handleSlideClick(currSlide)}
              className="relative w-[72%] sm:w-[58%] h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.95)] z-20 border border-blue-600/30 hover:border-blue-500/60 transition-all duration-500 ease-out cursor-pointer group bg-black"
            >
              <img
                key={currSlide.id}
                src={currSlide.img}
                alt={currSlide.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                decoding="async"
              />
            </div>

            {/* Right Slide (Peek - Dimmed) */}
            <div
              onClick={handleNext}
              title={nextSlide.title}
              className="absolute left-1/2 translate-x-[50%] w-[72%] sm:w-[58%] h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl opacity-30 brightness-[0.3] hover:opacity-50 hover:brightness-50 transition-all duration-500 ease-out cursor-pointer z-10 border border-blue-950/40 bg-black"
            >
              <img
                src={nextSlide.img}
                alt={nextSlide.title}
                className="w-full h-full object-cover object-center"
                decoding="async"
              />
            </div>

            {/* Circular Navigation Arrow: Left (centered on left peek area) */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Anterior slide"
              className="absolute left-3 sm:left-6 md:left-10 lg:left-14 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/90 hover:bg-black text-white border border-white/20 flex items-center justify-center shadow-lg cursor-pointer transition-all hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Circular Navigation Arrow: Right (centered on right peek area) */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Siguiente slide"
              className="absolute right-3 sm:right-6 md:right-10 lg:right-14 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/90 hover:bg-black text-white border border-white/20 flex items-center justify-center shadow-lg cursor-pointer transition-all hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

          </div>

          {/* Pagination Indicators matching image_492b0cd2.png */}
          <div className="flex items-center justify-center gap-2 mt-4 sm:mt-5">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeSlide === idx
                    ? 'w-7 sm:w-8 h-2 bg-gradient-to-r from-blue-600 to-sky-600 shadow-[0_0_12px_rgba(239,68,68,0.8)]'
                    : 'w-2 h-2 bg-slate-600/80 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* HERO TITLE & INTRO: "Bienvenido a nuvem Store" (matching Screenshot 1) */}
        <div className="text-center max-w-3xl mx-auto space-y-3 pt-4 sm:pt-6">
          
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            {t("Bienvenido a nuvem")}{' '}
            <span className="title-grad-red font-black">
              {t("Store")}
            </span>
          </h1>

          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-sky-500 rounded-full mx-auto" />

          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed pt-1">
            {t("Tu plataforma gamer favorita en Colombia. Recargas oficiales con acreditación inmediata por UID en Free Fire y usuario en Roblox. Sin contraseñas ni intermediarios.")}
          </p>

          {/* Quick Value Props Strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-2 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 text-blue-300 font-semibold">
              <Flame className="w-3.5 h-3.5 text-blue-500" />
              {t("Entrega Inmediata 24/7")}
            </span>
            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-blue-800/80" />
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {t("100% Seguro y Anti-Ban")}
            </span>
            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-blue-800/80" />
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              {t("Pagas por Nequi, Bancolombia o PayPal")}
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
