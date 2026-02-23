"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const logos = [
  { name: "MRV", src: "/mrv-logo.png" },
  { name: "Tenda", src: "/logo-do-tenda-para-case.png" },
  { name: "Cury", src: "/logo-cury.png" },
  { name: "Plano&Plano", src: "/Plano&Plano.png" },
  { name: "Direcional", src: "/logo_grupodirecional.png" },
  { name: "Vibra", src: "/Vibra.jpg" },
  { name: "Vivaz", src: "/construtora-vivaz.jpg" },
  { name: "Econ", src: "/econ-logo.png" },
  // { name: "Emccamp", src: "/emccamp-logo.jpg" },
  { name: "Engelux", src: "/engelux-logo.png" },
  { name: "Graal", src: "/graal-logo.png" },
];

export function LogoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(logos.length / itemsPerPage);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalPages]);

  const visibleLogos = logos.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage,
  );

  // Pad with items from the beginning if we don't have enough
  const displayLogos =
    visibleLogos.length < itemsPerPage
      ? [...visibleLogos, ...logos.slice(0, itemsPerPage - visibleLogos.length)]
      : visibleLogos;

  return (
    <div className="mt-20 border-t border-slate-200 pt-10 text-center">
      <p className="mb-8 text-xs font-bold uppercase tracking-widest text-slate-400">
        Trabalhamos com as melhores construtoras
      </p>

      <div className="relative overflow-hidden">
        <div className="flex items-center justify-center gap-10 transition-all duration-700 ease-in-out">
          {displayLogos.map((logo, i) => (
            <div
              key={`${currentIndex}-${i}`}
              className="flex h-16 w-32 shrink-0 items-center justify-center opacity-0 animate-fadeIn"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={120}
                height={48}
                unoptimized
                className="max-h-12 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots indicator */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "w-6 bg-blue-700"
                : "w-2 bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label={`Página ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
