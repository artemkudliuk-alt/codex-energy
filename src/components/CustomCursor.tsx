import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
}

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Position states
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  
  const cursorRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const nextParticleId = useRef(0);
  const [, setTick] = useState(0); // State trigger for rendering particles

  useEffect(() => {
    // 1. Check if the device supports fine pointers (desktops with mouse). Disable on touch.
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) {
      return;
    }

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      // Global event delegation for hover states (detects standard interactive selectors & glass cards)
      const target = e.target as HTMLElement;
      if (target) {
        const isInteractive = target.closest('a, button, select, input, textarea, [role="button"], .interactive-hover, [class*="glass-card"]');
        setIsHovered(!!isInteractive);
      }
    };

    const handleMouseDown = () => {
      setIsClicked(true);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    // 2. requestAnimationFrame physics loop for interpolation and trail sparks
    let animFrameId: number;
    const updatePhysics = () => {
      // Cinematic Lerp Position (0.15 factor for smooth lagging trailing inertia)
      const dx = mousePos.current.x - cursorPos.current.x;
      const dy = mousePos.current.y - cursorPos.current.y;
      cursorPos.current.x += dx * 0.15;
      cursorPos.current.y += dy * 0.15;

      // Update cursor wrapper position on the GPU using translate3d
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`;
      }

      // Trailing micro-sparks particle physics
      const particles = particlesRef.current;

      // Spawn a new particle occasionally if the mouse is moving fast enough
      const speed = Math.sqrt(dx * dx + dy * dy);
      if (speed > 1.2 && particles.length < 8 && Math.random() > 0.45) {
        particles.push({
          id: nextParticleId.current++,
          x: cursorPos.current.x + (Math.random() - 0.5) * 4,
          y: cursorPos.current.y + (Math.random() - 0.5) * 4,
          vx: (Math.random() - 0.5) * 0.8 - (dx * 0.03), // Inertia-relative velocity
          vy: (Math.random() - 0.5) * 0.8 - (dy * 0.03) + 0.25, // Slight upward drift
          alpha: 0.5,
          size: Math.random() * 1.5 + 1.2,
          color: Math.random() > 0.75 ? '#e7520f' : '#3e69b1',
        });
      }

      // Update particle lifespans
      particlesRef.current = particles
        .map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          alpha: p.alpha - 0.02,
        }))
        .filter(p => p.alpha > 0);

      // Force React state update for particle nodes
      setTick(t => t + 1);

      animFrameId = requestAnimationFrame(updatePhysics);
    };

    animFrameId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Cinematic Lerp energy orb container */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-9999 will-change-transform -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: 'translate3d(0, 0, 0)',
        }}
      >
        {/* Soft radial blue/orange glow backplate */}
        <div
          className={`absolute rounded-full transition-all duration-300 ease-out -translate-x-1/2 -translate-y-1/2 ${
            isClicked 
              ? 'w-10 h-10 bg-brand-orange/20 blur-[6px]' 
              : isHovered 
                ? 'w-8 h-8 bg-brand-blue/35 blur-[5px]' 
                : 'w-6 h-6 bg-brand-blue/20 blur-[4px]'
          }`}
        />

        {/* 12px core element */}
        <div
          className={`absolute rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isClicked
              ? 'w-3 h-3 bg-brand-orange border border-brand-orange/40 scale-95 shadow-[0_0_12px_rgba(231,82,15,0.7)]'
              : isHovered
                ? 'w-[14px] h-[14px] bg-brand-blue border border-brand-orange/90 scale-105 shadow-[0_0_10px_rgba(62,105,177,0.5)]'
                : 'w-3 h-3 bg-brand-blue border border-brand-blue/20 scale-100 shadow-[0_0_8px_rgba(62,105,177,0.4)]'
          }`}
        />
      </div>

      {/* Trailing micro particles container */}
      <div className="fixed inset-0 pointer-events-none z-9998 overflow-hidden">
        {particlesRef.current.map(p => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: p.color,
              opacity: p.alpha,
              boxShadow: `0 0 4px ${p.color}`,
              transform: 'translate3d(-50%, -50%, 0)',
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>
    </>
  );
}
