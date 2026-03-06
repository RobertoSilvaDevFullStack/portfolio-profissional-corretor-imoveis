"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, BedDouble, Bath, Car, Ruler, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: {
    id: string;
    slug: string;
    name: string;
    address: string;
    neighborhood: string;
    city: string;
    description: string | null;
    status: string;
    builder: { name: string; logoUrl: string | null };
    images: { url: string }[];
    priceMin: number | null;
    areaMin: number | null;
    bedrooms: number | null;
    suites: number | null;
    parkingSpots: number | null;
    bathrooms: number | null;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const imageUrl = project.images?.[0]?.url;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-lg border border-slate-100">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
            Sem Imagem
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center rounded-full bg-blue-600/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm shadow-sm">
            {project.status}
          </span>
        </div>

        {/* Constructor Logo (if exists) */}
        {project.builder?.logoUrl && (
          <div className="absolute top-4 right-4 h-8 w-20 bg-white/90 rounded px-2 flex items-center justify-center shadow-sm">
            {/* Note: In real implementation, render constructor logo here */}
            <span className="text-[10px] font-bold text-slate-600 truncate">
              {project.builder.name}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
            {project.name}
          </h3>
          <div className="mt-1 flex items-center text-sm text-slate-500">
            <MapPin className="mr-1.5 h-4 w-4 shrink-0 text-slate-400" />
            <span className="truncate">
              {project.neighborhood}, {project.city}
            </span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-6 grid grid-cols-2 gap-y-3 gap-x-4 border-y border-slate-100 py-4">
          <div className="flex items-center text-sm text-slate-600">
            <Ruler className="mr-2 h-4 w-4 text-blue-600" />
            <span>{project.areaMin ? `${project.areaMin}m²` : "-"}</span>
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <BedDouble className="mr-2 h-4 w-4 text-blue-600" />
            <span>
              {project.bedrooms ? `${project.bedrooms} Quartos` : "-"}
            </span>
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <Bath className="mr-2 h-4 w-4 text-blue-600" />
            <span>
              {project.bathrooms ? `${project.bathrooms} Banh.` : "-"}
            </span>
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <Car className="mr-2 h-4 w-4 text-blue-600" />
            <span>
              {project.parkingSpots ? `${project.parkingSpots} Vagas` : "-"}
            </span>
          </div>
        </div>

        {/* Footer: Price & CTA */}
        <div className="mt-auto flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">A partir de</p>
            <p className="text-lg font-bold text-blue-700">
              {project.priceMin
                ? new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    maximumFractionDigits: 0,
                  }).format(project.priceMin)
                : "Sob Consulta"}
            </p>
          </div>

          <Link href={`/imoveis/${project.slug}`}>
            <Button
              size="sm"
              className="bg-slate-900 hover:bg-slate-800 rounded-full px-4"
            >
              Ver Detalhes
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
