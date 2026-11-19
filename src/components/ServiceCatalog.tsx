import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { OFFICIAL_PHONE } from '../utils/rechargeLogic.ts';

const services = [
  {
    name: 'Netflix',
    image: 'https://i.ibb.co/ksLWm7Cw/netflix.jpg',
    description: 'Planes de entretenimiento',
    plans: [{ name: 'Estándar', price: '14.000' }, { name: 'Premium', price: '28.000' }],
  },
  {
    name: 'CapCut',
    image: 'https://i.ibb.co/DXDPjfZ/capcut.jpg',
    description: 'Herramientas para crear contenido',
    plans: [{ name: 'Estándar', price: '20.000' }, { name: 'Pro', price: '40.000' }],
  },
];

export const ServiceCatalog: React.FC = () => (
  <section className="service-section max-w-6xl mx-auto px-4 sm:px-6" id="servicios-digitales">
    <div className="service-heading">
      <div>
        <span className="service-eyebrow"><Sparkles size={13} /> SERVICIOS DIGITALES</span>
        <h2>También encuentras en <em>Nuvem</em><span>.</span></h2>
        <p>Elige un plan y consúltalo directamente con nuestro equipo.</p>
      </div>
    </div>
    <div className="service-grid">
      {services.map((service) => (
        <article className="service-card" key={service.name}>
          <div className="service-brand">
            <div className="service-image"><img src={service.image} alt={service.name} loading="lazy" /></div>
            <div className="service-brand-copy"><h3>{service.name}</h3><span>{service.description}</span></div>
          </div>
          <div className="service-plans">
            {service.plans.map((plan) => (
              <div className="service-plan" key={plan.name}>
                <div><span>{plan.name}</span><strong>$ {plan.price} <small>COP</small></strong></div>
                <a
                  aria-label={`Consultar ${service.name} ${plan.name}`}
                  href={`https://wa.me/${OFFICIAL_PHONE}?text=${encodeURIComponent(`Hola Nuvem Shop, quiero ${service.name} ${plan.name} por $${plan.price} COP.`)}`}
                  target="_blank"
                  rel="noreferrer"
                ><ArrowUpRight size={16} /></a>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  </section>
);
