import type { Card } from "./schema";
import type { Facet } from "./selectors";

export function countIds(cards: Card[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const { id } of cards) counts.set(id, (counts.get(id) ?? 0) + 1);
  return counts;
}

export function byCount(facets: Facet[]): Facet[] {
  return facets.toSorted(
    (a, b) => b.count - a.count || a.value.localeCompare(b.value, "en", { numeric: true }),
  );
}
