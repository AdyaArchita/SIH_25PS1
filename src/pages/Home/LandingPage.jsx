import React from "react";
import { Header } from "./Header";
import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { HowItWorks } from "./HowItWorks";
import { Testimonials } from "./Testimonials";
import { Footer } from "./Footer";

export default function LandingPage() {
  return (
    <div className="font-sans leading-relaxed text-gray-800 m-0 p-0">
      <Header />
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
}
