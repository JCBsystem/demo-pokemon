import { Button } from "react-aria-components";
import { formatCards } from "../../ui/format";
import { type CardsSearch, FACET_KEYS, selectedValues, toggleValue } from "./search";

type Props = {
  search: CardsSearch;
  resultCount: number;
  onChange: (patch: CardsSearch) => void;
  onClearAll: () => void;
};

export function ActiveFilters({ search, resultCount, onChange, onClearAll }: Props) {
  const active = FACET_KEYS.flatMap((key) =>
    selectedValues(search, key).map((value) => ({ key, value })),
  );

  return (
    <div className="mb-2.5 flex flex-wrap items-center gap-2 px-1">
      <span data-testid="result-count" className="mr-1 font-display font-semibold text-white">
        {formatCards(resultCount)}
      </span>
      {active.map(({ key, value }) => (
        <Button
          key={`${key}-${value}`}
          data-testid="active-filter"
          aria-label={`Remove ${value}`}
          onPress={() => onChange({ [key]: toggleValue(search[key], value) })}
          className="chip"
        >
          {value} ✕
        </Button>
      ))}
      {(active.length > 0 || search.q !== undefined) && (
        <Button
          data-testid="filters-clear"
          onPress={onClearAll}
          className="rounded text-xs font-bold text-white underline outline-none data-focus-visible:ring-2 data-focus-visible:ring-white"
        >
          Clear all
        </Button>
      )}
    </div>
  );
}
