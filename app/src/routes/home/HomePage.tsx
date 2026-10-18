import { CardSearchField } from "../../components/CardSearchField";
import { useCards, useFacets } from "../../data/useCards";
import { Browse } from "./Browse";
import { FavouritesRow } from "./FavouritesRow";
import { RecentSearches } from "./RecentSearches";

export function HomePage() {
  const cards = useCards().data ?? [];
  const sets = useFacets()?.sets ?? [];

  return (
    <main data-testid="page-home" className="mx-auto max-w-[1280px]">
      <div className="px-4 pt-8 lg:px-6 lg:pt-12">
        <p className="text-[11px] tracking-[.22em] text-muted uppercase">Ash's collection</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight lg:text-5xl">
          {cards.length.toLocaleString("en")} cards
          <span className="text-zinc-500"> · {sets.length.toLocaleString("en")} sets</span>
        </h1>
        <CardSearchField
          id="home-search"
          size="large"
          data-testid="home-search"
          className="mt-6 lg:max-w-xl"
        />
        <RecentSearches />
      </div>
      <FavouritesRow cards={cards} />
      <Browse />
    </main>
  );
}
