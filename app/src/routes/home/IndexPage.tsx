import { Link } from "@tanstack/react-router";
import type { Facet } from "../../data/selectors";
import { useFacets } from "../../data/useCards";
import { TypeDot } from "../../ui/TypeDot";
import { IndexSection } from "./IndexSection";
import { formatCount } from "../../ui/format";

const TOP_SETS = 8;

function byCount(facets: Facet[] = []): Facet[] {
  return facets.toSorted((a, b) => b.count - a.count);
}

function Count({ value }: { value: number }) {
  return <b>{formatCount(value)}</b>;
}

export function IndexPage({ className }: { className: string }) {
  const facets = useFacets();
  const sets = byCount(facets?.sets);
  const types = byCount(facets?.types);
  const rarities = byCount(facets?.rarities);

  return (
    <section className={className}>
      <h2 className="font-display text-lg font-semibold">Index</h2>
      <IndexSection title="Sets" swatch="bg-sun" count={sets.length} className="mt-2">
        {sets.slice(0, TOP_SETS).map(({ value, count }) => (
          <Link
            key={value}
            to="/cards"
            search={{ set: value }}
            className="chip"
            data-testid="browse-set"
          >
            {value} <Count value={count} />
          </Link>
        ))}
        <Link
          to="/cards"
          search={{ sort: "set" }}
          className="chip bg-transparent"
          data-testid="browse-all-sets"
        >
          All {formatCount(sets.length)} sets →
        </Link>
      </IndexSection>
      <IndexSection title="Types" swatch="bg-teal" count={types.length}>
        {types.map(({ value, count }) => (
          <Link
            key={value}
            to="/cards"
            search={{ type: value }}
            className="chip"
            data-testid="browse-type"
          >
            <TypeDot type={value} />
            {value} <Count value={count} />
          </Link>
        ))}
      </IndexSection>
      <IndexSection title="Rarities" swatch="bg-sky" count={rarities.length}>
        {rarities.map(({ value, count }) => (
          <Link
            key={value}
            to="/cards"
            search={{ rarity: value }}
            className="chip"
            data-testid="browse-rarity"
          >
            {value} <Count value={count} />
          </Link>
        ))}
      </IndexSection>
    </section>
  );
}
