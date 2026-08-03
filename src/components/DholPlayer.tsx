import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

export function DholPlayer({ isFloating = false }: { isFloating?: boolean }) {
  const [speed, setSpeed] = useState(0); // 0 to 5
  const lastMousePos = useRef({ x: 0, y: 0, time: Date.now() });
  const speedDecayRef = useRef<number | null>(null);

  const leftArmControls = useAnimation();
  const rightArmControls = useAnimation();

  useEffect(() => {
    // 1. Mouse speed
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

    // 2. Scroll speed (highly responsive)
    let lastScroll = window.scrollY;
    let lastScrollTime = Date.now();
    function handleScroll() {
      const now = Date.now();
      const dt = now - lastScrollTime;
      if (dt < 20) return;

      const currentScroll = window.scrollY;
      const diff = Math.abs(currentScroll - lastScroll);
      const scrollSpeed = Math.min(diff / dt * 3.5, 5);

      setSpeed(prev => Math.max(prev, scrollSpeed));
      lastScroll = currentScroll;
      lastScrollTime = now;
    }

    // 3. Tap / Click anywhere bursts the dhol
    function handleTap() {
      setSpeed(4);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', handleTap);
    window.addEventListener('touchstart', handleTap, { passive: true });

    // 4. Decay loop
    speedDecayRef.current = window.setInterval(() => {
      setSpeed(prev => {
        if (prev < 0.15) return 0;
        return prev * 0.85;
      });
    }, 45);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleTap);
      window.removeEventListener('touchstart', handleTap);
      if (speedDecayRef.current) clearInterval(speedDecayRef.current);
    };
  }, []);

  // 4. Animate arms
  useEffect(() => {
    if (speed === 0) {
      leftArmControls.stop();
      rightArmControls.stop();
      return;
    }

    const duration = Math.max(0.06, 0.38 / speed);

    leftArmControls.start({
      rotate: [-22, 18, -22],
      transition: { repeat: Infinity, duration, ease: 'easeInOut' },
    });

    rightArmControls.start({
      rotate: [24, -18, 24],
      transition: { repeat: Infinity, duration, ease: 'easeInOut', delay: duration / 2 },
    });
  }, [speed, leftArmControls, rightArmControls]);

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
        margin: '2.5rem auto 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 12px 40px rgba(74, 2, 13, 0.05)',
      }}
    >
      {/* Phulkari Background Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          backgroundImage: `
            linear-gradient(45deg, var(--gold) 25%, transparent 25%),
            linear-gradient(-45deg, var(--gold) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, var(--gold) 75%),
            linear-gradient(-45deg, transparent 75%, var(--gold) 75%)
          `,
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 0 12px, 12px -12px, -12px 0px',
          pointerEvents: 'none',
        }}
      />

      {/* Floating Punjabi Beat Emojis */}
      {speed > 0.5 && (
        <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, pointerEvents: 'none' }}>
          {['Balle Balle!', 'Oye Hoye!', 'Brrruuuaah!', '🥁'].map((text, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 80, x: 50 + (idx * 20) - 40, scale: 0.8 }}
              animate={{ opacity: [0, 1, 0], y: -20, scale: [0.8, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: idx * 0.4 }}
              style={{
                position: 'absolute',
                color: 'var(--gold-dark)',
                fontFamily: 'var(--font-dance)',
                fontWeight: 'bold',
                fontSize: '1rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.15)',
              }}
            >
              {text}
            </motion.span>
          ))}
        </div>
      )}

      {/* Premium Illustrated Traditional Dhol Player */}
      <svg
        width="180"
        height="180"
        viewBox="0 0 100 100"
        style={{ overflow: 'visible', zIndex: 1 }}
      >
        <defs>
          {/* Gradients for skin, dhol, and turban */}
          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FADBD8" />
            <stop offset="100%" stopColor="#F5CBA7" />
          </linearGradient>
          <linearGradient id="turbanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF9933" />
            <stop offset="100%" stopColor="#E65C00" />
          </linearGradient>
          <linearGradient id="dholWood" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5C2E0B" />
            <stop offset="50%" stopColor="#8E4A23" />
            <stop offset="100%" stopColor="#3E1E05" />
          </linearGradient>
          <linearGradient id="vestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7B0017" />
            <stop offset="100%" stopColor="#4A020D" />
          </linearGradient>
        </defs>

        {/* Traditional Punjabi Kurta & Vest Body */}
        <path d="M30 65 L70 65 L78 95 L22 95 Z" fill="url(#vestGrad)" stroke="var(--gold-dark)" strokeWidth="1" />
        {/* Golden Buttons on Vest */}
        <circle cx="50" cy="72" r="1.5" fill="var(--gold)" />
        <circle cx="50" cy="78" r="1.5" fill="var(--gold)" />
        <circle cx="50" cy="84" r="1.5" fill="var(--gold)" />

        {/* Head & Neck */}
        <rect x="46" y="44" width="8" height="8" fill="url(#skinGrad)" />
        <circle cx="50" cy="38" r="11" fill="url(#skinGrad)" />

        {/* Detailed Traditional Punjabi Turban (Pagg) with Turla (Fan) */}
        {/* Turla (Pleated fan on top of turban) */}
        <path d="M50 27 C42 12, 58 12, 50 27 M46 27 C36 10, 52 8, 48 27 M54 27 C64 10, 48 8, 52 27" fill="url(#turbanGrad)" stroke="#B34700" strokeWidth="0.5" />
        <circle cx="50" cy="23" r="2.5" fill="var(--gold)" />
        
        {/* Turban Bands wrapping around head */}
        <path d="M38 34 C38 27, 62 27, 62 34 C58 31, 42 31, 38 34 Z" fill="url(#turbanGrad)" />
        <path d="M36 37 C36 32, 64 32, 64 37 C56 34, 44 34, 36 37 Z" fill="#D4AF37" />
        <path d="M39 33 L61 33 C61 33, 50 29, 39 33" fill="#E65C00" />

        {/* Handsome Face Details: Groom Beard & Mustache */}
        <path d="M39 37 C39 48, 61 48, 61 37 C58 49, 42 49, 39 37 Z" fill="#1C1C1C" />
        <path d="M43 40 Q50 43 57 40 C57 40, 50 46, 43 40" fill="#1C1C1C" />
        {/* Eyes & Eyebrows */}
        <ellipse cx="46" cy="36" rx="1.2" ry="0.8" fill="#1c1c1c" />
        <ellipse cx="54" cy="36" rx="1.2" ry="0.8" fill="#1c1c1c" />
        <path d="M43 33 Q46 32 49 34" stroke="#1c1c1c" strokeWidth="1" fill="none" />
        <path d="M57 33 Q54 32 51 34" stroke="#1c1c1c" strokeWidth="1" fill="none" />

        {/* Traditional Dhol Drum hung around neck */}
        <g id="traditional-dhol">
          <ellipse cx="50" cy="62" rx="20" ry="12" fill="url(#dholWood)" stroke="var(--gold-dark)" strokeWidth="1.5" />
          
          {/* Gold hoops and rope details */}
          <ellipse cx="30" cy="62" rx="3.5" ry="12" fill="#D4AF37" />
          <ellipse cx="70" cy="62" rx="3.5" ry="12" fill="#D4AF37" />
          
          {/* Red decorative tassels hanging from dhol */}
          <path d="M44 62 Q40 82 46 88 M56 62 Q60 82 54 88" stroke="#9E0A22" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <circle cx="46" cy="88" r="2" fill="var(--gold)" />
          <circle cx="54" cy="88" r="2" fill="var(--gold)" />

          {/* Dhol strap around neck */}
          <path d="M39 38 Q32 54 32 60 M61 38 Q68 54 68 60" stroke="#9E0A22" strokeWidth="1.2" fill="none" />
        </g>

        {/* Left Arm with Drumstick (Dagga) */}
        <motion.g
          animate={leftArmControls}
          style={{ transformOrigin: '24px 50px' }}
        >
          {/* Sleeve */}
          <path d="M34 52 L22 56" stroke="url(#turbanGrad)" strokeWidth="5.5" strokeLinecap="round" />
          {/* Hand */}
          <circle cx="22" cy="56" r="2.5" fill="url(#skinGrad)" />
          {/* Traditional curved wooden stick */}
          <path d="M22 56 L13 46 C11 50, 9 46, 11 42" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" />
        </motion.g>

        {/* Right Arm with Drumstick (Tihli) */}
        <motion.g
          animate={rightArmControls}
          style={{ transformOrigin: '76px 50px' }}
        >
          {/* Sleeve */}
          <path d="M66 52 L78 56" stroke="url(#turbanGrad)" strokeWidth="5.5" strokeLinecap="round" />
          {/* Hand */}
          <circle cx="78" cy="56" r="2.5" fill="url(#skinGrad)" />
          {/* Straight thin stick */}
          <line x1="78" y1="56" x2="88" y2="46" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" />
        </motion.g>
      </svg>

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
            ? 'Balle Balle! Feel the traditional Punjabi rhythm!'
            : 'Scroll the page to watch the Punjabi dhol player swing his arms and beat the dhol!'}
        </p>
      </div>
    </div>
  );
}
