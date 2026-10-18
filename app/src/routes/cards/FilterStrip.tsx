import { useRef } from "react";
import { Button } from "react-aria-components";
import type { SheetAnchor } from "./FilterSheet";
import { SearchBox } from "./SearchBox";
import { SortSelect } from "./SortSelect";
import {
  activeFilterCount,
  type CardsSearch,
  FACET_KEYS,
  FACET_LABELS,
  type FacetKey,
  selectedValues,
} from "./search";

type Props = {
  search: CardsSearch;
  onChange: (patch: CardsSearch) => void;
  onOpenFilters: (anchor: SheetAnchor) => void;
};

export function FilterStrip({ search, onChange, onOpenFilters }: Props) {
  const strip = useRef<HTMLDivElement>(null);
  const activeCount = activeFilterCount(search);

  const open = (section: FacetKey | null) => {
    const rect = strip.current?.getBoundingClientRect();
    onOpenFilters({
      section,
      top: (rect?.bottom ?? 0) + 8,
      right: window.innerWidth - (rect?.right ?? window.innerWidth) + 8,
    });
  };

  return (
    <div ref={strip} className="mb-2.5 flex flex-wrap items-center gap-2 rounded-2xl bg-strip p-2">
      <SearchBox
        query={search.q ?? ""}
        onCommit={(q) => onChange({ q: q === "" ? undefined : q })}
      />
      <Button
        data-testid="filters-open"
        onPress={() => open(null)}
        className="chip chip-on lg:hidden"
      >
        Filters
        {activeCount > 0 && (
          <span className="rounded-full bg-sun px-1.5 text-xs text-ink">{activeCount}</span>
        )}
      </Button>
      {FACET_KEYS.map((key) => {
        const count = selectedValues(search, key).length;
        return (
          <Button
            key={key}
            data-testid={`filters-open-${key}`}
            onPress={() => open(key)}
            className={`chip hidden lg:inline-flex ${count > 0 ? "chip-on" : ""}`}
          >
            {count > 0 ? `${FACET_LABELS[key]} · ${count}` : FACET_LABELS[key]} ▾
          </Button>
        );
      })}
      <SortSelect sort={search.sort} onChange={(sort) => onChange({ sort })} />
    </div>
  );
}
