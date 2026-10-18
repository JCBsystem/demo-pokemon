import { useState } from "react";
import { Button, Checkbox, CheckboxGroup, Label } from "react-aria-components";
import { byCount } from "../data/counts";
import type { Facet } from "../data/selectors";
import { useFacets } from "../data/useCards";
import { facetValues, type CardsSearch, type FacetKey } from "../data/urlFilter";
import { TypeDot } from "./TypeDot";

const TOP_SETS = 8;

type Props = { search: CardsSearch; onToggle: (key: FacetKey, value: string) => void };

export function FacetList({ search, onToggle }: Props) {
  const facets = useFacets();
  const [showAllSets, setShowAllSets] = useState(false);
  if (facets === undefined) return null;

  const selectedSets = facetValues(search, "set");
  const sets = showAllSets
    ? facets.sets
    : byCount(facets.sets).filter(
        (facet, index) => index < TOP_SETS || selectedSets.includes(facet.value),
      );

  return (
    <div className="space-y-5 pt-5 pb-6">
      <div>
        <FacetGroup
          facetKey="set"
          label="Sets"
          total={facets.sets.length}
          facets={sets}
          search={search}
          onToggle={onToggle}
        />
        <Button
          data-testid="facets-show-all-sets"
          aria-expanded={showAllSets}
          onPress={() => setShowAllSets(!showAllSets)}
          className="mt-1 rounded px-2 py-1 text-xs text-zinc-500 hover:text-zinc-900"
        >
          {showAllSets ? "Show top sets" : `Show all ${facets.sets.length} sets`}
        </Button>
      </div>
      <FacetGroup
        facetKey="type"
        label="Types"
        total={facets.types.length}
        facets={facets.types}
        search={search}
        onToggle={onToggle}
      />
      <FacetGroup
        facetKey="rarity"
        label="Rarities"
        total={facets.rarities.length}
        facets={facets.rarities}
        search={search}
        onToggle={onToggle}
      />
    </div>
  );
}

type GroupProps = Props & { facetKey: FacetKey; label: string; total: number; facets: Facet[] };

function FacetGroup({ facetKey, label, total, facets, search, onToggle }: GroupProps) {
  const selected = facetValues(search, facetKey);

  function change(next: string[]) {
    const toggled =
      next.find((value) => !selected.includes(value)) ??
      selected.find((value) => !next.includes(value));
    if (toggled !== undefined) onToggle(facetKey, toggled);
  }

  return (
    <CheckboxGroup value={selected} onChange={change}>
      <div className="mb-1 flex items-center justify-between px-2 text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
        <Label>{label}</Label>
        <span className="font-mono font-normal">{total}</span>
      </div>
      {facets.map(({ value, count }) => (
        <Checkbox
          key={value}
          value={value}
          data-testid={`facet-${facetKey}-${value}`}
          className="group flex h-8 items-center gap-2 rounded-md px-2 hover:bg-zinc-50 data-selected:bg-indigo-50 data-selected:text-indigo-900"
        >
          <span className="grid size-3.5 shrink-0 place-items-center rounded-[3px] border border-zinc-300 text-white group-data-selected:border-indigo-600 group-data-selected:bg-indigo-600">
            <svg
              aria-hidden
              viewBox="0 0 12 12"
              className="size-2.5 opacity-0 group-data-selected:opacity-100"
            >
              <path d="m2.5 6 2.5 2.5 4.5-5" fill="none" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </span>
          {facetKey === "type" && <TypeDot type={value} />}
          <span className={`flex-1 truncate ${facetKey === "set" ? "font-mono text-xs" : ""}`}>
            {value}
          </span>
          <span className="font-mono text-xs text-zinc-500 group-data-selected:text-indigo-700">
            {count.toLocaleString("en")}
          </span>
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
