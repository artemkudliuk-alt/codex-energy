import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Activity, Database, Thermometer, ShieldCheck, RefreshCw, Cpu, Star } from 'lucide-react';
import { AnalyticsMetric, LiveFeedItem } from '../types';

export default function AnalyticsDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [metrics, setMetrics] = useState<AnalyticsMetric[]>([
    { label: 'Сумарна потужність СЕС', value: '3.24 МВт', change: '+0.12 сьогодні', trend: 'up' },
    { label: 'Ефективність системи BESS', value: '98.4%', change: 'Стабільно', trend: 'stable' },
    { label: 'Вироблено за місяць', value: '472 МВт·год', change: '+3% до прогнозу', trend: 'up' },
    { label: 'Заощаджено викидів CO₂', value: '381.4 т', change: 'Екологічний еквівалент', trend: 'stable' },
  ]);

  const [liveFeed, setLiveFeed] = useState<LiveFeedItem[]>([
    { id: '1', timestamp: '14:48:30', unit: 'PV-A1', message: 'Генерація стабільна. Поточний вихід: 1540 кВт.', status: 'active' },
    { id: '2', timestamp: '14:49:02', unit: 'BESS-B1', message: 'Цикл підзарядки завершено. Стан заряду SOC: 82%.', status: 'active' },
    { id: '3', timestamp: '14:50:15', unit: 'TR-1', message: 'Частота 50.02 Гц. Температура трансформатора: 42°C.', status: 'active' },
    { id: '4', timestamp: '14:51:10', unit: 'ATC-C1', message: 'Режим пікового навантаження. Продаж на спотовому ринку.', status: 'active' },
  ]);

  const [activeTab, setActiveTab] = useState<'scada' | 'spot'>('scada');

  // Simulate real-time ticking parameters for Bloomberg Terminal atmosphere
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly tick some metrics slightly
      setMetrics((prev) =>
        prev.map((m, idx) => {
          if (idx === 0) {
            const currentVal = parseFloat(m.value);
            const delta = (Math.random() - 0.5) * 0.04;
            const newVal = Math.max(2.9, Math.min(3.4, currentVal + delta)).toFixed(2);
            return { ...m, value: `${newVal} МВт` };
          }
          if (idx === 2) {
            const currentVal = parseInt(m.value);
            const delta = Math.random() > 0.75 ? 1 : 0;
            return { ...m, value: `${currentVal + delta} МВт·год` };
          }
          return m;
        })
      );

      // Randomly insert or update logs in SCADA feed
      setLiveFeed((prev) => {
        const time = new Date().toTimeString().split(' ')[0];
        const units = ['PV-A1', 'BESS-B1', 'TR-1', 'ATC-C1'];
        const selectedUnit = units[Math.floor(Math.random() * units.length)];
        let message = '';

        if (selectedUnit === 'PV-A1') {
          message = `Споживчий потік оновлено. Генерація: ${(Math.random() * 200 + 1400).toFixed(0)} кВт.`;
        } else if (selectedUnit === 'BESS-B1') {
          message = `Температура осередків: ${(Math.random() * 2 + 18).toFixed(1)}°C. Система охолодження активна.`;
        } else if (selectedUnit === 'TR-1') {
          message = `Коефіцієнт напруги: ${(Math.random() * 0.2 + 35.1).toFixed(2)} кВ. Навантаження в межах лімітів.`;
        } else {
          message = `Ціна спотового закриття ринку: €142.30 за МВт·год. Коефіцієнт вигоди високий.`;
        }

        const newLog: LiveFeedItem = {
          id: Date.now().toString(),
          timestamp: time,
          unit: selectedUnit,
          message,
          status: 'active',
        };

        return [newLog, ...prev.slice(0, 3)];
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Historic spot market pricing dataset for rendering charts (last 6 hours)
  const spotChartData = [
    { hour: '10:00', price: 110, volume: 4.2 },
    { hour: '11:00', price: 115, volume: 4.5 },
    { hour: '12:00', price: 135, volume: 5.1 }, // Peak
    { hour: '13:00', price: 148, volume: 5.3 }, // Peak
    { hour: '14:00', price: 125, volume: 4.8 },
    { hour: '15:00', price: 142, volume: 4.9 },
  ];

  const chartWidth = 500;
  const chartHeight = 220;
  const graphPadding = 35;

  const getSpotX = (index: number) => graphPadding + (index / (spotChartData.length - 1)) * (chartWidth - graphPadding * 2);
  const getSpotY = (val: number) => chartHeight - graphPadding - ((val - 90) / 70) * (chartHeight - graphPadding * 2);

  const priceCurve = spotChartData.map((d, i) => `${getSpotX(i)},${getSpotY(d.price)}`).join(' L ');

  return (
    <section ref={containerRef} id="analytics" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-32 select-none">
      
      {/* Editorial top section layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 relative z-10">
        <div className="lg:col-span-8">
          <span className="font-mono text-xs tracking-widest text-[#f97316] uppercase block font-bold">ONLINE SCADA MONITORING</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight mt-4 uppercase leading-none">
            Інструменти аналітики
          </h2>
          <p className="font-sans text-xs sm:text-sm text-slate-300 mt-4 max-w-xl font-light leading-relaxed">
            Повний прямий доступ до внутрішніх показників генерації та спотових торгових сесій на європейському ринку. Тут представлено живі та ретроспективні параметри індустріальних секторів.
          </p>
        </div>
        
        {/* Toggle switch */}
        <div className="lg:col-span-4 flex justify-start lg:justify-end">
          <div className="flex bg-slate-950/80 border border-white/5 rounded-xl p-1 shadow-md">
            <button
              onClick={() => setActiveTab('scada')}
              className={`font-sans text-xs font-semibold py-2.5 px-5 rounded-lg transition-all uppercase focus:outline-none cursor-pointer ${
                activeTab === 'scada'
                  ? 'bg-slate-900 text-white border border-white/5 shadow-md'
                  : 'text-slate-500 hover:text-slate-300 bg-transparent'
              }`}
            >
              Командний SCADA-потік
            </button>
            <button
              onClick={() => setActiveTab('spot')}
              className={`font-sans text-xs font-semibold py-2.5 px-5 rounded-lg transition-all uppercase focus:outline-none cursor-pointer ${
                activeTab === 'spot'
                  ? 'bg-slate-900 text-white border border-white/5 shadow-md'
                  : 'text-slate-500 hover:text-slate-300 bg-transparent'
              }`}
            >
              Спотові ціни
            </button>
          </div>
        </div>
      </div>

      {/* CORE ANALYSIS TILE BLOCKS SCORE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 relative z-10">
        {metrics.map((elem, i) => (
          <motion.div 
            key={elem.label} 
            whileHover={{ y: -3, borderColor: 'rgba(56, 189, 248, 0.2)' }}
            className="glass-card bg-slate-950/40 border border-white/5 rounded-2xl p-5 md:p-6 relative overflow-hidden group shadow-md transition-all duration-[400ms]"
          >
            {/* Ambient HSL glow */}
            <div className="absolute top-0 left-0 w-8 h-8 bg-brand-blue/5 rounded-br-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="font-mono text-[9px] md:text-[10px] tracking-wider text-slate-400 uppercase block font-bold">{elem.label}</span>
            <div className="flex items-baseline justify-between mt-4">
              <span className="font-display font-black text-2xl sm:text-3xl text-white group-hover:text-glow-blue transition-all duration-300">
                {elem.value}
              </span>
              <span className="font-sans text-[10px] sm:text-xs text-emerald-400 font-bold">
                {elem.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* DETAILED DOUBLE GRID PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        
        {/* LEFT COMPONENT INTERFACE (SCADA / SPOT GRAPH) */}
        <div className="lg:col-span-7 flex flex-col justify-between glass-card rounded-2xl p-5 sm:p-8 border border-white/5 shadow-lg relative overflow-hidden">
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            {activeTab === 'scada' ? (
              <>
                {/* SCADA FEED HEADLINE */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-brand-orange animate-pulse" />
                    <span className="font-display font-bold text-sm text-white uppercase tracking-wider">Сумарний потік активів</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[11px] text-[#22c55e] bg-[#22c55e]/5 px-3 py-1.5 rounded-md font-bold">
                    <Database className="w-3.5 h-3.5 text-[#22c55e]" />
                    <span>ЖИВИЙ СИГНАЛ SCADA ONLINE</span>
                  </div>
                </div>

                {/* LIVE LIST ITEMS WITH LAYOUT TRANSITIONS */}
                <div className="divide-y divide-white/5 mt-4 min-h-[220px]">
                  <AnimatePresence initial={false}>
                    {liveFeed.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: -10, scale: 0.99 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="py-4 flex flex-col sm:flex-row items-baseline justify-between gap-4 group cursor-default"
                      >
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-[11px] text-slate-400">{item.timestamp}</span>
                          <span className="font-mono text-[11px] bg-slate-900 border border-white/10 text-white font-bold px-2 py-0.5 rounded-md group-hover:border-[#38bdf8]/30 transition-colors">
                            {item.unit}
                          </span>
                          <span className="font-sans text-xs sm:text-sm text-slate-300 group-hover:text-slate-100 transition-colors font-light">
                            {item.message}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="font-mono text-[10px] text-slate-400 uppercase font-bold">NOMINAL</span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                {/* SPOT PRICING GRAPH CHART */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-[#f97316]" />
                    <span className="font-display font-bold text-sm text-white uppercase tracking-wider">Вартість електрики за поточну сесію</span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-300 uppercase font-bold">ЦІНА В МВТ·ГОД (ЄВРО)</span>
                </div>

                <div className="relative mt-4 w-full h-[220px] rounded-xl flex items-center justify-center">
                  <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full text-slate-500 overflow-visible">
                    {/* Spot grid lines */}
                    {[90, 110, 130, 150].map((spotVal, i) => {
                      const yPos = getSpotY(spotVal);
                      return (
                        <g key={i}>
                          <line
                            x1={graphPadding}
                            y1={yPos}
                            x2={chartWidth - graphPadding}
                            y2={yPos}
                            stroke="rgba(255,255,255,0.03)"
                            strokeDasharray="2 2"
                          />
                          <text
                            x={graphPadding - 4}
                            y={yPos + 3}
                            className="fill-slate-400 font-mono text-[11px] font-bold text-right"
                            textAnchor="end"
                          >
                            €{spotVal}
                          </text>
                        </g>
                      );
                    })}

                    {/* Draw Spot Area glow beneath the curve */}
                    <path
                      d={`M ${graphPadding},${chartHeight - graphPadding} L ${priceCurve} L ${chartWidth - graphPadding},${chartHeight - graphPadding} Z`}
                      fill="url(#spot-area-gradient-3)"
                      className="opacity-5 transition-all duration-300"
                    />
                    <defs>
                      <linearGradient id="spot-area-gradient-3" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#e7520f" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>

                    {/* Spot line drawing curve */}
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: isInView ? 1 : 0 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      d={`M ${priceCurve}`}
                      fill="none"
                      stroke="#e7520f"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />

                    {/* Pricing hours values ticks on X */}
                    {spotChartData.map((d, i) => {
                      const xPos = getSpotX(i);
                      const yPos = getSpotY(d.price);
                      return (
                        <g key={i}>
                          <text
                            x={xPos}
                            y={chartHeight - 10}
                            className="fill-slate-400 font-mono text-[11px] font-bold"
                            textAnchor="middle"
                          >
                            {d.hour}
                          </text>
                          <circle cx={xPos} cy={yPos} r="4" fill="#fafafa" stroke="#ea580c" strokeWidth="1.5" />
                          <text x={xPos} y={yPos - 10} className="fill-[#f97316] font-mono text-[10px] font-bold" textAnchor="middle">
                            €{d.price}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </>
            )}

            {/* Bottom command summary panel */}
            <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
              <span className="font-mono text-[11px] text-slate-400 uppercase tracking-widest leading-none font-bold">
                LAST UPDATE DIRECT SENSORS IN 1 SEC
              </span>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-brand-blue animate-spin" style={{ animationDuration: '8s' }} />
                <span className="font-sans text-xs text-slate-300">Параметри життєдіяльності в межах норми ISO-50001.</span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COMPONENT GRID INFO (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          {/* Tile Block 1: Real-time efficiency levels */}
          <div className="glass-card bg-slate-950/40 rounded-2xl p-5 md:p-6 border border-white/5 relative overflow-hidden group shadow-md">
            <div className="absolute top-0 right-0 w-12 h-12 bg-emerald-600/5 rounded-full blur-md" />
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] md:text-[10px] tracking-widest text-[#22c55e] uppercase font-bold">BESS RELIABILITY COEFFICIENT</span>
              <ShieldCheck className="w-4 h-4 text-[#22c55e]" />
            </div>
            
            <h4 className="font-display font-black text-2xl sm:text-3xl text-white mt-4 uppercase">Збереження 98.4%</h4>
            <p className="font-sans text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-light">
              Рівень корисного збереження заряду в акумуляторних блоках CATL при добовому утриманні генерації. Мінімальний коефіцієнт деградації осередків.
            </p>
          </div>

          {/* Tile Block 2: Grid frequency monitoring */}
          <div className="glass-card bg-slate-950/40 rounded-2xl p-5 md:p-6 border border-white/5 relative overflow-hidden group shadow-md">
            <div className="absolute top-0 right-0 w-12 h-12 bg-brand-orange/5 rounded-full blur-md" />
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] md:text-[10px] tracking-widest text-brand-orange uppercase font-bold">TRANSFORMER STATE TR-1</span>
              <Thermometer className="w-4 h-4 text-brand-orange" />
            </div>

            <h4 className="font-display font-black text-2xl sm:text-3xl text-white mt-4 uppercase">42.1 °C / 50.02 Гц</h4>
            <p className="font-sans text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-light">
              Параметри лінійної трансформаторної підстанції під повним електричним завантаженням. Дані SCADA в реальному часі.
            </p>
          </div>

          {/* Tile Block 3: Grid active status */}
          <div className="glass-card bg-slate-950/40 rounded-xl p-5 border border-[#38bdf8]/15 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-lg bg-[#38bdf8]/10 flex items-center justify-center text-[#38bdf8]">
                <Cpu className="w-5.5 h-5.5" />
              </div>
              <div>
                <span className="font-display font-bold text-base text-white uppercase">Трансляція SCADA</span>
                <p className="font-sans text-xs text-slate-300 mt-0.5">Шифрування потоку AES-256</p>
              </div>
            </div>

            <span className="font-mono text-[11px] bg-[#38bdf8]/15 border border-[#38bdf8]/20 text-[#38bdf8] px-3.5 py-1.5 rounded-md uppercase font-bold animate-pulse">
              АКТИВНО
            </span>
          </div>

        </div>

      </div>

    </section>
  );
}
