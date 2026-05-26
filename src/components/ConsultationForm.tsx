import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Send, Shield, User, Phone, Mail, Euro } from 'lucide-react';

interface ConsultationFormProps {
  initialInvestment?: number;
  onSuccessClose?: () => void;
}

export default function ConsultationForm({ initialInvestment = 60000 }: ConsultationFormProps) {
  // Form input field state values
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    investVolume: initialInvestment.toString(),
    termSelect: '5 років',
    agreed: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email || !formData.agreed) {
      return;
    }

    setIsSubmitting(true);
    // Simulate premium backend post
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section id="contact" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32 select-none">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT COLUMN: BRAND PROMISE */}
        <div className="lg:col-span-5 py-4">
          <span className="font-mono text-xs tracking-widest text-[#e7520f] uppercase block font-bold">БЕЗПЕЧНА ТРАНСАКЦІЯ</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight mt-4 uppercase leading-[1.15]">
            Почніть інвестиції<br />
            разом із нами
          </h2>
          <p className="font-sans text-xs text-slate-300 mt-6 leading-relaxed font-light">
            Залиште заявку на отримання закритих корпоративних матеріалів, інвестиційного меморандуму та індивідуального фінансового розрахунку для вашого капіталу.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            <div className="flex items-center gap-3.5 text-xs text-slate-400 font-sans font-medium">
              <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-brand-blue shrink-0 shadow-sm">
                <Shield className="w-4 h-4 text-brand-blue" />
              </div>
              <span>Повна конфіденційність приватності джерела капіталу.</span>
            </div>
            <div className="flex items-center gap-3.5 text-xs text-slate-400 font-sans font-medium">
              <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-brand-blue shrink-0 shadow-sm">
                <Check className="w-4 h-4 text-brand-blue" />
              </div>
              <span>Вхідний дзвінок партнера протягом 15 хвилин.</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: HIGH-CONTRAST FORM CONTAINER (RESTORED TO PREVIOUS CLEAN GLASS-CARD) */}
        <div className="lg:col-span-7">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card rounded-2xl p-8 border border-white/5 relative overflow-hidden shadow-[0_30px_60px_rgba(1,3,9,0.7)]"
          >
            {/* Reflective top lighting line */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="font-display font-black text-xl text-white uppercase tracking-wider mb-6">
                    Форма консультації
                  </h3>

                  {/* Input 1: Full Name */}
                  <div className="relative">
                    <label className="font-mono text-[9px] tracking-wider text-slate-500 uppercase block mb-2 font-bold">Прізвище та ім'я</label>
                    <div className="relative flex items-center">
                      <User className="absolute left-4 w-4 h-4 text-slate-500 transition-colors duration-300" />
                      <input
                        type="text"
                        required
                        placeholder="Олександр Коваленко"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-slate-950/80 border border-white/5 focus:border-brand-blue/40 rounded-xl py-3.5 pl-12 pr-4 text-xs font-sans text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-blue/20 transition-all duration-300 shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Input 2: Phone & Email Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="font-mono text-[9px] tracking-wider text-slate-500 uppercase block mb-2 font-bold">Номер телефону</label>
                      <div className="relative flex items-center">
                        <Phone className="absolute left-4 w-4 h-4 text-slate-500" />
                        <input
                          type="tel"
                          required
                          placeholder="+380 50 123 45 67"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-slate-950/80 border border-white/5 focus:border-brand-blue/40 rounded-xl py-3.5 pl-12 pr-4 text-xs font-sans text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-blue/20 transition-all duration-300 shadow-inner"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="font-mono text-[9px] tracking-wider text-slate-500 uppercase block mb-2 font-bold">Електронна пошта</label>
                      <div className="relative flex items-center">
                        <Mail className="absolute left-4 w-4 h-4 text-slate-500" />
                        <input
                          type="email"
                          required
                          placeholder="partner@capital.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-slate-950/80 border border-white/5 focus:border-brand-blue/40 rounded-xl py-3.5 pl-12 pr-4 text-xs font-sans text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-blue/20 transition-all duration-300 shadow-inner"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Input 3: Investment Volume */}
                  <div className="relative">
                    <label className="font-mono text-[9px] tracking-wider text-slate-500 uppercase block mb-2 font-bold">Запланований об'єм інвестицій (€)</label>
                    <div className="relative flex items-center">
                      <Euro className="absolute left-4 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="60000"
                        value={formData.investVolume}
                        onChange={(e) => setFormData({ ...formData, investVolume: e.target.value })}
                        className="w-full bg-slate-950/80 border border-white/5 focus:border-brand-blue/40 rounded-xl py-3.5 pl-12 pr-4 text-xs font-display font-semibold text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-blue/20 transition-all duration-300 shadow-inner"
                      />
                    </div>
                  </div>

                  {/* GDPR checkbox */}
                  <div className="flex items-start gap-3 select-none pt-2">
                    <input
                      type="checkbox"
                      id="agreed-check"
                      required
                      checked={formData.agreed}
                      onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                      className="mt-1 w-4 h-4 bg-slate-950 border border-white/10 rounded cursor-pointer accent-brand-blue"
                    />
                    <label htmlFor="agreed-check" className="font-sans text-[10px] text-slate-400 cursor-pointer leading-normal font-light select-none">
                      Я надаю повну згоду на обробку та зберігання моїх персональних даних згідно з чинним законодавством України про правовий захист інформації.
                    </label>
                  </div>

                  {/* Submit Trigger Action Button */}
                  <div className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-white hover:bg-slate-100 disabled:bg-slate-800 text-slate-950 py-4 rounded-xl font-sans text-xs tracking-wider uppercase font-semibold flex items-center justify-center gap-3 transition-colors duration-300 cursor-pointer shadow-md"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                          <span>Надсилання даних...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-slate-950" />
                          <span>Надіслати запит на матеріали</span>
                        </>
                      )}
                    </motion.button>
                  </div>

                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="py-10 text-center flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 shadow-sm">
                    <Check className="w-8 h-8" />
                  </div>

                  <h3 className="font-display font-black text-2xl text-white uppercase tracking-wider">
                    ЗАПИТ НАДІСЛАНО
                  </h3>

                  <p className="font-sans text-xs text-slate-300 mt-4 max-w-sm leading-relaxed font-light">
                    Дякуємо! Ваша заявка успішно внесена до реєстру Codex Energy. Наш інвестиційний керуючий зв'яжеться з вами протягом найближчих 15 хвилин.
                  </p>

                  <div className="mt-8 border border-white/5 bg-slate-950/80 p-5 rounded-xl w-full max-w-xs text-left shadow-lg">
                    <span className="font-mono text-[8px] text-slate-400 uppercase tracking-wider font-bold">ДАНІ ПЕРЕВІРКИ</span>
                    <div className="mt-2 text-[10px] font-mono text-slate-300 space-y-1">
                      <p>ІМ'Я: {formData.fullName}</p>
                      <p>КАНАЛ ЗВ'ЯЗКУ: {formData.phone}</p>
                      <p>ОБ'ЄМ: €{parseInt(formData.investVolume).toLocaleString('uk-UA')}</p>
                      <p className="text-emerald-400 font-bold">СТАТУС: RECONCILED NOMINAL</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        phone: '',
                        email: '',
                        investVolume: initialInvestment.toString(),
                        termSelect: '5 років',
                        agreed: false
                      });
                    }}
                    className="mt-8 border border-white/10 hover:border-white/20 px-6 py-2 rounded-full font-sans text-[10px] uppercase text-slate-400 hover:text-white transition-all cursor-pointer"
                  >
                    Надіслати нову заявку
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </div>

      </div>

    </section>
  );
}
