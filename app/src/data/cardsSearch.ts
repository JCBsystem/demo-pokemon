import type { Card } from "./schema";
import type { CardFilter } from "./selectors";

export const SORTS = ["name", "set", "hp"] as const;
export type Sort = (typeof SORTS)[number];

/** `/cards` URL search params. Repeated keys carry multi-select: `?type=Fire&type=Water`. */
export type CardsSearch = {
  q?: string | undefined;
  set?: string[] | undefined;
  type?: string[] | undefined;
  rarity?: string[] | undefined;
  sort?: Sort | undefined;
};

export function parseSearch(searchStr: string): Record<string, string | string[]> {
  const params = new URLSearchParams(searchStr);
  const result: Record<string, string | string[]> = {};
  for (const key of new Set(params.keys())) {
    const values = params.getAll(key);
    result[key] = values.length === 1 ? (values[0] ?? "") : values;
  }
  return result;
}

export function stringifySearch(search: Record<string, unknown>): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(search)) {
    if (Array.isArray(value)) {
      for (const item of value) params.append(key, String(item));
    } else if (typeof value === "string" ? value !== "" : typeof value === "number") {
      params.set(key, String(value));
    }
  }
  const text = params.toString();
  return text === "" ? "" : `?${text}`;
}

function strings(value: unknown): string[] | undefined {
  const list = Array.isArray(value) ? value : [value];
  const clean = list.filter((item): item is string => typeof item === "string" && item !== "");
  return clean.length === 0 ? undefined : [...new Set(clean)];
}

function isSort(value: unknown): value is Sort {
  return SORTS.includes(value as Sort);
}

/** Never throws; unknown keys and bad values are dropped. */
export function parseCardsSearch(raw: Record<string, unknown>): CardsSearch {
  const search: CardsSearch = {};
  if (typeof raw.q === "string" && raw.q !== "") search.q = raw.q;
  const set = strings(raw.set);
  if (set) search.set = set;
  const type = strings(raw.type);
  if (type) search.type = type;
  const rarity = strings(raw.rarity);
  if (rarity) search.rarity = rarity;
  if (isSort(raw.sort)) search.sort = raw.sort;
  return search;
}

/** HP sorting is not part of `CardFilter`; the page applies `sortByHp` afterwards. */
export function toCardFilter(search: CardsSearch): CardFilter {
  const filter: CardFilter = {};
  if (search.q) filter.search = search.q;
  if (search.set) filter.sets = search.set;
  if (search.type) filter.types = search.type;
  if (search.rarity) filter.rarities = search.rarity;
  if (search.sort === "name" || search.sort === "set") filter.sort = search.sort;
  return filter;
}

function hpOf(card: Card): number {
  const hp = Number(card.hp);
  return Number.isFinite(hp) ? hp : -1;
}

/** High to low; cards without HP (trainers, energy) last, ties keep source order. */
export function sortByHp(cards: Card[]): Card[] {
  return cards.toSorted((a, b) => hpOf(b) - hpOf(a));
}

export function hasFilters(search: CardsSearch): boolean {
  return Boolean(search.q || search.set || search.type || search.rarity);
}
