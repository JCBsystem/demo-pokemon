import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { cardRoute } from "./routes/card/route";
import { cardsRoute } from "./routes/cards/route";
import { homeRoute } from "./routes/home/route";
import { rootRoute } from "./routes/root";

const routeTree = rootRoute.addChildren([homeRoute, cardsRoute, cardRoute]);

const router = createRouter({ routeTree, defaultViewTransition: true, scrollRestoration: true });

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
