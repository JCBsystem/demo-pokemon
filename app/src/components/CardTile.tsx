import { Link } from "@tanstack/react-router";
import { useState } from "react";
import type { Card } from "../data/schema";
import { FavouriteButton } from "./FavouriteButton";
import { typeColor } from "./typeColor";

type Props = { card: Card; copies?: number; className?: string };

export function CardTile({ card, copies = 1, className = "" }: Props) {
  const [broken, setBroken] = useState(false);
  const color = typeColor(card.types?.[0]);
  return (
    <div
      data-testid="card-tile"
      className={`relative aspect-[5/7] [content-visibility:auto] ${className}`}
      style={{ background: `linear-gradient(135deg, ${color} 70%, ${color}88)` }}
    >
      <Link
        to="/card/$id"
        params={{ id: card.id }}
        aria-label={card.name}
        data-testid="card-link"
        className="block h-full p-[3px] -outline-offset-2"
        onClick={(e) => {
          e.currentTarget.style.viewTransitionName = "card-hero";
        }}
      >
        {broken ? (
          <div className="grid h-full place-items-center bg-zinc-900 p-2 text-center text-xs text-muted">
            {card.name}
          </div>
        ) : (
          <img
            src={card.images.small}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setBroken(true)}
            className="block h-full w-full bg-zinc-900 object-cover"
            data-testid="card-image"
          />
        )}
      </Link>
      <FavouriteButton
        id={card.id}
        className="absolute top-1.5 right-1.5 size-7 bg-black/55 backdrop-blur"
      />
      {copies >= 2 && (
        <span
          data-testid="card-copies"
          className="absolute bottom-1.5 left-1.5 rounded-full bg-black/55 px-1.5 text-[11px] font-semibold text-white tabular-nums"
        >
          ×{copies}
        </span>
      )}
    </div>
  );
}
