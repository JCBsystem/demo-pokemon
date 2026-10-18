import { Link } from "react-aria-components";
import { toggleFacet } from "../data/urlFilter";
import { useCardsSearch, useUpdateCardsSearch } from "../hooks/useCardsSearch";
import { FacetList } from "./FacetList";
import { NavLinks } from "./NavLinks";

export function Sidebar() {
  const search = useCardsSearch();
  const updateSearch = useUpdateCardsSearch();

  return (
    <aside
      aria-label="Browse"
      className="hidden overflow-y-auto border-r border-zinc-200 bg-white lg:sticky lg:top-0 lg:col-start-1 lg:row-span-full lg:block lg:h-screen"
    >
      <Link href={{ to: "/" }} className="block px-4 py-4 font-semibold tracking-tight">
        Ash's Index
      </Link>
      <NavLinks />
      <div className="px-2">
        <FacetList
          search={search ?? {}}
          onToggle={(key, value) => updateSearch((current) => toggleFacet(current, key, value))}
        />
      </div>
    </aside>
  );
}
