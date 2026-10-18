import { Outlet, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Button, RouterProvider as AriaRouterProvider } from "react-aria-components";
import { Drawer } from "../components/Drawer";
import { FilterSheet } from "../components/FilterSheet";
import { LoadError } from "../components/LoadError";
import { SearchField } from "../components/SearchField";
import { Sidebar } from "../components/Sidebar";
import { Splash } from "../components/Splash";
import { useCards } from "../data/useCards";
import { useCardsSearch } from "../hooks/useCardsSearch";
import { useIsWide } from "../hooks/useIsWide";

export function Root() {
  const router = useRouter();
  const { isPending, isError } = useCards();

  return (
    <AriaRouterProvider
      navigate={(href, options) => void router.navigate({ ...href, ...options })}
      useHref={(href) => router.buildLocation(href).href}
    >
      {isPending ? <Splash /> : isError ? <LoadError /> : <AppShell />}
    </AriaRouterProvider>
  );
}

function AppShell() {
  const cardsSearch = useCardsSearch();
  const isWide = useIsWide();
  const [menuOpen, setMenuOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // The header spans both rows so it can stick; pages put <main> in row 2 and /cards a preview in column 3.
  return (
    <div
      className={`flex min-h-screen flex-col [&>main]:flex-1 lg:grid lg:grid-rows-[3.5rem_1fr] lg:[&>main]:col-start-2 lg:[&>main]:row-start-2 ${
        cardsSearch === undefined
          ? "lg:grid-cols-[232px_minmax(0,1fr)]"
          : "lg:grid-cols-[232px_minmax(0,1fr)_360px]"
      }`}
    >
      <header className="sticky top-0 z-20 flex h-14 items-center gap-2 border-b border-zinc-200 bg-white/95 px-3 backdrop-blur lg:col-start-2 lg:row-span-full lg:self-start">
        <Button
          data-testid="menu-button"
          aria-label="Open menu"
          onPress={() => setMenuOpen(true)}
          className="-ml-1 grid size-9 place-items-center rounded hover:bg-zinc-100 lg:hidden"
        >
          <svg
            aria-hidden
            viewBox="0 0 20 20"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M3 5h14M3 10h14M3 15h14" />
          </svg>
        </Button>
        <SearchField />
        {cardsSearch !== undefined && (
          <Button
            data-testid="filters-button"
            onPress={() => setFiltersOpen(true)}
            className="h-9 rounded-md border border-zinc-300 px-3 text-xs font-medium lg:hidden"
          >
            Filters
          </Button>
        )}
      </header>
      <Outlet />
      <Sidebar />
      <Drawer isOpen={menuOpen && !isWide} onOpenChange={setMenuOpen} />
      {cardsSearch !== undefined && (
        <FilterSheet
          search={cardsSearch}
          isOpen={filtersOpen && !isWide}
          onOpenChange={setFiltersOpen}
        />
      )}
    </div>
  );
}
