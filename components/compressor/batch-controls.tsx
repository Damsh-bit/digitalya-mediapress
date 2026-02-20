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
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isProcessing ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Play className="size-4" />
              Compress All
            </>
          )}
        </Button>

        <Button
          variant="outline"
          onClick={() => downloadAllAsZip(queue)}
          disabled={doneCount === 0}
          className="border-border text-foreground"
        >
          <Download className="size-4" />
          Download ZIP
        </Button>

        <Button
          variant="outline"
          onClick={clearQueue}
          disabled={totalCount === 0 || isProcessing}
          className="border-border text-foreground"
        >
          <Trash2 className="size-4" />
          Clear All
        </Button>
      </div>

      {totalCount > 0 && (
        <p className="text-xs text-muted-foreground">
          {totalCount} {totalCount === 1 ? "file" : "files"} &middot;{" "}
          {pendingCount} ready &middot; {doneCount} done
        </p>
      )}
    </div>
  );
}
