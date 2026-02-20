import { TopBar } from "@/components/top-bar";
import { ImageCompressor } from "@/components/compressor/image-compressor";

export default function ImageCompressorPage() {
  return (
    <>
      <TopBar
        title="Compresor de Imagenes"
        description="Comprime y convierte imagenes a formato WebP optimizado."
      />
      <div className="flex-1 p-5 lg:p-6">
        <ImageCompressor />
      </div>
    </>
  );
}
