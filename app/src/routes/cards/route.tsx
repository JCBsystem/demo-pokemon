import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../root";
import { CardsPage } from "./CardsPage";
import { validateCardsSearch } from "./cardsSearch";

export const cardsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cards",
  validateSearch: validateCardsSearch,
  component: CardsPage,
});
