import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../root";
import { CardPage } from "./CardPage";
import { validateSearch } from "./search";

export const cardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/card/$id",
  validateSearch,
  component: CardPage,
});
