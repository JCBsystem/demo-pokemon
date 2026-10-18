import { Link } from "@tanstack/react-router";
import { Button } from "react-aria-components";
import { useStore } from "../../store";

export function RecentSearches() {
  const recent = useStore((s) => s.recentSearches);

  return (
    <div className="noscroll -mx-4 mt-3 flex h-8 items-center gap-2 overflow-x-auto px-4 lg:mx-0 lg:px-0">
      {recent.length === 0 ? (
        <span className="text-xs text-muted">Search something to see it here</span>
      ) : (
        <>
          <span className="shrink-0 pr-1 text-xs text-muted">Recent</span>
          {recent.map((q) => (
            <Link key={q} to="/cards" search={{ q }} className="chip" data-testid="recent-search">
              {q}
            </Link>
          ))}
          <Button
            onPress={() => {
              useStore.setState({ recentSearches: [] });
              document.getElementById("home-search")?.focus();
            }}
            data-testid="recent-clear"
            className="shrink-0 cursor-pointer pl-1 text-xs text-muted underline underline-offset-2 hover:text-white"
          >
            Clear
          </Button>
        </>
      )}
    </div>
  );
}
