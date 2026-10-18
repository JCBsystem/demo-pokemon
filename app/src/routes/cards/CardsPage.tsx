import { useNavigate, useSearch } from "@tanstack/react-router";
import { useDeferredValue, useMemo } from "react";
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";
import { useCopies } from "../../data/copies";
import { SORTS, sortByHp, toCardFilter, type CardsSearch, type Sort } from "../../data/cardsSearch";
import { useFilteredCards } from "../../data/useCards";
import { useStore } from "../../store";
import { SearchField } from "../../ui/SearchField";
import { CardGrid } from "./CardGrid";
import { EmptyState } from "./EmptyState";
import { Filters } from "./Filters";

const SORT_LABELS: Record<Sort, string> = {
  name: "Name A–Z",
  set: "Set & number",
  hp: "HP high–low",
};

export function CardsPage() {
  const search = useSearch({ from: "/cards" });
  const navigate = useNavigate({ from: "/cards" });
  const addRecentSearch = useStore((s) => s.addRecentSearch);

  const update = (patch: Partial<CardsSearch>) =>
    void navigate({
      search: (prev) => ({ ...prev, ...patch }),
      replace: true,
      viewTransition: false,
    });
  const clear = () =>
    void navigate({ search: { sort: search.sort }, replace: true, viewTransition: false });

  const filter = useMemo(() => toCardFilter({ ...search, sort: search.sort ?? "name" }), [search]);
  const filtered = useFilteredCards(filter);
  const cards = useMemo(
    () => (search.sort === "hp" ? sortByHp(filtered ?? []) : (filtered ?? [])),
    [filtered, search.sort],
  );
  const shown = useDeferredValue(cards);
  const counts = useCopies();

  return (
    <main data-testid="page-cards" className="max-w-6xl mx-auto px-4 lg:px-8 pb-24 pt-8 lg:pt-14">
      <p className="kicker">The index</p>
      <h1 className="mt-2 font-serif font-light text-6xl lg:text-7xl tracking-tight">Cards</h1>
      <div className="mt-6 lg:max-w-xl">
        <SearchField
          size="live"
          testId="search-input"
          value={search.q ?? ""}
          onChange={(q) => update({ q: q || undefined })}
          onSubmit={(q) => {
            addRecentSearch(q);
            update({ q: q || undefined });
          }}
        />
      </div>
      <Filters search={search} update={update} clear={clear} />
      <div className="mt-6 flex items-baseline justify-between border-t-2 border-ink pt-3">
        <p className="text-mute">
          <span data-testid="result-count" className="font-serif text-3xl text-ink tabular-nums">
            {cards.length.toLocaleString("en")}
          </span>{" "}
          {cards.length === 1 ? "result" : "results"}
        </p>
        <Select
          selectedKey={search.sort ?? "name"}
          onSelectionChange={(key) => {
            const sort = SORTS.find((s) => s === key);
            update({ sort: sort === "name" ? undefined : sort });
          }}
          className="flex items-baseline gap-1.5"
        >
          <Label className="text-sm text-mute">Sort</Label>
          <Button
            data-testid="sort-select"
            className="cursor-pointer flex items-center gap-1 text-sm font-medium hover:text-accent"
          >
            <SelectValue />
            <span aria-hidden="true">▾</span>
          </Button>
          <Popover
            placement="bottom end"
            className="bg-white border border-rule shadow-xl p-1 w-44"
          >
            <ListBox className="outline-none">
              {SORTS.map((sort) => (
                <ListBoxItem
                  key={sort}
                  id={sort}
                  className="cursor-pointer px-3 py-2 text-sm outline-none data-focused:bg-wash data-selected:font-semibold"
                >
                  {SORT_LABELS[sort]}
                </ListBoxItem>
              ))}
            </ListBox>
          </Popover>
        </Select>
      </div>
      {shown.length > 0 ? (
        <CardGrid cards={shown} counts={counts} />
      ) : (
        <EmptyState onClear={clear} />
      )}
    </main>
  );
}
