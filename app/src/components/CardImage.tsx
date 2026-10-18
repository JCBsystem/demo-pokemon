import { useState } from "react";
import type { Card } from "../data/schema";

type Props = {
  card: Card;
  size: "thumb" | "pane" | "full";
  className?: string;
  transitionName?: string;
  testId?: string;
};

export function CardImage({ card, size, className = "", transitionName, testId }: Props) {
  const src = size === "full" ? card.images.large : card.images.small;
  const [failedSrc, setFailedSrc] = useState<string>();
  const alt = size === "thumb" ? "" : `${card.name} card`;

  return (
    <div
      className={`aspect-[5/7] overflow-hidden bg-zinc-100 ${size === "thumb" ? "rounded-sm" : "rounded-xl"} ${className}`}
      style={transitionName === undefined ? undefined : { viewTransitionName: transitionName }}
    >
      {failedSrc === src ? (
        <div
          {...(alt === "" ? { "aria-hidden": true } : { role: "img", "aria-label": alt })}
          className="grid size-full place-items-center font-semibold text-zinc-400"
        >
          {card.name.charAt(0)}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          data-testid={testId}
          loading={size === "thumb" ? "lazy" : "eager"}
          decoding="async"
          className="size-full object-cover"
          onError={() => setFailedSrc(src)}
        />
      )}
    </div>
  );
}
