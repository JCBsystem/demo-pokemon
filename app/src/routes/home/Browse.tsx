import { Link } from "@tanstack/react-router";
import { useMemo } from "react";
import type { CardsSearch } from "../../data/cardsSearch";
import type { Card } from "../../data/schema";
import type { Facet } from "../../data/selectors";
import { useCards, useFacets } from "../../data/useCards";
import { CardImage } from "../../ui/CardImage";

type Column = {
  testId: string;
  label: string;
  facets: Facet[];
  limit?: number;
  thumbs: Card[];
  search: (value: string) => CardsSearch;
};

const byCount = (facets: Facet[]) => facets.toSorted((a, b) => b.count - a.count);

function firstCards(cards: Card[], facets: Facet[], match: (card: Card, value: string) => boolean) {
  return facets.slice(0, 3).flatMap((f) => cards.find((card) => match(card, f.value)) ?? []);
}

export function Browse() {
  const { data } = useCards();
  const facets = useFacets();

  const columns = useMemo((): Column[] => {
    const cards = data ?? [];
    const sets = byCount(facets?.sets ?? []);
    const types = byCount(facets?.types ?? []);
    const rarities = byCount(facets?.rarities ?? []);
    return [
      {
        testId: "browse-sets",
        label: "Sets",
        facets: sets,
        limit: 8,
        thumbs: firstCards(cards, sets, (card, v) => card.setCode === v),
        search: (v) => ({ set: [v] }),
      },
      {
        testId: "browse-types",
        label: "Types",
        facets: types,
        thumbs: firstCards(cards, types, (card, v) => card.types?.includes(v) ?? false),
        search: (v) => ({ type: [v] }),
      },
      {
        testId: "browse-rarities",
        label: "Rarities",
        facets: rarities,
        thumbs: firstCards(cards, rarities, (card, v) => card.rarity === v),
        search: (v) => ({ rarity: [v] }),
      },
    ];
  }, [data, facets]);

  return (
    <section className="mt-16 lg:mt-24">
      <div className="flex items-baseline justify-between border-t-2 border-ink pt-3">
        <h2 className="kicker text-ink!">No. 2 — Browse</h2>
        <span className="text-sm text-mute">by set, type or rarity</span>
      </div>
      <div className="mt-6 grid lg:grid-cols-3 gap-12 lg:gap-10">
        {columns.map((column) => (
          <div key={column.testId} data-testid={column.testId}>
            <Link to="/cards" className="relative block h-40 lg:h-44 bg-wash overflow-hidden">
              {column.thumbs.map((card, i) => (
                <CardImage
                  key={card.id}
                  src={card.images.small}
                  alt=""
                  className="absolute w-16 lg:w-[4.5rem] bottom-4"
                  style={{ left: `${1 + i * 1.6}rem`, transform: `rotate(${(i - 1) * 7}deg)` }}
                />
              ))}
              <span className="absolute right-5 bottom-4 text-right">
                <span className="block kicker text-ink!">Browse by</span>
                <span className="block font-serif text-3xl">{column.label}</span>
              </span>
              <span className="absolute right-5 top-3 font-serif text-4xl font-light tabular-nums">
                {column.facets.length}
              </span>
            </Link>
            <ul className="mt-3">
              {column.facets.slice(0, column.limit).map((facet) => (
                <li key={facet.value}>
                  <Link
                    to="/cards"
                    search={column.search(facet.value)}
                    data-testid="browse-link"
                    className="group flex items-baseline justify-between gap-4 py-2.5 border-b border-rule"
                  >
                    <span className="font-serif text-2xl lg:text-[1.7rem] font-light group-hover:text-accent">
                      {facet.value}
                    </span>
                    <span data-testid="facet-count" className="text-sm text-mute tabular-nums">
                      {facet.count.toLocaleString("en")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            {column.limit !== undefined && column.facets.length > column.limit && (
              <Link
                to="/cards"
                className="inline-block mt-4 text-sm font-medium border-b border-ink"
              >
                All {column.facets.length} {column.label.toLowerCase()} →
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
