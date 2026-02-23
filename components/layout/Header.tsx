import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Menu } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-700 text-white text-sm font-bold"></div>
          <span className="font-serif text-xl font-bold text-slate-900">
            Roberto Silva
            <span className="text-blue-700">Corretor de Imóveis</span>
          </span>
        </Link>

        <nav className="hidden gap-8 md:flex">
          <Link
            href="#about"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-700"
          >
            Sobre Mim
          </Link>
          <Link
            href="#regions"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-700"
          >
            Regiões
          </Link>
          <Link
            href="#services"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-700"
          >
            Serviços
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-700"
          >
            Contato
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button size="sm" className="hidden md:flex">
            Fale Comigo
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
