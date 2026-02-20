import Link from "next/link";
import { ImageDown, Video, ArrowRight } from "lucide-react";
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
        "group relative flex flex-col gap-4 rounded-lg border p-6 transition-all duration-200",
        isAvailable
          ? "border-border bg-card cursor-pointer hover:border-primary/40 hover:shadow-sm"
          : "border-dashed border-border bg-muted/30 cursor-not-allowed opacity-60"
      )}
    >
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "flex size-10 items-center justify-center rounded-lg",
            isAvailable
              ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground"
          )}
        >
          {icon}
        </div>
        <Badge
          variant="secondary"
          className={cn(
            "text-[11px]",
            isAvailable
              ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground"
          )}
        >
          {isAvailable ? "Disponible" : "Proximamente"}
        </Badge>
      </div>
      <div>
        <h3 className="text-base font-semibold text-card-foreground text-balance">
          {title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
      {isAvailable && (
        <div className="flex items-center gap-1 text-sm font-medium text-primary">
          Comenzar
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      )}
    </div>
  );

  if (isAvailable && href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

export function DashboardTools() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <ToolCard
        title="Compresor de Imagenes"
        description="Comprime y convierte imagenes por lotes a formato WebP optimizado con ajustes de calidad personalizables."
        icon={<ImageDown className="size-5" />}
        status="available"
        href="/compress/images"
      />
      <ToolCard
        title="Compresor de Video"
        description="Comprime archivos de video manteniendo la calidad visual. Soporta multiples formatos de salida."
        icon={<Video className="size-5" />}
        status="coming-soon"
      />
    </div>
  );
}
