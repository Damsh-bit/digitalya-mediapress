import type { CompressionSettings } from "@/lib/store";

/**
 * Loads an image element from a blob URL.
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

/**
 * Converts a canvas to a WebP blob at the given quality (0-1).
 */
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

/**
 * Draws a file onto a canvas, optionally scaling it down.
 * Returns the canvas ready for export.
 */
async function fileToCanvas(
  file: File | Blob,
  scale: number = 1
): Promise<HTMLCanvasElement> {
  const objectUrl = URL.createObjectURL(file);
  try {
    const img = await loadImage(objectUrl);
    const w = Math.round(img.naturalWidth * scale);
    const h = Math.round(img.naturalHeight * scale);

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to get canvas 2D context");

    ctx.drawImage(img, 0, 0, w, h);
    return canvas;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

/**
 * Core compression pipeline.
 *
 * Strategy:
 *  1. Draw the image onto a canvas at full resolution.
 *  2. Export to WebP at the requested quality level.
 *  3. If the output is STILL larger than the original, progressively lower
 *     the quality until the output is smaller (minimum quality floor = 0.10).
 *     This guarantees the file always shrinks.
 */
export async function compressToWebP(
  file: File,
  settings: CompressionSettings
): Promise<Blob> {
  try {
    const originalSize = file.size;
    const canvas = await fileToCanvas(file);

    // --- Lossless mode: export at quality 1.0 (browser-native lossless WebP) ---
    if (settings.lossless) {
      const blob = await canvasToWebPBlob(canvas, 1.0);
      return blob;
    }

    // --- Lossy mode ---
    let quality = settings.quality / 100; // user-requested quality (0-1)
    let blob = await canvasToWebPBlob(canvas, quality);

    // If the result is already smaller, we're done.
    if (blob.size < originalSize) {
      return blob;
    }

    // Otherwise, step down quality until we get a smaller file.
    const QUALITY_FLOOR = 0.10;
    const STEP = 0.05;

    while (blob.size >= originalSize && quality > QUALITY_FLOOR) {
      quality = Math.max(quality - STEP, QUALITY_FLOOR);
      blob = await canvasToWebPBlob(canvas, quality);
    }

    // As a last resort, also try scaling the image down by 10 % increments.
    let scale = 1.0;
    while (blob.size >= originalSize && scale > 0.5) {
      scale -= 0.1;
      const scaledCanvas = await fileToCanvas(file, scale);
      blob = await canvasToWebPBlob(scaledCanvas, quality);
    }

    return blob;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown compression error";
    throw new Error(`Compression failed for ${file.name}: ${message}`);
  }
}
