import { useNavigate } from "@tanstack/react-router";
import { useCards, useFacets } from "../../data/useCards";
import { useStore } from "../../store";
import { SearchField } from "../../ui/SearchField";
import { Browse } from "./Browse";
import { Favourites } from "./Favourites";

export function HomePage() {
  const count = useCards().data?.length ?? 0;
  const sets = useFacets()?.sets.length ?? 0;
  const addRecentSearch = useStore((s) => s.addRecentSearch);
  const navigate = useNavigate();

  const search = (q: string) => {
    addRecentSearch(q);
    void navigate({ to: "/cards", search: { q: q || undefined } });
  };

  return (
    <main data-testid="page-home" className="max-w-6xl mx-auto px-4 lg:px-8 pb-24">
      <div className="pt-10 lg:pt-16 lg:max-w-3xl lg:mx-auto lg:text-center">
        <p className="kicker">The collection</p>
        <h1 className="mt-3 font-serif font-light text-[3.25rem] lg:text-[5.5rem] leading-[.92] tracking-tight">
          {count.toLocaleString("en")} cards,
          <br />
          <em>{sets} sets.</em>
        </h1>
        <div className="mt-8 lg:mt-10 text-left">
          <SearchField size="lg" testId="search-input" onSubmit={search} />
        </div>
      </div>
      <Favourites />
      <Browse />
    </main>
  );
}
