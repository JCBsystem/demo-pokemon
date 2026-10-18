import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createRootRoute,
  createRoute,
  createRouter,
  defaultStringifySearch,
  RouterProvider,
  type NavigateOptions,
  type ToOptions,
} from "@tanstack/react-router";
import { MotionConfig } from "motion/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { cardSearchSchema, cardsSearchSchema } from "./data/urlFilter";
import "./index.css";
import { CardPage } from "./routes/card/CardPage";
import { CardsPage } from "./routes/cards/CardsPage";
import { HomePage } from "./routes/home/HomePage";
import { Root } from "./routes/Root";

const rootRoute = createRootRoute({ component: Root });

const routeTree = rootRoute.addChildren([
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: HomePage,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/cards",
    validateSearch: cardsSearchSchema,
    component: CardsPage,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/card/$id",
    validateSearch: cardSearchSchema,
    component: CardPage,
  }),
]);

const router = createRouter({
  routeTree,
  defaultViewTransition: true,
  scrollRestoration: true,
  stringifySearch: (search) => defaultStringifySearch(search).replaceAll("%2C", ","),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

declare module "react-aria-components" {
  interface RouterConfig {
    href: ToOptions;
    routerOptions: Omit<NavigateOptions, keyof ToOptions>;
  }
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity } },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        <RouterProvider router={router} />
      </MotionConfig>
    </QueryClientProvider>
  </StrictMode>,
);
