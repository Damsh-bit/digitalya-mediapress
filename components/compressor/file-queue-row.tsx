"use client";

import { Download, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { FileEntry } from "@/lib/store";
import { cn } from "@/lib/utils";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

interface FileQueueRowProps {
  entry: FileEntry;
  onRemove: (id: string) => void;
  onDownload: (entry: FileEntry) => void;
}

export function FileQueueRow({ entry, onRemove, onDownload }: FileQueueRowProps) {
  const statusConfig = {
    pending: {
      label: "Pending",
      className: "bg-muted text-muted-foreground",
    },
    processing: {
      label: "Processing",
      className: "bg-primary/20 text-primary animate-pulse",
    },
    done: {
      label: "Done",
      className: "bg-success/20 text-success",
    },
    error: {
      label: "Error",
      className: "bg-destructive/20 text-destructive",
    },
  };

  const { label, className: statusClass } = statusConfig[entry.status];

  return (
    <div className="group flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5 transition-colors hover:bg-secondary/50">
      {/* Thumbnail */}
      <div className="size-10 shrink-0 overflow-hidden rounded-md bg-secondary">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={entry.previewUrl}
          alt={`Preview of ${entry.name}`}
          className="size-full object-cover"
        />
      </div>

      {/* File info */}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="truncate text-sm font-medium text-foreground">
          {entry.name}
        </p>
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge
            variant="secondary"
            className="bg-muted text-muted-foreground text-[10px] px-1.5 py-0"
          >
            {entry.format}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {formatFileSize(entry.originalSize)}
          </span>
          {entry.status === "done" && entry.outputSize !== null && (
            <>
              <span className="text-xs text-muted-foreground">&rarr;</span>
              <span className="text-xs text-muted-foreground">
                {formatFileSize(entry.outputSize)}
              </span>
              {entry.compressionRatio !== null && (
                <span
                  className={cn(
                    "text-xs font-medium",
                    entry.compressionRatio >= 0
                      ? "text-success"
                      : "text-destructive"
                  )}
                >
                  {entry.compressionRatio >= 0 ? "-" : "+"}
                  {Math.abs(entry.compressionRatio)}%
                </span>
              )}
            </>
          )}
          {entry.status === "error" && entry.error && (
            <span className="text-xs text-destructive truncate max-w-[200px]">
              {entry.error}
            </span>
          )}
        </div>
      </div>

      {/* Status badge */}
      <Badge
        variant="secondary"
        className={cn("shrink-0 text-[10px]", statusClass)}
      >
        {label}
      </Badge>

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0">
        {entry.status === "done" && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onDownload(entry)}
            aria-label={`Download ${entry.name}`}
            className="text-muted-foreground hover:text-foreground"
          >
            <Download className="size-4" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => onRemove(entry.id)}
          aria-label={`Remove ${entry.name}`}
          className="text-muted-foreground hover:text-destructive"
        >
          <X className="size-4" />
        </Button>
      </div>
    </div>
  );
}
