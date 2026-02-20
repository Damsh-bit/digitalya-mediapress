"use client";

import { useMediaPressStore } from "@/lib/store";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

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
    <div className="flex flex-col gap-5">
      {/* Quality */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="quality-slider" className="text-sm font-medium text-foreground">
            Calidad
          </Label>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tabular-nums text-foreground">
              {settings.quality}%
            </span>
            <Badge
              variant="secondary"
              className={
                settings.quality >= 80
                  ? "bg-emerald-50 text-emerald-700 text-[11px]"
                  : settings.quality >= 50
                    ? "bg-amber-50 text-amber-700 text-[11px]"
                    : "bg-red-50 text-red-700 text-[11px]"
              }
            >
              {qualityLabel}
            </Badge>
          </div>
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

        <div className="flex justify-between text-[11px] text-muted-foreground">
          <span>Mas pequeno</span>
          <span>Mas calidad</span>
        </div>
      </div>

      {/* Separator */}
      <div className="h-px bg-border" />

      {/* Toggles */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <Label
              htmlFor="lossless-toggle"
              className="text-sm text-foreground cursor-pointer"
            >
              Modo sin perdida
            </Label>
            <span className="text-[11px] text-muted-foreground">
              Sin perdida de calidad
            </span>
          </div>
          <Switch
            id="lossless-toggle"
            checked={settings.lossless}
            onCheckedChange={(checked) => setSettings({ lossless: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <Label
              htmlFor="metadata-toggle"
              className="text-sm text-foreground cursor-pointer"
            >
              Eliminar metadatos
            </Label>
            <span className="text-[11px] text-muted-foreground">
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
      </div>

      {/* Separator */}
      <div className="h-px bg-border" />

      {/* Output format */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-foreground">Formato de salida</span>
        <Badge variant="secondary" className="bg-primary/10 text-primary text-[11px]">
          WebP
        </Badge>
      </div>
    </div>
  );
}
