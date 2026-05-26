import React, { useState } from 'react';
import BackgroundSystem from './components/BackgroundSystem';
import Header from './components/Header';
import Hero from './components/Hero';
import Metrics from './components/Metrics';
import WhyInvest from './components/WhyInvest';
import VideoShowcase from './components/VideoShowcase';
import Pipeline from './components/Pipeline';
import Calculator from './components/Calculator';
import FlagshipProject from './components/FlagshipProject';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import ConsultationForm from './components/ConsultationForm';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [calculationState, setCalculationState] = useState(60000);

  // Smooth scroll handler targeting sections securely
  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenConsultation = () => {
    handleNavigate('contact');
  };

  return (
    <div className="relative text-white font-sans selection:bg-brand-blue selection:text-slate-950 min-h-screen z-10">
      
      {/* Cinematic Custom Cursor System */}
      <CustomCursor />

      {/* 1. Cinematic Background & Volumetric Glow overlays */}
      <BackgroundSystem />

      {/* 2. Premium Translucent On-Scroll Header */}
      <Header 
        onOpenConsultation={handleOpenConsultation}
        onNavigate={handleNavigate}
      />

      {/* 3. Main Content Container Layout with spacious margins to let items breathe */}
      <main className="relative z-10">
        
        {/* Core SpaceX style logo overlap underlay Hero Section */}
        <Hero 
          onInvestClick={() => handleNavigate('calculator')}
          onMoreClick={() => handleNavigate('why-invest')}
          onPlayVideo={() => handleNavigate('how-it-works')}
        />

        {/* Bloomberg-Inspired Trust Metrics Bar */}
        <Metrics />

        {/* Why Invest Bento Grid */}
        <WhyInvest />

        {/* Apple-Style Presentation Video Showcase */}
        <VideoShowcase />

        {/* Dynamic Generation & Storage Pipeline Pipeline */}
        <Pipeline />

        {/* Institutional ROI Calculator Engine */}
        <Calculator />

        {/* Flagship Sunset Industrial Layout Block */}
        <FlagshipProject />

        {/* Bloomberg-Level Analytics SCADA live parameters */}
        <AnalyticsDashboard />

        {/* Secure Consultation Ingestion Form */}
        <ConsultationForm initialInvestment={60000} />

      </main>

      {/* 4. Complete footer referencing Ukraine energy regulations */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}
