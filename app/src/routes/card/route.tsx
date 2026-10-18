import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../root";
import { CardPage } from "./CardPage";
import { tabs, type DetailTab } from "./tabs";

export const cardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/card/$id",
  validateSearch: (raw: Record<string, unknown>): { tab?: DetailTab } => {
    const tab = tabs.find((t) => t === raw.tab);
    return tab ? { tab } : {};
  },
  component: CardPage,
});
