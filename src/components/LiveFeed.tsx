import React from 'react';

/** Mensajes mixtos: actividad de la tienda, no solo "X recargó" falso */
const ITEMS = [
  { kind: 'ff', text: 'Paquete 1.166 diamantes · listo para entrega' },
  { kind: 'rb', text: 'Robux 400 · pedido confirmado' },
  { kind: 'ok', text: 'Pago Nequi verificado' },
  { kind: 'ff', text: '572 diamantes · en proceso' },
  { kind: 'rb', text: 'Robux 800 · entrega por usuario' },
  { kind: 'ok', text: 'Soporte respondió en menos de 2 min' },
  { kind: 'ff', text: 'Paquete popular 1.166 · disponible' },
  { kind: 'rb', text: 'Robux 1.700 · stock listo' },
  { kind: 'ok', text: 'Bancolombia · sin comisión' },
  { kind: 'ff', text: '6.160 diamantes · bono incluido' },
  { kind: 'rb', text: 'Robux 100 · recarga rápida' },
  { kind: 'ok', text: 'Sin contraseñas · solo ID o usuario' },
];

export const LiveFeed: React.FC = () => {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="live-feed" aria-label="Actividad de la tienda">
      <div className="live-feed-badge">
        <span className="live-dot" />
        EN VIVO
      </div>
      <div className="live-feed-track">
        {doubled.map((item, i) => (
          <div className={`live-feed-item kind-${item.kind}`} key={`${item.kind}-${i}`}>
            {item.kind === 'ff' && <span className="live-chip ff">◆ FF</span>}
            {item.kind === 'rb' && <span className="live-chip rb">R$</span>}
            {item.kind === 'ok' && <span className="live-chip ok">✓</span>}
            <span className="live-text">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
