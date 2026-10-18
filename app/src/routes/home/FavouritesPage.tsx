import { useMemo } from "react";
import { PAGE_SIZE } from "../../data/paging";
import { cardById } from "../../data/selectors";
import { useCards } from "../../data/useCards";
import { useStore } from "../../store";
import { EmptyPocket } from "../../ui/EmptyPocket";
import { Pocket } from "../../ui/Pocket";
import { formatCount } from "../../ui/format";

export function FavouritesPage({ className }: { className: string }) {
  const { data } = useCards();
  const favourites = useStore((state) => state.favourites);
  const pinned = useMemo(
    () =>
      data
        ? favourites.flatMap((id) => {
            const card = cardById(data, id);
            return card ? [card] : [];
          })
        : [],
    [data, favourites],
  );
  const slots = Math.max(PAGE_SIZE, Math.ceil(pinned.length / PAGE_SIZE) * PAGE_SIZE);
  const empties = Array.from({ length: slots - pinned.length }, (_, index) => index);

  return (
    <section className={className}>
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-display text-lg font-semibold">Page 1 · Favourites</h2>
        <span className="text-xs font-bold text-muted">{formatCount(pinned.length)} pinned</span>
      </div>
      <div className="grid grid-cols-3 gap-2.5" data-testid="favourites-grid">
        {pinned.map((card) => (
          <Pocket key={card.id} card={card} heroKey={`fav-${card.id}`} />
        ))}
        {empties.map((index) => (
          <EmptyPocket key={index}>{index === 0 && "Tap ♥ on any card to pin it here"}</EmptyPocket>
        ))}
      </div>
    </section>
  );
}
