import { FavouritesPage } from "./FavouritesPage";
import { IndexPage } from "./IndexPage";
import { QuickSearch } from "./QuickSearch";
import { RecentSearches } from "./RecentSearches";
import { Rings } from "../../ui/Rings";

export function HomePage() {
  return (
    <div
      data-testid="page-home"
      className="relative flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-[22px]"
    >
      <Rings />
      <div className="contents lg:col-start-2 lg:row-start-1 lg:flex lg:flex-col lg:gap-6 lg:rounded-2xl lg:bg-paper lg:p-[18px]">
        <section className="paper order-1 lg:bg-none lg:p-0">
          <QuickSearch />
          <RecentSearches />
        </section>
        <IndexPage className="paper order-3 lg:bg-none lg:p-0" />
      </div>
      <FavouritesPage className="paper order-2 lg:col-start-1 lg:row-start-1" />
    </div>
  );
}
