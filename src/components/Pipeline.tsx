import React from 'react';
import { motion } from 'motion/react';
import { Sun, Battery, Landmark, TrendingUp, ArrowRight } from 'lucide-react';
import { PipelineStep } from '../types';

export default function Pipeline() {
  const steps: PipelineStep[] = [
    {
      number: '01',
      title: 'ГЕНЕРАЦІЯ',
      subtitle: 'Сонячні електростанції',
      iconName: 'Sun',
      details: 'Фотоелектричні модулі перетворюють сонячне випромінювання на екологічну повноформатну електроенергію постійного струму.'
    },
    {
      number: '02',
      title: 'НАКОПИЧЕННЯ',
      subtitle: 'Акумуляторні системи BESS',
      iconName: 'Battery',
      details: 'Інтелектуальні промислові акумулятори накопичують згенеровану потужність у піковий час вигідних генерацій.'
    },
    {
      number: '03',
      title: 'ЕНЕРГОРИНОК',
      subtitle: 'Продаж за вигідним тарифом',
      iconName: 'Landmark',
      details: 'Накопичену енергію продають у години екстремального пікового навантаження за максимальними споживчими тарифами ринку.'
    },
    {
      number: '04',
      title: 'ПРИБУТОК ІНВЕСТОРА',
      subtitle: 'Дивіденди в євро',
      iconName: 'TrendingUp',
      details: 'Отриманий прибуток розподіляють і щомісяця автоматично виплачують інвестору на розрахунковий рахунок в євро.'
    }
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Sun': return <Sun className="w-8 h-8 text-brand-orange" />;
      case 'Battery': return <Battery className="w-8 h-8 text-brand-blue" />;
      case 'Landmark': return <Landmark className="w-8 h-8 text-brand-blue" />;
      case 'TrendingUp': return <TrendingUp className="w-8 h-8 text-brand-orange" />;
      default: return <Sun className="w-8 h-8 text-white" />;
    }
  };

  return (
    <section id="how-it-works" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32 select-none">
      
      {/* Container holding the Header */}
      <div className="flex flex-col mb-16">
        <span className="font-mono text-xs tracking-widest text-brand-blue uppercase block font-bold">ЕКОСИСТЕМА РЕНТАБЕЛЬНОСТІ</span>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight mt-4 uppercase">
          Як це працює
        </h2>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 h-[2.5px] bg-brand-orange" 
        />
      </div>

      {/* LINEAR PIPELINE FLOW */}
      <div className="relative">
        
        {/* Continuous Pipeline Glowing Bar Indicator Behind Desktop Nodes */}
        <div className="absolute top-[52px] left-12 right-12 h-[2px] bg-brand-navy-medium/10 hidden lg:block overflow-hidden z-0">
          {/* Base sweeping energy flow */}
          <motion.div 
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-1/3 h-full bg-gradient-to-r from-transparent via-brand-blue to-brand-orange"
          />

          {/* Sequential high-frequency energy zip pulses */}
          <motion.div
            animate={{
              left: ['-10%', '110%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 2
            }}
            className="absolute top-0 w-24 h-full bg-white/20 filter blur-[1px]"
          />
        </div>

        {/* Nodes Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {steps.map((step, index) => (
            <div key={step.number} className="relative group">
              
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ 
                  y: -4,
                  borderColor: 'rgba(62, 105, 177, 0.25)',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.6)'
                }}
                className="glass-card rounded-2xl p-8 border border-brand-navy-medium/30 hover:bg-brand-navy-deep/20 transition-all duration-300 flex flex-col items-center text-center relative h-full cursor-default"
              >
                {/* Micro numerical indicator inside card background outline */}
                <div className="absolute top-4 right-6 font-display font-black text-white/5 text-4xl select-none group-hover:text-brand-orange/5 transition-colors">
                  {step.number}
                </div>

                {/* Node Orb with active glowing rings */}
                <div className="w-[104px] h-[104px] rounded-full bg-black border border-brand-navy-medium/30 group-hover:border-brand-blue/30 flex items-center justify-center relative transition-colors duration-500">
                  {/* Rotating dashed ring always active, accelerating on hover */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-[-4px] rounded-full border border-dashed border-brand-blue/10 group-hover:border-brand-blue/30 pointer-events-none" 
                  />
                  
                  {/* Volumetric central glow */}
                  <div className="absolute inset-2 rounded-full bg-black border border-brand-navy-medium/20 shadow-inner flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.3 }}
                    >
                      {getIcon(step.iconName)}
                    </motion.div>
                  </div>
                </div>

                {/* Step Headline */}
                <span className="font-mono text-[9px] tracking-[0.2em] text-[#e7520f] uppercase block mt-8 font-bold">
                  {step.number} {step.title}
                </span>

                <h4 className="font-display font-bold text-sm text-white mt-3 group-hover:text-brand-blue transition-colors">
                  {step.subtitle}
                </h4>

                <p className="font-sans text-[11px] text-slate-300 mt-4 leading-relaxed font-light">
                  {step.details}
                </p>

              </motion.div>

              {/* Node connecting arrow for md layout columns */}
              {index < 3 && (
                <div className="absolute top-[40px] right-[-24px] translate-y-2 z-20 text-brand-navy-medium hidden lg:flex items-center justify-center pointer-events-none group-hover:text-brand-orange transition-colors duration-300">
                  <ArrowRight className="w-5 h-5 animate-pulse" />
                </div>
              )}

            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
