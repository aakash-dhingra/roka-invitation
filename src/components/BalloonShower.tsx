import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Balloon {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  sway: number;
}

const BALLOON_COLORS = [
  '#FFB7C5', // soft pink
  '#FF8DA1', // warm rose
  '#E75480', // dark pink
  '#F49AC2', // pastel magenta
  '#FFC0CB', // blush pink
];

export function BalloonShower({ trigger }: { trigger: boolean }) {
  const balloons = useMemo<Balloon[]>(() => {
    if (!trigger) return [];
    return Array.from({ length: 85 }, (_, i) => ({
      id: i,
      left: Math.random() * 92 + 4, 
      size: Math.round(30 + Math.random() * 45), 
      duration: 3.0 + Math.random() * 3.5, 
      delay: Math.random() * 1.8, 
      color: BALLOON_COLORS[i % BALLOON_COLORS.length],
      sway: Math.round(40 + Math.random() * 60), 
    }));
  }, [trigger]);

  if (!trigger) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      {balloons.map(b => (
        <motion.div
          key={b.id}
          initial={{
            y: '105vh',
            x: `${b.left}vw`,
            opacity: 0.9,
            scale: 0.9,
          }}
          animate={{
            y: '-25vh',
            // Sway left & right as it ascends
            x: [`${b.left}vw`, `${b.left + (b.sway / 10)}vw`, `${b.left - (b.sway / 10)}vw`, `${b.left}vw`],
            opacity: [0.9, 0.9, 0.8, 0],
            scale: [0.9, 1, 1.05, 1],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            ease: 'easeOut',
          }}
          style={{
            position: 'absolute',
            width: `${b.size}px`,
            height: `${b.size * 1.3}px`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Balloon Body */}
          <div
            style={{
              width: '100%',
              height: '85%',
              borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
              background: `radial-gradient(circle at 30% 30%, #FFF 0%, ${b.color} 40%, rgba(0,0,0,0.15) 100%)`,
              position: 'relative',
              boxShadow: 'inset -5px -5px 15px rgba(0,0,0,0.15), 0 8px 20px rgba(0,0,0,0.1)',
            }}
          >
            {/* Balloon Knot/Tie at bottom */}
            <div
              style={{
                position: 'absolute',
                bottom: '-4px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '0',
                height: '0',
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderBottom: `6px solid ${b.color}`,
              }}
            />
          </div>
          {/* Balloon string */}
          <div
            style={{
              width: '1px',
              height: '60px',
              background: 'rgba(0,0,0,0.15)',
              transformOrigin: 'top center',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
