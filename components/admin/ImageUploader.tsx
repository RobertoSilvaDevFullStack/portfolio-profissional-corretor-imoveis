"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  initialImages?: { url: string; alt?: string; isHero?: boolean }[];
  onImagesChange: (
    images: { url: string; alt?: string; isHero?: boolean }[],
  ) => void;
  maxFiles?: number;
}

export function ImageUploader({
  initialImages = [],
  onImagesChange,
  maxFiles = 10,
}: ImageUploaderProps) {
  const [images, setImages] = useState(initialImages);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > maxFiles) {
      alert(`Máximo de ${maxFiles} imagens permitidas.`);
      return;
    }

    setUploading(true);
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });
    formData.append("category", "projects");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        const newImages = data.files.map((file: any) => ({
          url: file.url,
          alt: file.name,
          isHero: false,
        }));

        // If it's the first image, make it hero by default
        if (images.length === 0 && newImages.length > 0) {
          newImages[0].isHero = true;
        }

        const updatedImages = [...images, ...newImages];
        setImages(updatedImages);
        onImagesChange(updatedImages);
      } else {
        alert(data.error || "Erro no upload");
      }
    } catch (error) {
      console.error("Upload error", error);
      alert("Erro ao fazer upload");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function handleRemove(index: number) {
    const newImages = images.filter((_, i) => i !== index);

    // If we removed the hero, make the first available image the new hero
    if (images[index].isHero && newImages.length > 0) {
      newImages[0].isHero = true;
    }

    setImages(newImages);
    onImagesChange(newImages);
  }

  function handleSetHero(index: number) {
    const newImages = images.map((img, i) => ({
      ...img,
      isHero: i === index,
    }));
    setImages(newImages);
    onImagesChange(newImages);
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "group relative aspect-[4/3] overflow-hidden rounded-lg border bg-slate-100",
              image.isHero && "ring-2 ring-blue-600 ring-offset-2",
            )}
          >
            <Image
              src={image.url}
              alt={image.alt || ""}
              fill
              className="object-cover"
            />

            {/* OverlayActions */}
            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handleSetHero(index)}
                className={cn(
                  "p-1.5 rounded-full bg-white/90 hover:bg-white text-xs font-bold transition-all",
                  image.isHero ? "text-blue-600" : "text-slate-600",
                )}
                title="Definir como principal"
              >
                {image.isHero ? "Principal" : "Capa"}
              </button>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="p-1.5 rounded-full bg-white/90 text-red-600 hover:bg-white transition-all"
                title="Remover"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {image.isHero && (
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold uppercase">
                Destaque
              </div>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 transition-colors hover:bg-slate-100 disabled:opacity-50 aspect-[4/3]"
        >
          {uploading ? (
            <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
          ) : (
            <>
              <Upload className="h-6 w-6 text-slate-400 mb-2" />
              <span className="text-xs font-medium text-slate-500">
                Adicionar Fotos
              </span>
            </>
          )}
        </button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        className="hidden"
        multiple
        accept="image/jpeg,image/png,image/webp"
      />
      <p className="text-xs text-slate-500">
        Formatos aceitos: JPG, PNG, WebP. Max 10MB.
      </p>
    </div>
  );
}
