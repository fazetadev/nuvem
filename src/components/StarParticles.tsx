import React from 'react';
import type { GameId } from '../types/store.ts';

interface StarParticlesProps {
  game?: GameId;
}

/**
 * Fondo gamer limpio con cuadrícula (cuadritos) en CSS puro.
 * Cero JavaScript, cero canvas, cero imágenes pesadas.
 * 60+ FPS estables en cualquier dispositivo móvil sin lag.
 */
export const StarParticles: React.FC<StarParticlesProps> = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Cuadrícula sutil estilo gamer (fondo de cuadritos) */}
      <div
        className="absolute inset-0 opacity-20 sm:opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(220, 38, 38, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(220, 38, 38, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px',
        }}
      />
    </div>
  );
};

export default StarParticles;
