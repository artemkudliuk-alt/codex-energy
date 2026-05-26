import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

// Custom Cubic Ease-In-Out function for premium luxury-tech motion progression
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [telemetry, setTelemetry] = useState('ІНІЦІАЛІЗАЦІЯ ЕНЕРГОМЕРЕЖІ // CODEX CONNECT');

  // 1. Scroll Lock on mount, cleanup on unmount
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // 2. Accurate Time-Based Eased Progress Loop (Target: 8.0 seconds total)
  useEffect(() => {
    const duration = 8000; // Exact 8.0 seconds
    const startTime = Date.now();
    let animId: number;
    let holdTimeout: NodeJS.Timeout;

    const update = () => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(1, elapsed / duration);
      const easedT = easeInOutCubic(t);
      const currentProgress = Math.floor(easedT * 100);

      setProgress(currentProgress);

      // Dynamic telemetry log updates matching target percentages
      if (currentProgress < 15) {
        setTelemetry('ІНІЦІАЛІЗАЦІЯ ЕНЕРГОМЕРЕЖІ // CODEX CONNECT');
      } else if (currentProgress >= 15 && currentProgress < 35) {
        setTelemetry('СИНХРОНІЗАЦІЯ ШИНИ АКУМУЛЯТОРІВ BESS CORE');
      } else if (currentProgress >= 35 && currentProgress < 55) {
        setTelemetry('КАЛІБРУВАННЯ ФОТОЕЛЕКТРИЧНИХ МАТРИЦЬ PV-FIELD');
      } else if (currentProgress >= 55 && currentProgress < 75) {
        setTelemetry('ШИФРУВАННЯ ПОТОКУ СИГНАЛІВ AES-256');
      } else if (currentProgress >= 75 && currentProgress < 90) {
        setTelemetry('СТАБІЛІЗАЦІЯ СКАНЕРІВ SCADA-ТЕЛЕМЕТРІЇ');
      } else if (currentProgress >= 90 && currentProgress < 100) {
        setTelemetry('СИНХРОНІЗАЦІЯ ІНВЕСТИЦІЙНИХ АЛГОРИТМІВ ROI');
      } else if (currentProgress === 100) {
        setTelemetry('СИСТЕМУ НАЛАШТОВАНО. ПЛАТФОРМА ГОТОВА.');
        
        // 500ms Cinematic Hold after reaching exactly 100% before triggering exit fade
        holdTimeout = setTimeout(() => {
          onComplete();
        }, 500);
        return;
      }

      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(holdTimeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.025,
        filter: 'blur(12px)'
      }}
      transition={{ 
        duration: 0.95, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center select-none overflow-hidden"
    >
      
      {/* ━━━━━━━━━━━━━━━━━━━
          01. DYNAMIC MOVING PLASMA DRIFT BACKDROP
          ━━━━━━━━━━━━━━━━━━━ */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy-deep via-black to-[#061f35]/85 z-0 pointer-events-none" />

      {/* ━━━━━━━━━━━━━━━━━━━
          02. BREATHING VOLUMETRIC BACKGROUND ORBS (Richer, brighter blooms)
          ━━━━━━━━━━━━━━━━━━━ */}
      {/* Top Left Depth Sphere (Slate Blue) */}
      <motion.div
        animate={{
          scale: [1, 1.18, 0.92, 1],
          x: [0, 35, -20, 0],
          y: [0, -40, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-1/4 -left-1/4 w-[65vw] h-[65vw] rounded-full bg-brand-blue/20 blur-[140px] pointer-events-none z-0"
      />

      {/* Bottom Right Volumetric Sphere (Orange Bloom) */}
      <motion.div
        animate={{
          scale: [1, 0.88, 1.12, 1],
          x: [0, -30, 25, 0],
          y: [0, 35, -25, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -bottom-1/4 -right-1/4 w-[60vw] h-[60vw] rounded-full bg-brand-orange/11 blur-[130px] pointer-events-none z-0"
      />

      {/* ━━━━━━━━━━━━━━━━━━━
          03. DYNAMIC VECTOR STREAKS & PLASMA FILAMENTS
          ━━━━━━━━━━━━━━━━━━━ */}
      <svg 
        viewBox="0 0 1440 900" 
        className="absolute inset-0 w-full h-full opacity-35 z-0 pointer-events-none mix-blend-screen"
        preserveAspectRatio="xMidYMid slice"
      >
        <motion.path
          d="M -50,450 C 350,600 650,300 1000,550 C 1250,700 1350,400 1500,500"
          fill="none"
          stroke="#3e69b1"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeDasharray="120 280"
          style={{ filter: 'drop-shadow(0 0 10px rgba(62, 105, 177, 0.70))' }}
          animate={{ strokeDashoffset: [0, -800] }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M -50,520 Q 550,320 1150,720 T 1500,420"
          fill="none"
          stroke="#e7520f"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeDasharray="80 220"
          style={{ filter: 'drop-shadow(0 0 10px rgba(231, 82, 15, 0.70))' }}
          animate={{ strokeDashoffset: [0, 600] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* ━━━━━━━━━━━━━━━━━━━
          04. CORE PRELOADER INTERFACE CARD
          ━━━━━━━━━━━━━━━━━━━ */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm w-full">
        
        {/* Geometric Tech-Luxury SVG Icon */}
        <motion.div
          animate={{
            scale: [1, 1.04, 0.97, 1],
            opacity: [0.75, 1, 0.75]
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 mb-8 text-[#3e69b1]"
        >
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full filter drop-shadow-[0_0_15px_rgba(62,105,177,0.45)]">
            {/* Outer Diamond Wireframe */}
            <path d="M 50,5 L 95,50 L 50,95 L 5,50 Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-45" />
            {/* Inner Core Energy Hexagon */}
            <path d="M 50,22 L 78,50 L 50,78 L 22,50 Z" stroke="#e7520f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            {/* Center Active Orb */}
            <circle cx="50" cy="50" r="5.5" fill="#ffffff" className="animate-pulse" />
          </svg>
        </motion.div>

        {/* Large futuristic percentage counter */}
        <div className="overflow-hidden h-[85px] flex items-center justify-center">
          <motion.span 
            className="font-display font-black text-6xl sm:text-7xl text-white tracking-tighter tabular-nums select-none text-glow-blue"
            animate={{ scale: progress === 100 ? [1, 1.04, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            {progress}%
          </motion.span>
        </div>

        {/* Dynamic Mono SCADA Telemetry Logger */}
        <div className="h-6 flex items-center justify-center mt-3.5">
          <span className="font-mono text-[9px] tracking-[0.2em] text-slate-400 uppercase font-extrabold select-none animate-pulse">
            {telemetry}
          </span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-[2px] bg-slate-900/60 border border-white/5 rounded-full overflow-hidden mt-8 relative">
          
          {/* Glowing Progress Filament */}
          <div
            className="h-full bg-gradient-to-r from-brand-blue via-white to-brand-orange shadow-[0_0_10px_rgba(62,105,177,0.75)] transition-all duration-100 ease-out"
            style={{ 
              width: `${progress}%`,
            }}
          />

        </div>

        {/* Platform Verification Subtitle */}
        <span className="font-mono text-[8px] tracking-[0.25em] text-slate-500 uppercase font-bold mt-16 select-none">
          CODEX ENERGY SYSTEM v3.14 // INTRO SEQUENCE
        </span>

      </div>

    </motion.div>
  );
}
