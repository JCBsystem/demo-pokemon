import { useState } from "react";

type Props = { src: string; alt: string; eager?: boolean; testId?: string };

export function CardImage({ src, alt, eager = false, testId }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span className="grid size-full place-items-center p-2 text-center text-xs font-bold text-muted">
        {alt}
      </span>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className="size-full object-cover"
      onError={() => setFailed(true)}
      data-testid={testId}
    />
  );
}
