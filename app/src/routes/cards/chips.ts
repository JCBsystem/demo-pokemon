import type { Selection } from "react-aria-components";
import type { Facet } from "../../data/selectors";

export const CHIP =
  "cursor-pointer whitespace-nowrap border border-rule rounded-full px-3.5 py-1.5 text-sm hover:border-ink";
export const CHIP_ON = "bg-ink text-paper border-ink";

/** Keeps facet order; an empty pick removes the URL key. */
export function picked(facets: Facet[], keys: Selection): string[] | undefined {
  if (keys === "all") return undefined;
  const values = facets.map((f) => f.value).filter((value) => keys.has(value));
  return values.length > 0 ? values : undefined;
}
