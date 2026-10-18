import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { TypeDot } from "../../components/TypeDot";
import type { Facet } from "../../data/selectors";
import { useFacets } from "../../data/useCards";

const byCount = (facets: Facet[] = []) => facets.toSorted((a, b) => b.count - a.count);

function Group({ title, count, children }: { title: string; count: number; children: ReactNode }) {
  return (
    <div>
      <h3 className="flex justify-between text-sm">
        <span className="font-semibold">{title}</span>
        <span className="text-muted tabular-nums">{count}</span>
      </h3>
      {children}
    </div>
  );
}

export function Browse() {
  const facets = useFacets();
  const types = byCount(facets?.types);
  const rarities = byCount(facets?.rarities);
  const sets = byCount(facets?.sets);

  return (
    <section aria-labelledby="browse-heading" className="mt-10 px-4 pb-12 lg:px-6">
      <h2 id="browse-heading" className="text-lg font-bold">
        Browse
      </h2>
      <div className="mt-4 grid gap-8 lg:grid-cols-3 lg:gap-10">
        <Group title="Types" count={types.length}>
          <div className="mt-3 grid grid-cols-2 gap-1.5">
            {types.map(({ value, count }) => (
              <Link
                key={value}
                to="/cards"
                search={{ type: [value] }}
                data-testid="browse-type"
                className="flex h-10 items-center gap-2 rounded-lg bg-zinc-900 px-3 text-sm hover:bg-zinc-800"
              >
                <TypeDot type={value} />
                {value}
                <span className="ml-auto text-xs text-muted tabular-nums">{count}</span>
              </Link>
            ))}
          </div>
        </Group>
        <Group title="Rarities" count={rarities.length}>
          <div className="mt-3 divide-y divide-zinc-800 rounded-xl bg-zinc-900">
            {rarities.map(({ value, count }) => (
              <Link
                key={value}
                to="/cards"
                search={{ rarity: [value] }}
                data-testid="browse-rarity"
                className="flex h-10 items-center px-3 text-sm first:rounded-t-xl last:rounded-b-xl hover:bg-zinc-800"
              >
                {value}
                <span className="ml-auto text-xs text-muted tabular-nums">{count}</span>
              </Link>
            ))}
          </div>
        </Group>
        <Group title="Sets" count={sets.length}>
          <div className="mt-3 grid grid-cols-4 gap-1.5">
            {sets.slice(0, 8).map(({ value, count }) => (
              <Link
                key={value}
                to="/cards"
                search={{ set: [value] }}
                data-testid="browse-set"
                className="rounded-lg bg-zinc-900 px-2.5 py-2 hover:bg-zinc-800"
              >
                <div className="font-mono text-sm">{value}</div>
                <div className="text-[11px] text-muted tabular-nums">{count}</div>
              </Link>
            ))}
          </div>
          <Link
            to="/cards"
            search={{ panel: "set" }}
            data-testid="browse-all-sets"
            className="mt-3 inline-block text-sm text-zinc-400 underline underline-offset-4 hover:text-white"
          >
            All {sets.length} sets
          </Link>
        </Group>
      </div>
    </section>
  );
}
