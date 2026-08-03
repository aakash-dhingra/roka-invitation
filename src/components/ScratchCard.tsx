import { useRef, useEffect, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { BalloonShower } from './BalloonShower';

interface ScratchCardProps {
  children: ReactNode;
  brushSize?: number;
  revealThreshold?: number;
}

export function ScratchCard({
  children,
  brushSize = 30,
  revealThreshold = 35,
}: ScratchCardProps) {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [showBalloons, setShowBalloons] = useState(false);
  const [hinted, setHinted]     = useState(false); // subtle hint on hover before scratching
  const isDrawing   = useRef(false);
  const autoCleared = useRef(false);

  // ── Draw the overlay once the wrapper is measured ──
  useEffect(() => {
    const canvas  = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    canvas.width  = wrapper.offsetWidth;
    canvas.height = wrapper.offsetHeight;

    const ctx = canvas.getContext('2d')!;

    // Gradient overlay (premium taupe)
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0,   '#C8B195');
    grad.addColorStop(0.5, '#BFA880');
    grad.addColorStop(1,   '#C8B195');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Coin circle
    const cx = canvas.width  / 2;
    const cy = canvas.height / 2;
    ctx.beginPath();
    ctx.arc(cx, cy - 14, 22, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(44,42,41,0.14)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(44,42,41,0.25)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Coin icon ✦
    ctx.fillStyle  = 'rgba(44,42,41,0.55)';
    ctx.font       = '16px serif';
    ctx.textAlign  = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦', cx, cy - 14);

    // "Scratch to reveal" text
    ctx.font         = '600 9px Montserrat, sans-serif';
    ctx.fillStyle    = 'rgba(44,42,41,0.55)';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('SCRATCH TO REVEAL', cx, cy + 18);

    // Subtle sparkle dots
    [[cx - 32, cy - 28], [cx + 32, cy - 28], [cx - 28, cy + 10], [cx + 28, cy + 10]].forEach(([dx, dy]) => {
      ctx.beginPath();
      ctx.arc(dx, dy, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(44,42,41,0.18)';
      ctx.fill();
    });
  }, []);

  // ── Scratch drawing helpers ──
  function getXY(clientX: number, clientY: number): { x: number; y: number } {
    const canvas = canvasRef.current!;
    const rect   = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
  }

  function erase(x: number, y: number) {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();
  }

  function checkAutoReveal() {
    if (autoCleared.current) return;
    const canvas = canvasRef.current;
    const ctx    = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 10) transparent++;
    }
    const pct = (transparent / (canvas.width * canvas.height)) * 100;

    if (pct >= revealThreshold) {
      autoCleared.current = true;
      // Clear entire overlay cleanly
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      setTimeout(() => {
        setRevealed(true);
        setShowBalloons(true);
      }, 80);
    }
  }

  // ── Mouse handlers ──
  function onMouseDown(e: React.MouseEvent) {
    isDrawing.current = true;
    const { x, y } = getXY(e.clientX, e.clientY);
    erase(x, y);
  }
  function onMouseMove(e: React.MouseEvent) {
    if (!isDrawing.current) return;
    const { x, y } = getXY(e.clientX, e.clientY);
    erase(x, y);
    checkAutoReveal();
  }
  function onMouseUp() { isDrawing.current = false; checkAutoReveal(); }

  function onTouchStart(e: React.TouchEvent) {
    isDrawing.current = true;
    const t = e.touches[0];
    const { x, y } = getXY(t.clientX, t.clientY);
    erase(x, y);
    e.preventDefault();
  }
  function onTouchMove(e: React.TouchEvent) {
    if (!isDrawing.current) return;
    const t = e.touches[0];
    const { x, y } = getXY(t.clientX, t.clientY);
    erase(x, y);
    checkAutoReveal();
    e.preventDefault();
  }
  function onTouchEnd() { isDrawing.current = false; checkAutoReveal(); }

  return (
    <div
      ref={wrapperRef}
      style={{ position: 'relative', cursor: revealed ? 'default' : 'crosshair' }}
      onMouseEnter={() => setHinted(true)}
      onMouseLeave={() => setHinted(false)}
    >
      {/* Content underneath */}
      <motion.div
        animate={revealed ? { scale: 1.02 } : { scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      >
        {children}
      </motion.div>

      {/* Canvas overlay */}
      <motion.canvas
        ref={canvasRef}
        initial={{ opacity: 1 }}
        animate={{
          opacity: revealed ? 0 : 1,
          scale:   hinted && !revealed ? 1.008 : 1,
        }}
        transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
        style={{
          position:     'absolute',
          inset:        0,
          width:        '100%',
          height:       '100%',
          borderRadius: '2px',
          touchAction:  'none',
          pointerEvents: revealed ? 'none' : 'auto',
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />

      {/* "Revealed!" sparkle badge */}
      {revealed && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 0.1 }}
          style={{
            position:   'absolute',
            top:        '-10px',
            right:      '-10px',
            width:      28,
            height:     28,
            borderRadius: '50%',
            background: '#B8965A',
            display:    'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize:   '0.75rem',
            boxShadow:  '0 2px 10px rgba(44,42,41,0.22)',
            zIndex:     10,
          }}
        >
          ✦
        </motion.div>
      )}

      {/* Floating pink balloon shower */}
      <BalloonShower trigger={showBalloons} />
    </div>
  );
}
