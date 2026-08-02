import { useMemo } from 'react';

const PETAL_SVG = `<svg viewBox="0 0 40 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20 2 C10 8, 2 18, 2 28 C2 40, 10 48, 20 48 C30 48, 38 40, 38 28 C38 18, 30 8, 20 2Z" opacity="0.85"/><path d="M20 2 C25 14, 35 20, 38 28" stroke="rgba(255,255,255,0.3)" stroke-width="1" fill="none"/></svg>`;

const PETAL_COLORS = [
  '#E8A0B0', '#D4607A', '#C04870', '#E8B4C0', '#C0456A',
  '#F0C0CC', '#D86080', '#B83060', '#EAA0B8', '#CC5578',
];

const PETAL_STYLE = `
@keyframes petalFall {
  0%   { transform: translateY(-60px) rotate(var(--r0)) scaleX(var(--sx)); opacity: 1; }
  80%  { opacity: 0.7; }
  100% { transform: translateY(110vh) rotate(var(--r1)) scaleX(var(--sx)); opacity: 0; }
}
@keyframes petalSway {
  0%, 100% { margin-left: 0px; }
  25%       { margin-left: calc(var(--sw) * 1px); }
  75%       { margin-left: calc(var(--sw) * -1px); }
}
.petal-el {
  position: fixed;
  top: 0;
  animation:
    petalFall var(--dur) var(--delay) linear infinite,
    petalSway calc(var(--dur) * 0.6) var(--delay) ease-in-out infinite;
  pointer-events: none;
  will-change: transform, opacity;
}
`;

export function PetalRain({ count = 25 }: { count?: number }) {
  const petals = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: (Math.random() * 15).toFixed(2),
      duration: (6 + Math.random() * 8).toFixed(2),
      size: Math.round(12 + Math.random() * 16),
      r0: Math.round(Math.random() * 360),
      r1: Math.round(360 + Math.random() * 360),
      sx: (0.6 + Math.random() * 0.6).toFixed(2),
      sw: Math.round(15 + Math.random() * 35),
      color: PETAL_COLORS[i % PETAL_COLORS.length],
    })),
    [count]
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PETAL_STYLE }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 9997, pointerEvents: 'none', overflow: 'hidden' }}>
        {petals.map(p => (
          <div
            key={p.id}
            className="petal-el"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 1.3,
              color: p.color,
              '--dur': `${p.duration}s`,
              '--delay': `${p.delay}s`,
              '--r0': `${p.r0}deg`,
              '--r1': `${p.r1}deg`,
              '--sx': p.sx,
              '--sw': p.sw,
            } as React.CSSProperties}
            dangerouslySetInnerHTML={{ __html: PETAL_SVG }}
          />
        ))}
      </div>
    </>
  );
}
