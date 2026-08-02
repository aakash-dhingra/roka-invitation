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

interface ConfettiPiece {
  id: number;
  x: string;
  y: string;
  targetX: number;
  targetY: number;
  color: string;
  size: number;
  rotation: number;
}

const BALLOON_COLORS = [
  '#FFB7C5', // soft pink
  '#FF8DA1', // warm rose
  '#E75480', // dark pink
  '#F49AC2', // pastel magenta
  '#FFC0CB', // blush pink
];

const CONFETTI_COLORS = ['#FFC20E', '#FF7A00', '#E75480', '#4CAF50', '#00BCD4', '#FFFDF9'];

export function BalloonShower({ trigger }: { trigger: boolean }) {
  // Generate 85 balloons
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

  // Generate 50 confetti pieces shooting from left and right sides
  const confetti = useMemo<ConfettiPiece[]>(() => {
    if (!trigger) return [];
    return Array.from({ length: 60 }, (_, i) => {
      const isLeft = i % 2 === 0;
      return {
        id: i,
        x: isLeft ? '-5vw' : '105vw',
        y: '80vh',
        targetX: isLeft ? Math.random() * 45 + 5 : 50 + Math.random() * 45, // shoot toward center
        targetY: Math.random() * 60 + 10, // shoot upward
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        size: Math.random() * 8 + 6,
        rotation: Math.random() * 360,
      };
    });
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
      {/* ── Balloons ── */}
      {balloons.map(b => (
        <motion.div
          key={`b-${b.id}`}
          initial={{
            y: '105vh',
            x: `${b.left}vw`,
            opacity: 0.9,
            scale: 0.9,
          }}
          animate={{
            y: '-25vh',
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
          <div style={{ width: '1px', height: '60px', background: 'rgba(0,0,0,0.15)' }} />
        </motion.div>
      ))}

      {/* ── Party Popper Confetti Burst ── */}
      {confetti.map(c => (
        <motion.div
          key={`c-${c.id}`}
          initial={{
            x: c.x,
            y: c.y,
            opacity: 1,
            scale: 0.2,
            rotate: 0,
          }}
          animate={{
            x: `${c.targetX}vw`,
            y: `${c.targetY}vh`,
            opacity: [1, 1, 0],
            scale: [0.2, 1.2, 0.4],
            rotate: c.rotation + 360,
          }}
          transition={{
            duration: 1.8 + Math.random() * 0.8,
            ease: 'easeOut',
          }}
          style={{
            position: 'absolute',
            width: `${c.size}px`,
            height: `${c.size}px`,
            backgroundColor: c.color,
            borderRadius: c.id % 3 === 0 ? '50%' : '2px', // mix circles & squares
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
          }}
        />
      ))}

      {/* ── Left and Right Party Popper Emblems shooting ── */}
      <motion.div
        initial={{ x: '-50px', y: '80vh', rotate: 45 }}
        animate={{ x: '10px', rotate: [45, 30, 45] }}
        transition={{ duration: 0.5 }}
        style={{ position: 'absolute', fontSize: '2.5rem', zIndex: 10 }}
      >
        🎉
      </motion.div>
      <motion.div
        initial={{ x: '105vw', y: '80vh', rotate: -45 }}
        animate={{ x: 'calc(100vw - 60px)', rotate: [-45, -30, -45] }}
        transition={{ duration: 0.5 }}
        style={{ position: 'absolute', fontSize: '2.5rem', zIndex: 10 }}
      >
        🎉
      </motion.div>
    </div>
  );
}
