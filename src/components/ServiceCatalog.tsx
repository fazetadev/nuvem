import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

const items = [
  { name: 'Pase Free Fire', price: '6.800', image: 'https://i.ibb.co/HJ8h56n/pase-card.jpg', detail: 'Pase para tu cuenta de Free Fire' },
  { name: 'Netflix Premium', price: '28.000', image: 'https://i.ibb.co/ksLWm7Cw/netflix.jpg', detail: 'Plan Premium' },
  { name: 'Netflix Estándar', price: '14.000', image: 'https://i.ibb.co/ksLWm7Cw/netflix.jpg', detail: 'Plan Estándar' },
  { name: 'CapCut Pro', price: '40.000', image: 'https://i.ibb.co/DXDPjfZ/capcut.jpg', detail: 'Suscripción Pro' },
  { name: 'CapCut Estándar', price: '20.000', image: 'https://i.ibb.co/DXDPjfZ/capcut.jpg', detail: 'Suscripción Estándar' },
];

const phone = '573016886549';
export const ServiceCatalog: React.FC = () => (
  <section className="service-section max-w-6xl mx-auto px-4 sm:px-6" id="otros-servicios">
    <div className="service-heading">
      <div>
        <span className="service-eyebrow"><Sparkles size={13} /> TAMBIÉN EN NUVEM SHOP</span>
        <h2>Más de lo que buscas<span>.</span></h2>
        <p>Servicios digitales seleccionados, con precios claros y atención por WhatsApp.</p>
      </div>
    </div>
    <div className="service-grid">
      {items.map((item) => (
        <article className="service-card" key={item.name}>
          <div className="service-image"><img src={item.image} alt={item.name} loading="lazy" /></div>
          <div className="service-info">
            <span>{item.detail}</span>
            <h3>{item.name}</h3>
            <strong>$ {item.price} <small>COP</small></strong>
            <a href={`https://wa.me/${phone}?text=${encodeURIComponent(`Hola Nuvem Shop, quiero comprar ${item.name} por $${item.price} COP.`)}`} target="_blank" rel="noreferrer">
              Consultar y comprar <ArrowUpRight size={14} />
            </a>
          </div>
        </article>
      ))}
    </div>
  </section>
);
