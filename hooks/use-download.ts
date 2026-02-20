"use client";

import { useCallback } from "react";
import JSZip from "jszip";
import type { FileEntry } from "@/lib/store";

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

function getWebPFilename(originalName: string): string {
  const lastDot = originalName.lastIndexOf(".");
  const baseName = lastDot > 0 ? originalName.slice(0, lastDot) : originalName;
  return `${baseName}.webp`;
}

export function useDownload() {
  const downloadSingle = useCallback((entry: FileEntry) => {
    if (!entry.outputBlob) return;
    triggerDownload(entry.outputBlob, getWebPFilename(entry.name));
  }, []);

  const downloadAllAsZip = useCallback(async (entries: FileEntry[]) => {
    const doneEntries = entries.filter(
      (f) => f.status === "done" && f.outputBlob
    );
    if (doneEntries.length === 0) return;

    const zip = new JSZip();
    const usedNames = new Set<string>();

    for (const entry of doneEntries) {
      let filename = getWebPFilename(entry.name);
      let counter = 1;
      while (usedNames.has(filename)) {
        const lastDot = filename.lastIndexOf(".");
        const base = filename.slice(0, lastDot);
        filename = `${base}-${counter}.webp`;
        counter++;
      }
      usedNames.add(filename);
      zip.file(filename, entry.outputBlob as Blob);
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    triggerDownload(zipBlob, "digitalya-mediapress-export.zip");
  }, []);

  return {
    downloadSingle,
    downloadAllAsZip,
  };
}
