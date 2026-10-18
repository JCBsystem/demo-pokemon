import type { Card } from "./schema";

export type Facet = { value: string; count: number };

export type CardFilter = {
  search?: string;
  sets?: string[];
  types?: string[];
  rarities?: string[];
  sort?: "name" | "set";
};

const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });

export function cardById(cards: Card[], id: string): Card | undefined {
  return cards.find((card) => card.id === id);
}

function rarityOf(card: Card): string[] {
  return card.rarity === undefined ? [] : [card.rarity];
}

function countValues(values: string[]): Facet[] {
  const counts = new Map<string, number>();
  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return [...counts]
    .map(([value, count]) => ({ value, count }))
    .toSorted((a, b) => collator.compare(a.value, b.value));
}

export function facets(cards: Card[]): { sets: Facet[]; types: Facet[]; rarities: Facet[] } {
  return {
    sets: countValues(cards.map((card) => card.setCode)),
    types: countValues(cards.flatMap((card) => card.types ?? [])),
    rarities: countValues(cards.flatMap(rarityOf)),
  };
}

export function normalizeName(name: string): string {
  return name.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

function matchesAny(selected: string[] | undefined, values: string[]): boolean {
  if (selected === undefined || selected.length === 0) return true;
  return values.some((value) => selected.includes(value));
}

export function filterCards(cards: Card[], filter: CardFilter): Card[] {
  const search = normalizeName(filter.search?.trim() ?? "");
  const filtered = cards.filter(
    (card) =>
      normalizeName(card.name).includes(search) &&
      matchesAny(filter.sets, [card.setCode]) &&
      matchesAny(filter.types, card.types ?? []) &&
      matchesAny(filter.rarities, rarityOf(card)),
  );

  if (filter.sort === "name") {
    return filtered.toSorted((a, b) => collator.compare(a.name, b.name));
  }
  if (filter.sort === "set") {
    return filtered.toSorted(
      (a, b) => collator.compare(a.setCode, b.setCode) || collator.compare(a.number, b.number),
    );
  }
  return filtered;
}
