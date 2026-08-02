import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollTimelineConnector() {
  const { scrollYProgress } = useScroll();
  
  // Smooth spring physics for path drawing
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div
      style={{
        position: 'fixed',
        right: '1.5rem',
        top: '15vh',
        height: '70vh',
        width: '10px',
        zIndex: 99,
        pointerEvents: 'none',
        display: 'none', // Hide on mobile
      }}
      className="md:block"
    >
      <svg
        width="10"
        height="100%"
        viewBox="0 0 10 100"
        preserveAspectRatio="none"
        style={{ overflow: 'visible' }}
      >
        {/* Background track line */}
        <line
          x1="5"
          y1="0"
          x2="5"
          y2="100"
          stroke="rgba(201, 149, 42, 0.12)"
          strokeWidth="1.5"
        />
        
        {/* Active scroll progress line */}
        <motion.line
          x1="5"
          y1="0"
          x2="5"
          y2="100"
          stroke="var(--gold)"
          strokeWidth="2"
          style={{ pathLength }}
          strokeLinecap="round"
        />

        {/* Small floating flower/sparkle node at the tip of scroll progress */}
        <motion.g
          style={{
            y: useSpring(scrollYProgress, { stiffness: 100, damping: 30 }),
            transformOrigin: 'center',
          }}
        >
          <motion.circle
            cx="5"
            cy="0"
            r="4.5"
            fill="var(--gold-dark)"
            stroke="var(--gold-shine)"
            strokeWidth="1.5"
          />
          <circle cx="5" cy="0" r="1.5" fill="#fff" />
        </motion.g>
      </svg>
    </div>
  );
}
