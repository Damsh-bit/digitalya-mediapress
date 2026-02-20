/**
 * White version of the DigitalYA logo for dark backgrounds.
 * Recreates the geometric "D" icon + "DigitalYA Mediapress" wordmark.
 */
export function DigitalYaLogo({
  className,
  iconSize = 28,
}: {
  className?: string;
  iconSize?: number;
}) {
  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      {/* Geometric D icon */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer D / play shape */}
        <path
          d="M12 8 L12 72 L52 72 C68 72 76 58 76 40 C76 22 68 8 52 8 Z"
          fill="url(#logo-grad-1)"
          opacity="0.85"
        />
        {/* Inner play triangle */}
        <path
          d="M30 26 L30 54 L56 40 Z"
          fill="url(#logo-grad-2)"
        />
        <defs>
          <linearGradient id="logo-grad-1" x1="12" y1="8" x2="76" y2="72" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60a5fa" />
            <stop offset="1" stopColor="#a78bfa" />
          </linearGradient>
          <linearGradient id="logo-grad-2" x1="30" y1="26" x2="56" y2="54" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="1" stopColor="#e0e7ff" stopOpacity="0.9" />
          </linearGradient>
        </defs>
      </svg>

      {/* Wordmark */}
      <span style={{ display: "flex", alignItems: "baseline", gap: 0, lineHeight: 1 }}>
        <span className="font-sans font-bold text-foreground" style={{ letterSpacing: "-0.02em" }}>
          Digital
        </span>
        <span
          className="font-sans font-bold"
          style={{
            background: "linear-gradient(135deg, #818cf8, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.02em",
          }}
        >
          YA
        </span>
        <span className="font-sans font-medium text-muted-foreground ml-1.5" style={{ fontSize: "0.7em" }}>
          Mediapress
        </span>
      </span>
    </span>
  );
}
