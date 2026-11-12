import React, { useState } from 'react';
import { formatNumber } from '../utils/rechargeLogic.ts';

type Period = 'day' | 'week' | 'month' | 'year';

const RANKINGS: Record<Period, { name: string; amount: number; avatar?: string }[]> = {
  day: [
    { name: 'DR***l', amount: 12320 },
    { name: 'm0MegaGamer', amount: 12320 },
    { name: 'P4***', amount: 6501 },
    { name: 'Benitoslev', amount: 6160 },
    { name: 'Da***9', amount: 6160 },
    { name: 'Ra***', amount: 6160 },
    { name: 'Jh***', amount: 6160 },
    { name: 'Carlos21k09', amount: 6160 },
    { name: 'L***R', amount: 6160 },
    { name: 'w***k', amount: 6160 },
  ],
  week: [
    { name: 'P4rciv4l', amount: 48200 },
    { name: 'DR***l', amount: 36960 },
    { name: 'm0MegaGamer', amount: 24640 },
    { name: 'Ali***', amount: 18480 },
    { name: 'Benitoslev', amount: 12320 },
    { name: 'P4***', amount: 11660 },
    { name: 'Carlos21k09', amount: 9280 },
    { name: 'Jh***', amount: 8500 },
    { name: 'Da***9', amount: 7200 },
    { name: 'Ra***', amount: 6160 },
  ],
  month: [
    { name: 'P4rciv4l', amount: 186000 },
    { name: 'DR***l', amount: 98000 },
    { name: 'Ali***', amount: 72000 },
    { name: 'm0MegaGamer', amount: 54000 },
    { name: 'Benitoslev', amount: 41000 },
    { name: 'Carlos21k09', amount: 32000 },
    { name: 'P4***', amount: 28000 },
    { name: 'Jh***', amount: 21000 },
    { name: 'L***R', amount: 18000 },
    { name: 'w***k', amount: 15000 },
  ],
  year: [
    { name: 'P4rciv4l', amount: 14636973 },
    { name: 'P4 TDA', amount: 607595 },
    { name: 'Ali***', amount: 341594 },
    { name: 'DR***l', amount: 210000 },
    { name: 'm0MegaGamer', amount: 180000 },
    { name: 'Benitoslev', amount: 95000 },
    { name: 'Carlos21k09', amount: 72000 },
    { name: 'P4***', amount: 58000 },
    { name: 'Jh***', amount: 45000 },
    { name: 'L***R', amount: 38000 },
  ],
};

const PERIODS: { id: Period; label: string }[] = [
  { id: 'day', label: 'DAY' },
  { id: 'week', label: 'WEEK' },
  { id: 'month', label: 'MONTH' },
  { id: 'year', label: 'YEAR' },
];

export const TopBuyers: React.FC = () => {
  const [period, setPeriod] = useState<Period>('day');
  const list = RANKINGS[period];

  return (
    <aside className="top-buyers">
      <div className="top-buyers-head">
        <span className="top-buyers-title">♛ TOP BUYERS</span>
        <div className="top-buyers-tabs">
          {PERIODS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={period === p.id ? 'active' : ''}
              onClick={() => setPeriod(p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
      <ol className="top-buyers-list">
        {list.map((row, i) => (
          <li key={`${period}-${row.name}-${i}`} className={i < 3 ? `rank-${i + 1}` : ''}>
            <span className="rank-num">{i + 1}</span>
            <span className="rank-avatar">{row.name.slice(0, 2).toUpperCase()}</span>
            <span className="rank-name">{row.name}</span>
            <span className="rank-amount">{formatNumber(row.amount)} ◆</span>
          </li>
        ))}
      </ol>
      <button type="button" className="top-buyers-more">VIEW FULL RANKING →</button>
    </aside>
  );
};
