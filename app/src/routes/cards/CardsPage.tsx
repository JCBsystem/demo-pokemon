import { useSearch } from "@tanstack/react-router";
import { useMemo } from "react";
import { countById } from "../../data/countById";
import { useCards, useFilteredCards } from "../../data/useCards";
import { CardGrid } from "./CardGrid";
import { EmptyState } from "./EmptyState";
import { Toolbar } from "./Toolbar";
import { toCardFilter, validateCardsSearch } from "./cardsSearch";

export function CardsPage() {
  const { q, type, rarity, set, sort } = useSearch({ from: "/cards" });
  const filter = useMemo(
    () => toCardFilter(validateCardsSearch({ q, type, rarity, set, sort })),
    [q, type, rarity, set, sort],
  );
  const cards = useFilteredCards(filter) ?? [];
  const all = useCards().data;
  const copies = useMemo(() => countById(all ?? []), [all]);

  return (
    <main data-testid="page-cards">
      <h1 className="sr-only">Cards</h1>
      <Toolbar count={cards.length} />
      {cards.length > 0 ? <CardGrid cards={cards} copies={copies} /> : <EmptyState />}
    </main>
  );
}
