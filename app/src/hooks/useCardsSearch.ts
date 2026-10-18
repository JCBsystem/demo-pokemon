import { useMatch, useNavigate } from "@tanstack/react-router";
import type { CardsSearch } from "../data/urlFilter";

export function useCardsSearch(): CardsSearch | undefined {
  return useMatch({ from: "/cards", shouldThrow: false })?.search;
}

export function useUpdateCardsSearch(): (update: (search: CardsSearch) => CardsSearch) => void {
  const search = useCardsSearch();
  const navigate = useNavigate();
  return (update) => {
    void (search === undefined
      ? navigate({ to: "/cards", search: update({}) })
      : navigate({
          to: "/cards",
          search: update(search),
          replace: true,
          viewTransition: false,
          resetScroll: false,
        }));
  };
}
