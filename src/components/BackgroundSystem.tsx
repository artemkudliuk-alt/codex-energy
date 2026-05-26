import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'motion/react';
import contactsLoopUrl from '../assets/contacts-loop.mp4';

export default function BackgroundSystem() {
  // 1. Scroll Position for Soft Cinematic Parallax Depth
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { damping: 90, stiffness: 35 });
  
  // Broaden parallax layers translating to sweep deeply across the entire vertical scroll
  const scrollParallaxY1 = useTransform(smoothScrollY, [0, 5000], [0, -1200]);
  const scrollParallaxY2 = useTransform(smoothScrollY, [0, 5000], [0, -2000]);
  const scrollParallaxY3 = useTransform(smoothScrollY, [0, 5000], [0, -800]);
  
  // High-precision 1:1 scroll translation specifically for the borderless atmospheric loop separator (no spring lag or drift)
  const loopParallaxY = useTransform(scrollY, [0, 5000], [3800, 3800 - 5000]);

  // 2. Mouse Position Tracker for GPU Ambient Light Response
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth, high-inertia springs for luxurious atmospheric lag
  const springConfig = { damping: 75, stiffness: 32, mass: 1.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Media query to check for desktop fine pointer
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half of orb width (275px) to center it under mouse
      mouseX.set(e.clientX - 275);
      mouseY.set(e.clientY - 275);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 3. Multi-Layer Micro Floating Dust Embers (Back, Mid, and Foreground Bokeh)
  const [bgParticles, setBgParticles] = useState<{ id: number; left: number; top: number; size: number; duration: number; delay: number; drift: number }[]>([]);
  const [midParticles, setMidParticles] = useState<{ id: number; left: number; top: number; size: number; duration: number; delay: number; drift: number }[]>([]);
  const [fgParticles, setFgParticles] = useState<{ id: number; left: number; top: number; size: number; duration: number; delay: number; drift: number }[]>([]);

  useEffect(() => {
    // 1. Background Embers (Crisp, tiny depth sparks - clearly visible but small)
    const bgItems = Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 1.0 + 1.2, // 1.2px - 2.2px
      duration: Math.random() * 26 + 22,
      delay: Math.random() * -20,
      drift: Math.random() * 60 - 30,
    }));
    
    // 2. Midground Embers (Vivid glowing embers - beautiful crisp specks)
    const midItems = Array.from({ length: 20 }).map((_, i) => ({
      id: i + 100,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2.0 + 2.5, // 2.5px - 4.5px
      duration: Math.random() * 20 + 14,
      delay: Math.random() * -15,
      drift: Math.random() * 80 - 40,
    }));

    // 3. Foreground Cinematic Bokeh (Soft out-of-focus atmospheric bokeh orbs)
    const fgItems = Array.from({ length: 10 }).map((_, i) => ({
      id: i + 200,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 12 + 12, // 12px - 24px
      duration: Math.random() * 16 + 10,
      delay: Math.random() * -10,
      drift: Math.random() * 100 - 50,
    }));

    setBgParticles(bgItems);
    setMidParticles(midItems);
    setFgParticles(fgItems);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black select-none">
      
      {/* ━━━━━━━━━━━━━━━━━━━
          01. ATMOSPHERIC PARALLAX BREATHING GLOW ZONES (Deep Navy, Slate Blue, Orange)
          ━━━━━━━━━━━━━━━━━━━ */}
      {/* Top Left Depth Sphere (Slate Blue - Brighter, premium presence) */}
      <motion.div 
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ y: scrollParallaxY1, willChange: 'transform' }}
        className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-brand-blue/12 blur-[140px] z-0" 
      />
      
      {/* Middle Right Volumetric Highlight (Orange Bloom) */}
      <motion.div 
        animate={{
          x: [0, -30, 40, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.92, 1.06, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ y: scrollParallaxY2, willChange: 'transform' }}
        className="absolute top-[35%] -right-[15%] w-[55vw] h-[55vw] rounded-full bg-brand-orange/6 blur-[130px] z-0" 
      />

      {/* Middle Left Volumetric Highlight (Slate Blue Bloom) */}
      <motion.div 
        animate={{
          x: [0, 25, -35, 0],
          y: [0, -25, 45, 0],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 36,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ y: scrollParallaxY3, willChange: 'transform' }}
        className="absolute top-[65%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-brand-blue/9 blur-[120px] z-0" 
      />

      {/* Grounding Gradient Navy Overlay Mask */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-brand-navy-deep/12 to-black opacity-90 z-0" />

      {/* ━━━━━━━━━━━━━━━━━━━
          02. SUBTLE MOUSE-REACTIVE AMBIENT GLOW (GPU-Bound Springs)
          ━━━━━━━━━━━━━━━━━━━ */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          willChange: 'transform',
        }}
        className="absolute top-0 left-0 w-[550px] h-[550px] pointer-events-none z-10 hidden lg:block"
      >
        {/* Deep blue soft outer glow core */}
        <div className="absolute inset-0 rounded-full bg-[#3e69b1]/6 blur-[130px]" />
        {/* Orange soft edge center accent */}
        <div className="absolute inset-[100px] rounded-full bg-[#e7520f]/3.5 blur-[95px]" />
      </motion.div>

      {/* ━━━━━━━━━━━━━━━━━━━
          03. SPARSE FUTURISTIC ENERGY LINES / PLASMA STREAKS (Drifting Parallax SVG Vectors)
          ━━━━━━━━━━━━━━━━━━━ */}
      <motion.div 
        style={{ y: scrollParallaxY3, willChange: 'transform' }}
        className="absolute inset-0 pointer-events-none z-10 select-none opacity-60"
      >
        <svg 
          viewBox="0 0 1440 900" 
          preserveAspectRatio="xMidYMid slice" 
          className="absolute inset-0 w-full h-full"
        >
          {/* Sparse Blue energy vector path */}
          <motion.path
            d="M -50,300 C 350,450 650,150 1000,400 C 1250,550 1350,250 1500,350"
            fill="none"
            stroke="#3e69b1"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="100 300"
            style={{ filter: 'drop-shadow(0 0 5px rgba(62, 105, 177, 0.35))' }}
            animate={{
              strokeDashoffset: [0, -800],
              opacity: [0.06, 0.22, 0.06]
            }}
            transition={{
              strokeDashoffset: { duration: 32, repeat: Infinity, ease: "linear" },
              opacity: { duration: 12, repeat: Infinity, ease: "easeInOut" }
            }}
          />

          {/* Sparse Orange energy vector path */}
          <motion.path
            d="M -50,550 Q 550,250 1150,750 T 1500,450"
            fill="none"
            stroke="#e7520f"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray="70 230"
            style={{ filter: 'drop-shadow(0 0 5px rgba(231, 82, 15, 0.35))' }}
            animate={{
              strokeDashoffset: [0, 600],
              opacity: [0.04, 0.16, 0.04]
            }}
            transition={{
              strokeDashoffset: { duration: 28, repeat: Infinity, ease: "linear" },
              opacity: { duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }
            }}
          />

          {/* New diagonal sweeping vector thread for complete visual continuity */}
          <motion.path
            d="M -100,100 C 400,500 200,-200 800,350 C 1100,650 1000,0 1600,550"
            fill="none"
            stroke="#3e69b1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="140 380"
            style={{ filter: 'drop-shadow(0 0 5px rgba(62, 105, 177, 0.30))' }}
            animate={{
              strokeDashoffset: [0, -1000],
              opacity: [0.04, 0.15, 0.04]
            }}
            transition={{
              strokeDashoffset: { duration: 40, repeat: Infinity, ease: "linear" },
              opacity: { duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }
            }}
          />
        </svg>
      </motion.div>

      {/* ━━━━━━━━━━━━━━━━━━━
          04. THREE-DIMENSIONAL ATMOSPHERIC DUST & BOKEH EMBERS
          ━━━━━━━━━━━━━━━━━━━ */}
      {/* 1. Background Dust (Tiny, deep, slow) */}
      <div className="absolute inset-0 pointer-events-none z-5">
        {bgParticles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{
              y: ['100vh', '-10vh'],
              x: [0, p.drift, -p.drift, 0],
              opacity: [0, 0.38, 0.38, 0],
            }}
            transition={{
              y: { duration: p.duration, repeat: Infinity, ease: "linear" },
              x: { duration: p.duration * 0.5, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: p.duration, repeat: Infinity, ease: "linear" },
              delay: p.delay,
            }}
            style={{
              position: 'absolute',
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              backgroundColor: p.id % 2 === 0 ? '#3e69b1' : '#e7520f',
              boxShadow: '0 0 4px rgba(255, 255, 255, 0.15)',
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>

      {/* 2. Midground Embers (Standard crisp embers) */}
      <div className="absolute inset-0 pointer-events-none z-15">
        {midParticles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{
              y: ['100vh', '-10vh'],
              x: [0, p.drift, -p.drift, 0],
              opacity: [0, 0.52, 0.52, 0],
            }}
            transition={{
              y: { duration: p.duration, repeat: Infinity, ease: "linear" },
              x: { duration: p.duration * 0.5, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: p.duration, repeat: Infinity, ease: "linear" },
              delay: p.delay,
            }}
            style={{
              position: 'absolute',
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              backgroundColor: p.id % 2 === 0 ? '#3e69b1' : '#e7520f',
              boxShadow: p.id % 2 === 0 
                ? '0 0 6px rgba(62, 105, 177, 0.65)' 
                : '0 0 6px rgba(231, 82, 15, 0.65)',
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>

      {/* 3. Foreground Cinematic Bokeh (Large, blurred orbs floating closer to user) */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {fgParticles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{
              y: ['100vh', '-10vh'],
              x: [0, p.drift, -p.drift, 0],
              opacity: [0, 0.18, 0.18, 0],
            }}
            transition={{
              y: { duration: p.duration, repeat: Infinity, ease: "linear" },
              x: { duration: p.duration * 0.5, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: p.duration, repeat: Infinity, ease: "linear" },
              delay: p.delay,
            }}
            style={{
              position: 'absolute',
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              backgroundColor: p.id % 2 === 0 ? '#3e69b1' : '#e7520f',
              filter: 'blur(5px)',
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>

      {/* 🌌 CINEMATIC RELOCATED BACKGROUND ENERGY CORE (contacts-loop positioned deep between sections) */}
      <motion.div
        style={{ y: loopParallaxY, willChange: 'transform' }}
        className="absolute right-[-100px] md:right-[-280px] w-[540px] h-[540px] md:w-[840px] md:h-[840px] pointer-events-none z-5 hidden lg:block select-none"
      >
        <motion.div
          animate={{
            y: [-25, 25, -25],
            x: [-12, 12, -12],
            rotate: [0, 360],
          }}
          transition={{
            y: { duration: 24, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 32, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 120, repeat: Infinity, ease: "linear" },
          }}
          className="w-full h-full"
        >
          {/* Raw borderless plasma loop, completely uncontained, softly blended via premium radial transparency mask */}
          <div 
            className="w-full h-full mix-blend-screen opacity-85"
            style={{
              maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 70%)',
              WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 70%)',
            }}
          >
            <video
              src={contactsLoopUrl}
              loop
              muted
              playsInline
              autoPlay
              className="w-full h-full object-cover filter brightness-[1.10]"
            />
          </div>
        </motion.div>
      </motion.div>

    </div>
  );
}
