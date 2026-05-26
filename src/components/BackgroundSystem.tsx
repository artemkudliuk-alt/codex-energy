import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'motion/react';
import footerLoopUrl from '../assets/footer-loop.mp4';

export default function BackgroundSystem() {
  // 1. Scroll Position for Soft Cinematic Parallax Depth
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { damping: 90, stiffness: 35 });
  
  // Broaden parallax layers translating to sweep deeply across the entire vertical scroll
  const scrollParallaxY1 = useTransform(smoothScrollY, [0, 5000], [0, -1200]);
  const scrollParallaxY2 = useTransform(smoothScrollY, [0, 5000], [0, -2000]);
  const scrollParallaxY3 = useTransform(smoothScrollY, [0, 5000], [0, -800]);

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
    const bgItems = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 1.0 + 1.2, // 1.2px - 2.2px
      duration: Math.random() * 26 + 22,
      delay: Math.random() * -20,
      drift: Math.random() * 60 - 30,
    }));
    
    // 2. Midground Embers (Vivid glowing embers - beautiful crisp specks)
    const midItems = Array.from({ length: 30 }).map((_, i) => ({
      id: i + 100,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2.0 + 2.5, // 2.5px - 4.5px
      duration: Math.random() * 20 + 14,
      delay: Math.random() * -15,
      drift: Math.random() * 80 - 40,
    }));

    // 3. Foreground Cinematic Bokeh (Soft out-of-focus atmospheric bokeh orbs)
    const fgItems = Array.from({ length: 18 }).map((_, i) => ({
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
    <>
      {/* ━━━━━━━━━━━━━━━━━━━
          A. VIEWPORT-FIXED ATMOSPHERIC BACKGROUND SYSTEM
          ━━━━━━━━━━━━━━━━━━━ */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black select-none">
        
        {/* 01. DYNAMIC MOVING PLASMA DRIFT BACKDROP */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy-deep/25 via-[#061f35]/15 to-brand-orange-glow/8 animate-plasma-drift opacity-75 z-0" />

        {/* 02. ATMOSPHERIC PARALLAX BREATHING GLOW ZONES (Volumetric glows amplified by ~30%) */}
        {/* Top Left Depth Sphere (Slate Blue - bg-brand-blue/15 -> /20) */}
        <motion.div 
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.12, 0.92, 1],
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ y: scrollParallaxY1, willChange: 'transform' }}
          className="absolute -top-[12%] -left-[12%] w-[75vw] h-[75vw] rounded-full bg-brand-blue/20 blur-[160px] z-0" 
        />
        
        {/* Middle Right Volumetric Highlight (Orange Bloom - bg-brand-orange/8 -> /11) */}
        <motion.div 
          animate={{
            x: [0, -40, 50, 0],
            y: [0, 50, -40, 0],
            scale: [1, 0.88, 1.10, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ y: scrollParallaxY2, willChange: 'transform' }}
          className="absolute top-[32%] -right-[18%] w-[70vw] h-[70vw] rounded-full bg-brand-orange/11 blur-[150px] z-0" 
        />

        {/* Middle Left Volumetric Highlight (Slate Blue Bloom - bg-brand-blue/11 -> /15) */}
        <motion.div 
          animate={{
            x: [0, 35, -45, 0],
            y: [0, -35, 55, 0],
            scale: [0.92, 1.08, 0.92],
          }}
          transition={{
            duration: 36,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ y: scrollParallaxY3, willChange: 'transform' }}
          className="absolute top-[60%] -left-[12%] w-[65vw] h-[65vw] rounded-full bg-brand-blue/15 blur-[140px] z-0" 
        />

        {/* Grounding Gradient Navy Overlay Mask */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-brand-navy-deep/15 to-black opacity-95 z-0" />

        {/* 03. SUBTLE MOUSE-REACTIVE AMBIENT GLOW (GPU-Bound Springs) */}
        <motion.div
          style={{
            x: smoothX,
            y: smoothY,
            willChange: 'transform',
          }}
          className="absolute top-0 left-0 w-[550px] h-[550px] pointer-events-none z-10 hidden lg:block"
        >
          {/* Deep blue soft outer glow core */}
          <div className="absolute inset-0 rounded-full bg-[#3e69b1]/8 blur-[130px]" />
          {/* Orange soft edge center accent */}
          <div className="absolute inset-[100px] rounded-full bg-[#e7520f]/5 blur-[95px]" />
        </motion.div>

        {/* 04. SPARSE ENERGY LINES / FILAMENTS (Thickened & glow boosted by ~30%) */}
        <motion.div 
          style={{ y: scrollParallaxY3, willChange: 'transform' }}
          className="absolute inset-0 pointer-events-none z-10 select-none opacity-80"
        >
          <svg 
            viewBox="0 0 1440 900" 
            preserveAspectRatio="xMidYMid slice" 
            className="absolute inset-0 w-full h-full"
          >
            {/* Sparse Blue energy vector path (strokeWidth 2.5 -> 3.2, glow boosted) */}
            <motion.path
              d="M -50,300 C 350,450 650,150 1000,400 C 1250,550 1350,250 1500,350"
              fill="none"
              stroke="#3e69b1"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeDasharray="100 300"
              style={{ filter: 'drop-shadow(0 0 10px rgba(62, 105, 177, 0.75))' }}
              animate={{
                strokeDashoffset: [0, -800],
                opacity: [0.10, 0.35, 0.10]
              }}
              transition={{
                strokeDashoffset: { duration: 32, repeat: Infinity, ease: "linear" },
                opacity: { duration: 12, repeat: Infinity, ease: "easeInOut" }
              }}
            />

            {/* Sparse Orange energy vector path (strokeWidth 2.2 -> 2.8, glow boosted) */}
            <motion.path
              d="M -50,550 Q 550,250 1150,750 T 1500,450"
              fill="none"
              stroke="#e7520f"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeDasharray="70 230"
              style={{ filter: 'drop-shadow(0 0 10px rgba(231, 82, 15, 0.75))' }}
              animate={{
                strokeDashoffset: [0, 600],
                opacity: [0.08, 0.28, 0.08]
              }}
              transition={{
                strokeDashoffset: { duration: 28, repeat: Infinity, ease: "linear" },
                opacity: { duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }
              }}
            />

            {/* Diagonal sweeping vector thread for complete visual continuity (strokeWidth 2.2 -> 2.8) */}
            <motion.path
              d="M -100,100 C 400,500 200,-200 800,350 C 1100,650 1000,0 1600,550"
              fill="none"
              stroke="#3e69b1"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeDasharray="140 380"
              style={{ filter: 'drop-shadow(0 0 10px rgba(62, 105, 177, 0.68))' }}
              animate={{
                strokeDashoffset: [0, -1000],
                opacity: [0.08, 0.25, 0.08]
              }}
              transition={{
                strokeDashoffset: { duration: 40, repeat: Infinity, ease: "linear" },
                opacity: { duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }
              }}
            />
          </svg>
        </motion.div>

        {/* 05. THREE-DIMENSIONAL ATMOSPHERIC DUST & BOKEH EMBERS */}
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

      </div>

      {/* ━━━━━━━━━━━━━━━━━━━
          B. PAGE-SCROLLABLE DOCUMENT-LEVEL BACKGROUND SIBLING
          LOCKED TO DOCUMENT BOTTOM (BEHIND FOOTER) WITHOUT VIEWPORT SCROLL DRIFT
          ━━━━━━━━━━━━━━━━━━━ */}
      <div className="absolute inset-x-0 top-0 bottom-0 z-0 pointer-events-none overflow-hidden select-none">
        
        {/* Diffused dark contrast gradient strictly anchored at document bottom */}
        <div className="absolute inset-x-0 bottom-0 h-[500px] bg-gradient-to-t from-black via-black/90 to-transparent z-0" />

        {/* Cinematic Atmospheric Energy Loop (footer-loop.mp4) anchored at bottom-0 */}
        <div className="absolute bottom-[-100px] right-[-150px] md:bottom-[-200px] md:right-[-250px] w-[500px] h-[500px] md:w-[780px] md:h-[780px] opacity-[0.45] mix-blend-screen z-10">
          <div 
            className="w-full h-full"
            style={{
              maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 65%)',
              WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 65%)',
            }}
          >
            <video
              src={footerLoopUrl}
              loop
              muted
              playsInline
              autoPlay
              className="w-full h-full object-cover filter brightness-[1.10]"
            />
          </div>
        </div>

      </div>
    </>
  );
}
