import { create } from "zustand";

export type FileStatus = "pending" | "processing" | "done" | "error";

export interface FileEntry {
  id: string;
  file: File;
  name: string;
  originalSize: number;
  format: string;
  previewUrl: string;
  status: FileStatus;
  outputBlob: Blob | null;
  outputSize: number | null;
  compressionRatio: number | null;
  error: string | null;
}

export interface CompressionSettings {
  quality: number;
  lossless: boolean;
  stripMetadata: boolean;
}

interface MediaPressState {
  queue: FileEntry[];
  settings: CompressionSettings;
  addFiles: (files: File[]) => void;
  removeFile: (id: string) => void;
  clearQueue: () => void;
  updateFile: (id: string, updates: Partial<FileEntry>) => void;
  setSettings: (settings: Partial<CompressionSettings>) => void;
}

function getFormatFromType(mimeType: string): string {
  const map: Record<string, string> = {
    "image/jpeg": "JPG",
    "image/png": "PNG",
    "image/gif": "GIF",
    "image/bmp": "BMP",
    "image/tiff": "TIFF",
    "image/avif": "AVIF",
    "image/webp": "WEBP",
  };
  return map[mimeType] ?? "UNKNOWN";
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export const useMediaPressStore = create<MediaPressState>((set) => ({
  queue: [],
  settings: {
    quality: 85,
    lossless: false,
    stripMetadata: true,
  },
  addFiles: (files: File[]) => {
    const entries: FileEntry[] = files.map((file) => ({
      id: generateId(),
      file,
      name: file.name,
      originalSize: file.size,
      format: getFormatFromType(file.type),
      previewUrl: URL.createObjectURL(file),
      status: "pending" as const,
      outputBlob: null,
      outputSize: null,
      compressionRatio: null,
      error: null,
    }));
    set((state) => ({ queue: [...state.queue, ...entries] }));
  },
  removeFile: (id: string) => {
    set((state) => {
      const entry = state.queue.find((f) => f.id === id);
      if (entry) {
        URL.revokeObjectURL(entry.previewUrl);
      }
      return { queue: state.queue.filter((f) => f.id !== id) };
    });
  },
  clearQueue: () => {
    set((state) => {
      state.queue.forEach((entry) => URL.revokeObjectURL(entry.previewUrl));
      return { queue: [] };
    });
  },
  updateFile: (id: string, updates: Partial<FileEntry>) => {
    set((state) => ({
      queue: state.queue.map((f) => (f.id === id ? { ...f, ...updates } : f)),
    }));
  },
  setSettings: (newSettings: Partial<CompressionSettings>) => {
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    }));
  },
}));
