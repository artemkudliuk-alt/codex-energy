import React from 'react';
import { Globe, Shield, Phone, Mail, MapPin } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="relative z-10 bg-black border-t border-brand-navy-medium/30 py-16 px-6 md:px-12 select-none">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Core items flex grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-brand-navy-medium/20">
          
          {/* Column 1: LOGO & ABOUT */}
          <div className="md:col-span-5 flex flex-col justify-start">
            <button 
              onClick={() => onNavigate('hero')}
              className="flex items-center group text-left focus:outline-none mb-6 cursor-pointer"
            >
              <Logo height="2rem" />
            </button>

            <p className="font-sans text-xs text-slate-400 max-w-sm leading-relaxed font-light">
              Преміальна інвестиційна платформа в енергетичну інфраструктуру та накопичувачі промислового масштабу в Україні.
            </p>
          </div>

          {/* Column 2: NAV LINKS */}
          <div className="md:col-span-3">
            <h4 className="font-display font-medium text-xs text-white tracking-widest uppercase mb-4">Навігація</h4>
            <div className="flex flex-col gap-2 font-sans text-xs text-slate-400">
              <button onClick={() => onNavigate('why-invest')} className="text-left hover:text-white transition-colors cursor-pointer">Про компанію</button>
              <button onClick={() => onNavigate('flagship-project')} className="text-left hover:text-white transition-colors cursor-pointer">Проєкти генерації</button>
              <button onClick={() => onNavigate('analytics')} className="text-left hover:text-white transition-colors cursor-pointer">Аналітичний дашборд</button>
              <button onClick={() => onNavigate('calculator')} className="text-left hover:text-white transition-colors cursor-pointer">Інвестиційний калькулятор</button>
              <button onClick={() => onNavigate('how-it-works')} className="text-left hover:text-white transition-colors cursor-pointer">Енергетичний цикл</button>
            </div>
          </div>

          {/* Column 3: OFFICIAL CONTACTS */}
          <div className="md:col-span-4 select-text">
            <h4 className="font-display font-medium text-xs text-white tracking-widest uppercase mb-4">Контакти</h4>
            <div className="space-y-3 font-sans text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-brand-blue shrink-0" />
                <span>м. Київ, вул. Михайла Грушевського, 10</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-blue shrink-0" />
                <a href="tel:+380442300050" className="hover:text-white transition-colors">+380 44 230 00 50</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-blue shrink-0" />
                <a href="mailto:office@codexenergy.com.ua" className="hover:text-white transition-colors">office@codexenergy.com.ua</a>
              </div>
            </div>
          </div>

        </div>

        {/* Legal disclosures & licensing */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-start gap-6 font-mono text-[9px] text-slate-500 uppercase font-bold leading-normal">
          
          <div className="space-y-1 text-slate-400">
            <p>© 2026 CODEX ENERGY INVESTMENT PLATFORM. ВСІ ПРАВА ЗАХИЩЕНО.</p>
            <p className="text-slate-600 font-light">ЛІЦЕНЗІЯ НКРЕКП НА ПРАВО ПРОВАДЖЕННЯ ДІЯЛЬНОСТІ З ВИРОБНИЦТВА ЕЛЕКТРИЧНОЇ ЕНЕРГІЇ №1024-EL ВІД 14.12.2024 Р.</p>
          </div>

          <div className="flex items-center gap-4 text-slate-500 select-none">
            <div className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-slate-500" />
              <span>SECURITY CERTIFIED BY AES-256</span>
            </div>
            <span>|</span>
            <div className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>COUNTRY ZONE: UA</span>
            </div>
          </div>

        </div>

      </div>

    </footer>
  );
}
