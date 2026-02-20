/**
 * DigitalYA logo with geometric "D" icon + "DigitalYA Mediapress" wordmark.
 * Uses the original brand image on light backgrounds.
 */
import Image from "next/image";

export function DigitalYaLogo({
  className,
  iconSize = 28,
}: {
  className?: string;
  iconSize?: number;
}) {
  return (
    <span
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
    >
      <Image
        src="/images/digitalya-logo.png"
        alt="DigitalYa"
        width={iconSize * 5}
        height={iconSize}
        className="h-auto"
        style={{ height: iconSize, width: "auto" }}
        priority
      />
      <span
        className="font-sans font-semibold text-foreground"
        style={{ letterSpacing: "-0.01em" }}
      >
        Mediapress
      </span>
    </span>
  );
}
