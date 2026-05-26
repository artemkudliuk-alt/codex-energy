import React from 'react';
import { motion } from 'motion/react';
import { Shield, Eye, TrendingUp, Landmark, Star, ShieldCheck } from 'lucide-react';
import { WhyInvestItem } from '../types';

export default function WhyInvest() {
  const items: WhyInvestItem[] = [
    {
      id: 'independence',
      title: 'Енергетична незалежність',
      description: 'Інвестиція в автономну генерацію, стійку до геополітичних коливань та локальних дефіцитів енергосистеми.',
      iconName: 'Shield',
      badge: 'АВТОНОМНІСТЬ',
    },
    {
      id: 'transparency',
      title: 'Прозорість та контроль',
      description: 'Прямий доступ до цифрового кабінету інвестора з живим клієнтом моніторингу вироблених кВт·год.',
      iconName: 'Eye',
      badge: 'ЦЕНТРАЛІЗОВАНІСТЬ',
    },
    {
      id: 'profitability',
      title: 'Висока прибутковість',
      description: 'Річна ставка дохідності від 16% до 20% в євро, що перевищує традиційні нерухомість та депозити.',
      iconName: 'TrendingUp',
      badge: 'ЕФЕКТИВНІСТЬ',
    },
    {
      id: 'infrastructure',
      title: 'Інфраструктурна цінність',
      description: 'Капітал забезпечений реальними активами промислового масштабу: землею, генераторами, BESS накопичувачами.',
      iconName: 'Landmark',
      badge: 'БЕЗПЕКА',
    },
    {
      id: 'stability',
      title: 'Операційна стабільність',
      description: 'Автоматизоване керування об\'єктами досвідченими інженерами та довгострокові гарантії на обладнання.',
      iconName: 'Star',
      badge: 'СТАБІЛЬНІСТЬ',
    },
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Shield': return <Shield className="w-8 h-8 text-brand-blue" />;
      case 'Eye': return <Eye className="w-8 h-8 text-brand-blue" />;
      case 'TrendingUp': return <TrendingUp className="w-8 h-8 text-brand-blue" />;
      case 'Landmark': return <Landmark className="w-8 h-8 text-brand-blue" />;
      case 'Star': return <Star className="w-8 h-8 text-brand-blue" />;
      default: return <ShieldCheck className="w-8 h-8 text-brand-blue" />;
    }
  };

  return (
    <section id="why-invest" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-32 select-none">
      
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-12 items-start relative z-10">
        
        {/* Left Column title */}
        <div className="xl:col-span-4 lg:sticky lg:top-32 select-none">
          <span className="font-mono text-xs tracking-widest text-[#f97316] uppercase block font-bold">БЕЗПЕКА ТА КАПІТАЛ</span>
          
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight mt-4 uppercase leading-[1.15]">
            Чому<br />
            інвестувати<br />
            у Codex Energy?
          </h2>
          
          <p className="font-sans text-sm text-slate-300 mt-5 max-w-sm leading-relaxed font-light">
            Ми поєднуємо технологічний стек управління енергетичними процесами з капіталом для створення стійкої інфраструктури подвійного призначення.
          </p>

          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-6 h-[2px] bg-gradient-to-r from-brand-blue to-transparent" 
          />
        </div>

        {/* Right Column Cards Bento Grid Layout */}
        <div className="xl:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-5 gap-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ 
                y: -4, 
                scale: 1.01,
                borderColor: 'rgba(56, 189, 248, 0.25)',
                boxShadow: '0 15px 30px rgba(56, 189, 248, 0.05)'
              }}
              className="glass-card rounded-2xl p-6 flex flex-col items-center text-center justify-between border border-white/5 transition-all duration-[400ms] group min-h-[320px] relative overflow-hidden cursor-default shadow-md"
            >
              {/* Card reflective linear shine highlight */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
              
              {/* Top border glowing highlight sweep */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1200ms] ease-in-out" />
              
              {/* Icon Container with glowing background */}
              <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-white/5 group-hover:bg-brand-blue/5 group-hover:border-brand-blue/20 flex items-center justify-center transition-all duration-300 relative">
                <div className="absolute inset-0 rounded-2xl bg-brand-blue/5 scale-0 group-hover:scale-100 transition-transform duration-500 blur-sm" />
                <div className="group-hover:scale-105 transition-transform duration-300">
                  {getIcon(item.iconName)}
                </div>
              </div>

              {/* Details & Title */}
              <div className="mt-6 flex flex-col justify-center items-center">
                <h4 className="font-display font-bold text-sm md:text-base text-white group-hover:text-brand-blue transition-colors duration-300 tracking-tight leading-snug">
                  {item.title}
                </h4>
                
                {/* Description */}
                <p className="font-sans text-[12px] sm:text-[13px] text-slate-400 mt-4 leading-relaxed line-clamp-4 group-hover:text-slate-200 transition-colors duration-300">
                  {item.description}
                </p>
              </div>

              {/* Badge */}
              <div className="mt-6 border border-white/5 bg-slate-950/70 px-3 py-1.5 rounded-full group-hover:border-brand-blue/10 transition-all duration-300">
                <span className="font-mono text-[9px] md:text-[10px] tracking-wider text-slate-400 group-hover:text-brand-blue/60 transition-colors uppercase font-bold">
                  {item.badge}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

    </section>
  );
}
