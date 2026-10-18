import { Link } from "@tanstack/react-router";
import { useState } from "react";
import type { Card } from "../../data/schema";

export function Hero({ card, color }: { card: Card; color: string }) {
  const [broken, setBroken] = useState(false);
  return (
    <div
      data-testid="card-hero"
      className="relative overflow-hidden px-12 pt-16 pb-8 lg:sticky lg:top-24 lg:rounded-3xl lg:p-10"
      style={{
        background: `radial-gradient(120% 85% at 50% 0%, ${color}d0, ${color}30 60%, #09090b)`,
      }}
    >
      <Link
        to="/cards"
        data-testid="back-to-cards"
        className="absolute top-3 left-3 inline-flex h-9 items-center gap-1 rounded-full bg-black/50 pr-3 pl-2 text-sm backdrop-blur"
      >
        <svg
          aria-hidden
          className="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Cards
      </Link>
      <div className="mx-auto aspect-[5/7] w-full max-w-[300px] rounded-[4.5%/3.2%] bg-zinc-900 shadow-2xl shadow-black/70">
        {broken ? (
          <div className="grid h-full place-items-center rounded-[4.5%/3.2%] bg-zinc-900 p-4 text-center text-sm text-muted [view-transition-name:card-hero]">
            {card.name}
          </div>
        ) : (
          <img
            src={card.images.large}
            alt={card.name}
            decoding="async"
            onError={() => setBroken(true)}
            data-testid="card-image"
            className="h-full w-full rounded-[4.5%/3.2%] object-cover [view-transition-name:card-hero]"
          />
        )}
      </div>
    </div>
  );
}
