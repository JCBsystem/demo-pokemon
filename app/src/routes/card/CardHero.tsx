import { Link } from "@tanstack/react-router";
import type { Card } from "../../data/schema";
import { CardImage } from "../../ui/CardImage";
import { HERO_NAME } from "../../ui/hero";

const slot = "mx-auto mt-3 max-w-[300px] rounded-2xl lg:max-w-[340px]";

export function CardHero({ card }: { card: Card | undefined }) {
  return (
    <div className="paper">
      <Link
        to="/cards"
        data-testid="back-to-binder"
        className="rounded text-sm font-bold text-cover outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      >
        ‹ Back to binder
      </Link>
      {card === undefined ? (
        <div className={`pocket-empty ${slot}`} />
      ) : (
        <div className={`pocket ${slot}`} style={{ viewTransitionName: HERO_NAME }}>
          <CardImage src={card.images.large} alt={card.name} eager testId="card-image" />
        </div>
      )}
    </div>
  );
}
