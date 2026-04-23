import ScrollProgressBar from "../components/ScrollProgressBar";
import FloatingChatButton from "../components/FloatingChatButton";

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
      <ScrollProgressBar />

      <Navbar />

      <Hero />

      <TrustBadges />

      <WhatCurex24Does />

      {/* NEW SECTIONS START */}

      <ServicesSection />

      <HomeClinicSection />

      <HowItWorks />

      <CareOptions />

      <PatientsProviders />

      <PartnerSection />

      <FinalCTA />

      {/* NEW SECTIONS END */}

      <WhyChooseUs />

      <AppPreviewCarousel />

      <About />

      <CTA />

      <Footer />

      <FloatingChatButton />

    </>

  );

}