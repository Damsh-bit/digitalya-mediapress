import { TopBar } from "@/components/top-bar";
import { ImageCompressor } from "@/components/compressor/image-compressor";

export default function ImageCompressorPage() {
  return (
    <>
      <TopBar
        title="Image Compressor"
        description="Compress and convert images to optimized WebP format."
      />
      <div className="flex-1 p-6 lg:p-8">
        <ImageCompressor />
      </div>
    </>
  );
}
