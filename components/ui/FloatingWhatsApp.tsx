"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostra o botão após rolar 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <a
      href="https://wa.me/5511999999999"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition-all duration-300 hover:scale-110 hover:bg-[#20BE5C] ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-12 opacity-0"
      }`}
      aria-label="Conversar no WhatsApp"
    >
      <FaWhatsapp className="h-8 w-8" />
    </a>
  );
}
