"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProjectGalleryProps {
  images: { url: string; alt?: string }[];
  projectName: string;
}

export function ProjectGallery({ images, projectName }: ProjectGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-video w-full rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
        Sem Imagens
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Hero Image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-100">
        <Image
          src={images[activeImage].url}
          alt={images[activeImage].alt || projectName}
          fill
          className="object-cover transition-all duration-500"
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(idx)}
            className={cn(
              "relative aspect-video h-20 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 transition-all",
              activeImage === idx
                ? "ring-2 ring-blue-600 ring-offset-2"
                : "opacity-70 hover:opacity-100",
            )}
          >
            <Image
              src={img.url}
              alt={img.alt || `${projectName} - Imagem ${idx + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
