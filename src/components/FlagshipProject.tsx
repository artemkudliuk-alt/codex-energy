import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { ArrowRight, Sun, Battery, ShieldCheck, Calendar, X, Cpu, Zap, Radio, Database } from 'lucide-react';
import { ProjectDetail } from '../types';

export default function FlagshipProject() {
  const [showBlueprints, setShowBlueprints] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const project: ProjectDetail = {
    id: 'bolgrad',
    title: 'ЕНЕРГОПАРК БОЛГРАД',
    subtitle: 'НАШ ФЛАГМАНСЬКИЙ ПРОЄКТ',
    capacity: '3300 кВт',
    storage: '10 МВт·год',
    greenEnergy: '100%',
    timeline: 'II квартал 2025',
    description: 'Комплексна інфраструктурна сонячна електростанція разом із інтегрованою промисловою системою накопичення енергії (BESS). Забезпечує старт генерації за високим зеленим тарифом із можливістю автоматичного згладжування навантажень та продажу в енергомережу на спотовому ринку в пікові години.'
  };

  return (
    <section ref={containerRef} id="flagship-project" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-32 select-none">
      
      {/* 2 or 3 Grid Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* LEFT COLUMN: TITLE & INTRO INFO */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full py-4">
          <div>
            <span className="font-mono text-xs font-bold tracking-widest text-[#3e69b1] uppercase block">
              {project.subtitle}
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight uppercase leading-[1.1] mt-4">
              Енергопарк<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-slate-100 to-brand-orange">
                Болград
              </span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-slate-300 mt-5 leading-relaxed font-light">
              {project.description}
            </p>
          </div>

          <div className="mt-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowBlueprints(true)}
              className="group border border-brand-navy-medium/40 hover:border-brand-blue/40 rounded-full bg-brand-navy-deep/20 p-2 pr-6 flex items-center gap-3 transition-colors duration-[400ms] font-sans text-sm tracking-wider uppercase font-semibold text-white focus:outline-none cursor-pointer"
            >
              <span className="w-10 h-10 rounded-full bg-black border border-brand-navy-medium/30 flex items-center justify-center text-[#3e69b1] group-hover:bg-[#3e69b1]/10 group-hover:border-[#3e69b1]/50 transition-all duration-300">
                <ArrowRight className="w-4 h-4" />
              </span>
              <span>Детальні креслення</span>
            </motion.button>
          </div>
        </div>

        {/* MIDDLE COLUMN: REAL-INFRASTRUCTURE GRAPHIC */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-[360px] rounded-2xl glass-card border border-brand-navy-medium/30 relative overflow-hidden group shadow-md"
          >
            <div className="absolute inset-0 bg-black overflow-hidden">
              
              {/* Dynamic sunset sky linear gradient using brand colors */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-brand-navy-deep/75 to-brand-orange-glow mix-blend-color-dodge pointer-events-none" />
              
              {/* Soft sunset flare in background */}
              <div className="absolute bottom-1/4 left-1/3 w-[150px] h-[150px] bg-brand-orange/5 rounded-full filter blur-[50px] animate-pulse duration-[5000ms] pointer-events-none" />
              
              {/* Vector blueprint landscape */}
              <svg viewBox="0 0 1000 600" className="absolute bottom-0 left-0 w-full h-[90%] opacity-85 pointer-events-none" preserveAspectRatio="none">
                
                {/* Hills and background contour lines */}
                <path d="M 0,380 C 200,320 400,350 700,320 L 1000,350 L 1000,600 L 0,600 Z" fill="#061f35" />
                <path d="M 0,420 C 300,370 600,410 800,380 Q 900,390 1000,410 L 1000,600 L 0,600 Z" fill="#000000" />
                
                {/* Solar farm panel grid structures in Slate Blue */}
                <g stroke="#3e69b1" strokeWidth="0.8" opacity="0.15">
                  {Array.from({ length: 12 }).map((_, i) => {
                    const xL = 80 + i * 40;
                    return (
                      <line key={i} x1={xL} y1="600" x2={150 + i * 20} y2="440" />
                    );
                  })}
                  {/* Perspective crossbars */}
                  <line x1="0" y1="460" x2="600" y2="460" />
                  <line x1="0" y1="490" x2="600" y2="490" />
                  <line x1="0" y1="530" x2="600" y2="530" />
                  <line x1="0" y1="580" x2="600" y2="580" />
                </g>

                {/* Industrial Battery container boxes on right platform */}
                {Array.from({ length: 4 }).map((_, i) => {
                  const xStart = 640 + i * 85;
                  return (
                    <g key={i}>
                      {/* Container shadows and 3D wireframe borders */}
                      <rect x={xStart} y="415" width="70" height="50" fill="#061f35" stroke="rgba(35, 48, 94, 0.4)" />
                      <path d={`M ${xStart},415 L ${xStart + 15},405 L ${xStart + 85},405 L ${xStart + 70},415 Z`} fill="#061f35" stroke="rgba(35, 48, 94, 0.4)" />
                      <path d={`M ${xStart + 70},415 L ${xStart + 85},405 L ${xStart + 85},455 L ${xStart + 70},465 Z`} fill="#000000" stroke="rgba(35, 48, 94, 0.4)" />
                      
                      {/* State glow parameters mapped to brand Slate Blue & Orange */}
                      <rect x={xStart + 12} y="425" width="4" height="25" fill="#3e69b1" className="animate-pulse" style={{ animationDelay: `${i * 400}ms` }} />
                      <rect x={xStart + 22} y="425" width="4" height="25" fill="#e7520f" className="animate-pulse" style={{ animationDelay: `${i * 400 + 200}ms` }} />
                      <circle cx={xStart + 45} cy="430" r="1.5" fill="#3e69b1" />
                      <circle cx={xStart + 45} cy="438" r="1.5" fill="#e7520f" />
                      <circle cx={xStart + 45} cy="446" r="1.5" fill="#ffffff" />

                      {/* Storage cabin ventilation paths */}
                      <line x1={xStart + 55} y1="425" x2={xStart + 63} y2="425" stroke="rgba(35, 48, 94, 0.5)" />
                      <line x1={xStart + 55} y1="430" x2={xStart + 63} y2="430" stroke="rgba(35, 48, 94, 0.5)" />
                      <line x1={xStart + 55} y1="435" x2={xStart + 63} y2="435" stroke="rgba(35, 48, 94, 0.5)" />
                    </g>
                  );
                })}

                {/* Highly Technical Grid overlay lines */}
                <line x1="600" y1="320" x2="600" y2="600" stroke="rgba(35, 48, 94, 0.15)" strokeWidth="1" />
                <line x1="0" y1="410" x2="1000" y2="410" stroke="rgba(35, 48, 94, 0.1)" strokeWidth="1" />
              </svg>

              {/* Glowing power line */}
              <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-orange to-transparent shrink-0 opacity-15" />
            </div>

            {/* Highly detailed live industrial telemetry overlays (SCADA UI) */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-blue/5 to-transparent h-12 w-full pointer-events-none opacity-25" style={{ animation: 'scan 6s infinite linear' }} />
            
            {/* Top Row status telemetry bar */}
            <div className="absolute top-12 left-4 right-4 flex justify-between items-center text-[7.5px] font-mono text-slate-400 select-none pointer-events-none z-10 bg-black/45 backdrop-blur-[2px] p-1.5 rounded border border-white/5 shadow-inner">
              <div className="flex gap-3 items-center">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />SYSTEM: ONLINE</span>
                <span className="text-slate-600">|</span>
                <span>GRID FREQ: 50.02 HZ</span>
                <span className="text-slate-600">|</span>
                <span>EFFICIENCY: 98.8%</span>
              </div>
              <div className="flex gap-3 items-center">
                <span>TEMP: 24.3 °C</span>
                <span className="text-slate-600">|</span>
                <span className="text-brand-orange font-bold">BESS CHARGE: 87%</span>
              </div>
            </div>

            {/* Left Panel: Real-time generation waveform */}
            <div className="absolute top-22 left-4 w-[110px] h-[155px] bg-black/60 border border-brand-navy-medium/25 rounded-lg p-2.5 pointer-events-none select-none z-10 shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex justify-between text-[6px] font-mono text-slate-500 uppercase font-bold mb-1.5">
                  <span>GENERATION WAVE</span>
                  <span className="text-[#3e69b1]">3.3 MW</span>
                </div>
                {/* Real-time undulating generator wave */}
                <svg viewBox="0 0 100 45" className="w-full h-[65px] text-[#3e69b1] opacity-80">
                  <motion.path
                    d="M 0,22 Q 12.5,2 25,22 T 50,22 T 75,22 T 100,22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    animate={{
                      d: [
                        "M 0,22 Q 12.5,4 25,22 T 50,22 T 75,22 T 100,22",
                        "M 0,22 Q 12.5,40 25,22 T 50,22 T 75,22 T 100,22",
                        "M 0,22 Q 12.5,4 25,22 T 50,22 T 75,22 T 100,22"
                      ]
                    }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <line x1="0" y1="12" x2="100" y2="12" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                  <line x1="0" y1="22" x2="100" y2="22" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                  <line x1="0" y1="32" x2="100" y2="32" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                </svg>
              </div>
              
              <div className="border-t border-brand-navy-medium/15 pt-1 text-[5px] font-mono text-slate-500 font-bold leading-normal">
                <span>VOLT REF: 220.4 kV</span>
              </div>
            </div>

            {/* Center Panel: Interactive operational network topology map */}
            <div className="absolute top-22 left-[125px] right-[125px] h-[155px] border border-brand-navy-medium/15 bg-black/60 rounded-lg p-2.5 flex flex-col justify-between pointer-events-none select-none z-10 shadow-lg">
              <div className="flex justify-between text-[6px] font-mono text-slate-500 uppercase font-bold mb-1">
                <span>SYSTEM TOPOLOGY</span>
                <span>SUB-ZONE B-1</span>
              </div>
              
              {/* Dynamic SVGs diagram with moving dasharrays representing live electrical current flows */}
              <svg viewBox="0 0 160 110" className="w-full h-[95%] text-slate-600">
                <circle cx="20" cy="55" r="3" fill="#3e69b1" className="animate-pulse" />
                <text x="20" y="47" textAnchor="middle" className="font-mono text-[5px] fill-slate-400">PV FIELD</text>
                
                <circle cx="65" cy="25" r="3" fill="#e7520f" />
                <text x="65" y="17" textAnchor="middle" className="font-mono text-[5px] fill-slate-400">BESS CORE</text>

                <circle cx="65" cy="85" r="3" fill="#3e69b1" />
                <text x="65" y="77" textAnchor="middle" className="font-mono text-[5px] fill-slate-400">INVERTERS</text>

                <circle cx="110" cy="55" r="4" fill="#ffffff" stroke="#3e69b1" strokeWidth="1" className="animate-pulse" />
                <text x="110" y="45" textAnchor="middle" className="font-mono text-[5px] fill-white font-bold">35kV XFRM</text>

                <circle cx="145" cy="55" r="3" fill="#e7520f" />
                <text x="145" y="47" textAnchor="middle" className="font-mono text-[5px] fill-brand-orange font-bold">GRID</text>

                {/* Animated dash vectors representing active current routing */}
                <motion.path 
                  d="M 23,55 L 62,25" 
                  fill="none" 
                  stroke="#3e69b1" 
                  strokeWidth="0.8" 
                  strokeDasharray="4 4"
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <motion.path 
                  d="M 23,55 L 62,85" 
                  fill="none" 
                  stroke="#3e69b1" 
                  strokeWidth="0.8" 
                  strokeDasharray="4 4"
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <motion.path 
                  d="M 68,25 L 106,55" 
                  fill="none" 
                  stroke="#e7520f" 
                  strokeWidth="0.8" 
                  strokeDasharray="4 4"
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <motion.path 
                  d="M 68,85 L 106,55" 
                  fill="none" 
                  stroke="#3e69b1" 
                  strokeWidth="0.8" 
                  strokeDasharray="4 4"
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />
                <motion.path 
                  d="M 114,55 L 142,55" 
                  fill="none" 
                  stroke="#e7520f" 
                  strokeWidth="1" 
                  strokeDasharray="5 5"
                  animate={{ strokeDashoffset: [0, -25] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </svg>
            </div>

            {/* Right Panel: Telemetry performance matrix logs */}
            <div className="absolute top-22 right-4 w-[110px] h-[155px] bg-black/60 border border-brand-navy-medium/25 rounded-lg p-2.5 pointer-events-none select-none z-10 shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex justify-between text-[6px] font-mono text-slate-500 uppercase font-bold mb-2">
                  <span>TELEMETRY MATRIX</span>
                  <span className="text-[#e7520f]">SECURE</span>
                </div>
                <div className="space-y-1.5 font-mono text-[5.5px] text-slate-400 leading-relaxed">
                  <p>CAPACITY: <span className="text-white font-bold">3300 kW</span></p>
                  <p>YIELD LIVE: <span className="text-brand-blue font-bold">2984 kW</span></p>
                  <p>RE-STORAGE: <span className="text-brand-orange font-bold">980 kW/h</span></p>
                  <p>GRID LOAD: <span className="text-white font-bold">91.4%</span></p>
                </div>
              </div>
              
              <div className="border-t border-brand-navy-medium/20 pt-1.5">
                <span className="font-mono text-[5px] text-slate-500 uppercase block font-bold">STATUS MSG</span>
                <span className="font-mono text-[5.5px] text-emerald-400 font-bold block mt-0.5 animate-pulse">● FEEDER FEED OK PASS</span>
              </div>
            </div>

            {/* Static layout overlays */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#000000]/65 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-4 left-4 bg-black/85 border border-brand-navy-medium/30 py-1.5 px-3 rounded-md select-none pointer-events-none">
              <span className="font-mono text-[9px] text-[#3e69b1] tracking-widest uppercase font-bold">● LIVE FEED DIRECT VIA SENSORS</span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: DETAILED INFRASTRUCTURE PARAMS SIDEBAR */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          
          {/* Card 1: Capacity */}
          <div className="glass-card bg-brand-navy-deep/10 border border-brand-navy-medium/30 rounded-xl p-4 md:p-5 flex items-center justify-between group cursor-default hover:border-brand-blue/30 transition-all duration-[400ms] shadow-sm">
            <div className="flex flex-col">
              <span className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                {project.capacity}
              </span>
              <span className="font-sans text-[11px] text-slate-300 mt-1.5 uppercase font-bold tracking-wider">
                встановлена потужність active
              </span>
            </div>
            <div className="w-11 h-11 rounded-full bg-black border border-brand-navy-medium/30 flex items-center justify-center text-brand-orange group-hover:scale-102 transition-all duration-300">
              <Sun className="w-5.5 h-5.5" />
            </div>
          </div>

          {/* Card 2: Storage system */}
          <div className="glass-card bg-brand-navy-deep/10 border border-brand-navy-medium/30 rounded-xl p-4 md:p-5 flex items-center justify-between group cursor-default hover:border-brand-blue/30 transition-all duration-[400ms] shadow-sm">
            <div className="flex flex-col">
              <span className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                {project.storage}
              </span>
              <span className="font-sans text-[11px] text-slate-300 mt-1.5 uppercase font-bold tracking-wider">
                система зберігання BESS
              </span>
            </div>
            <div className="w-11 h-11 rounded-full bg-black border border-brand-navy-medium/30 flex items-center justify-center text-brand-blue group-hover:scale-102 transition-all duration-300">
              <Battery className="w-5.5 h-5.5" />
            </div>
          </div>

          {/* Card 3: Renewable standard ratio */}
          <div className="glass-card bg-brand-navy-deep/10 border border-brand-navy-medium/30 rounded-xl p-4 md:p-5 flex items-center justify-between group cursor-default hover:border-brand-blue/30 transition-all duration-[400ms] shadow-sm">
            <div className="flex flex-col">
              <span className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                {project.greenEnergy}
              </span>
              <span className="font-sans text-[11px] text-slate-300 mt-1.5 uppercase font-bold tracking-wider">
                чиста зелена енергія
              </span>
            </div>
            <div className="w-11 h-11 rounded-full bg-black border border-brand-navy-medium/30 flex items-center justify-center text-brand-blue group-hover:scale-102 transition-all duration-300">
              <ShieldCheck className="w-5.5 h-5.5" />
            </div>
          </div>

          {/* Card 4: Launch Quarter schedule */}
          <div className="glass-card bg-brand-navy-deep/10 border border-brand-orange/20 rounded-xl p-4 md:p-5 flex items-center justify-between group cursor-default hover:border-brand-orange/30 transition-all duration-[400ms] shadow-sm">
            <div className="flex flex-col">
              <span className="font-display font-black text-2xl sm:text-3xl text-brand-orange text-glow-orange tracking-tight">
                {project.timeline}
              </span>
              <span className="font-sans text-[11px] text-slate-300 mt-1.5 uppercase font-bold tracking-wider">
                запуск об'єкта в мережу
              </span>
            </div>
            <div className="w-11 h-11 rounded-full bg-black border border-brand-orange/20 flex items-center justify-center text-brand-orange group-hover:scale-102 transition-all duration-300">
              <Calendar className="w-5.5 h-5.5" />
            </div>
          </div>

        </div>

      </div>

      {/* DETAILED BLUEPRINTS MODAL */}
      <AnimatePresence>
        {showBlueprints && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] flex items-center justify-center p-6 select-none"
            onClick={() => setShowBlueprints(false)}
          >
            <motion.div 
              initial={{ scale: 0.96, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 20 }}
              className="relative w-full max-w-4xl bg-black border border-brand-navy-medium/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col p-6 sm:p-10 text-slate-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-brand-navy-medium/20 pb-4">
                <div className="flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-brand-blue" />
                  <span className="font-display font-extrabold text-sm sm:text-base text-white tracking-wider uppercase">КРЕСЛЕННЯ ТА СХЕМА ПІДКЛЮЧЕННЯ — ЕНЕРГОПАРК БОЛГРАД</span>
                </div>
                
                <button 
                  onClick={() => setShowBlueprints(false)}
                  className="w-10 h-10 rounded-full bg-black border border-brand-navy-medium/30 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Technical Drawing Blueprint Layout */}
              <div className="my-8 aspect-video w-full bg-black border border-dashed border-brand-navy-medium/20 rounded-xl p-4 flex flex-col justify-between overflow-hidden relative">
                
                {/* Blueprint grid */}
                <div 
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, #3e69b1 1px, transparent 1px),
                      linear-gradient(to bottom, #3e69b1 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px',
                  }}
                />

                {/* Circuit Schematics SVG Drawing */}
                <div className="absolute inset-0 flex items-center justify-center opacity-40">
                  <svg viewBox="0 0 600 300" className="w-full h-full text-brand-blue">
                    <motion.path 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      d="M 50,150 L 150,150 L 200,80 L 300,80 L 350,150 L 550,150" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                    />
                    <motion.path 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
                      d="M 150,150 L 200,220 L 300,220 L 350,150" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                    />
                    <line x1="250" y1="50" x2="250" y2="250" stroke="currentColor" strokeWidth="1.2" strokeDasharray="5 5" className="opacity-30" />
                    
                    {/* Inverter module rectangles */}
                    <rect x="70" y="125" width="60" height="50" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <text x="100" y="155" textAnchor="middle" className="font-mono text-[9px] fill-brand-blue font-bold">PV INVERTER</text>

                    <rect x="220" y="55" width="60" height="50" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <text x="250" y="85" textAnchor="middle" className="font-mono text-[9px] fill-brand-blue font-bold">BESS CORE</text>

                    <rect x="220" y="195" width="60" height="50" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <text x="250" y="225" textAnchor="middle" className="font-mono text-[9px] fill-brand-blue font-bold">GRID METER</text>

                    <rect x="370" y="125" width="80" height="50" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <text x="410" y="155" textAnchor="middle" className="font-mono text-[9px] fill-brand-blue font-bold">35kV TRANSF.</text>

                    {/* Circle indicators */}
                    <circle cx="50" cy="150" r="4" fill="currentColor" />
                    <circle cx="550" cy="150" r="4" fill="currentColor" />
                  </svg>
                </div>

                <div className="z-10 flex justify-between font-mono text-[9px] text-slate-500 font-bold">
                  <span>SYSTEM DRAWING: BW-0493-2026 // RELEASE 5A</span>
                  <span>REF. BOLGRAD PHASE 1 // BESS POWER</span>
                </div>

                <div className="z-10 flex gap-6 items-center flex-wrap">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-brand-orange" />
                    <span className="font-mono text-[10px] text-slate-300 font-bold">MODULAR PCS: ATESS 1500kW</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-brand-orange" />
                    <span className="font-mono text-[10px] text-slate-300 font-bold">BATTERY: CATL LFP 3.2MWh CLUSTER</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-brand-blue" />
                    <span className="font-mono text-[10px] text-slate-400 font-bold">TELEMETRY SCADA: V3.14-SECURE</span>
                  </div>
                </div>
              </div>

              {/* Action and description of steps */}
              <p className="font-sans text-xs text-slate-400 leading-relaxed font-light">
                Проєкт пройшов повну екологічну та технічну сертифікацію (ТУ), отримано всі дозволи на підключення до ліній НЕК "Укренерго" та погоджено приєднання потужністю 3.3 МВт. Склади акумуляторного ресурсу BESS знаходяться на етапі кінцевої сумісності з інверторами ATESS.
              </p>

              <div className="mt-8 border-t border-brand-navy-medium/20 pt-6 flex justify-end">
                <button
                  onClick={() => setShowBlueprints(false)}
                  className="bg-white hover:bg-slate-100 text-slate-950 px-6 py-2.5 rounded-full font-sans text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                >
                  Зрозуміло
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
