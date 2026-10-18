import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, createRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const rootRoute = createRootRoute();

const routeTree = rootRoute.addChildren([
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => <main data-testid="page-home" />,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/cards",
    component: () => <main data-testid="page-cards" />,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/card/$id",
    component: () => <main data-testid="page-card" />,
  }),
]);

const router = createRouter({ routeTree, defaultViewTransition: true });

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
