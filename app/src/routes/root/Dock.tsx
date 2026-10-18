import { Link, useLocation } from "@tanstack/react-router";
import { SearchIcon } from "../../icons/SearchIcon";
import { SEARCH_HASH } from "../cards/search";
import { useSection } from "./navigation";

const pillLink =
  "rounded-full px-6 py-3 text-sm font-extrabold outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2";

export function Dock() {
  const section = useSection();
  const searching = useLocation({ select: ({ hash }) => hash === SEARCH_HASH });
  return (
    <nav
      aria-label="Main"
      className="pointer-events-none fixed inset-x-0 bottom-5 z-30 flex justify-center gap-3 lg:hidden"
    >
      <div className="pointer-events-auto flex gap-1 rounded-full bg-white p-1.5 shadow-[0_10px_30px_-8px_#6b2a1a88]">
        <Link
          to="/"
          activeOptions={{ exact: true }}
          data-testid="nav-home"
          className={`${pillLink} ${section === "home" ? "navon" : ""}`}
        >
          Home
        </Link>
        <Link
          to="/cards"
          data-testid="nav-cards"
          className={`${pillLink} ${section === "cards" ? "navon" : ""}`}
        >
          Cards
        </Link>
      </div>
      <Link
        to="/cards"
        hash={SEARCH_HASH}
        activeOptions={{ includeHash: true }}
        aria-label="Search"
        data-testid="nav-search"
        className="pointer-events-auto grid size-[58px] place-items-center rounded-full bg-cover text-white shadow-[0_10px_30px_-8px_#6b2a1a] outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-sand"
      >
        <SearchIcon active={searching} size={22} />
      </Link>
    </nav>
  );
}
