import { z } from "zod";
import type { CardFilter } from "./selectors";

export const cardTabs = ["attacks", "weaknesses", "legalities"] as const;
export type CardTab = (typeof cardTabs)[number];

export type FacetKey = "set" | "type" | "rarity";

const facetKeys: readonly FacetKey[] = ["set", "type", "rarity"];

// TanStack Router JSON-parses search values, so `?q=123` arrives as a number.
const text = z.coerce.string<string>().exactOptional();

const cardTabSchema = z.enum(cardTabs).optional().catch(undefined);

export const cardSearchSchema = z.object({ tab: cardTabSchema });

export const cardsSearchSchema = z.object({
  q: text,
  set: text,
  type: text,
  rarity: text,
  sort: z.enum(["name", "set"]).optional().catch(undefined),
  card: text,
  tab: cardTabSchema,
});
export type CardsSearch = z.infer<typeof cardsSearchSchema>;

export function facetValues(search: CardsSearch, key: FacetKey): string[] {
  return search[key]?.split(",").filter((value) => value !== "") ?? [];
}

function withValues(search: CardsSearch, key: FacetKey, values: string[]): CardsSearch {
  const next = { ...search };
  if (values.length === 0) delete next[key];
  else next[key] = values.join(",");
  return next;
}

export function filterFromSearch(search: CardsSearch): CardFilter {
  const filter: CardFilter = {};
  if (search.q) filter.search = search.q;
  if (search.sort) filter.sort = search.sort;
  const sets = facetValues(search, "set");
  if (sets.length > 0) filter.sets = sets;
  const types = facetValues(search, "type");
  if (types.length > 0) filter.types = types;
  const rarities = facetValues(search, "rarity");
  if (rarities.length > 0) filter.rarities = rarities;
  return filter;
}

export function toggleFacet(search: CardsSearch, key: FacetKey, value: string): CardsSearch {
  const values = facetValues(search, key);
  return withValues(
    search,
    key,
    values.includes(value) ? values.filter((v) => v !== value) : [...values, value],
  );
}

export function setQuery(search: CardsSearch, q: string): CardsSearch {
  const next = { ...search };
  delete next.card;
  if (q === "") delete next.q;
  else next.q = q;
  return next;
}

export function clearFacets(search: CardsSearch): CardsSearch {
  return facetKeys.reduce((next, key) => withValues(next, key, []), search);
}

export function clearFilters(search: CardsSearch): CardsSearch {
  const next = clearFacets(search);
  delete next.q;
  return next;
}

export function activeFilters(search: CardsSearch): { key: "q" | FacetKey; value: string }[] {
  return [
    ...(search.q ? [{ key: "q" as const, value: search.q }] : []),
    ...facetKeys.flatMap((key) => facetValues(search, key).map((value) => ({ key, value }))),
  ];
}
