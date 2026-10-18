import { memo } from "react";
import { CardTile } from "../../components/CardTile";
import type { Card } from "../../data/schema";

type Props = { cards: Card[]; copies: Map<string, number> };

export const CardGrid = memo(function CardGrid({ cards, copies }: Props) {
  return (
    <div
      data-testid="cards-grid"
      className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7"
    >
      {cards.map((card, index) => (
        <CardTile key={`${card.id}-${index}`} card={card} copies={copies.get(card.id) ?? 1} />
      ))}
    </div>
  );
});
