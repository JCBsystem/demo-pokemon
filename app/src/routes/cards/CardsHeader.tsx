import type { Key } from "react-aria-components";
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";
import {
  activeFilters,
  clearFilters,
  setQuery,
  toggleFacet,
  type CardsSearch,
} from "../../data/urlFilter";
import { useUpdateCardsSearch } from "../../hooks/useCardsSearch";

type Props = { search: CardsSearch; count: number };

export function CardsHeader({ search, count }: Props) {
  return (
    <div className="space-y-2 border-b border-zinc-200 bg-white px-3 pt-3 pb-2 lg:px-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-semibold">
          Cards{" "}
          <span data-testid="result-count" className="font-normal text-zinc-500">
            {count.toLocaleString("en")} {count === 1 ? "result" : "results"}
          </span>
        </h1>
        <SortSelect search={search} />
      </div>
      <FilterChips search={search} />
    </div>
  );
}

const collectionOrder = "collection";

function SortSelect({ search }: { search: CardsSearch }) {
  const update = useUpdateCardsSearch();

  function change(key: Key | null) {
    update((current) => {
      const next = { ...current };
      if (key === "name" || key === "set") next.sort = key;
      else delete next.sort;
      return next;
    });
  }

  return (
    <Select
      data-testid="sort-select"
      value={search.sort ?? collectionOrder}
      onChange={change}
      className="flex items-center gap-1 text-xs"
    >
      <Label className="sr-only">Sort</Label>
      <Button className="flex h-7 items-center gap-1 rounded px-2 text-zinc-600 data-hovered:bg-zinc-100 data-hovered:text-zinc-900">
        <SelectValue />
        <svg aria-hidden viewBox="0 0 12 12" className="size-3">
          <path d="m3 4.5 3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </Button>
      <Popover
        placement="bottom end"
        className="min-w-36 rounded-md border border-zinc-200 bg-white p-1 text-xs shadow-lg motion-safe:data-entering:animate-fade-in motion-safe:data-exiting:animate-fade-out"
      >
        <ListBox className="outline-none">
          <SortOption id={collectionOrder}>Collection order</SortOption>
          <SortOption id="name">Name</SortOption>
          <SortOption id="set">Set</SortOption>
        </ListBox>
      </Popover>
    </Select>
  );
}

function SortOption({ id, children }: { id: string; children: string }) {
  return (
    <ListBoxItem
      id={id}
      className="flex h-8 cursor-default items-center rounded px-2 outline-none data-focused:bg-zinc-100 data-selected:font-medium data-selected:text-indigo-700"
    >
      {children}
    </ListBoxItem>
  );
}

function FilterChips({ search }: { search: CardsSearch }) {
  const update = useUpdateCardsSearch();
  const filters = activeFilters(search);
  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {filters.map(({ key, value }) => (
        <span
          key={`${key}:${value}`}
          data-testid="filter-chip"
          className="inline-flex h-6 items-center gap-1 rounded bg-zinc-100 pr-1 pl-2 text-xs"
        >
          <span className="text-zinc-600">{key === "q" ? "Name" : key}:</span>
          {value}
          <Button
            aria-label={`Remove ${value}`}
            onPress={() =>
              update((current) =>
                key === "q" ? setQuery(current, "") : toggleFacet(current, key, value),
              )
            }
            className="grid size-4 place-items-center rounded text-zinc-600 data-hovered:bg-zinc-300"
          >
            ×
          </Button>
        </span>
      ))}
      <Button
        data-testid="clear-filters"
        onPress={() => update(clearFilters)}
        className="h-6 rounded px-1 text-xs text-indigo-600 data-hovered:underline"
      >
        Clear all
      </Button>
    </div>
  );
}
