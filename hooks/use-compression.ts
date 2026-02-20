"use client";

import { useState, useCallback } from "react";
import { useMediaPressStore } from "@/lib/store";
import { compressToWebP } from "@/lib/compress";

export function useCompression() {
  const [isProcessing, setIsProcessing] = useState(false);
  const queue = useMediaPressStore((s) => s.queue);
  const settings = useMediaPressStore((s) => s.settings);
  const updateFile = useMediaPressStore((s) => s.updateFile);

  const compressAll = useCallback(async () => {
    const pendingFiles = useMediaPressStore
      .getState()
      .queue.filter((f) => f.status === "pending");
    if (pendingFiles.length === 0) return;

    setIsProcessing(true);

    for (const entry of pendingFiles) {
      const currentSettings = useMediaPressStore.getState().settings;
      updateFile(entry.id, { status: "processing" });

      try {
        const outputBlob = await compressToWebP(entry.file, currentSettings);
        const outputSize = outputBlob.size;
        const compressionRatio = Number(
          (((entry.originalSize - outputSize) / entry.originalSize) * 100).toFixed(1)
        );

        updateFile(entry.id, {
          status: "done",
          outputBlob,
          outputSize,
          compressionRatio,
        });
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Compression failed";
        updateFile(entry.id, {
          status: "error",
          error: message,
        });
      }
    }

    setIsProcessing(false);
  }, [updateFile]);

  const hasPendingFiles =
    queue.filter((f) => f.status === "pending").length > 0;

  return {
    isProcessing,
    compressAll,
    settings,
    hasPendingFiles,
  };
}
