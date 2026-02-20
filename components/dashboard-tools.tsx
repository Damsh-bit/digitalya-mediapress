import Link from "next/link";
import { ImageDown, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "available" | "coming-soon";
  href?: string;
}

function ToolCard({ title, description, icon, status, href }: ToolCardProps) {
  const isAvailable = status === "available";

  const content = (
    <div
      className={cn(
        "group relative flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-300",
        isAvailable
          ? "cursor-pointer hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
          : "cursor-not-allowed opacity-50"
      )}
    >
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "flex size-12 items-center justify-center rounded-lg",
            isAvailable ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
          )}
        >
          {icon}
        </div>
        <Badge
          variant={isAvailable ? "default" : "secondary"}
          className={cn(
            isAvailable
              ? "bg-success text-success-foreground"
              : "bg-warning/20 text-warning border-warning/30"
          )}
        >
          {isAvailable ? "Available" : "Coming Soon"}
        </Badge>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-card-foreground text-balance">
          {title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );

  if (isAvailable && href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

export function DashboardTools() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ToolCard
        title="Image Compressor"
        description="Batch compress and convert images to optimized WebP format with adjustable quality settings."
        icon={<ImageDown className="size-6" />}
        status="available"
        href="/compress/images"
      />
      <ToolCard
        title="Video Compressor"
        description="Compress video files while maintaining visual quality. Supports multiple output formats."
        icon={<Video className="size-6" />}
        status="coming-soon"
      />
    </div>
  );
}
