import ScrollProgressBar from "../components/ScrollProgressBar";
import FloatingChatButton from "../components/FloatingChatButton";
import AuroraBackground from "../components/AuroraBackground";
import CursorGlow from "../components/CursorGlow";
import LogoMarquee from "../components/LogoMarquee";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustBadges from "../components/TrustBadges";
import WhatCurex24Does from "../components/WhatCurex24Does";
import WhyChooseUs from "../components/WhyChooseUs";
import AppPreviewCarousel from "../components/AppPreviewCarousel";
import About from "../components/About";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

/* NEW SECTIONS */

import ServicesSection from "../components/ServicesSection";
import HomeClinicSection from "../components/HomeClinicSection";
import HowItWorks from "../components/HowItWorks";
import CareOptions from "../components/CareOptions";
import PatientsProviders from "../components/PatientsProviders";
import PartnerSection from "../components/PartnerSection";
import FinalCTA from "../components/FinalCTA";

export default function Home() {

  return (

    <>
      <AuroraBackground />
      <CursorGlow />
      <ScrollProgressBar />

      <Navbar />

      <div className="snap-section"><Hero /></div>

      <div className="snap-section"><TrustBadges /></div>

      <div className="snap-section"><LogoMarquee /></div>

      <div className="snap-section"><WhatCurex24Does /></div>

      {/* NEW SECTIONS START */}

      <div className="snap-section"><ServicesSection /></div>

      <div className="snap-section"><HomeClinicSection /></div>

      <div className="snap-section"><HowItWorks /></div>

      <div className="snap-section"><CareOptions /></div>

      <div className="snap-section"><PatientsProviders /></div>

      <div className="snap-section"><PartnerSection /></div>

      <div className="snap-section"><FinalCTA /></div>

      {/* NEW SECTIONS END */}

      <div className="snap-section"><WhyChooseUs /></div>

      <div className="snap-section"><AppPreviewCarousel /></div>

      <div className="snap-section"><About /></div>

      <div className="snap-section"><CTA /></div>

      <div className="snap-section"><Footer /></div>

      <FloatingChatButton />

    </>

  );

}
