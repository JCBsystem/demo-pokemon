import { useState, type CSSProperties } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  style?: CSSProperties;
};

export function CardImage({ src, alt, className = "", priority = false, style }: Props) {
  const [failedSrc, setFailedSrc] = useState<string>();

  return (
    <div className={`card-slot ${className}`} style={style}>
      {failedSrc === src ? (
        <div className="grid h-full place-content-center gap-1 p-3 text-center text-mute bg-wash">
          <span className="font-serif text-lg">No image</span>
          <span className="text-xs">{alt}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className="e2e-card-image block w-full h-full object-cover"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailedSrc(src)}
        />
      )}
    </div>
  );
}
