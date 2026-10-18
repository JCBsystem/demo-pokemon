import { Link, useLocation, useNavigate, useSearch } from "@tanstack/react-router";
import { parseCardsSearch } from "../data/cardsSearch";
import { useCards } from "../data/useCards";
import { useStore } from "../store";
import { SearchField } from "../ui/SearchField";

const navClass = (active: boolean) =>
  `pb-2.5 border-b-2 ${active ? "border-ink text-ink" : "border-transparent text-mute hover:text-ink"}`;

export function Masthead() {
  const count = useCards().data?.length;
  const pathname = useLocation({ select: (location) => location.pathname });
  const current = useSearch({ strict: false });
  const addRecentSearch = useStore((s) => s.addRecentSearch);
  const navigate = useNavigate();
  const onCards = pathname === "/cards";

  const search = (q: string) => {
    addRecentSearch(q);
    const filters = onCards ? parseCardsSearch(current) : {};
    void navigate({
      to: "/cards",
      search: { ...filters, q: q || undefined },
      replace: onCards,
      viewTransition: !onCards,
    });
  };

  return (
    <header
      data-testid="masthead"
      className="sticky top-0 z-20 bg-paper/95 backdrop-blur border-b border-rule"
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-8 pt-4 lg:pt-6 lg:text-center">
        <p className="mast-kicker kicker mb-2">
          Field guide{count === undefined ? "" : ` · ${count.toLocaleString("en")} cards`}
        </p>
        <Link
          to="/"
          className="mast-title block font-serif font-normal tracking-tight leading-[.95]"
        >
          Ash's Pokémon <em className="font-light">Card Collection</em>
        </Link>
        <div className="mt-3 lg:mt-4 flex items-end lg:grid lg:grid-cols-3">
          <span className="hidden lg:block" />
          <nav
            aria-label="Primary"
            className="flex items-center gap-3 lg:justify-center text-[15px] font-medium"
          >
            <Link to="/" data-testid="nav-home" className={navClass(pathname === "/")}>
              Home
            </Link>
            <span aria-hidden="true" className="pb-2.5 text-mute">
              ·
            </span>
            <Link
              to="/cards"
              data-testid="nav-cards"
              className={navClass(pathname.startsWith("/card"))}
            >
              Cards
            </Link>
          </nav>
          <div className="hidden lg:block justify-self-end w-64 pb-2">
            <SearchField size="sm" testId="masthead-search" onSubmit={search} />
          </div>
        </div>
      </div>
    </header>
  );
}
