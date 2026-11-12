import React from 'react';
import { formatNumber } from '../utils/rechargeLogic.ts';

const TOP3 = [
  { place: 1, name: 'P4rciv4l', amount: 14636973, badge: '👑' },
  { place: 2, name: 'P4 TDA', amount: 607595, badge: '🎭' },
  { place: 3, name: 'Ali***', amount: 341594, badge: '🔥' },
];

export const HallOfFame: React.FC = () => (
  <section className="hall-of-fame">
    <div className="hall-head">
      <span>♛</span>
      <h3>HALL OF FAME · TOP BUYERS</h3>
      <span>♛</span>
    </div>
    <div className="hall-podium">
      {TOP3.map((p) => (
        <div key={p.place} className={`podium-card place-${p.place}`}>
          <span className="podium-rank">{p.place}</span>
          <span className="podium-badge">{p.badge}</span>
          <span className="podium-name">{p.name}</span>
          <span className="podium-amount">{formatNumber(p.amount)} ◆</span>
        </div>
      ))}
    </div>
  </section>
);
