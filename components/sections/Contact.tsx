import { Button } from "@/components/ui/Button";
import { Section } from "@/components/layout/Section";
import { Calendar, MessageSquare } from "lucide-react";

export function Contact() {
  return (
    <Section variant="default" id="contact">
      <div className="rounded-3xl bg-blue-700 px-6 py-16 text-center text-white md:px-12 md:py-20 shadow-2xl overflow-hidden relative">
        {/* Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Pronto para escrever sua história?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100 md:text-xl">
            Não deixe a burocracia adiar seu sonho. Vamos tomar um café (ou
            fazer uma videochamada) e encontrar o imóvel perfeito para o seu
            bolso.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-white text-blue-700 hover:bg-slate-100 w-full sm:w-auto font-semibold shadow-lg"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Agendar Consultoria Grátis
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-transparent bg-[#25D366] text-white hover:bg-[#20BE5C] hover:text-white w-full sm:w-auto shadow-lg"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Chamar no WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
