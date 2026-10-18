import { queryOptions, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { parseCards, type Card } from "./schema";
import { cardById, facets, filterCards, type CardFilter } from "./selectors";

async function fetchCards(): Promise<Card[]> {
  const res = await fetch("/data/cards.json");
  if (!res.ok) {
    throw new Error(`Failed to load cards: HTTP ${res.status}`);
  }
  return parseCards(await res.json());
}

export const cardsQueryOptions = queryOptions({
  queryKey: ["cards"],
  queryFn: fetchCards,
  staleTime: Infinity,
  gcTime: Infinity,
  retry: 2,
});

export function useCards() {
  return useQuery(cardsQueryOptions);
}

export function useCardById(id: string): Card | undefined {
  const { data } = useCards();
  return useMemo(() => (data ? cardById(data, id) : undefined), [data, id]);
}

export function useFacets() {
  const { data } = useCards();
  return useMemo(() => (data ? facets(data) : undefined), [data]);
}

export function useFilteredCards(filter: CardFilter): Card[] | undefined {
  const { data } = useCards();
  return useMemo(() => (data ? filterCards(data, filter) : undefined), [data, filter]);
}
