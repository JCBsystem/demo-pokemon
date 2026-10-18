import { Link } from "@tanstack/react-router";
import { Button } from "react-aria-components";
import { useStore } from "../../store";

function clearRecentSearches() {
  useStore.setState({ recentSearches: [] });
}

export function RecentSearches() {
  const recentSearches = useStore((state) => state.recentSearches);

  return (
    <>
      {recentSearches.length > 0 && (
        <>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs font-extrabold tracking-wider text-muted uppercase">
              Recent searches
            </p>
            <Button
              data-testid="recent-clear"
              onPress={clearRecentSearches}
              className="rounded text-xs font-bold text-cover outline-none data-focus-visible:ring-2 data-focus-visible:ring-ink"
            >
              Clear
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {recentSearches.map((term) => (
              <Link
                key={term}
                to="/cards"
                search={{ q: term }}
                className="chip"
                data-testid="recent-search"
              >
                {term}
              </Link>
            ))}
          </div>
        </>
      )}
      <p className="mt-2 text-[11px] text-muted">Your last 10 searches are kept.</p>
    </>
  );
}
