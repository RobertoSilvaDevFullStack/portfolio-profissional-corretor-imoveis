"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-700 text-white text-sm font-bold">
            RS
          </div>
          <span className="font-serif text-xl font-bold text-slate-900 leading-tight">
            Roberto Silva
            <span className="block text-xs text-blue-700 font-sans font-normal uppercase tracking-wider">
              Corretor de Imóveis
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden gap-8 lg:flex">
          <Link
            href="/#about"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-700"
          >
            Sobre Mim
          </Link>
          <Link
            href="/#regions"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-700"
          >
            Regiões
          </Link>
          <Link
            href="/#services"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-700"
          >
            Serviços
          </Link>
          <Link
            href="/#contact"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-700"
          >
            Contato
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            size="sm"
            className="hidden lg:flex bg-[#25D366] hover:bg-[#20BE5C] text-white shadow-md"
            onClick={() => window.open("https://wa.me/5511999999999", "_blank")}
          >
            Fale Comigo
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Alternar menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-6 shadow-lg">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/#about"
              className="text-base font-medium text-slate-600 hover:text-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre Mim
            </Link>
            <Link
              href="/#regions"
              className="text-base font-medium text-slate-600 hover:text-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Regiões
            </Link>
            <Link
              href="/#services"
              className="text-base font-medium text-slate-600 hover:text-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Serviços
            </Link>
            <Link
              href="/#contact"
              className="text-base font-medium text-slate-600 hover:text-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
            <Button
              className="w-full mt-4 bg-[#25D366] hover:bg-[#20BE5C] text-white shadow-md"
              onClick={() =>
                window.open("https://wa.me/5511999999999", "_blank")
              }
            >
              Fale Comigo
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
