import React, { useState, useMemo, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { TrendingUp, Info, Activity } from 'lucide-react';
import { CalculatorState, CalculatorResult } from '../types';

export default function Calculator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Calculator initial inputs
  const [params, setParams] = useState<CalculatorState>({
    investment: 60000,
    term: 5,
    reinvestmentRate: 1, // 0 = Ні (0%), 0.5 = 50%, 1 = 100%
    scenario: 'base',
  });

  // Financial engine simulating direct payouts or compound interest based on rate
  const calculations = useMemo((): CalculatorResult => {
    const baseInterestPercent = 0.165; // 16.5% base
    const optInterestPercent = 0.195;  // 19.5% optimistic

    const invest = params.investment;
    const term = params.term;
    const rRate = params.reinvestmentRate; // 0, 0.5 or 1 (multiplier for reinvested interest)

    let averageYield = "17.2%";
    if (invest >= 120000) averageYield = "19.5%";
    else if (invest >= 80000) averageYield = "18.1%";
    else if (invest >= 40000) averageYield = "17.0%";
    else averageYield = "16.4%";

    // Computes year by year values
    const chartData = Array.from({ length: 11 }).map((_, year) => {
      if (year === 0) {
        return {
          year: 0,
          baseVal: invest,
          optimisticVal: invest,
        };
      }

      // Base scenario computation
      let baseVal = invest;
      let compoundedBase = invest;
      for (let y = 1; y <= year; y++) {
        const yieldAmt = compoundedBase * baseInterestPercent;
        const reinvested = yieldAmt * rRate;
        const paidOut = yieldAmt * (1 - rRate);
        compoundedBase += reinvested;
        baseVal = compoundedBase + (paidOut * y);
      }

      // Optimistic scenario computation
      let compoundedOpt = invest;
      let optVal = invest;
      for (let y = 1; y <= year; y++) {
        const yieldAmt = compoundedOpt * optInterestPercent;
        const reinvested = yieldAmt * rRate;
        const paidOut = yieldAmt * (1 - rRate);
        compoundedOpt += reinvested;
        optVal = compoundedOpt + (paidOut * y);
      }

      return {
        year,
        baseVal: Math.round(baseVal),
        optimisticVal: Math.round(optVal),
      };
    });

    const netProfit = Math.round(chartData[params.term].baseVal - invest);
    const totalValue = Math.round(chartData[params.term].baseVal);

    return {
      averageYield,
      netProfit,
      totalValue,
      chartData,
    };
  }, [params]);

  // SVG dimensions for forecasting line graph plotting
  const svgWidth = 500;
  const svgHeight = 280;
  const padding = 35;

  const minX = 0;
  const maxX = 10;
  const minY = 0;
  const maxY = useMemo(() => {
    const highestVal = calculations.chartData[10].optimisticVal;
    return Math.ceil(highestVal / 20000) * 20000;
  }, [calculations]);

  const getX = (x: number) => padding + (x / maxX) * (svgWidth - padding * 2);
  const getY = (y: number) => svgHeight - padding - (y / maxY) * (svgHeight - padding * 2);

  // Formats values to display prettified euros
  const formatEuro = (val: number) => {
    return new Intl.NumberFormat('uk-UA', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
      .format(val)
      .replace('євр.', '€')
      .trim();
  };

  // Build coordinate paths for lines in SVG
  const basePath = useMemo(() => {
    return calculations.chartData.map((d) => `${getX(d.year)},${getY(d.baseVal)}`).join(' L ');
  }, [calculations, maxY]);

  const optPath = useMemo(() => {
    return calculations.chartData.map((d) => `${getX(d.year)},${getY(d.optimisticVal)}`).join(' L ');
  }, [calculations, maxY]);

  // Build grid lines
  const gridLinesY = [0, maxY * 0.25, maxY * 0.5, maxY * 0.75, maxY];

  return (
    <section id="calculator" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32 select-none">
      
      {/* Title block */}
      <div className="flex flex-col mb-16 items-center text-center">
        <span className="font-mono text-xs tracking-widest text-brand-orange uppercase block font-bold">IНСТРУМЕНТ КАРТИ РОСТУ</span>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mt-4 uppercase leading-none">
          Калькулятор доходності
        </h2>
        <p className="font-sans text-xs text-slate-400 mt-4 max-w-md font-light">
          Проведіть аналіз очікуваної рентабельності вашого капіталу на основі гнучких ринкових сценаріїв та політики реінвестування.
        </p>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: 48 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 h-[2.5px] bg-[#3e69b1]" 
        />
      </div>

      {/* CORE GRAPH CONTAINER MODULE */}
      <motion.div 
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.99 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card rounded-2xl p-6 sm:p-10 border border-brand-navy-medium/30 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
      >
        {/* Soft glowing orange accent overlay */}
        <div className="absolute top-0 left-0 w-12 h-12 bg-brand-orange/5 rounded-br-2xl blur-[35px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch relative z-10">
          
          {/* COLUMN 1: CONTROLS & SLIDERS */}
          <div className="lg:col-span-4 flex flex-col justify-between py-2 border-b lg:border-b-0 lg:border-r border-brand-navy-medium/20 lg:pr-10">
            
            <div>
              <span className="font-mono text-[9px] tracking-widest text-slate-500 uppercase font-bold">ОПЕРАЦІЙНІ ПАРАМЕТРИ</span>
              <h3 className="font-display font-black text-xl text-white uppercase mt-1">Параметри портфеля</h3>
            </div>

            {/* Slider 1: Investment Volume */}
            <div className="mt-8">
              <div className="flex justify-between items-end">
                <span className="font-sans text-xs font-semibold text-slate-400">Інвестиції у розмірі</span>
                <span className="font-display font-extrabold text-lg text-white text-glow-blue transition-all duration-300">
                  {formatEuro(params.investment)}
                </span>
              </div>
              
              <div className="mt-4 relative">
                <input
                  type="range"
                  min="20000"
                  max="180000"
                  step="5000"
                  value={params.investment}
                  onChange={(e) => setParams({ ...params, investment: Number(e.target.value) })}
                  className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer focus:outline-none accent-brand-blue"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2">
                  <span>€20 000</span>
                  <span>€60 000</span>
                  <span>€180 000</span>
                </div>
              </div>
            </div>

            {/* Slider 2: Term in Years */}
            <div className="mt-8">
              <div className="flex justify-between items-end">
                <span className="font-sans text-xs font-semibold text-slate-400">Термін інвестицій</span>
                <span className="font-display font-extrabold text-lg text-white text-glow-orange transition-all duration-300">
                  {params.term} {params.term === 1 ? 'рік' : params.term < 5 ? 'роки' : 'років'}
                </span>
              </div>
              
              <div className="mt-4 relative">
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={params.term}
                  onChange={(e) => setParams({ ...params, term: Number(e.target.value) })}
                  className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer focus:outline-none accent-brand-orange"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2">
                  <span>1 рік</span>
                  <span>5 років</span>
                  <span>10 років</span>
                </div>
              </div>
            </div>

            {/* Segmented Option: Reinvestment */}
            <div className="mt-8">
              <div className="flex items-center gap-1.5 justify-start">
                <span className="font-sans text-xs font-semibold text-slate-400">Реінвестування прибутку</span>
                <div className="group relative cursor-help">
                  <Info className="w-3.5 h-3.5 text-slate-500 hover:text-white transition-colors" />
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-950 border border-brand-navy-medium/40 px-3 py-2 rounded-lg text-[10px] text-slate-300 w-48 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-30 leading-relaxed font-light">
                    Складний відсоток збільшує загальний об'єм генерації за рахунок повторної купівлі паїв.
                  </div>
                </div>
              </div>

              {/* Segmented Buttons Switch */}
              <div className="grid grid-cols-3 gap-2 mt-4 border border-brand-navy-medium/30 bg-black/80 p-1 rounded-xl">
                {[
                  { value: 0, label: 'Ні [0%]' },
                  { value: 0.5, label: '50%' },
                  { value: 1, label: '100%' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setParams({ ...params, reinvestmentRate: opt.value })}
                    className="font-sans text-[10px] font-semibold py-2 px-1 rounded-lg transition-all uppercase focus:outline-none cursor-pointer text-slate-400 hover:text-slate-200 bg-transparent active:scale-95"
                  >
                    <span className={params.reinvestmentRate === opt.value ? "text-white bg-brand-navy-deep border border-brand-navy-medium/40 px-2 py-1 rounded-md block shadow-sm" : ""}>
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* COLUMN 2: ANALYTICAL SCORE TILES */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-4 py-2 border-b lg:border-b-0 lg:border-r border-brand-navy-medium/20 lg:pr-10">
            
            {/* Tile 1: Expected Rate */}
            <div className="glass-card bg-[#061f35]/20 rounded-xl p-5 border border-brand-navy-medium/30 flex flex-col justify-between group">
              <span className="font-mono text-[8px] tracking-wider text-slate-500 uppercase block font-bold">СТАВКА ДОХІДНОСТІ</span>
              <div>
                <span className="font-display font-black text-2xl sm:text-3xl text-white group-hover:text-glow-blue transition-all duration-300 block w-full truncate">
                  {calculations.averageYield}
                </span>
                <p className="font-sans text-[10px] text-slate-400 mt-2 leading-relaxed font-light">
                  Орієнтовний середній річний відсоток паїв.
                </p>
              </div>
            </div>

            {/* Tile 2: Accumulations */}
            <div className="glass-card bg-[#061f35]/20 rounded-xl p-5 border border-brand-navy-medium/30 flex flex-col justify-between group">
              <span className="font-mono text-[8px] tracking-wider text-slate-500 uppercase block font-bold">ЧИСТИЙ ПРИБУТОК ЗА {params.term} Р.</span>
              <div>
                <span className="font-display font-black text-lg sm:text-xl xl:text-2xl text-white tracking-tighter sm:tracking-tight whitespace-nowrap overflow-hidden text-ellipsis block w-full group-hover:text-glow-orange transition-all duration-300">
                  {formatEuro(calculations.netProfit)}
                </span>
                <p className="font-sans text-[10px] text-slate-400 mt-2 leading-relaxed font-light">
                  Формується за обраний термін інвестицій.
                </p>
              </div>
            </div>

            {/* Tile 3: 10 year total BASE model */}
            <div className="glass-card bg-[#061f35]/20 rounded-xl p-5 border border-brand-navy-medium/30 flex flex-col justify-between group">
              <span className="font-mono text-[8px] tracking-wider text-slate-500 uppercase block font-bold">КУМУЛЯТИВ за 10 років</span>
              <div>
                <span className="font-display font-black text-lg sm:text-xl xl:text-2xl text-white tracking-tighter sm:tracking-tight whitespace-nowrap overflow-hidden text-ellipsis block w-full">
                  {formatEuro(calculations.chartData[10].baseVal - params.investment)}
                </span>
                <p className="font-sans text-[10px] text-slate-400 mt-2 leading-relaxed font-light">
                  Загальний накопичений чистий дохід (Базовий).
                </p>
              </div>
            </div>

            {/* Tile 4: 10 year OPTIMISTIC model */}
            <div className="glass-card bg-[#061f35]/20 rounded-xl p-5 border border-brand-orange/20 flex flex-col justify-between group relative overflow-hidden">
              <span className="font-mono text-[8px] tracking-wider text-brand-orange uppercase block font-bold">ОПТИМІСТИЧНИЙ за 10 р.</span>
              <div>
                <span className="font-display font-black text-lg sm:text-xl xl:text-2xl text-brand-orange text-glow-orange tracking-tighter sm:tracking-tight whitespace-nowrap overflow-hidden text-ellipsis block w-full">
                  {formatEuro(calculations.chartData[10].optimisticVal - params.investment)}
                </span>
                <p className="font-sans text-[10px] text-slate-400 mt-2 leading-relaxed font-light">
                  При оптимістичній генерації сонячних активів.
                </p>
              </div>
            </div>

          </div>

          {/* COLUMN 3: LIVE FORECAST GRAPH VECTOR CHART */}
          <div className="lg:col-span-4 flex flex-col justify-between py-2">
            
            {/* Header info */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-[9px] tracking-widest text-brand-orange uppercase block font-bold">FORECASTING ANALYSIS</span>
                <h4 className="font-display font-black text-sm text-white uppercase mt-0.5 leading-none">Прогноз доходу</h4>
              </div>
              
              {/* Chart Legend */}
              <div className="flex flex-col gap-1.5 text-[9px] font-sans">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-1.5 bg-brand-blue rounded-full" />
                  <span className="text-slate-400">Сценарій базовий</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-1.5 bg-brand-orange rounded-full" />
                  <span className="text-slate-400">Оптимістичний</span>
                </div>
              </div>
            </div>

            {/* Interactive Vector Graph */}
            <div className="relative mt-4 w-full h-[200px] bg-black/40 rounded-xl border border-brand-navy-medium/20 flex items-center justify-center p-2">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full text-slate-500 overflow-visible">
                {/* Horizontal y-axis grid lines with metrics */}
                {gridLinesY.map((yVal, i) => {
                  const yPos = getY(yVal);
                  return (
                    <g key={i} className="opacity-45">
                      <line
                        x1={padding}
                        y1={yPos}
                        x2={svgWidth - padding}
                        y2={yPos}
                        stroke="rgba(255,255,255,0.03)"
                        strokeDasharray="4 4"
                      />
                      <text
                        x={padding - 3}
                        y={yPos + 3}
                        className="fill-slate-500 font-mono text-[9px] font-bold text-right"
                        textAnchor="end"
                      >
                        {yVal >= 1000 ? `€${Math.round(yVal / 1000)}k` : `€${yVal}`}
                      </text>
                    </g>
                  );
                })}

                {/* Base Line Curve Plot with Vector outline draw */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: isInView ? 1 : 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  d={`M ${basePath}`}
                  fill="none"
                  stroke="#3e69b1"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Optimistic Line Curve Plot with Vector outline draw */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: isInView ? 1 : 0 }}
                  transition={{ duration: 1.8, ease: "easeOut" }}
                  d={`M ${optPath}`}
                  fill="none"
                  stroke="#e7520f"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Draw Year vertical coordinate indicators on x-axis */}
                {[0, 2, 4, 6, 8, 10].map((year) => {
                  const xPos = getX(year);
                  return (
                    <g key={year}>
                      <text
                        x={xPos}
                        y={svgHeight - 12}
                        className="fill-slate-500 font-mono text-[9px] font-bold text-center"
                        textAnchor="middle"
                      >
                        {year}
                      </text>
                    </g>
                  );
                })}

                {/* Text "роки" label */}
                <text
                  x={svgWidth - padding}
                  y={svgHeight - 12}
                  className="fill-slate-400 font-mono text-[9px] font-bold"
                  textAnchor="start"
                >
                  роки
                </text>

                {/* Interactive slider tracking dot indicator for the selected year */}
                {isInView && (() => {
                  const curYData = calculations.chartData[params.term];
                  if (!curYData) return null;
                  const bx = getX(curYData.year);
                  const by = getY(curYData.baseVal);
                  const ox = getX(curYData.year);
                  const oy = getY(curYData.optimisticVal);
                  return (
                    <g>
                      {/* Vertical tracker crosshair */}
                      <line
                        x1={bx}
                        y1={padding}
                        x2={bx}
                        y2={svgHeight - padding}
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                      />
                      {/* Base scenario circle indicator */}
                      <circle cx={bx} cy={by} r="4.5" fill="#3e69b1" stroke="#000000" strokeWidth="1.5" />
                      {/* Optimistic scenario circle indicator */}
                      <circle cx={ox} cy={oy} r="4.5" fill="#e7520f" stroke="#000000" strokeWidth="1.5" />
                    </g>
                  );
                })()}

              </svg>

              {/* Interactive Tooltip showing exactly current selected year outcomes */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black border border-brand-navy-medium/30 px-3 py-1.5 rounded-lg flex items-center gap-3 select-none pointer-events-none text-[10px] font-mono z-10 shadow-lg">
                <span className="text-slate-400 text-glow-blue font-bold">РІК {params.term}: </span>
                <span className="text-[#3e69b1] font-bold">{formatEuro(calculations.chartData[params.term].baseVal)}</span>
                <span className="text-slate-500">|</span>
                <span className="text-[#e7520f] font-bold">{formatEuro(calculations.chartData[params.term].optimisticVal)}</span>
              </div>
            </div>

            {/* Bottom active status tag */}
            <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-slate-400 border border-brand-navy-medium/20 bg-brand-navy-deep/20 p-2.5 rounded-lg">
              <Activity className="w-3.5 h-3.5 text-[#3e69b1]" />
              <span>Прогноз виконано за ринковим коефіцієнтом стабільності.</span>
            </div>

          </div>

        </div>

      </motion.div>

    </section>
  );
}
