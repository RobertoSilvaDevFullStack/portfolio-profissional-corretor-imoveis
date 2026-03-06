import { Section } from "@/components/layout/Section";
import { BookFlip } from "@/components/ui/BookFlip";

export function Journey() {
  return (
    <Section variant="dark" className="overflow-hidden">
      <div className="flex flex-col gap-8 items-center text-center mb-12">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Minha Jornada em Imagens
          </h2>
          <p className="mt-4 text-blue-200">
            Momentos que definiram minha carreira e as vidas que ajudei a
            transformar.
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <BookFlip />
      </div>
    </Section>
  );
}
