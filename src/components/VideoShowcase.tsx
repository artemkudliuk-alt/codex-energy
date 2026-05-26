import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X, Activity, Cpu, Disc, Radio } from 'lucide-react';
import teaserVideoUrl from '../assets/Cinematic Teaser Loop.mp4';
import previewImageUrl from '../assets/video-preview-energy-future.webp';

export default function VideoShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 select-none">
      
      {/* Cinematic Cover Block with Parallax Flow */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-[480px] rounded-2xl overflow-hidden glass-card border border-brand-navy-medium/30 cursor-pointer group shadow-[0_30px_70px_rgba(0,0,0,0.85)] bg-brand-navy-deep/20"
        onClick={() => setIsPlaying(true)}
      >
        <div className="absolute inset-0 bg-[#000000] overflow-hidden">
          
          {/* Loop MP4 video snippet as backdrop */}
          <video 
            src={teaserVideoUrl}
            loop 
            muted 
            playsInline 
            autoPlay 
            className="absolute inset-0 w-full h-full object-cover opacity-60 scale-102 transition-transform duration-[2000ms] group-hover:scale-105"
          />

          {/* Cinematic WebP Overlay to texturize the teaser and hide artifacts */}
          <img 
            src={previewImageUrl} 
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-overlay pointer-events-none transition-all duration-[1500ms] group-hover:opacity-45 scale-[1.01]"
          />

          {/* Base sunset color-dodge overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-brand-navy-deep/60 to-brand-orange-glow mix-blend-color-dodge pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black via-brand-navy-deep/70 to-transparent pointer-events-none" />
          
          {/* Animated Orange Sunset Spotlight */}
          <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[90%] h-[300px] bg-gradient-to-t from-brand-orange-glow via-transparent to-transparent filter blur-[70px] pointer-events-none" />

          {/* Glowing particle lights representing warm radiation */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(231,82,15,0.04),transparent_80%)] pointer-events-none" />
        </div>

        {/* Reflected high-contrast highlights */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.02] pointer-events-none" />

        {/* Left Aligned Content */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent p-12 md:p-16 flex flex-col justify-center pointer-events-none">
          <div className="max-w-md select-none">
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#e7520f] uppercase block font-bold">PREVIEW PRESENTATION</span>
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] uppercase mt-4">
              Інфраструктура<br />
              енергетичного<br />
              майбутнього
            </h3>
            <p className="font-sans text-xs text-slate-400 mt-6 max-w-sm font-light leading-relaxed">
              Дивіться відео-презентацію комплексу та інженерного парку "Болград" у промисловому форматі.
            </p>
          </div>
        </div>

        {/* Play trigger button */}
        <div className="absolute top-1/2 left-1/2 md:left-2/3 -translate-x-1/2 -translate-y-1/2 z-20">
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="w-18 h-18 rounded-full border border-white/10 bg-black/90 flex items-center justify-center relative group-hover:border-brand-orange/40 transition-all duration-[400ms] shadow-2xl"
          >
            {/* Active pulsating glowing rings */}
            <div className="absolute inset-0 rounded-full border border-brand-orange/20 animate-ping opacity-25" />
            <Play className="w-6 h-6 text-white fill-white translate-x-[1.5px]" />
          </motion.div>
        </div>

        {/* Top thin coordinate highlight */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-brand-blue/20 to-brand-orange/20" />
      </motion.div>

      {/* DETAILED INTERACTIVE SCADA MULTIMEDIA COMMAND MODAL */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] flex items-center justify-center p-6 select-none"
            onClick={() => setIsPlaying(false)}
          >
            <motion.div 
              initial={{ scale: 0.96, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl aspect-video bg-black border border-brand-navy-medium/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between p-4 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Active MP4 video inside modal */}
              <video 
                src={teaserVideoUrl} 
                controls 
                autoPlay 
                className="absolute inset-0 w-full h-full object-cover opacity-90"
              />

              {/* SpaceX operation overlays (visible around edges) */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/85 via-transparent to-black/60 flex flex-col justify-between p-4 sm:p-8">
                
                {/* Header */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-ping" />
                    <span className="font-mono text-[10px] tracking-wider text-[#ebebeb] uppercase flex items-center gap-1.5 font-bold">
                      <Radio className="w-3.5 h-3.5 text-brand-orange" />
                      LIVE FEED: CODEX BOLGRAD COMMAND CENTER
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => setIsPlaying(false)}
                    className="w-10 h-10 rounded-full bg-black/80 border border-brand-navy-medium/35 flex items-center justify-center text-slate-400 hover:text-white pointer-events-auto transition-colors hover:border-brand-blue/30 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Bottom stats panel */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 backdrop-blur-md bg-brand-navy-deep/80 border border-brand-navy-medium/30 p-4 rounded-xl z-10 w-full mt-auto">
                  <div>
                    <span className="font-mono text-[9px] tracking-wider text-slate-400 uppercase flex items-center gap-1 font-bold">
                      <Cpu className="w-3 h-3 text-brand-blue" /> SYSTEM STATE
                    </span>
                    <p className="font-display font-bold text-sm text-emerald-500 uppercase mt-0.5">NOMINAL (99.8%)</p>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-wider text-slate-400 uppercase flex items-center gap-1 font-bold">
                      <Activity className="w-3 h-3 text-brand-blue" /> GENERATION RATE
                    </span>
                    <p className="font-display font-bold text-sm text-white mt-0.5">3.24 MW ACTIVE</p>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-wider text-slate-400 uppercase font-bold">STORAGE TEMP</span>
                    <p className="font-display font-bold text-sm text-white mt-0.5">18.4 °C (OPTIMAL)</p>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-wider text-slate-400 uppercase font-bold">FREQUENCY LEVEL</span>
                    <p className="font-display font-bold text-sm text-white mt-0.5">50.02 Hz</p>
                  </div>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
