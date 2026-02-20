"use client";

import { DropZone } from "@/components/compressor/drop-zone";
import { SettingsPanel } from "@/components/compressor/settings-panel";
import { BatchControls } from "@/components/compressor/batch-controls";
import { FileQueue } from "@/components/compressor/file-queue";
import { useFileQueue } from "@/hooks/use-file-queue";

export function ImageCompressor() {
  const { handleDrop } = useFileQueue();

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      {/* Left: Main content area */}
      <div className="flex flex-1 flex-col gap-4 min-w-0">
        <DropZone onDrop={handleDrop} />
        <BatchControls />
        <FileQueue />
      </div>

      {/* Right: Settings sidebar */}
      <div className="lg:w-72 shrink-0">
        <div className="sticky top-6 rounded-lg border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Ajustes
          </h3>
          <SettingsPanel />
        </div>
      </div>
    </div>
  );
}
