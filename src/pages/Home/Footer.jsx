import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // X icon

export function Footer() {
  const quickLinks = ["About Us", "Privacy Policy", "Terms of Service", "Help Center"];
  const socialIcons = [FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn];

  return (
    <footer className="bg-[#2c3e50] text-[#ecf0f1] pt-16 pb-5">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row md:justify-around gap-10 mb-10">
          
          {/* Contact Section */}
          <div className="flex-1 min-w-[250px]">
            <h3 className="text-[#3498db] text-xl mb-5 font-semibold">Contact Us</h3>
            <p>✉️ contact@nagarsaarthi.in</p>
            <p>📞 +91-98765-43210</p>
            <p>📍 New Delhi, India</p>
          </div>

          {/* Quick Links */}
          <div className="flex-1 min-w-[250px]">
            <h3 className="text-[#3498db] text-xl mb-5 font-semibold">Quick Links</h3>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.replace(/\s+/g, "").toLowerCase()}`}
                  className="text-[#bdc3c7] hover:text-[#3498db] transition-colors duration-300 hover:scale-105"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex-1 min-w-[250px]">
            <h3 className="text-[#3498db] text-xl mb-5 font-semibold">Follow Us</h3>
            <div className="flex gap-4 flex-wrap">
              {socialIcons.map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-11 h-11 bg-[#34495e] rounded-full flex items-center justify-center text-white text-lg 
                             hover:bg-[#3498db] transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="border-t border-[#34495e] pt-5 text-center text-[#95a5a6]">
          <p>&copy; 2025 NagarSaarthi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
