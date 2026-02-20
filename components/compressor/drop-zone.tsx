"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

const ACCEPTED_TYPES: Record<string, string[]> = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/gif": [".gif"],
  "image/bmp": [".bmp"],
  "image/tiff": [".tiff", ".tif"],
  "image/avif": [".avif"],
  "image/webp": [".webp"],
};

interface DropZoneProps {
  onDrop: (files: File[]) => void;
}

export function DropZone({ onDrop }: DropZoneProps) {
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      onDrop(acceptedFiles);
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: ACCEPTED_TYPES,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex min-h-[140px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 transition-all duration-200",
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/40 hover:bg-muted/30"
      )}
      role="button"
      tabIndex={0}
      aria-label="Zona para soltar archivos de imagen"
    >
      <Upload
        className={cn(
          "size-8 transition-colors",
          isDragActive ? "text-primary" : "text-muted-foreground"
        )}
      />
      <div className="text-center">
        <p
          className={cn(
            "text-sm font-medium",
            isDragActive ? "text-primary" : "text-foreground"
          )}
        >
          Arrastra tus imagenes aqui o haz clic para buscar
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Acepta JPEG, PNG, GIF, BMP, TIFF, AVIF, WebP
        </p>
      </div>
      <input {...getInputProps()} />
    </div>
  );
}
