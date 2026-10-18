import { Link } from "@tanstack/react-router";
import { memo, useState } from "react";
import type { Card } from "../../data/schema";
import { CardImage } from "../../ui/CardImage";
import { CardMeta } from "../../ui/CardMeta";
import { FavouriteButton } from "../../ui/FavouriteButton";

type Props = { cards: Card[]; counts: Map<string, number> };

// Memoized so the page can render it from a deferred list while the search field stays responsive.
export const CardGrid = memo(function CardGrid({ cards, counts }: Props) {
  const [opening, setOpening] = useState<string>();
  // Keyed by id + occurrence, not list index, so filtering keeps the DOM of cards that stay.
  const seen = new Map<string, number>();

  return (
    <div
      data-testid="card-grid"
      className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-x-5 lg:gap-x-8 gap-y-10 lg:gap-y-14"
    >
      {cards.map((card, index) => {
        const occurrence = (seen.get(card.id) ?? 0) + 1;
        seen.set(card.id, occurrence);
        const key = `${card.id}-${occurrence}`;
        return (
          <GridItem
            key={key}
            itemKey={key}
            card={card}
            copies={counts.get(card.id) ?? 1}
            priority={index < 8}
            opening={opening === key}
            onOpen={setOpening}
          />
        );
      })}
    </div>
  );
});

type ItemProps = {
  card: Card;
  itemKey: string;
  copies: number;
  priority: boolean;
  opening: boolean;
  onOpen: (key: string) => void;
};

// Memoized so opening one card or narrowing the list re-renders only the items that change.
const GridItem = memo(function GridItem({
  card,
  itemKey,
  copies,
  priority,
  opening,
  onOpen,
}: ItemProps) {
  const open = () => onOpen(itemKey);

  return (
    <figure data-testid="card-item" className="relative group grid-item">
      <Link
        to="/card/$id"
        params={{ id: card.id }}
        data-testid="card-link"
        className="block"
        onPointerDown={open}
        onClick={open}
      >
        <CardImage
          src={card.images.small}
          alt={card.name}
          priority={priority}
          className="motion-safe:transition-transform group-hover:-translate-y-1"
          style={opening ? { viewTransitionName: "card-hero" } : {}}
        />
      </Link>
      <FavouriteButton
        id={card.id}
        name={card.name}
        className="absolute top-2 right-2 bg-paper/90 rounded-full p-1.5 shadow-sm"
      />
      <figcaption className="mt-3">
        <Link
          to="/card/$id"
          params={{ id: card.id }}
          className="font-serif text-xl leading-tight hover:text-accent"
        >
          {card.name}
        </Link>
        <CardMeta card={card} copies={copies} className="mt-0.5 text-xs" />
      </figcaption>
    </figure>
  );
});
