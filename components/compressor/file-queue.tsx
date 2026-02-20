"use client";

import { useFileQueue } from "@/hooks/use-file-queue";
import { useDownload } from "@/hooks/use-download";
import { FileQueueRow } from "@/components/compressor/file-queue-row";
import { ScrollArea } from "@/components/ui/scroll-area";

export function FileQueue() {
  const { queue, removeFile } = useFileQueue();
  const { downloadSingle } = useDownload();

  if (queue.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-10">
        <p className="text-sm text-muted-foreground">
          No hay archivos en la cola. Arrastra imagenes arriba para comenzar.
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[360px] rounded-lg border border-border">
      <div className="flex flex-col gap-2 p-3">
        {queue.map((entry) => (
          <FileQueueRow
            key={entry.id}
            entry={entry}
            onRemove={removeFile}
            onDownload={downloadSingle}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
