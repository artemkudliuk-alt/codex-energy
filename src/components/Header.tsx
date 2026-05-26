import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Menu, X, Globe } from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  onOpenConsultation: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ onOpenConsultation, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Про нас', id: 'why-invest' },
    { label: 'Послуги', id: 'analytics' },
    { label: 'Проєкти', id: 'flagship-project' },
    { label: 'Команда', id: 'how-it-works' },
    { label: 'Блог', id: 'calculator' },
    { label: 'Контакти', id: 'contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-black/70 backdrop-blur-xl border-b border-brand-navy-medium/30 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.9)]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* LOGO SYSTEM - VITE IMPORTED SVG */}
          <button 
            onClick={() => onNavigate('hero')}
            className="flex items-center group text-left focus:outline-none cursor-pointer"
          >
              <Logo height="2.25rem" />
          </button>

          {/* MAIN DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="font-sans text-xs tracking-wider text-slate-300 hover:text-white transition-colors py-2 relative group focus:outline-none cursor-pointer"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-brand-blue to-brand-orange transition-all duration-[400ms] ease-[0.16,1,0.3,1] group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* CTA & LANG SELECT */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 border border-brand-navy-medium/20 bg-brand-navy-deep/40 px-3 py-1.5 rounded-full select-none">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>UA</span>
            </div>

            {/* Subtle glow action button in brand book colors */}
            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={onOpenConsultation}
              className="relative overflow-hidden group border border-brand-navy-medium/40 hover:border-brand-blue/40 rounded-full px-5 py-2.5 transition-all duration-[400ms] font-sans text-xs tracking-wider font-semibold text-white bg-brand-navy-deep/20 hover:bg-brand-navy-deep/50 focus:outline-none hover:shadow-[0_0_15px_rgba(62,105,177,0.12)] cursor-pointer"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-brand-blue/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1200ms] ease-out" />
              <span className="flex items-center gap-2 relative z-10">
                Отримати презентацію
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 text-slate-200 group-hover:text-white" />
              </span>
            </motion.button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="flex md:hidden items-center gap-4">
            <div className="text-[10px] font-mono text-slate-400 bg-brand-navy-deep/40 px-2 py-1 rounded-md">
              UA
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </motion.header>

      {/* MOBILE NAV MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[58px] left-0 right-0 bg-black/95 border-b border-brand-navy-medium/30 backdrop-blur-xl z-40 block md:hidden py-6 overflow-hidden"
          >
            <div className="px-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate(item.id);
                  }}
                  className="text-left font-sans text-sm tracking-wider text-slate-300 hover:text-white py-2 border-b border-white/5 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full mt-4 flex items-center justify-center gap-2 font-sans text-xs tracking-wider font-semibold bg-white text-slate-950 py-3 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Отримати презентацію
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
