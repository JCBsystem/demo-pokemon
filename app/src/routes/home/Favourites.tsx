import { useMemo } from "react";
import { Link } from "react-aria-components";
import { CardImage } from "../../components/CardImage";
import { FavouriteButton } from "../../components/FavouriteButton";
import { TypeDot } from "../../components/TypeDot";
import type { Card } from "../../data/schema";
import { useCards } from "../../data/useCards";
import { useStore } from "../../store";
import { Section } from "./Section";

export function Favourites() {
  const { data } = useCards();
  const favourites = useStore((state) => state.favourites);
  const cards = useMemo(() => {
    const byId = new Map<string, Card>();
    for (const card of data ?? []) if (!byId.has(card.id)) byId.set(card.id, card);
    return favourites.flatMap((id) => byId.get(id) ?? []);
  }, [data, favourites]);

  return (
    <Section
      title={
        <>
          Favourites <span className="font-mono">{cards.length}</span>
        </>
      }
    >
      <ul
        data-testid="favourites-list"
        className="divide-y divide-zinc-100 overflow-hidden rounded-lg border border-zinc-200 bg-white"
      >
        {cards.length === 0 ? (
          <li className="px-3 py-4 text-zinc-600">
            No favourites yet. Star a card to pin it here.
          </li>
        ) : (
          cards.map((card) => <FavouriteItem key={card.id} card={card} />)
        )}
      </ul>
    </Section>
  );
}

function FavouriteItem({ card }: { card: Card }) {
  const type = card.types?.[0];

  return (
    <li
      data-testid="favourite-item"
      className="flex h-12 items-center gap-3 pr-1 motion-safe:transition-colors hover:bg-zinc-50"
    >
      <Link
        href={{ to: "/card/$id", params: { id: card.id } }}
        className="flex h-full min-w-0 flex-1 items-center gap-3 pl-3 -outline-offset-2"
      >
        <CardImage card={card} size="thumb" className="w-6 shrink-0 border border-zinc-200" />
        <span className="truncate">
          <span className="font-medium">{card.name}</span>{" "}
          <span className="font-mono text-xs text-zinc-500">
            {card.setCode} · {card.number}
          </span>
        </span>
      </Link>
      {type !== undefined && <TypeDot type={type} />}
      <FavouriteButton id={card.id} />
    </li>
  );
}
