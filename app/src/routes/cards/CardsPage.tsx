import { getRouteApi } from "@tanstack/react-router";
import { useMemo } from "react";
import { Link } from "react-aria-components";
import type { Card } from "../../data/schema";
import { filterFromSearch } from "../../data/urlFilter";
import { useFilteredCards } from "../../data/useCards";
import { useUpdateCardsSearch } from "../../hooks/useCardsSearch";
import { useIsWide } from "../../hooks/useIsWide";
import { CardDetail } from "../card/CardDetail";
import { CardList } from "./CardList";
import { CardsHeader } from "./CardsHeader";
import { EmptyState } from "./EmptyState";

const route = getRouteApi("/cards");

export function CardsPage() {
  const search = route.useSearch();
  const filter = useMemo(() => filterFromSearch(search), [search]);
  const cards = useFilteredCards(filter) ?? [];
  const selected = cards.find((card) => card.id === search.card) ?? cards[0];
  const isWide = useIsWide();

  return (
    <>
      <main data-testid="page-cards" className="min-w-0">
        <CardsHeader search={search} count={cards.length} />
        {cards.length === 0 ? (
          <EmptyState search={search} />
        ) : (
          <CardList cards={cards} selectedId={selected?.id} />
        )}
      </main>
      <aside
        aria-label="Preview"
        data-testid="preview-pane"
        className="hidden overflow-y-auto border-l border-zinc-200 bg-white lg:sticky lg:top-0 lg:col-start-3 lg:row-span-full lg:block lg:h-screen"
      >
        {isWide && <PreviewPane card={selected} />}
      </aside>
    </>
  );
}

function PreviewPane({ card }: { card: Card | undefined }) {
  const { tab = "attacks" } = route.useSearch();
  const update = useUpdateCardsSearch();

  return (
    <>
      <div className="flex h-14 items-center justify-between border-b border-zinc-200 px-4">
        <span className="text-xs tracking-wider text-zinc-500 uppercase">Preview</span>
        {card !== undefined && (
          <Link
            data-testid="preview-open"
            href={{ to: "/card/$id", params: { id: card.id }, search: { tab } }}
            className="rounded text-xs font-medium text-indigo-600 data-hovered:underline"
          >
            Open ↗
          </Link>
        )}
      </div>
      <div className="p-4">
        {card === undefined ? (
          <p className="text-xs text-zinc-500">No card selected</p>
        ) : (
          <CardDetail
            card={card}
            variant="pane"
            tab={tab}
            onTabChange={(next) => update((current) => ({ ...current, tab: next }))}
          />
        )}
      </div>
    </>
  );
}
