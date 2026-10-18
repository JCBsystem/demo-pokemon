import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../root";
import { CardsPage } from "./CardsPage";
import { cardsSearchSchema } from "./search";

export const cardsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cards",
  validateSearch: cardsSearchSchema,
  component: CardsPage,
});
