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
        "flex min-h-[160px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 transition-all duration-200",
        isDragActive
          ? "border-primary bg-primary/5 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
          : "border-border hover:border-muted-foreground/50"
      )}
      role="button"
      tabIndex={0}
      aria-label="Drop zone for image files"
    >
      <Upload
        className={cn(
          "size-10 transition-colors",
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
          Drop your images here or click to browse
        </p>
        <p className="mt-1.5 text-xs text-muted-foreground">
          Accepts JPEG, PNG, GIF, BMP, TIFF, AVIF, WebP
        </p>
      </div>
      <input {...getInputProps()} />
    </div>
  );
}
