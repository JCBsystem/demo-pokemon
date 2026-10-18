import { z } from "zod";
import type { CardFilter } from "../../data/selectors";

export const SEARCH_HASH = "search";

export const FACET_KEYS = ["set", "type", "rarity"] as const;
export type FacetKey = (typeof FACET_KEYS)[number];
export const FACET_LABELS: Record<FacetKey, string> = {
  set: "Set",
  type: "Type",
  rarity: "Rarity",
};

const text = z
  .union([z.string(), z.number().transform(String)])
  .pipe(z.string().min(1))
  .optional()
  .catch(undefined);

export const cardsSearchSchema = z.object({
  q: text,
  set: text,
  type: text,
  rarity: text,
  sort: z.enum(["name", "set"]).optional().catch(undefined),
  page: z.coerce.number().int().min(1).optional().catch(undefined),
});

export type CardsSearch = z.infer<typeof cardsSearchSchema>;

function split(list: string | undefined): string[] {
  return list === undefined ? [] : list.split(",").filter((value) => value !== "");
}

function join(list: string[]): string | undefined {
  return list.length === 0 ? undefined : list.join(",");
}

export function searchToFilter(search: CardsSearch): CardFilter {
  const sets = split(search.set);
  const types = split(search.type);
  const rarities = split(search.rarity);
  return {
    ...(search.q !== undefined && { search: search.q }),
    ...(sets.length > 0 && { sets }),
    ...(types.length > 0 && { types }),
    ...(rarities.length > 0 && { rarities }),
    ...(search.sort !== undefined && { sort: search.sort }),
  };
}

export function toggleValue(list: string | undefined, value: string): string | undefined {
  const values = split(list);
  return join(
    values.includes(value) ? values.filter((item) => item !== value) : [...values, value],
  );
}

export function selectedValues(search: CardsSearch, key: FacetKey): string[] {
  return split(search[key]);
}

export function withoutPage({ page: _page, ...rest }: CardsSearch): CardsSearch {
  return rest;
}

export function activeFilterCount(search: CardsSearch): number {
  return FACET_KEYS.reduce((total, key) => total + selectedValues(search, key).length, 0);
}
