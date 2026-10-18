import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, createRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { parseCardsSearch, parseSearch, stringifySearch } from "./data/cardsSearch";
import "./index.css";
import { CardPage } from "./routes/card/CardPage";
import { parseTab } from "./routes/card/tabs";
import { CardsPage } from "./routes/cards/CardsPage";
import { HomePage } from "./routes/home/HomePage";
import { Shell } from "./shell/Shell";

const rootRoute = createRootRoute({ component: Shell });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  head: () => ({ meta: [{ title: "Ash's Pokémon Card Collection" }] }),
  component: HomePage,
});

const cardsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cards",
  validateSearch: parseCardsSearch,
  head: () => ({ meta: [{ title: "Cards · Ash's Pokémon Card Collection" }] }),
  component: CardsPage,
});

const cardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/card/$id",
  validateSearch: parseTab,
  component: CardPage,
});

const routeTree = rootRoute.addChildren([homeRoute, cardsRoute, cardRoute]);

const router = createRouter({
  routeTree,
  defaultViewTransition: true,
  scrollRestoration: true,
  defaultStructuralSharing: true,
  parseSearch,
  stringifySearch,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity } },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
