import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

export function DholPlayer() {
  const [speed, setSpeed] = useState(0); // 0 (still) to 5 (maximum drum beat)
  const lastMousePos = useRef({ x: 0, y: 0, time: Date.now() });
  const speedDecayRef = useRef<number | null>(null);

  const leftArmControls = useAnimation();
  const rightArmControls = useAnimation();

  // 1. Calculate speed based on mouse movement
  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      const now = Date.now();
      const dt = now - lastMousePos.current.time;
      if (dt < 20) return; // limit calculation frequency

      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Normalized speed calculation
      const movementSpeed = Math.min(dist / dt * 1.5, 5);
      
      setSpeed(prev => Math.max(prev, movementSpeed));

      lastMousePos.current = { x: e.clientX, y: e.clientY, time: now };
    }

    // 2. Calculate speed based on scroll events
    let lastScroll = window.scrollY;
    let lastScrollTime = Date.now();
    function handleScroll() {
      const now = Date.now();
      const dt = now - lastScrollTime;
      if (dt < 20) return;

      const currentScroll = window.scrollY;
      const diff = Math.abs(currentScroll - lastScroll);
      const scrollSpeed = Math.min(diff / dt * 2.0, 5);

      setSpeed(prev => Math.max(prev, scrollSpeed));

      lastScroll = currentScroll;
      lastScrollTime = now;
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 3. Smoothly decay playing speed back to 0 when idle
    speedDecayRef.current = window.setInterval(() => {
      setSpeed(prev => {
        if (prev < 0.1) return 0;
        return prev * 0.88; // decay factor
      });
    }, 45);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (speedDecayRef.current) clearInterval(speedDecayRef.current);
    };
  }, []);

  // 4. Animate arms based on speed state
  useEffect(() => {
    if (speed === 0) {
      leftArmControls.stop();
      rightArmControls.stop();
      return;
    }

    // Dynamic cycle duration based on speed
    const duration = Math.max(0.08, 0.45 / speed);

    leftArmControls.start({
      rotate: [-18, 15, -18],
      transition: { repeat: Infinity, duration, ease: 'easeInOut' },
    });

    rightArmControls.start({
      rotate: [20, -15, 20],
      transition: { repeat: Infinity, duration, ease: 'easeInOut', delay: duration / 2 },
    });
  }, [speed, leftArmControls, rightArmControls]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        width: '120px',
        height: '140px',
        zIndex: 9998,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'rgba(123, 0, 23, 0.95)',
        border: '1.5px solid var(--gold)',
        borderRadius: '8px',
        padding: '0.5rem',
        boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
      }}
    >
      {/* Sound wave visualizers when playing */}
      {speed > 0.5 && (
        <div style={{ display: 'flex', gap: '3px', height: '15px', alignItems: 'flex-end', marginBottom: '4px' }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              style={{
                width: '3px',
                background: 'var(--gold)',
                borderRadius: '1px',
              }}
              animate={{
                height: [4, 15 * (speed / 5) * Math.random() + 4, 4],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.15 + i * 0.05,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* SVG Dhol Player */}
      <svg
        width="90"
        height="90"
        viewBox="0 0 100 100"
        style={{ overflow: 'visible' }}
      >
        {/* Colorful Punjabi Turban */}
        <path d="M35 15 C35 8, 65 8, 65 15 C55 12, 45 12, 35 15 Z" fill="#FF7A00" />
        <path d="M30 18 C30 13, 70 13, 70 18 C55 16, 45 16, 30 18 Z" fill="#D4AF37" />

        {/* Head */}
        <circle cx="50" cy="28" r="12" fill="#FADBD8" />
        {/* Beard (Punjabi Groom style) */}
        <path d="M38 28 C38 38, 62 38, 62 28 C62 38, 38 38, 38 28" fill="#1C1C1C" />
        {/* Turban center feather */}
        <path d="M50 8 L54 14 L46 14 Z" fill="#E74C3C" />

        {/* Dhol Body (Drum) */}
        <g id="dhol-body">
          <ellipse cx="50" cy="55" rx="22" ry="14" fill="#8B4513" stroke="#D4AF37" strokeWidth="1.5" />
          {/* Side rings */}
          <ellipse cx="28" cy="55" rx="3" ry="14" fill="#CD7F32" />
          <ellipse cx="72" cy="55" rx="3" ry="14" fill="#CD7F32" />
          {/* Traditional colourful straps */}
          <path d="M28 55 L50 41 L72 55" fill="none" stroke="#FF0000" strokeWidth="1" />
          <path d="M28 55 L50 69 L72 55" fill="none" stroke="#FF0000" strokeWidth="1" />
        </g>

        {/* Left Arm with Stick (Dagga) */}
        <motion.g
          animate={leftArmControls}
          style={{ transformOrigin: '24px 44px' }}
        >
          {/* Left sleeve */}
          <path d="M36 40 L24 44" stroke="#FF7A00" strokeWidth="6" strokeLinecap="round" />
          {/* Hand */}
          <circle cx="24" cy="44" r="3" fill="#FADBD8" />
          {/* Curved wooden stick */}
          <path d="M24 44 L15 32 C12 36, 10 32, 12 28" fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
        </motion.g>

        {/* Right Arm with Stick (Tihli) */}
        <motion.g
          animate={rightArmControls}
          style={{ transformOrigin: '76px 44px' }}
        >
          {/* Right sleeve */}
          <path d="M64 40 L76 44" stroke="#FF7A00" strokeWidth="6" strokeLinecap="round" />
          {/* Hand */}
          <circle cx="76" cy="44" r="3" fill="#FADBD8" />
          {/* Straight stick */}
          <line x1="76" y1="44" x2="88" y2="34" stroke="#CD7F32" strokeWidth="2" strokeLinecap="round" />
        </motion.g>
      </svg>

      <span
        style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: '0.48rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#FFF7EA',
          marginTop: '6px',
        }}
      >
        {speed > 0.2 ? 'Dhol Bajaao! 🥁' : 'Move cursor to play'}
      </span>
    </div>
  );
}
