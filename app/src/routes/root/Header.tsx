import { useCards, useFacets } from "../../data/useCards";
import { formatCards, formatCount } from "../../ui/format";

function useCountLabel(): string {
  const { data } = useCards();
  const facets = useFacets();
  if (!data || !facets) return "— cards · — sets";
  return `${formatCards(data.length)} · ${formatCount(facets.sets.length)} sets`;
}

export function Header() {
  const countLabel = useCountLabel();
  return (
    <header className="mx-auto flex max-w-[1080px] items-end justify-between gap-3 px-4 pt-5 pb-3 lg:max-w-[980px] lg:px-10 lg:pt-7">
      <div>
        <p className="text-xs font-extrabold tracking-widest text-cover uppercase">Ash's binder</p>
        <h1 className="font-display text-2xl leading-tight font-semibold lg:text-3xl">
          Ash's Pokémon Card Collection
        </h1>
      </div>
      <p data-testid="header-count" className="text-sm font-bold whitespace-nowrap text-muted">
        {countLabel}
      </p>
    </header>
  );
}
