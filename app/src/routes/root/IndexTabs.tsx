import { Link } from "@tanstack/react-router";
import { SEARCH_HASH } from "../cards/search";
import { useSection } from "./navigation";

const tab =
  "relative rounded-r-xl px-3 py-5 font-display text-sm font-semibold text-ink shadow-sm outline-none [writing-mode:vertical-rl] focus-visible:ring-2 focus-visible:ring-sun focus-visible:ring-offset-2 focus-visible:ring-offset-cover";
const on = "navon left-2";

export function IndexTabs() {
  const section = useSection();
  return (
    <nav
      aria-label="Index"
      className="absolute top-10 left-full -ml-1 hidden flex-col gap-2 lg:flex"
    >
      <Link
        to="/"
        activeOptions={{ exact: true }}
        data-testid="index-home"
        className={`${tab} bg-sun ${section === "home" ? on : ""}`}
      >
        Home
      </Link>
      <Link
        to="/cards"
        data-testid="index-cards"
        className={`${tab} bg-teal ${section === "cards" ? on : ""}`}
      >
        Cards
      </Link>
      <Link
        to="/cards"
        hash={SEARCH_HASH}
        activeOptions={{ includeHash: true }}
        data-testid="index-search"
        className={`${tab} bg-sky`}
      >
        Search
      </Link>
    </nav>
  );
}
