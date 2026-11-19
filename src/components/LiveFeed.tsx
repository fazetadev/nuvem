import React from 'react';

const ITEMS = [
  'Nuvem Shop - Seguro Y Rapido',
  'Atención rápida - todos los días',
  'Pagos seguros - Nequi & Bancolombia',
  'Soporte 24/7 - respuesta rápida',
  'Diamantes baratos - mejor precio',
  'Robux baratos - entrega inmediata',
  'Bonos incluidos - más diamantes',
  'Sin contraseñas - solo ID o usuario',
  'Entrega prioritaria - en minutos',
  'Comprobante de recarga - siempre',
  'Netflix & CapCut - activación rápida',
  'Robux oficial - 100% seguro',
];

function Row() {
  return (
    <>
      {ITEMS.map((text, i) => (
        <div className="live-feed-item" key={`${i}-${text}`}>
          <span className="live-text">{text}</span>
        </div>
      ))}
    </>
  );
}

export const LiveFeed: React.FC = () => (
  <div className="live-feed" aria-label="Ventajas de la tienda">
    <div className="live-feed-mask full">
      <div className="live-feed-track">
        <Row />
        <Row />
      </div>
    </div>
  </div>
);
