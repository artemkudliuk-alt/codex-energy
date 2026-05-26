import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import heroVideoUrl from '../assets/hero-loop.mp4';

interface HeroProps {
  onInvestClick: () => void;
  onMoreClick: () => void;
  onPlayVideo: () => void;
}

export default function Hero({ onInvestClick, onMoreClick, onPlayVideo }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Inertia spring system for mouse position tracking (tamed to be ultra-restrained and solid)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 65, stiffness: 45, mass: 1.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax text translation on scroll
  const parallaxText = useTransform(scrollYProgress, [0, 1], [0, 35]);

  // Sparse, subtle drifting sparks for atmospheric cinematic depth
  const [launchParticles, setLaunchParticles] = useState<{ id: number; left: number; top: number; size: number; duration: number; delay: number; color: string }[]>([]);

  useEffect(() => {
    const items = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 50 + 45, // Rise from lower half
      size: Math.random() * 1.5 + 0.4, // Extremely small, delicate particles
      duration: Math.random() * 18 + 14, // Calm, slow drift
      delay: Math.random() * -12,
      color: Math.random() > 0.6 ? '#e7520f' : '#3e69b1',
    }));
    setLaunchParticles(items);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    // Subtle magnetic response (max 12px translation in either direction for institutional stability)
    mouseX.set(relX * 24);
    mouseY.set(relY * 24);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen pt-32 pb-24 flex flex-col justify-center overflow-hidden z-10 px-6 md:px-12 select-none bg-black"
    >
      {/* 1. CINEMATIC HERO VIDEO BACKGROUND (BRIGHT AND PRIMARY) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-black">
        <video 
          src={heroVideoUrl}
          loop 
          muted 
          playsInline 
          autoPlay 
          className="absolute inset-0 w-full h-full object-cover opacity-98 scale-[1.01] transition-opacity duration-1000 filter brightness-[1.32] contrast-[1.22] saturate-[1.15]"
        />
        
        {/* Soft atmospheric gradients for enhanced blue/orange separation and cinematic bloom */}
        <div className="absolute top-[10%] left-[25%] w-[45vw] h-[45vw] rounded-full bg-[#3e69b1]/18 blur-[130px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-[#e7520f]/10 blur-[110px] mix-blend-screen pointer-events-none" />
        
        {/* Reduced ultra-light overlay to let brightness shine through (rgba(3, 8, 20, 0.08)) */}
        <div className="absolute inset-0 bg-[#030814]/08 mix-blend-multiply" />
        
        {/* Softened grounding bottom gradient to transition video cleanly without excessive dimming */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030814]/04 to-black/95" />
      </div>

      {/* 2. SUBTLE PARALLAX ACCENT ENVIRONMENT (Extremely subtle, stable layout nudge) */}
      <motion.div 
        style={{ x: smoothX, y: smoothY, willChange: 'transform' }}
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      >
        {/* Sparse launch particles system */}
        <div className="absolute inset-0">
          {launchParticles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 0 }}
              animate={{
                y: -350,
                opacity: [0, 0.25, 0.25, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeOut",
              }}
              style={{
                position: 'absolute',
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                borderRadius: '50%',
                backgroundColor: p.color,
                boxShadow: `0 0 4px ${p.color}`,
                willChange: 'transform',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* 3. MAIN CONTENT GRID */}
      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column (Main Typography) */}
        <motion.div 
          style={{ y: parallaxText }}
          className="lg:col-span-8 flex flex-col justify-center select-none"
        >
          
          {/* BACKGROUND TITLE: ULTRA-SUBTLE HUGE "CODEX" OUTLINE */}
          <div className="relative w-full h-auto select-none pointer-events-none mb-4 md:mb-6">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ 
                opacity: 0.08, // Stretched ultra-subtle background outline
                scale: 1,
                y: [0, -1.5, 0]
              }}
              transition={{ 
                initial: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
                y: { duration: 12, repeat: Infinity, ease: "easeInOut" }
              }}
              className="font-display font-extrabold text-[10vw] sm:text-[8vw] lg:text-[7rem] leading-none tracking-[0.08em] select-none text-transparent"
              style={{
                WebkitTextStroke: '1px rgba(255, 255, 255, 0.25)',
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 45%, rgba(0,0,0,0.08) 95%)',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 45%, rgba(0,0,0,0.08) 95%)',
              }}
            >
              CODEX
            </motion.h1>
          </div>

          {/* OVERLAPPING SOVEREIGN SLOGAN */}
          <div className="relative -mt-[9vw] lg:-mt-[6.5rem] z-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-extrabold text-[2.25rem] sm:text-[2.75rem] lg:text-[3.5rem] xl:text-[4.5rem] text-white tracking-tight leading-[1.18] sm:leading-[1.12] uppercase"
            >
              Будуємо. Керуємо.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-brand-blue">
                Генеруємо результат.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 font-sans text-[1.1rem] sm:text-lg lg:text-xl text-[#ebebeb] max-w-2xl font-light leading-relaxed"
            >
              Інвестиції у стабільну енергетику майбутнього. Забезпечте свій капітал ліквідними активами промислового масштабу.
            </motion.p>

            {/* ACTION TRIGGERS */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-wrap items-center gap-5 sm:gap-6"
            >
              {/* Premium Pill Button - Invest Now */}
              <motion.button
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                onClick={onInvestClick}
                className="relative group bg-white text-brand-navy-deep font-sans font-semibold tracking-wider text-xs sm:text-sm uppercase px-10 py-4.5 rounded-full flex items-center gap-3 transition-shadow duration-300 hover:shadow-[0_12px_30px_rgba(255,255,255,0.08)] active:scale-[0.98] cursor-pointer"
              >
                <span>Інвестувати зараз</span>
                <ArrowRight className="w-4.5 h-4.5 text-brand-navy-deep group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>

              {/* Text link + Play action */}
              <button
                onClick={onPlayVideo}
                className="group flex items-center gap-3.5 font-sans font-bold tracking-wider text-xs sm:text-sm text-[#ebebeb] hover:text-white transition-colors uppercase focus:outline-none cursor-pointer"
              >
                <span>Дізнатися більше</span>
                <motion.span 
                  whileHover={{ scale: 1.04, borderColor: 'rgba(62, 105, 177, 0.4)', backgroundColor: 'rgba(62, 105, 177, 0.05)' }}
                  whileTap={{ scale: 0.96 }}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-slate-900/40 transition-all duration-300"
                >
                  <Play className="w-4.5 h-4.5 fill-white text-white translate-x-[1.5px]" />
                </motion.span>
              </button>
            </motion.div>
          </div>

        </motion.div>



      </div>

      {/* Subtle overlay glow at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
