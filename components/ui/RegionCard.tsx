"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface RegionCardProps {
  name: string;
  slug: string;
  description?: string | null;
  areas: string[];
  gradient: string;
  fallbackImageUrl?: string | null;
  projectImages: { slug: string; imageUrl: string }[];
}

export function RegionCard({
  name,
  slug,
  description,
  areas,
  gradient,
  fallbackImageUrl,
  projectImages,
}: RegionCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentProjectSlug, setCurrentProjectSlug] = useState<string | null>(
    null,
  );

  // Link de destino: se estiver mostrando a imagem de um projeto, vai para o projeto.
  // Caso contrário (ou fallback), vai para a lista de imóveis da região.
  const destinationLink =
    currentProjectSlug && projectImages.length > 0
      ? `/imoveis/${currentProjectSlug}`
      : `/imoveis?region=${slug}`;

  useEffect(() => {
    if (projectImages.length <= 1) {
      if (projectImages.length === 1) {
        setCurrentProjectSlug(projectImages[0].slug);
      }
      return;
    }

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const nextIndex = (prev + 1) % projectImages.length;
        setCurrentProjectSlug(projectImages[nextIndex].slug);
        return nextIndex;
      });
    }, 4000); // Troca a cada 4 segundos

    // Inicializa o slug do primeiro projeto
    setCurrentProjectSlug(projectImages[0].slug);

    return () => clearInterval(interval);
  }, [projectImages]);

  // Se não houver imagens de projetos, usa a lógica antiga (fallback ou gradiente)
  const hasProjectImages = projectImages.length > 0;

  return (
    <Link
      href={destinationLink}
      className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-800 cursor-pointer block"
    >
      {/* Imagem de Fundo (Slideshow ou Fallback) */}
      {hasProjectImages ? (
        <>
          {projectImages.map((project, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${project.slug}-${index}`}
              src={project.imageUrl}
              alt={`Projeto em ${name}`}
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-110 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </>
      ) : fallbackImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={fallbackImageUrl}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <div
          className={`absolute inset-0 bg-gradient-to-t ${gradient} via-slate-800 to-slate-900`}
        />
      )}

      {/* Overlays para garantir legibilidade do texto */}
      <div
        className={`absolute inset-0 bg-gradient-to-t ${gradient} via-transparent to-transparent opacity-90 transition-opacity z-10`}
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />

      {/* Conteúdo do Card */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <div className="mb-2 flex flex-wrap gap-2">
          {areas.length > 0 ? (
            areas.map((area, i) => (
              <span
                key={i}
                className="inline-block rounded bg-white/20 px-2 py-0.5 text-[10px] uppercase font-bold text-white backdrop-blur-sm"
              >
                {area}
              </span>
            ))
          ) : (
            <span className="inline-block rounded bg-white/20 px-2 py-0.5 text-[10px] uppercase font-bold text-white backdrop-blur-sm">
              Em breve
            </span>
          )}
        </div>
        <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
          {name}
        </h3>
        {description && (
          <p className="mt-2 text-sm text-slate-200 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}
