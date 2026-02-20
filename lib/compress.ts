import imageCompression from "browser-image-compression";
import type { CompressionSettings } from "@/lib/store";

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

function canvasToWebPBlob(
  canvas: HTMLCanvasElement,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Canvas toBlob returned null"));
        }
      },
      "image/webp",
      quality
    );
  });
}

export async function compressToWebP(
  file: File,
  settings: CompressionSettings
): Promise<Blob> {
  try {
    let imageFile: File | Blob = file;

    if (!settings.lossless) {
      const options = {
        maxSizeMB: Infinity,
        maxWidthOrHeight: undefined,
        useWebWorker: true,
        initialQuality: settings.quality / 100,
        exifOrientation: settings.stripMetadata ? -1 : undefined,
      };
      imageFile = await imageCompression(file, options);
    }

    const objectUrl = URL.createObjectURL(imageFile);
    try {
      const img = await loadImage(objectUrl);
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Failed to get canvas 2D context");
      }

      ctx.drawImage(img, 0, 0);
      const quality = settings.lossless ? 1.0 : settings.quality / 100;
      const webpBlob = await canvasToWebPBlob(canvas, quality);
      return webpBlob;
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown compression error";
    throw new Error(`Compression failed for ${file.name}: ${message}`);
  }
}
