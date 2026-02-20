"use client";

import { Loader2, Download, Trash2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFileQueue } from "@/hooks/use-file-queue";
import { useCompression } from "@/hooks/use-compression";
import { useDownload } from "@/hooks/use-download";

export function BatchControls() {
  const { queue, clearQueue, totalCount, doneCount, pendingCount } =
    useFileQueue();
  const { isProcessing, compressAll, hasPendingFiles } = useCompression();
  const { downloadAllAsZip } = useDownload();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          onClick={compressAll}
          disabled={!hasPendingFiles || isProcessing}
          size="sm"
        >
          {isProcessing ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              <Play className="size-4" />
              Comprimir Todo
            </>
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => downloadAllAsZip(queue)}
          disabled={doneCount === 0}
        >
          <Download className="size-4" />
          Descargar ZIP
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={clearQueue}
          disabled={totalCount === 0 || isProcessing}
        >
          <Trash2 className="size-4" />
          Limpiar
        </Button>
      </div>

      {totalCount > 0 && (
        <p className="text-xs text-muted-foreground">
          {totalCount} {totalCount === 1 ? "archivo" : "archivos"} &middot;{" "}
          {pendingCount} {pendingCount === 1 ? "listo" : "listos"} &middot;{" "}
          {doneCount} {doneCount === 1 ? "completado" : "completados"}
        </p>
      )}
    </div>
  );
}
