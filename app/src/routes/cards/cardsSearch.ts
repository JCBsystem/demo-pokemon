import type { CardFilter } from "../../data/selectors";

export const panels = ["type", "rarity", "set", "sort"] as const;
export type Panel = (typeof panels)[number];

const sorts = ["name", "set"] as const;
type Sort = (typeof sorts)[number];

export type CardsSearch = {
  q?: string;
  type?: string[];
  rarity?: string[];
  set?: string[];
  sort?: Sort;
  panel?: Panel;
};

function oneOf<T extends string>(options: readonly T[], value: unknown): T | undefined {
  return options.find((option) => option === value);
}

function strings(value: unknown): string[] | undefined {
  const list = (Array.isArray(value) ? (value as unknown[]) : [value]).filter(
    (item): item is string => typeof item === "string" && item !== "",
  );
  return list.length > 0 ? list : undefined;
}

export function validateCardsSearch(raw: Record<string, unknown>): CardsSearch {
  const search: CardsSearch = {};
  if (typeof raw.q === "string" && raw.q !== "") search.q = raw.q;
  const type = strings(raw.type);
  if (type) search.type = type;
  const rarity = strings(raw.rarity);
  if (rarity) search.rarity = rarity;
  const set = strings(raw.set);
  if (set) search.set = set;
  const sort = oneOf(sorts, raw.sort);
  if (sort) search.sort = sort;
  const panel = oneOf(panels, raw.panel);
  if (panel) search.panel = panel;
  return search;
}

export function toCardFilter({ q, type, rarity, set, sort }: CardsSearch): CardFilter {
  const filter: CardFilter = {};
  if (q !== undefined) filter.search = q;
  if (type) filter.types = type;
  if (rarity) filter.rarities = rarity;
  if (set) filter.sets = set;
  if (sort) filter.sort = sort;
  return filter;
}

export const panelLabels: Record<Panel, string> = {
  type: "Type",
  rarity: "Rarity",
  set: "Set",
  sort: "Sort",
};

export const facetKeys = ["type", "rarity", "set"] as const;
