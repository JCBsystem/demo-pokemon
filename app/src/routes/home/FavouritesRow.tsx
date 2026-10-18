import { useMemo } from "react";
import { CardTile } from "../../components/CardTile";
import type { Card } from "../../data/schema";
import { cardById } from "../../data/selectors";
import { useStore } from "../../store";

export function FavouritesRow({ cards }: { cards: Card[] }) {
  const ids = useStore((s) => s.favourites);
  const favourites = useMemo(() => ids.flatMap((id) => cardById(cards, id) ?? []), [cards, ids]);

  return (
    <section aria-labelledby="favourites-heading" className="mt-10" data-testid="favourites">
      <h2 className="flex items-baseline justify-between px-4 lg:px-6">
        <span id="favourites-heading" className="text-lg font-bold">
          Favourites
        </span>
        <span data-testid="favourites-count" className="text-xs text-muted">
          {favourites.length} pinned
        </span>
      </h2>
      <div className="noscroll mt-3 flex min-h-[calc(7rem*7/5)] snap-x gap-3 overflow-x-auto px-4 lg:min-h-[calc(10rem*7/5)] lg:px-6">
        {favourites.length === 0 ? (
          <p
            data-testid="favourites-empty"
            className="grid w-28 shrink-0 place-items-center rounded-lg border border-dashed border-zinc-800 p-3 text-center text-xs text-muted lg:w-40"
          >
            Tap the heart on any card to pin it here.
          </p>
        ) : (
          favourites.map((card) => (
            <CardTile
              key={card.id}
              card={card}
              className="w-28 shrink-0 snap-start overflow-hidden rounded-lg lg:w-40"
            />
          ))
        )}
      </div>
    </section>
  );
}
