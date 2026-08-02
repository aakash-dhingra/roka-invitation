import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollTextRevealProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ScrollTextReveal({ text, className = '', style = {} }: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  });

  const words = text.split(' ');

  return (
    <span ref={containerRef} className={className} style={{ display: 'inline', ...style }}>
      {words.map((word, i) => {
        // Calculate start and end offset for each word's progress
        const start = i / words.length;
        const end = (i + 1) / words.length;

        // Transition opacity of the filled color mask
        const opacity = useTransform(scrollYProgress, [start, end], [0.18, 1]);

        return (
          <span key={i} style={{ position: 'relative', display: 'inline-block', marginRight: '0.25em' }}>
            <motion.span
              style={{
                opacity,
                background: 'linear-gradient(90deg, var(--gold), var(--gold-shine), var(--gold))',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
              }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
