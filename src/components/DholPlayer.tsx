import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface DholPlayerProps {
  isFloating?: boolean;
}

export function DholPlayer({ isFloating = false }: DholPlayerProps) {
  const [speed, setSpeed] = useState(0); // 0 to 5
  const lastMousePos = useRef({ x: 0, y: 0, time: Date.now() });
  const speedDecayRef = useRef<number | null>(null);

  const leftArmControls = useAnimation();
  const rightArmControls = useAnimation();

  useEffect(() => {
    // 1. Mouse speed calculator
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

    // 2. Scroll speed calculator
    let lastScroll = window.scrollY;
    let lastScrollTime = Date.now();
    function handleScroll() {
      const now = Date.now();
      const dt = now - lastScrollTime;
      if (dt < 20) return;

      const currentScroll = window.scrollY;
      const diff = Math.abs(currentScroll - lastScroll);
      const scrollSpeed = Math.min(diff / dt * 2.5, 5); // higher sensitivity on scroll

      setSpeed(prev => Math.max(prev, scrollSpeed));
      lastScroll = currentScroll;
      lastScrollTime = now;
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 3. Smooth decay loop
    speedDecayRef.current = window.setInterval(() => {
      setSpeed(prev => {
        if (prev < 0.1) return 0;
        return prev * 0.88;
      });
    }, 45);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (speedDecayRef.current) clearInterval(speedDecayRef.current);
    };
  }, []);

  // 4. Trigger animations based on playing speed
  useEffect(() => {
    if (speed === 0) {
      leftArmControls.stop();
      rightArmControls.stop();
      return;
    }

    const duration = Math.max(0.06, 0.42 / speed);

    leftArmControls.start({
      rotate: [-20, 20, -20],
      transition: { repeat: Infinity, duration, ease: 'easeInOut' },
    });

    rightArmControls.start({
      rotate: [25, -20, 25],
      transition: { repeat: Infinity, duration, ease: 'easeInOut', delay: duration / 2 },
    });
  }, [speed, leftArmControls, rightArmControls]);

  // Render floating widget
  if (isFloating) {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          width: '110px',
          height: '130px',
          zIndex: 9998,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'rgba(123, 0, 23, 0.95)',
          border: '1.5px solid var(--gold)',
          borderRadius: '8px',
          padding: '0.4rem',
          boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
        }}
      >
        {speed > 0.5 && (
          <div style={{ display: 'flex', gap: '2px', height: '12px', alignItems: 'flex-end', marginBottom: '2px' }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                style={{ width: '2px', background: 'var(--gold)', borderRadius: '1px' }}
                animate={{ height: [3, 12 * (speed / 5) * Math.random() + 3, 3] }}
                transition={{ repeat: Infinity, duration: 0.15 + i * 0.05 }}
              />
            ))}
          </div>
        )}
        <DholSvg width="80" height="80" leftArmControls={leftArmControls} rightArmControls={rightArmControls} />
      </div>
    );
  }

  // Render block layout for main section
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'rgba(123, 0, 23, 0.06)',
        border: '1.5px dashed var(--gold-muted)',
        borderRadius: '8px',
        padding: '2rem 1.5rem',
        maxWidth: '380px',
        margin: '2rem auto 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dynamic Sound Vibration Waves */}
      <div
        style={{
          display: 'flex',
          gap: '4px',
          height: '24px',
          alignItems: 'flex-end',
          marginBottom: '1.5rem',
        }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.div
            key={i}
            style={{
              width: '4px',
              background: 'var(--gold-dark)',
              borderRadius: '2px',
            }}
            animate={{
              height: [4, 24 * (speed / 5) * Math.random() + 4, 4],
            }}
            transition={{
              repeat: Infinity,
              duration: 0.12 + i * 0.04,
            }}
          />
        ))}
      </div>

      <DholSvg width="160" height="160" leftArmControls={leftArmControls} rightArmControls={rightArmControls} />

      <h4
        style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: '0.85rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--espresso)',
          marginTop: '1.5rem',
          fontWeight: 600,
        }}
      >
        {speed > 0.25 ? 'Dhadak Dhadak! 🥁' : 'Scroll to Play Dhol'}
      </h4>
      <p
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '0.88rem',
          fontStyle: 'italic',
          color: 'var(--espresso-mid)',
          marginTop: '0.4rem',
        }}
      >
        {speed > 0.25
          ? 'Balle Balle! The beat is rising!'
          : 'Scroll the page to watch the Punjabi dhol player swing the chords!'}
      </p>
    </div>
  );
}

// Inner SVG Helper
function DholSvg({
  width,
  height,
  leftArmControls,
  rightArmControls,
}: {
  width: string;
  height: string;
  leftArmControls: any;
  rightArmControls: any;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      style={{ overflow: 'visible' }}
    >
      {/* Colorful Turban */}
      <path d="M35 15 C35 8, 65 8, 65 15 C55 12, 45 12, 35 15 Z" fill="#FF7A00" />
      <path d="M30 18 C30 13, 70 13, 70 18 C55 16, 45 16, 30 18 Z" fill="#D4AF37" />

      {/* Head */}
      <circle cx="50" cy="28" r="12" fill="#FADBD8" />
      {/* Beard */}
      <path d="M38 28 C38 38, 62 38, 62 28 M38 28" fill="#1C1C1C" />
      {/* Mustache */}
      <path d="M42 32 Q50 34 58 32 Q50 38 42 32" fill="#1c1c1c" />
      {/* Turban center feather */}
      <path d="M50 8 L54 14 L46 14 Z" fill="#E74C3C" />

      {/* Dhol Body (Drum around neck) */}
      <g id="dhol-body">
        <ellipse cx="50" cy="55" rx="22" ry="14" fill="#8B4513" stroke="#D4AF37" strokeWidth="1.5" />
        {/* Straps around neck */}
        <path d="M38 28 L30 46 M62 28 L70 46" fill="none" stroke="#A30022" strokeWidth="1.5" />
        <ellipse cx="28" cy="55" rx="3" ry="14" fill="#CD7F32" />
        <ellipse cx="72" cy="55" rx="3" ry="14" fill="#CD7F32" />
        {/* Chords/threads decoration */}
        <path d="M28 55 L50 41 L72 55" fill="none" stroke="#FF7A00" strokeWidth="1" />
        <path d="M28 55 L50 69 L72 55" fill="none" stroke="#FF7A00" strokeWidth="1" />
      </g>

      {/* Left Arm with Stick (Dagga) */}
      <motion.g
        animate={leftArmControls}
        style={{ transformOrigin: '24px 44px' }}
      >
        <path d="M36 40 L24 44" stroke="#9E0A22" strokeWidth="6" strokeLinecap="round" />
        <circle cx="24" cy="44" r="3" fill="#FADBD8" />
        <path d="M24 44 L15 32 C12 36, 10 32, 12 28" fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
      </motion.g>

      {/* Right Arm with Stick (Tihli) */}
      <motion.g
        animate={rightArmControls}
        style={{ transformOrigin: '76px 44px' }}
      >
        <path d="M64 40 L76 44" stroke="#9E0A22" strokeWidth="6" strokeLinecap="round" />
        <circle cx="76" cy="44" r="3" fill="#FADBD8" />
        <line x1="76" y1="44" x2="88" y2="34" stroke="#CD7F32" strokeWidth="2" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}
