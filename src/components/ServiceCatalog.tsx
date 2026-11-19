import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { OFFICIAL_PHONE } from '../utils/rechargeLogic.ts';

interface ServicePlan {
  id: string;
  serviceName: string;
  planName: string;
  description: string;
  image: string;
  price: string;
}

const PLANS: ServicePlan[] = [
  {
    id: 'netflix-estandar',
    serviceName: 'Netflix',
    planName: 'Estándar',
    description: 'Planes de entretenimiento',
    image: 'https://i.ibb.co/ksLWm7Cw/netflix.jpg',
    price: '14.000',
  },
  {
    id: 'netflix-premium',
    serviceName: 'Netflix',
    planName: 'Premium',
    description: 'Planes de entretenimiento',
    image: 'https://i.ibb.co/ksLWm7Cw/netflix.jpg',
    price: '28.000',
  },
  {
    id: 'capcut-estandar',
    serviceName: 'CapCut',
    planName: 'Estándar',
    description: 'Herramientas para crear contenido',
    image: 'https://i.ibb.co/DXDPjfZ/capcut.jpg',
    price: '20.000',
  },
  {
    id: 'capcut-pro',
    serviceName: 'CapCut',
    planName: 'Pro',
    description: 'Herramientas para crear contenido',
    image: 'https://i.ibb.co/DXDPjfZ/capcut.jpg',
    price: '40.000',
  },
];

/**
 * Catálogo de servicios digitales, mostrado con el mismo "método" visual que las
 * tarjetas de diamantes/Robux: cada plan es una tarjeta seleccionable que lleva
 * directo a WhatsApp, igual que la tarjeta del Pase de Free Fire.
 */
export const ServiceCatalogGrid: React.FC = () => (
  <div className="packages-grid theme-social">
    {PLANS.map((plan, index) => (
      <a
        key={plan.id}
        className="package-card pass-package-card"
        href={`https://wa.me/${OFFICIAL_PHONE}?text=${encodeURIComponent(
          `Hola Nuvem Shop, quiero ${plan.serviceName} ${plan.planName} por $${plan.price} COP.`
        )}`}
        target="_blank"
        rel="noreferrer"
        style={{ animationDelay: `${index * 55}ms` }}
      >
        <span className="package-tag pass-tag">
          <Sparkles size={10} />
          {plan.serviceName.toUpperCase()}
        </span>
        <div className="package-art pass-art">
          <img src={plan.image} alt={plan.serviceName} loading="lazy" />
        </div>
        <div className="package-amount pass-title">{plan.planName}</div>
        <div className="package-bonus muted">{plan.description}</div>
        <div className="package-price">
          $ {plan.price}
          <small> COP</small>
        </div>
        <span className="pass-buy-link">
          Consultar <ArrowUpRight size={13} />
        </span>
      </a>
    ))}
  </div>
);
