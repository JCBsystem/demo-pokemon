import { useMemo } from "react";
import type { Card } from "./schema";
import { useCards } from "./useCards";

/** How many rows share each id; the collection keeps duplicate cards as separate rows. */
export function countById(cards: Card[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const card of cards) counts.set(card.id, (counts.get(card.id) ?? 0) + 1);
  return counts;
}

export function useCopies(): Map<string, number> {
  const { data } = useCards();
  return useMemo(() => countById(data ?? []), [data]);
}
