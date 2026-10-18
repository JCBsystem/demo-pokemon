import { Link } from "@tanstack/react-router";
import type { Card } from "../data/schema";
import { CardImage } from "./CardImage";
import { FavouriteButton } from "./FavouriteButton";
import { hero, HERO_NAME } from "./hero";

type Props = { card: Card; heroKey: string };

export function Pocket({ card, heroKey }: Props) {
  return (
    <div className="pocket" data-testid="pocket">
      <Link
        to="/card/$id"
        params={{ id: card.id }}
        aria-label={card.name}
        data-testid="pocket-link"
        className="block size-full outline-none focus-visible:ring-4 focus-visible:ring-sun focus-visible:ring-inset"
        style={hero.key === heroKey ? { viewTransitionName: HERO_NAME } : undefined}
        onClick={(event) => {
          hero.key = heroKey;
          event.currentTarget.style.viewTransitionName = HERO_NAME;
        }}
      >
        <CardImage src={card.images.small} alt={card.name} />
      </Link>
      <div className="absolute top-[7px] right-[5px] z-10">
        <FavouriteButton id={card.id} name={card.name} />
      </div>
    </div>
  );
}
