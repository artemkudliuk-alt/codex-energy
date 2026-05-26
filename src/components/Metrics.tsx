import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { TrendingUp, Zap, BatteryCharging, Euro, Calendar } from 'lucide-react';
import { MetricItem } from '../types';

// Multi-digit concurrent interpolating counter subcomponent
function DigitCounter({ value, trigger, duration = 1.2 }: { value: string; trigger: boolean; duration?: number }) {
  const [displayVal, setDisplayVal] = useState("");

  useEffect(() => {
    if (!trigger) {
      setDisplayVal(value.replace(/\d+/g, "0"));
      return;
    }

    const match = value.match(/\d+/g);
    if (!match) {
      setDisplayVal(value);
      return;
    }

    const targets = match.map(Number);
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      let temp = value;
      const reversedMatch = [...match].reverse();
      const reversedTargets = [...targets].reverse();

      reversedMatch.forEach((numStr, idx) => {
        const targetVal = reversedTargets[idx];
        const currentNum = Math.floor(progress * targetVal);
        
        const lastIndex = temp.lastIndexOf(numStr);
        if (lastIndex !== -1) {
          temp = temp.substring(0, lastIndex) + currentNum.toString() + temp.substring(lastIndex + numStr.length);
        }
      });

      setDisplayVal(temp);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayVal(value);
      }
    };

    window.requestAnimationFrame(step);
  }, [value, trigger, duration]);

  return <span>{displayVal || value}</span>;
}

export default function Metrics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const metrics: MetricItem[] = [
    {
      id: 'roi',
      value: '16–20%',
      label: 'Очікувана річна дохідність',
      sublabel: 'Прогнозований ROI',
      icon: 'TrendingUp',
    },
    {
      id: 'capacity',
      value: '3300 кВт',
      label: 'Встановлена потужність',
      sublabel: 'Генерація сонячного парку',
      icon: 'Zap',
    },
    {
      id: 'storage',
      value: '10 МВт·год',
      label: 'Система накопичення енергії',
      sublabel: 'BESS накопичувач',
      icon: 'BatteryCharging',
    },
    {
      id: 'min-invest',
      value: '€20 000',
      label: 'Мінімальна сума інвестицій',
      sublabel: 'Поріг входу для капіталу',
      icon: 'Euro',
    },
    {
      id: 'launch',
      value: 'Q2 2025',
      label: 'Запуск об\'єктів',
      sublabel: 'Початок комерційної генерації',
      icon: 'Calendar',
    },
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-brand-blue" />;
      case 'Zap': return <Zap className="w-5 h-5 text-brand-orange" />;
      case 'BatteryCharging': return <BatteryCharging className="w-5 h-5 text-brand-blue" />;
      case 'Euro': return <Euro className="w-5 h-5 text-brand-blue" />;
      case 'Calendar': return <Calendar className="w-5 h-5 text-brand-orange" />;
      default: return <Zap className="w-5 h-5 text-brand-blue" />;
    }
  };

  return (
    <section ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12 select-none">
      {/* Container card in brand Navy */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card rounded-2xl p-8 md:p-10 border border-brand-navy-medium/30 relative overflow-hidden group/card shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-brand-navy-deep/20"
      >
        {/* Soft glowing line indicator running on top border */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />
        
        {/* Ambient background volumetric glow using brand Slate Blue */}
        <div className="absolute -bottom-10 left-1/3 right-1/3 h-[140px] bg-brand-blue/5 rounded-full filter blur-[60px] opacity-70 pointer-events-none group-hover/card:bg-brand-blue/8 transition-all duration-[1000ms]" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 divide-y sm:divide-y-0 lg:divide-x divide-brand-navy-medium/20">
          {metrics.map((m, index) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center pt-6 sm:pt-0 lg:px-4 first:pt-0 group cursor-default"
            >
              {/* Circular Icon with brand microglow */}
              <motion.div 
                whileHover={{ scale: 1.04, borderColor: 'rgba(62, 105, 177, 0.4)' }}
                className="w-11 h-11 rounded-full bg-black border border-brand-navy-medium/40 flex items-center justify-center transition-all duration-300 relative"
              >
                <div className="absolute inset-0 rounded-full bg-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                {getIcon(m.icon)}
              </motion.div>

              {/* Stat Value */}
              <h3 className="font-display font-extrabold text-2xl md:text-3xl text-white mt-5 tracking-tight group-hover:text-glow-blue transition-all duration-[400ms]">
                <DigitCounter value={m.value} trigger={isInView} />
              </h3>

              {/* Label */}
              <span className="font-sans font-medium text-xs text-slate-300 mt-2 leading-snug">
                {m.label}
              </span>

              {/* Sublabel / Detail */}
              <span className="font-mono text-[9px] tracking-wider text-slate-500 mt-1 uppercase font-bold">
                {m.sublabel}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
