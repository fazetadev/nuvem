import React, { useEffect, useState } from 'react';
import { formatNumber } from '../utils/rechargeLogic.ts';

const MOCK_RECHARGES = [
  { user: 'MELIODAS', amount: 1166, mins: 13 },
  { user: 'Yei9893', amount: 6160, mins: 17 },
  { user: 'ma***2', amount: 341, mins: 17 },
  { user: 'IS***Z', amount: 572, mins: 1 },
  { user: 'DR***l', amount: 6160, mins: 3 },
  { user: 'IS***Z', amount: 1166, mins: 4 },
  { user: 'Nuv***', amount: 2398, mins: 6 },
  { user: 'P4***', amount: 1166, mins: 8 },
  { user: 'Ra***', amount: 572, mins: 11 },
  { user: 'Ben***', amount: 341, mins: 14 },
];

export const LiveFeed: React.FC = () => {
  const [items, setItems] = useState(MOCK_RECHARGES);

  useEffect(() => {
    const id = window.setInterval(() => {
      setItems((prev) => {
        const next = [...prev];
        const first = next.shift()!;
        next.push({ ...first, mins: Math.max(1, first.mins - 1 + Math.floor(Math.random() * 3)) });
        return next;
      });
    }, 9000);
    return () => clearInterval(id);
  }, []);

  const doubled = [...items, ...items];

  return (
    <div className="live-feed" aria-label="Recargas recientes">
      <div className="live-feed-badge">
        <span className="live-dot" />
        LIVE
      </div>
      <div className="live-feed-track">
        {doubled.map((r, i) => (
          <div className="live-feed-item" key={`${r.user}-${i}`}>
            <span className="live-user">{r.user}</span>
            <span className="live-action">recharged</span>
            <span className="live-amount">{formatNumber(r.amount)} ◆</span>
            <span className="live-time">· {r.mins} min ago</span>
          </div>
        ))}
      </div>
    </div>
  );
};
