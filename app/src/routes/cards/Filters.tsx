import { Button, ToggleButton, ToggleButtonGroup } from "react-aria-components";
import { hasFilters, type CardsSearch } from "../../data/cardsSearch";
import { useFacets } from "../../data/useCards";
import { CHIP, picked } from "./chips";
import { FacetPicker } from "./FacetPicker";

type Props = {
  search: CardsSearch;
  update: (patch: Partial<CardsSearch>) => void;
  clear: () => void;
};

function without(values: string[] | undefined, value: string): string[] | undefined {
  const rest = values?.filter((v) => v !== value) ?? [];
  return rest.length > 0 ? rest : undefined;
}

export function Filters({ search, update, clear }: Props) {
  const facets = useFacets();
  const tokens = [
    ...(search.q
      ? [{ label: "Name", value: search.q, remove: () => update({ q: undefined }) }]
      : []),
    ...(["set", "type", "rarity"] as const).flatMap((key) =>
      (search[key] ?? []).map((value) => ({
        label: key.charAt(0).toUpperCase() + key.slice(1),
        value,
        remove: () => update({ [key]: without(search[key], value) }),
      })),
    ),
  ];

  return (
    <>
      <div className="mt-5 -mx-4 px-4 flex items-center gap-2 overflow-x-auto lg:flex-wrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <FacetPicker
          label="Set"
          testId="filter-set"
          facets={facets?.sets ?? []}
          selected={search.set}
          onChange={(set) => update({ set })}
        />
        <FacetPicker
          label="Rarity"
          testId="filter-rarity"
          facets={facets?.rarities ?? []}
          selected={search.rarity}
          onChange={(rarity) => update({ rarity })}
        />
        <span aria-hidden="true" className="w-px h-6 bg-rule shrink-0 mx-1" />
        <ToggleButtonGroup
          data-testid="filter-type"
          aria-label="Type"
          selectionMode="multiple"
          selectedKeys={search.type ?? []}
          onSelectionChange={(keys) => update({ type: picked(facets?.types ?? [], keys) })}
          className="flex gap-2"
        >
          {facets?.types.map(({ value }) => (
            <ToggleButton
              key={value}
              id={value}
              data-testid="filter-type-option"
              className={`${CHIP} data-selected:bg-ink data-selected:text-paper data-selected:border-ink`}
            >
              {value}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
      {hasFilters(search) && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {tokens.map(({ label, value, remove }) => (
            <Button
              key={`${label}-${value}`}
              data-testid="active-filter"
              aria-label={`Remove ${label} ${value}`}
              onPress={remove}
              className="group cursor-pointer inline-flex items-center gap-2 bg-wash rounded-full pl-3 pr-2 py-1 text-sm"
            >
              <span className="text-ink/70">{label}:</span> {value}
              <span className="w-5 h-5 grid place-items-center rounded-full group-hover:bg-ink group-hover:text-paper">
                ×
              </span>
            </Button>
          ))}
          <Button
            data-testid="clear-filters"
            onPress={clear}
            className="cursor-pointer ml-1 text-sm text-mute underline hover:text-accent"
          >
            Clear all
          </Button>
        </div>
      )}
    </>
  );
}
