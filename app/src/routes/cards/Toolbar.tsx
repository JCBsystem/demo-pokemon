import { useNavigate, useSearch } from "@tanstack/react-router";
import { useRef, type RefObject } from "react";
import { Button } from "react-aria-components";
import { CardSearchField } from "../../components/CardSearchField";
import { TypeDot } from "../../components/TypeDot";
import { FilterPanel } from "./FilterPanel";
import { facetKeys, panelLabels, panels, validateCardsSearch, type Panel } from "./cardsSearch";

export function Toolbar({ count }: { count: number }) {
  const search = useSearch({ from: "/cards" });
  const navigate = useNavigate({ from: "/cards" });
  const chipRefs: Record<Panel, RefObject<HTMLButtonElement | null>> = {
    type: useRef(null),
    rarity: useRef(null),
    set: useRef(null),
    sort: useRef(null),
  };
  const active = facetKeys.flatMap((key) => (search[key] ?? []).map((value) => ({ key, value })));
  const hasQuery = search.q !== undefined;

  const update = (patch: Record<string, unknown>) =>
    void navigate({
      search: (prev) => validateCardsSearch({ ...prev, ...patch }),
      replace: true,
      viewTransition: false,
    });

  const suffix = (panel: Panel) => {
    if (panel === "sort") return search.sort && (search.sort === "name" ? " · Name" : " · Set");
    const n = search[panel]?.length;
    return n ? ` · ${n}` : null;
  };

  return (
    <div className="sticky top-0 z-40 border-b border-zinc-900 bg-zinc-950 lg:top-14">
      <div className="flex gap-2 px-3 pt-3 lg:hidden">
        <CardSearchField
          id="cards-search"
          size="compact"
          data-testid="cards-search"
          className="flex-1"
        />
        <Button
          aria-label="Filters"
          data-testid="filters-button"
          onPress={() => update({ panel: facetKeys.find((key) => search[key]) ?? "type" })}
          className="relative grid size-9 shrink-0 cursor-pointer place-items-center rounded-full border border-zinc-800 bg-zinc-900"
        >
          <svg
            aria-hidden
            className="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1" />
            <circle cx="15" cy="6" r="2" />
            <circle cx="9" cy="12" r="2" />
            <circle cx="17" cy="18" r="2" />
          </svg>
          {active.length > 0 && (
            <span
              data-testid="filters-badge"
              className="absolute -top-1.5 -right-1.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-zinc-950"
            >
              {active.length}
            </span>
          )}
        </Button>
      </div>
      <div className="noscroll flex items-center gap-2 overflow-x-auto px-3 py-3 lg:flex-wrap lg:overflow-visible lg:px-6">
        {panels.map((panel) => (
          <Button
            key={panel}
            ref={chipRefs[panel]}
            data-testid={`chip-${panel}`}
            data-panel-chip
            onPress={() => update({ panel })}
            className="chip cursor-pointer"
          >
            {panelLabels[panel]}
            <span className="text-accent">{suffix(panel)}</span>
            <svg
              aria-hidden
              className="size-3 text-muted"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </Button>
        ))}
        <span className="mx-1 h-5 w-px shrink-0 bg-zinc-800" />
        {active.map(({ key, value }) => (
          <Button
            key={`${key}-${value}`}
            aria-label={`Remove ${value}`}
            data-testid="active-filter"
            onPress={() => update({ [key]: search[key]?.filter((v) => v !== value) })}
            className="chip cursor-pointer border-zinc-100! bg-zinc-100! text-zinc-900!"
          >
            {key === "type" && <TypeDot type={value} />}
            <span className={key === "set" ? "font-mono" : ""}>{value}</span>
            <span aria-hidden className="text-zinc-600">
              ✕
            </span>
          </Button>
        ))}
      </div>
      <div className="flex items-center justify-between px-3 pb-2.5 text-xs text-zinc-400 lg:px-6">
        <span data-testid="cards-count">
          <b className="text-zinc-100 tabular-nums">{count.toLocaleString("en")}</b>{" "}
          {count === 1 ? "card" : "cards"}
          {hasQuery && ` matching “${search.q}”`}
        </span>
        {(hasQuery || active.length > 0) && (
          <Button
            data-testid="clear-all"
            onPress={() => void navigate({ search: {}, viewTransition: false })}
            className="cursor-pointer underline underline-offset-2 hover:text-white"
          >
            Clear all
          </Button>
        )}
      </div>
      {search.panel && <FilterPanel triggerRef={chipRefs[search.panel]} />}
    </div>
  );
}
