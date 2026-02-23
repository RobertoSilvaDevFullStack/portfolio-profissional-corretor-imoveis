import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/layout/Section";
import { CheckCircle2 } from "lucide-react";

export function Hero() {
  return (
    <Section className="overflow-hidden py-12 md:py-20 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-8">
        <div className="flex flex-col gap-6">
          <div className="inline-flex w-fit items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700">
            ★ Especialista em Minha Casa Minha Vida
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl xl:text-6xl xl:leading-none">
            Mais do que um corretor,{" "}
            <span className="text-blue-700">um parceiro</span> no seu sonho.
          </h1>
          <p className="max-w-[600px] text-lg text-slate-500 md:text-xl leading-relaxed">
            Olá, eu sou o Matheus. Especialista no programa Minha Casa Minha
            Vida. Ajudar famílias a conquistarem o primeiro imóvel não é apenas
            meu trabalho, é minha missão pessoal há 6 anos.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="w-full sm:w-auto shadow-lg shadow-blue-700/20"
            >
              Iniciar Jornada
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Meus Valores
            </Button>
          </div>

          <div className="mt-8 flex gap-8 border-t border-slate-200 pt-8">
            <div>
              <p className="text-3xl font-bold text-blue-700">6+</p>
              <p className="text-sm text-slate-500">Anos de experiência</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-700">200+</p>
              <p className="text-sm text-slate-500">Famílias felizes</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-700">SP</p>
              <p className="text-sm text-slate-500">Especialista local</p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[480px] lg:mr-0">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="/roberto-silva.jpeg"
              alt="Roberto Silva - Corretor de Imóveis"
              fill
              className="object-cover object-top"
              priority
              sizes="(max-width: 768px) 100vw, 480px"
            />
            {/* Subtle gradient overlay at the bottom */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Floating credential card */}
          <div className="absolute -bottom-4 left-4 right-4 rounded-xl bg-white p-4 shadow-xl border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">
                  Corretor Credenciado
                </p>
                <p className="text-xs text-slate-500">
                  CRECI SP 238330-F - Ativo · Regularidade Garantida
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
