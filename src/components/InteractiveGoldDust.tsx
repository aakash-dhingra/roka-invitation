import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  fadeSpeed: number;
  color: string;
}

export function InteractiveGoldDust() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const scrollRef = useRef({ y: window.scrollY, speed: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const maxParticles = 65;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Track mouse
    function handleMouseMove(e: MouseEvent) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    }
    function handleMouseLeave() {
      mouseRef.current.active = false;
    }
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Track scroll speed
    function handleScroll() {
      const currentScroll = window.scrollY;
      const diff = currentScroll - scrollRef.current.y;
      scrollRef.current.speed = Math.min(Math.max(diff * 0.18, -12), 12);
      scrollRef.current.y = currentScroll;
    }
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Generate gold tones
    const goldColors = [
      'rgba(201, 149, 42, 0.45)', // gold
      'rgba(247, 220, 111, 0.4)',  // warm gold
      'rgba(184, 150, 90, 0.35)',  // soft gold
      'rgba(255, 248, 238, 0.3)',  // light gold cream
    ];

    function createParticle(initY: 'top' | 'random' = 'random'): Particle {
      const canvasW = canvas?.width || window.innerWidth;
      const canvasH = canvas?.height || window.innerHeight;
      return {
        x: Math.random() * canvasW,
        y: initY === 'top' ? -10 : Math.random() * canvasH,
        size: 1 + Math.random() * 3,
        speedY: -(0.3 + Math.random() * 0.8),
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: 0.1 + Math.random() * 0.5,
        fadeSpeed: 0.002 + Math.random() * 0.004,
        color: goldColors[Math.floor(Math.random() * goldColors.length)],
      };
    }

    // Populate initial particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle());
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const scrollSpeed = scrollRef.current.speed;

      // Decay scroll speed back to 0
      scrollRef.current.speed *= 0.92;

      particles.forEach((p, idx) => {
        // Apply scroll movement influence
        p.y += p.speedY - scrollSpeed;
        p.x += p.speedX;

        // Interactive mouse force (repel)
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const force = (130 - dist) / 130;
            const angle = Math.atan2(dy, dx);
            p.x += Math.cos(angle) * force * 1.8;
            p.y += Math.sin(angle) * force * 1.8;
          }
        }

        // Particle lifecycle / boundary check
        if (p.y < -15 || p.y > canvas.height + 15 || p.x < -15 || p.x > canvas.width + 15) {
          particles[idx] = createParticle('top');
          // Start bottom if scrolling up fast
          if (scrollSpeed < -1) {
            particles[idx].y = canvas.height + 10;
          }
        }

        // Draw particle (blurry glowing orb)
        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        grad.addColorStop(0, p.color);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 1, // behind contents but above dark background wrappers
        pointerEvents: 'none',
      }}
    />
  );
}
