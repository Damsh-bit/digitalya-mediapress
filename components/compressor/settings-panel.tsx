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

export function SettingsPanel() {
  const settings = useMediaPressStore((s) => s.settings);
  const setSettings = useMediaPressStore((s) => s.setSettings);

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-base text-card-foreground">
          Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {/* Quality Slider */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="quality-slider"
              className="text-sm text-foreground"
            >
              Quality
            </Label>
            <span className="tabular-nums text-sm font-medium text-primary">
              {settings.quality}
            </span>
          </div>
          <Slider
            id="quality-slider"
            min={1}
            max={100}
            step={1}
            value={[settings.quality]}
            onValueChange={([value]) => setSettings({ quality: value })}
            disabled={settings.lossless}
            aria-label="Compression quality"
          />
        </div>

        {/* Lossless Toggle */}
        <div className="flex items-center justify-between">
          <Label htmlFor="lossless-toggle" className="text-sm text-foreground">
            Lossless mode
          </Label>
          <Switch
            id="lossless-toggle"
            checked={settings.lossless}
            onCheckedChange={(checked) => setSettings({ lossless: checked })}
          />
        </div>

        {/* Strip Metadata Toggle */}
        <div className="flex items-center justify-between">
          <Label
            htmlFor="metadata-toggle"
            className="text-sm text-foreground"
          >
            Strip metadata
          </Label>
          <Switch
            id="metadata-toggle"
            checked={settings.stripMetadata}
            onCheckedChange={(checked) =>
              setSettings({ stripMetadata: checked })
            }
          />
        </div>

        {/* Output Format */}
        <div className="flex items-center justify-between">
          <Label className="text-sm text-foreground">Output format</Label>
          <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
            WebP
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
