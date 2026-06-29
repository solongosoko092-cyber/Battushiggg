/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import FeaturesSection from "./components/FeaturesSection";
import InquirySection from "./components/InquirySection";
import IdolChatModal from "./components/IdolChatModal";
import MeChatPopup from "./components/MeChatPopup";
import { motion } from "motion/react";

export default function App() {
  const [isIdolOpen, setIsIdolOpen] = useState(false);

  useEffect(() => {
    (window as any).openIdolChat = () => setIsIdolOpen(true);
    return () => {
      delete (window as any).openIdolChat;
    };
  }, []);

  return (
    <div className="bg-black text-white selection:bg-primary selection:text-black min-h-screen font-sans antialiased overflow-x-hidden scroll-smooth relative">
      {/* SECTION 1: HERO */}
      <HeroSection />

      {/* SECTION 2: ABOUT */}
      <AboutSection />

      {/* SECTION 3: FEATURES */}
      <FeaturesSection />

      {/* SECTION 4: INQUIRIES / FOOTER */}
      <InquirySection />

      {/* Floating Chat Popup - Me-AI (Messenger Style) */}
      <MeChatPopup />

      {/* Idol Coach Chat Modal - Darren Watkins Jr */}
      <IdolChatModal isOpen={isIdolOpen} onClose={() => setIsIdolOpen(false)} />

      {/* Minimalistic Editorial Footer */}
      <footer className="bg-[#0a0a0a] border-t border-white/5 py-12 px-6 text-center text-gray-500 text-xs tracking-wider">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-primary font-bold">PRISMA</span>
            <span className="text-gray-700">|</span>
            <span>Battushig Studio © 2026</span>
          </div>
          <div className="flex gap-6">
            <a href="#hero-section" className="hover:text-primary transition-colors">Эхлэл рүү</a>
            <a href="#our-story" className="hover:text-primary transition-colors">Миний түүх</a>
            <a href="#workshops" className="hover:text-primary transition-colors">Тоглоомууд</a>
            <a href="#inquiries" className="hover:text-primary transition-colors">Холбоо барих</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

