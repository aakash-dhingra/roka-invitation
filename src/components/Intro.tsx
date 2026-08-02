import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type Stage = 'idle' | 'zoom' | 'open' | 'reveal';

interface IntroProps {
  onEnter: () => void;
}

export function Intro({ onEnter }: IntroProps) {
  const [stage, setStage] = useState<Stage>('idle');
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t0 = setTimeout(() => setStage('zoom'), 150);
    const t1 = setTimeout(() => setStage('open'), 1400);
    const t2 = setTimeout(() => setStage('reveal'), 2500);
    return () => [t0, t1, t2].forEach(clearTimeout);
  }, []);

  function handleEnter() {
    setExiting(true);
    setTimeout(onEnter, 750);
  }

  const isOpen   = stage === 'open'   || stage === 'reveal';
  const isReveal = stage === 'reveal';

  // Responsive envelope size
  const EW = 340; // envelope width px
  const EH = 220; // envelope height px

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={exiting ? { opacity: 0, scale: 1.06 } : { opacity: 1, scale: 1 }}
      transition={{ duration: exiting ? 0.65 : 0.5, ease: [0.25, 1, 0.5, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F7F4EF',
        fontFamily: 'var(--font-sans)',
        overflow: 'hidden',
      }}
    >
      {/* ── Background radial glow ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: [
          'radial-gradient(ellipse 70% 60% at 50% 55%, rgba(200,177,149,0.22) 0%, transparent 100%)',
        ].join(','),
      }} />

      {/* ── Floating leaf accents (static, just for ambiance) ── */}
      <svg
        style={{ position: 'absolute', top: -30, left: -40, width: 260, opacity: 0.06, pointerEvents: 'none' }}
        viewBox="0 0 200 200" fill="none"
      >
        <path d="M60 180C60 180 10 130 30 70C50 10 120 5 160 45C200 85 185 155 130 175C100 188 70 182 60 180Z" stroke="#C8B195" strokeWidth="1" />
        <path d="M60 180C80 120 120 80 160 45" stroke="#C8B195" strokeWidth="0.5" />
      </svg>
      <svg
        style={{ position: 'absolute', bottom: -20, right: -30, width: 220, opacity: 0.06, pointerEvents: 'none' }}
        viewBox="0 0 200 200" fill="none"
      >
        <path d="M140 20C140 20 190 70 170 140C150 210 80 215 40 175C0 135 15 65 70 45C100 32 130 22 140 20Z" stroke="#C8B195" strokeWidth="1" />
        <path d="M140 20C120 80 80 120 40 175" stroke="#C8B195" strokeWidth="0.5" />
      </svg>

      {/* ── Main stage: envelope + letter ── */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>

        {/* ════════════════════════
             LETTER CARD
            ════════════════════════ */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={
            isReveal ? { y: -(EH * 0.95), opacity: 1 } :
            isOpen   ? { y: -(EH * 0.08), opacity: 0 } :
                       { y: 60, opacity: 0 }
          }
          transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            translateX: '-50%',
            width: EW - 40,
            background: '#FEFCF8',
            border: '0.5px solid rgba(200,177,149,0.45)',
            borderRadius: '2px',
            padding: '1.5rem 1.25rem',
            textAlign: 'center',
            boxShadow: '0 16px 70px rgba(44,42,41,0.16), 0 2px 12px rgba(44,42,41,0.08)',
            zIndex: 20,
          }}
        >
          {/* Ornament */}
          <p style={{ fontSize: '1.3rem', color: '#C8B195', marginBottom: '0.5rem', lineHeight: 1 }}>
            ✦
          </p>

          {/* Invite label */}
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.55rem',
            fontWeight: 600,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: '#C8B195',
            marginBottom: '0.75rem',
          }}>
            You are cordially invited to the
          </p>

          {/* Names */}
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.4rem, 4vw, 1.8rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#2C2A29',
            lineHeight: 1.1,
            marginBottom: 0,
          }}>
            Dr. Aanchal Dhingra
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.68rem',
            fontWeight: 300,
            letterSpacing: '0.4em',
            color: '#C8B195',
            margin: '0.25rem 0',
          }}>
            &amp;
          </p>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.4rem, 4vw, 1.8rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#2C2A29',
            lineHeight: 1.1,
            marginBottom: '0.75rem',
          }}>
            Randeep Singh
          </h2>

          {/* Divider */}
          <div style={{
            width: 48,
            height: '0.5px',
            background: '#C8B195',
            margin: '0 auto 0.75rem',
            opacity: 0.55,
          }} division-line />

          {/* Event info */}
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.62rem',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#2C2A29',
            marginBottom: '0.3rem',
          }}>
            Roka Ceremony
          </p>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.56rem',
            fontWeight: 300,
            letterSpacing: '0.1em',
            color: '#C8B195',
            marginBottom: '1.25rem',
            lineHeight: 1.6,
          }}>
            21st August, 2026 &nbsp;·&nbsp; 7:00 PM Onwards<br />
            Golden Apple Mansion, Pritampura
          </p>

          {/* CTA button */}
          <motion.button
            id="intro-enter-btn"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: isReveal ? 1 : 0, y: isReveal ? 0 : 6 }}
            transition={{ delay: 0.45, duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
            onClick={handleEnter}
            whileHover={{ scale: 1.04, backgroundColor: '#C8B195' }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '0.7rem 1.8rem',
              background: '#2C2A29',
              color: '#F7F4EF',
              border: 'none',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              borderRadius: '1px',
              transition: 'background 0.3s ease',
            }}
          >
            Open Invitation →
          </motion.button>
        </motion.div>

        {/* ════════════════════════
             ENVELOPE
            ════════════════════════ */}
        <motion.div
          initial={{ scale: 0.04, opacity: 0 }}
          animate={{
            scale: stage === 'idle' ? 0.04 : 1,
            opacity: stage === 'idle' ? 0 : 1,
          }}
          transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          style={{
            width: EW,
            height: EH,
            position: 'relative',
            flexShrink: 0,
            perspective: '900px',
          }}
        >
          {/* Base rectangle */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: '#C8B195',
            borderRadius: '2px',
            boxShadow: '0 20px 70px rgba(44,42,41,0.2), 0 4px 16px rgba(44,42,41,0.1)',
          }} />

          {/* Left diagonal fold */}
          <div style={{
            position: 'absolute', left: 0, top: 0,
            width: 0, height: 0,
            borderTop: `${EH / 2}px solid transparent`,
            borderBottom: `${EH / 2}px solid transparent`,
            borderLeft: `${EW / 2}px solid rgba(44,42,41,0.08)`,
          }} />

          {/* Right diagonal fold */}
          <div style={{
            position: 'absolute', right: 0, top: 0,
            width: 0, height: 0,
            borderTop: `${EH / 2}px solid transparent`,
            borderBottom: `${EH / 2}px solid transparent`,
            borderRight: `${EW / 2}px solid rgba(44,42,41,0.08)`,
          }} />

          {/* Bottom V-fold */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0,
            width: 0, height: 0,
            borderLeft: `${EW / 2}px solid transparent`,
            borderRight: `${EW / 2}px solid transparent`,
            borderBottom: `${EH * 0.52}px solid rgba(44,42,41,0.1)`,
          }} />

          {/* Wax seal */}
          <motion.div
            animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 0.7 : 1 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 50, height: 50,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #D4A85A, #9A6C2A)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.3rem',
              boxShadow: '0 3px 14px rgba(44,42,41,0.28)',
              zIndex: 8,
              color: 'rgba(255,255,255,0.85)',
              userSelect: 'none',
            }}
          >
            ♡
          </motion.div>

          {/* ── FLAP (3D rotateX to open) ── */}
          <motion.div
            animate={{ rotateX: isOpen ? -172 : 0 }}
            transition={{ duration: 0.75, ease: [0.25, 1, 0.5, 1] }}
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '50%',
              clipPath: 'polygon(0% 0%, 50% 100%, 100% 0%)',
              background: 'linear-gradient(160deg, #BFA880 0%, #C8B195 60%)',
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
              zIndex: 9,
            }}
          />
        </motion.div>
      </div>

      {/* ── Hint text below envelope ── */}
      <motion.p
        animate={{ opacity: stage === 'zoom' ? 0.5 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.54rem',
          fontWeight: 400,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#2C2A29',
        }}
      >
        Opening your invitation…
      </motion.p>
    </motion.div>
  );
}
