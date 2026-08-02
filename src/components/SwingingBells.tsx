import { motion } from 'framer-motion';

export function SwingingBells() {
  const bellPositions = [
    { left: '10%', delay: 0 },
    { left: '25%', delay: 0.3 },
    { left: '75%', delay: 0.15 },
    { left: '90%', delay: 0.45 },
  ];

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100px',
        pointerEvents: 'none',
        zIndex: 5,
        overflow: 'hidden',
      }}
    >
      {bellPositions.map((pos, idx) => (
        <motion.div
          key={idx}
          style={{
            position: 'absolute',
            left: pos.left,
            top: 0,
            pointerEvents: 'auto',
            cursor: 'pointer',
            transformOrigin: 'top center',
          }}
          animate={{
            rotate: [-4, 4, -4],
          }}
          transition={{
            repeat: Infinity,
            duration: 4.5,
            ease: 'easeInOut',
            delay: pos.delay,
          }}
          whileHover={{
            rotate: [-15, 12, -10, 8, -4, 0],
            transition: { duration: 1.5, ease: 'easeOut' },
          }}
        >
          {/* Hanging rope/chain */}
          <div
            style={{
              width: '2px',
              height: '35px',
              background: 'linear-gradient(to bottom, var(--gold-dark), var(--gold))',
              margin: '0 auto',
            }}
          />
          {/* Golden temple bell shape */}
          <svg
            width="22"
            height="26"
            viewBox="0 0 24 28"
            fill="var(--gold)"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.25))' }}
          >
            <path d="M12 2C8.69 2 6 4.69 6 8V16C6 18.21 4.21 20 2 20V22H22V20C19.79 20 18 18.21 18 16V8C18 4.69 15.31 2 12 2Z" fill="url(#bellGrad)" />
            <circle cx="12" cy="25" r="2.5" fill="var(--gold-shine)" />
            <defs>
              <linearGradient id="bellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C9952A" />
                <stop offset="50%" stopColor="#F7DC6F" />
                <stop offset="100%" stopColor="#8B6914" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
