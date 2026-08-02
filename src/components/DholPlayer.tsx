import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface DholPlayerProps {
  isFloating?: boolean;
}

export function DholPlayer({ isFloating = false }: DholPlayerProps) {
  const [speed, setSpeed] = useState(0); // 0 to 5
  const lastMousePos = useRef({ x: 0, y: 0, time: Date.now() });
  const speedDecayRef = useRef<number | null>(null);

  const leftStickControls = useAnimation();
  const rightStickControls = useAnimation();

  useEffect(() => {
    // 1. Mouse movement tracking
    function handleMouseMove(e: MouseEvent) {
      const now = Date.now();
      const dt = now - lastMousePos.current.time;
      if (dt < 20) return;

      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const movementSpeed = Math.min(dist / dt * 1.5, 5);
      setSpeed(prev => Math.max(prev, movementSpeed));
      lastMousePos.current = { x: e.clientX, y: e.clientY, time: now };
    }

    // 2. Scroll tracking (higher sensitivity)
    let lastScroll = window.scrollY;
    let lastScrollTime = Date.now();
    function handleScroll() {
      const now = Date.now();
      const dt = now - lastScrollTime;
      if (dt < 20) return;

      const currentScroll = window.scrollY;
      const diff = Math.abs(currentScroll - lastScroll);
      const scrollSpeed = Math.min(diff / dt * 3.0, 5);

      setSpeed(prev => Math.max(prev, scrollSpeed));
      lastScroll = currentScroll;
      lastScrollTime = now;
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 3. Decelerate speed decay
    speedDecayRef.current = window.setInterval(() => {
      setSpeed(prev => {
        if (prev < 0.15) return 0;
        return prev * 0.85;
      });
    }, 45);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (speedDecayRef.current) clearInterval(speedDecayRef.current);
    };
  }, []);

  // 4. Animate drumsticks based on speed
  useEffect(() => {
    if (speed === 0) {
      leftStickControls.stop();
      rightStickControls.stop();
      return;
    }

    const duration = Math.max(0.05, 0.35 / speed);

    leftStickControls.start({
      rotate: [-25, 10, -25],
      transition: { repeat: Infinity, duration, ease: 'easeInOut' },
    });

    rightStickControls.start({
      rotate: [25, -10, 25],
      transition: { repeat: Infinity, duration, ease: 'easeInOut', delay: duration / 2 },
    });
  }, [speed, leftStickControls, rightStickControls]);

  // Keep code simple — don't render floating player at all anymore if they disliked it,
  // or render a very subtle indicator. Let's make the main inline section look extremely premium:
  if (isFloating) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'linear-gradient(135deg, rgba(123, 0, 23, 0.08) 0%, rgba(245, 130, 32, 0.04) 100%)',
        border: '1.5px solid var(--gold-muted)',
        borderRadius: '8px',
        padding: '2.5rem 2rem',
        maxWidth: '480px',
        margin: '2rem auto 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(74, 2, 13, 0.04)',
      }}
    >
      {/* Background Phulkari Geometric Pattern (rendered with inline CSS overlay) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.05,
          backgroundImage: `
            linear-gradient(45deg, var(--gold) 25%, transparent 25%),
            linear-gradient(-45deg, var(--gold) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, var(--gold) 75%),
            linear-gradient(-45deg, transparent 75%, var(--gold) 75%)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
          pointerEvents: 'none',
        }}
      />

      {/* Vibration Sparkles */}
      {speed > 0.3 && (
        <div style={{ position: 'absolute', top: '15%', display: 'flex', gap: '8px' }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0, y: 15, opacity: 0 }}
              animate={{ scale: [0, 1.2, 0], y: [-15, -45], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
              style={{ color: 'var(--gold)', fontSize: '0.8rem' }}
            >
              ✦
            </motion.span>
          ))}
        </div>
      )}

      {/* Elegant Line-Art Gold Dhol Drum */}
      <svg
        width="160"
        height="140"
        viewBox="0 0 120 100"
        style={{ overflow: 'visible', zIndex: 1 }}
      >
        {/* Main Dhol Barrel */}
        <motion.g
          animate={speed > 0.2 ? {
            x: [0, -1, 1, -1, 1, 0],
            y: [0, 1, -1, 1, -1, 0],
          } : {}}
          transition={{ repeat: Infinity, duration: 0.1 }}
        >
          <ellipse cx="60" cy="50" rx="30" ry="20" fill="var(--canvas-dark)" stroke="var(--gold-dark)" strokeWidth="2" />
          
          {/* Ornate Gold Filigree Center Band */}
          <rect x="52" y="30.5" width="16" height="39" fill="none" stroke="var(--gold)" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="60" y1="30" x2="60" y2="70" stroke="var(--gold)" strokeWidth="1" />
          <circle cx="60" cy="50" r="3" fill="var(--gold)" />

          {/* Left & Right Drum heads */}
          <ellipse cx="30" cy="50" rx="4" ry="20" fill="#CD7F32" stroke="var(--gold-dark)" strokeWidth="1.5" />
          <ellipse cx="90" cy="50" rx="4" ry="20" fill="#CD7F32" stroke="var(--gold-dark)" strokeWidth="1.5" />

          {/* Decorative Red and Gold Crossing Ropes */}
          <path d="M30 35 L45 50 L30 65" fill="none" stroke="var(--gold)" strokeWidth="1.2" />
          <path d="M90 35 L75 50 L90 65" fill="none" stroke="var(--gold)" strokeWidth="1.2" />
          <path d="M45 50 L60 35 L75 50" fill="none" stroke="var(--gold)" strokeWidth="1.2" />
          <path d="M45 50 L60 65 L75 50" fill="none" stroke="var(--gold)" strokeWidth="1.2" />

          {/* Hanging tassels */}
          <path d="M45 50 Q42 75 48 85" fill="none" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M75 50 Q78 75 72 85" fill="none" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="48" cy="85" r="2.5" fill="var(--gold)" />
          <circle cx="72" cy="85" r="2.5" fill="var(--gold)" />
        </motion.g>

        {/* Left Stick (Heavy Dagga) */}
        <motion.g
          animate={leftStickControls}
          style={{ transformOrigin: '22px 42px' }}
        >
          {/* Stick body */}
          <path d="M22 42 L8 28 C4 32, 2 28, 4 24" fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" />
          {/* Visual hit spark */}
          {speed > 0.4 && (
            <circle cx="28" cy="40" r="4" fill="var(--gold-shine)" opacity="0.75" />
          )}
        </motion.g>

        {/* Right Stick (Thin Tihli) */}
        <motion.g
          animate={rightStickControls}
          style={{ transformOrigin: '98px 42px' }}
        >
          {/* Straight stick */}
          <line x1="98" y1="42" x2="112" y2="30" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" />
          {/* Visual hit spark */}
          {speed > 0.4 && (
            <circle cx="92" cy="40" r="4" fill="var(--gold-shine)" opacity="0.75" />
          )}
        </motion.g>
      </svg>

      {/* Decorative text banner */}
      <div style={{ marginTop: '1.25rem', zIndex: 1 }}>
        <h4
          style={{
            fontFamily: 'var(--font-cinzel)',
            fontSize: '0.85rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--espresso)',
            fontWeight: 600,
          }}
        >
          {speed > 0.2 ? 'Dhol beats playing! 🥁' : 'Scroll to Play Dhol'}
        </h4>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '0.88rem',
            fontStyle: 'italic',
            color: 'var(--espresso-mid)',
            marginTop: '0.35rem',
            lineHeight: 1.5,
          }}
        >
          {speed > 0.2
            ? 'Balle Balle! Feel the rhythm of the celebratory dhol!'
            : 'Scroll the page to watch the drumsticks hit the dhol dynamically in real-time!'}
        </p>
      </div>
    </div>
  );
}
