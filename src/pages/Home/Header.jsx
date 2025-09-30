import React from 'react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white px-4 sm:px-8 py-2 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
      
      {/* Left Section: Logo + Title */}
      <div className="flex items-center gap-3 sm:gap-4">
        <img
          src="/NagarSaarthi/NagarSaarthi icon.png"
          alt="NagarSaarthi Logo"
          className="h-16 w-16 sm:h-24 sm:w-24 rounded-full object-cover"
        />
        <h1
          className="text-2xl sm:text-4xl font-bold cursor-pointer transition-transform duration-300 hover:scale-105"
        >
          NagarSaarthi
        </h1>
      </div>

      {/* Motto */}
      <p className="text-lg sm:text-2xl font-light tracking-wide text-center sm:text-right drop-shadow-md">
        Your city, your voice. Empowered.
      </p>
    </header>
  );
}
