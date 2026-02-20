"use client";

import { useCallback } from "react";
import { useMediaPressStore } from "@/lib/store";

export function useFileQueue() {
  const queue = useMediaPressStore((s) => s.queue);
  const addFiles = useMediaPressStore((s) => s.addFiles);
  const removeFile = useMediaPressStore((s) => s.removeFile);
  const clearQueue = useMediaPressStore((s) => s.clearQueue);
  const updateFile = useMediaPressStore((s) => s.updateFile);

  const pendingCount = queue.filter((f) => f.status === "pending").length;
  const processingCount = queue.filter((f) => f.status === "processing").length;
  const doneCount = queue.filter((f) => f.status === "done").length;
  const errorCount = queue.filter((f) => f.status === "error").length;
  const totalCount = queue.length;

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      addFiles(acceptedFiles);
    },
    [addFiles]
  );

  return {
    queue,
    addFiles,
    removeFile,
    clearQueue,
    updateFile,
    handleDrop,
    pendingCount,
    processingCount,
    doneCount,
    errorCount,
    totalCount,
  };
}
