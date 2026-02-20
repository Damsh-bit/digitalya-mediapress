"use client";

import { DropZone } from "@/components/compressor/drop-zone";
import { SettingsPanel } from "@/components/compressor/settings-panel";
import { BatchControls } from "@/components/compressor/batch-controls";
import { FileQueue } from "@/components/compressor/file-queue";
import { useFileQueue } from "@/hooks/use-file-queue";

export function ImageCompressor() {
  const { handleDrop } = useFileQueue();

  return (
    <div className="flex flex-col gap-6">
      {/* Drop Zone */}
      <DropZone onDrop={handleDrop} />

      {/* Settings + Batch Controls */}
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="lg:w-96 shrink-0">
          <SettingsPanel />
        </div>
        <div className="flex flex-1 flex-col justify-end">
          <BatchControls />
        </div>
      </div>

      {/* File Queue */}
      <FileQueue />
    </div>
  );
}
