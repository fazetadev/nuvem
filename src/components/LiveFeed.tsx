import React from 'react';

const ITEMS = [
  { kind: 'ok', text: 'Pagos seguros · Nequi & Bancolombia' },
  { kind: 'ok', text: 'Soporte 24/7 · respuesta rápida' },
  { kind: 'ff', text: 'Diamantes baratos · mejor precio' },
  { kind: 'rb', text: 'Robux baratos · entrega inmediata' },
  { kind: 'ok', text: 'Venta de cuentas · verificadas' },
  { kind: 'ok', text: 'Comprobante de diamantes · siempre' },
  { kind: 'ok', text: 'Promociones activas · no te las pierdas' },
  { kind: 'ff', text: 'Sin contraseñas · solo ID o usuario' },
  { kind: 'rb', text: 'Recargas digitales · stock listo' },
  { kind: 'ok', text: 'Entrega prioritaria · en minutos' },
  { kind: 'ff', text: 'Bonos incluidos · más diamantes' },
  { kind: 'rb', text: 'Robux oficial · 100% seguro' },
];

function Row() {
  return (
    <>
      {ITEMS.map((item, i) => (
        <div className={`live-feed-item kind-${item.kind}`} key={`${item.kind}-${i}`}>
          {item.kind === 'ff' && <span className="live-chip ff">◆ FF</span>}
          {item.kind === 'rb' && <span className="live-chip rb">R$</span>}
          {item.kind === 'ok' && <span className="live-chip ok">✓</span>}
          <span className="live-text">{item.text}</span>
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
