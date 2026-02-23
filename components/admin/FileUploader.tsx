"use client";

import { useState, useRef } from "react";
import { Upload, X, FileText, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
  initialFiles?: { name: string; fileUrl: string; fileType: string }[];
  onFilesChange: (
    files: { name: string; fileUrl: string; fileType: string }[],
  ) => void;
  accept?: string;
  category?: string;
  label?: string;
  maxFiles?: number;
}

export function FileUploader({
  initialFiles = [],
  onFilesChange,
  accept = "application/pdf",
  category = "files",
  label = "Adicionar Arquivos",
  maxFiles = 5,
}: FileUploaderProps) {
  const [files, setFiles] = useState(initialFiles);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    if (files.length + selectedFiles.length > maxFiles) {
      alert(`Máximo de ${maxFiles} arquivos permitidos.`);
      return;
    }

    setUploading(true);
    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => {
      formData.append("files", file);
    });
    formData.append("category", category);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        const newFiles = data.files.map((file: any) => ({
          name: file.name,
          fileUrl: file.url,
          fileType: file.type.includes("pdf") ? "pdf" : "image",
        }));

        const updatedFiles = [...files, ...newFiles];
        setFiles(updatedFiles);
        onFilesChange(updatedFiles);
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
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesChange(newFiles);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 p-2"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-slate-200">
                <FileText className="h-4 w-4 text-slate-500" />
              </div>
              <span className="truncate text-sm font-medium text-slate-700">
                {file.name}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="ml-2 rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-slate-300 bg-white py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
      >
        {uploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Upload className="h-4 w-4" />
        )}
        {uploading ? "Enviando..." : label}
      </button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        className="hidden"
        multiple
        accept={accept}
      />
    </div>
  );
}
