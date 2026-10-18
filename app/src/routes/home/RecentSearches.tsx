import { Link } from "react-aria-components";
import { useStore } from "../../store";
import { Section } from "./Section";

export function RecentSearches() {
  const recentSearches = useStore((state) => state.recentSearches);

  return (
    <Section
      title={
        <>
          Recent searches <span className="font-normal tracking-normal normal-case">· last 10</span>
        </>
      }
    >
      <ul
        data-testid="recent-searches"
        className="divide-y divide-zinc-100 overflow-hidden rounded-lg border border-zinc-200 bg-white"
      >
        {recentSearches.length === 0 ? (
          <li className="px-3 py-4 text-zinc-600">Nothing searched yet.</li>
        ) : (
          recentSearches.slice(0, 10).map((q) => (
            <li key={q}>
              <Link
                data-testid="recent-search-item"
                href={{ to: "/cards", search: { q } }}
                className="flex h-10 items-center gap-3 px-3 -outline-offset-2 motion-safe:transition-colors hover:bg-zinc-50"
              >
                <ClockIcon />
                <span className="truncate">{q}</span>
              </Link>
            </li>
          ))
        )}
      </ul>
    </Section>
  );
}

function ClockIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className="size-3.5 shrink-0 text-zinc-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <circle cx="10" cy="10" r="7" />
      <path d="M10 6v4l3 2" />
    </svg>
  );
}
