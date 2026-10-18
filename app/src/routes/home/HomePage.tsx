import { Browse } from "./Browse";
import { Favourites } from "./Favourites";
import { RecentSearches } from "./RecentSearches";

export function HomePage() {
  return (
    <main data-testid="page-home" className="max-w-3xl space-y-8 p-4 lg:p-6">
      <h1 className="sr-only">Ash's Index</h1>
      <Favourites />
      <RecentSearches />
      <Browse />
    </main>
  );
}
