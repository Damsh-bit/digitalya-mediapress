"use client";

import { useMediaPressStore } from "@/lib/store";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Settings2, Gauge, Shield } from "lucide-react";

function SectionHeader({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2 mb-3">
      {icon}
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </span>
    </div>
  );
}

export function SettingsPanel() {
  const settings = useMediaPressStore((s) => s.settings);
  const setSettings = useMediaPressStore((s) => s.setSettings);

  const qualityLabel =
    settings.quality >= 80
      ? "Alta"
      : settings.quality >= 50
        ? "Media"
        : "Baja";

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base text-card-foreground">
          <Settings2 className="size-4 text-primary" />
          Ajustes de Compresion
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-0">
        {/* ── Quality Section ── */}
        <div className="rounded-lg bg-background/50 p-4">
          <SectionHeader
            icon={<Gauge className="size-3.5 text-primary" />}
            title="Calidad"
          />

          {/* Quality value display */}
          <div className="mb-3 flex items-center justify-between">
            <span className="text-2xl font-bold tabular-nums text-foreground">
              {settings.quality}%
            </span>
            <Badge
              variant="outline"
              className={
                settings.quality >= 80
                  ? "border-[#22c55e]/30 bg-[#22c55e]/10 text-[#22c55e]"
                  : settings.quality >= 50
                    ? "border-[#f59e0b]/30 bg-[#f59e0b]/10 text-[#f59e0b]"
                    : "border-destructive/30 bg-destructive/10 text-destructive"
              }
            >
              {qualityLabel}
            </Badge>
          </div>

          <Slider
            id="quality-slider"
            min={1}
            max={100}
            step={1}
            value={[settings.quality]}
            onValueChange={([value]) => setSettings({ quality: value })}
            disabled={settings.lossless}
            aria-label="Calidad de compresion"
          />

          <div className="mt-1.5 flex justify-between text-[10px] text-muted-foreground">
            <span>Mas pequeno</span>
            <span>Mas calidad</span>
          </div>

          {/* Lossless toggle inline */}
          <div className="mt-4 flex items-center justify-between rounded-md border border-border bg-card px-3 py-2.5">
            <div className="flex flex-col gap-0.5">
              <Label
                htmlFor="lossless-toggle"
                className="text-sm text-foreground cursor-pointer"
              >
                Modo Lossless
              </Label>
              <span className="text-[11px] text-muted-foreground leading-tight">
                Sin perdida de calidad (archivo mas grande)
              </span>
            </div>
            <Switch
              id="lossless-toggle"
              checked={settings.lossless}
              onCheckedChange={(checked) =>
                setSettings({ lossless: checked })
              }
            />
          </div>
        </div>

        {/* Divider */}
        <div className="my-1 h-px bg-border" />

        {/* ── Output Section ── */}
        <div className="rounded-lg bg-background/50 p-4">
          <SectionHeader
            icon={<Shield className="size-3.5 text-primary" />}
            title="Salida"
          />

          <div className="flex flex-col gap-3">
            {/* Strip Metadata */}
            <div className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2.5">
              <div className="flex flex-col gap-0.5">
                <Label
                  htmlFor="metadata-toggle"
                  className="text-sm text-foreground cursor-pointer"
                >
                  Eliminar metadatos
                </Label>
                <span className="text-[11px] text-muted-foreground leading-tight">
                  EXIF, GPS, datos de camara
                </span>
              </div>
              <Switch
                id="metadata-toggle"
                checked={settings.stripMetadata}
                onCheckedChange={(checked) =>
                  setSettings({ stripMetadata: checked })
                }
              />
            </div>

            {/* Output Format */}
            <div className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2.5">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm text-foreground">Formato</span>
                <span className="text-[11px] text-muted-foreground leading-tight">
                  Formato de imagen de salida
                </span>
              </div>
              <Badge className="bg-primary/15 text-primary border-primary/25 hover:bg-primary/15">
                WebP
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
