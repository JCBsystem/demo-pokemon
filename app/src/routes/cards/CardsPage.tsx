import { getRouteApi } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { clampPage, pageCount, pageSlice } from "../../data/paging";
import { useFacets, useFilteredCards } from "../../data/useCards";
import { ActiveFilters } from "./ActiveFilters";
import { BinderSpread } from "./BinderSpread";
import { EmptyState } from "./EmptyState";
import { FilterSheet, type SheetAnchor } from "./FilterSheet";
import { FilterStrip } from "./FilterStrip";
import { PageTurner } from "./PageTurner";
import { type CardsSearch, searchToFilter, withoutPage } from "./search";
import { useIsLaptop } from "./useIsLaptop";

const routeApi = getRouteApi("/cards");

export function CardsPage() {
  const search = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const { q, set, type, rarity, sort } = search;
  const filter = useMemo(
    () => searchToFilter({ q, set, type, rarity, sort }),
    [q, set, type, rarity, sort],
  );
  const filtered = useFilteredCards(filter);
  const cards = filtered ?? [];
  const facets = useFacets();
  const step = useIsLaptop() ? 2 : 1;
  const page = clampPage(search.page ?? 1, cards.length);
  const [sheet, setSheet] = useState<SheetAnchor | null>(null);

  const update = (patch: CardsSearch) =>
    void navigate({
      search: (prev) => ({ ...withoutPage(prev), ...patch }),
      replace: true,
      resetScroll: false,
      viewTransition: false,
    });

  const clearAll = () =>
    void navigate({
      search: (prev) => (prev.sort === undefined ? {} : { sort: prev.sort }),
      replace: true,
      resetScroll: false,
      viewTransition: false,
    });

  const turn = (target: number) => {
    const next = clampPage(target, cards.length);
    if (next === page) return;
    void navigate({
      search: (prev) => ({ ...withoutPage(prev), ...(next > 1 && { page: next }) }),
      resetScroll: false,
      viewTransition: { types: [next > page ? "turn-forward" : "turn-back"] },
    });
  };

  return (
    <div data-testid="page-cards">
      <FilterStrip search={search} onChange={update} onOpenFilters={setSheet} />
      {sheet !== null && (
        <FilterSheet
          anchor={sheet}
          search={search}
          facets={facets}
          resultCount={cards.length}
          onChange={update}
          onClose={() => setSheet(null)}
        />
      )}
      <ActiveFilters
        search={search}
        resultCount={cards.length}
        onChange={update}
        onClearAll={clearAll}
      />
      {filtered?.length === 0 ? (
        <EmptyState
          query={q}
          onClear={() => (q === undefined ? clearAll() : update({ q: undefined }))}
        />
      ) : (
        <>
          <BinderSpread
            left={pageSlice(cards, page)}
            right={pageSlice(cards, page + 1)}
            page={page}
            onSwipe={(direction) => turn(page + direction * step)}
          />
          <PageTurner
            page={page}
            total={pageCount(cards.length)}
            step={step}
            keysEnabled={sheet === null}
            onTurn={turn}
          />
        </>
      )}
    </div>
  );
}
