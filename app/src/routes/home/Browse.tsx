import { Link } from "react-aria-components";
import { TypeDot } from "../../components/TypeDot";
import { byCount } from "../../data/counts";
import type { Facet } from "../../data/selectors";
import { useFacets } from "../../data/useCards";
import { toggleFacet, type FacetKey } from "../../data/urlFilter";
import { Section } from "./Section";

const TOP = 4;

type Panel = { facetKey: FacetKey; label: string; testId: string; facets: Facet[] };

export function Browse() {
  const facets = useFacets();
  if (facets === undefined) return null;

  const panels: Panel[] = [
    { facetKey: "set", label: "Sets", testId: "browse-sets", facets: facets.sets },
    { facetKey: "type", label: "Types", testId: "browse-types", facets: facets.types },
    { facetKey: "rarity", label: "Rarities", testId: "browse-rarities", facets: facets.rarities },
  ];

  return (
    <Section title="Browse">
      <div className="grid gap-3 sm:grid-cols-3">
        {panels.map((panel) => (
          <BrowsePanel key={panel.facetKey} {...panel} />
        ))}
      </div>
    </Section>
  );
}

function BrowsePanel({ facetKey, label, testId, facets }: Panel) {
  return (
    <div data-testid={testId} className="rounded-lg border border-zinc-200 bg-white">
      <div className="flex h-10 items-center justify-between border-b border-zinc-100 px-3">
        <h3 className="font-medium">{label}</h3>
        <span className="font-mono text-xs text-zinc-500">{facets.length}</span>
      </div>
      <ul className="py-1">
        {byCount(facets)
          .slice(0, TOP)
          .map(({ value, count }) => (
            <li key={value}>
              <Link
                data-testid="browse-item"
                href={{ to: "/cards", search: toggleFacet({}, facetKey, value) }}
                className="flex h-8 items-center gap-2 px-3 -outline-offset-2 motion-safe:transition-colors hover:bg-zinc-50"
              >
                {facetKey === "type" && <TypeDot type={value} />}
                <span
                  className={`flex-1 truncate ${facetKey === "set" ? "font-mono text-xs" : ""}`}
                >
                  {value}
                </span>
                <span className="font-mono text-xs text-zinc-500">
                  {count.toLocaleString("en")}
                </span>
              </Link>
            </li>
          ))}
      </ul>
      <Link
        href={{ to: "/cards" }}
        className="block h-9 border-t border-zinc-100 px-3 text-xs leading-9 text-indigo-600 -outline-offset-2 hover:underline"
      >
        All {facets.length} {label.toLowerCase()} <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
