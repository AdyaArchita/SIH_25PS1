import React from 'react';
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const navigate = useNavigate();

  const handleReportIssue = () => {
    navigate("/reportissue");
  };

  return (
    <section className="relative h-[600px] flex items-center justify-center text-center overflow-hidden" id="home">
      {/* Background Image - Good for visual impact */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-center bg-cover z-0"
        style={{ backgroundImage: "url('/NagarSaarthi/hero-img.jpg')" }}
      ></div>

      {/* Overlay - Increased blur for sharper text contrast */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" style={{
          backdropFilter: "blur(2px)", // Increased blur
          WebkitBackdropFilter: "blur(2px)", 
      }}></div>

      {/* Content */}
      <div className="relative z-20 max-w-3xl px-3">
        <h1 className="text-5xl md:text-5xl font-black mb-3 text-white uppercase tracking-tight drop-shadow-xl">
          Innovate. Solve. Sustain.
        </h1>
        <p className="text-xl md:text-2xl font-light mb-12 text-white drop-shadow-lg">
          Fuel **Atmanirbhar Bharat** by identifying local challenges in **Waste, Water, and Sanitation.** Your report starts the **Swadeshi** solution.
        </p>
        <button
          onClick={handleReportIssue}
          className="bg-gradient-to-r from-green-500 to-teal-400 hover:from-green-600 hover:to-teal-500 
                     text-white px-12 py-4 rounded-full text-xl md:text-2xl font-extrabold shadow-2xl 
                     transition-all duration-300 transform hover:scale-105 hover:shadow-green-500/50" // Stronger hover effects
        >
          Initiate a Clean & Green Project
        </button>
      </div>
    </section>
  );
}