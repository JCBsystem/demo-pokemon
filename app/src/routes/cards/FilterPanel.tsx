import { useNavigate, useSearch } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode, type RefObject } from "react";
import {
  Button,
  Dialog,
  Modal,
  ModalOverlay,
  Popover,
  ToggleButton,
  ToggleButtonGroup,
  type Key,
} from "react-aria-components";
import { TypeDot } from "../../components/TypeDot";
import type { Facet } from "../../data/selectors";
import { useFacets, useFilteredCards } from "../../data/useCards";
import { panelLabels, panels, toCardFilter, validateCardsSearch, type Panel } from "./cardsSearch";
import { useIsDesktop } from "./useIsDesktop";

const sortOptions = [
  { id: "collection", label: "Collection order" },
  { id: "name", label: "Name" },
  { id: "set", label: "Set" },
] as const;
type SortKey = (typeof sortOptions)[number]["id"];

type Draft = { type: string[]; rarity: string[]; set: string[]; sort: SortKey };

const optionClass = ({ isSelected }: { isSelected: boolean }) =>
  `chip cursor-pointer ${isSelected ? "border-accent! bg-accent! text-zinc-950!" : ""}`;

const byCount = (facets: Facet[] = []) => facets.toSorted((a, b) => b.count - a.count);

export function FilterPanel({ triggerRef }: { triggerRef: RefObject<HTMLButtonElement | null> }) {
  const search = useSearch({ from: "/cards" });
  const navigate = useNavigate({ from: "/cards" });
  const isDesktop = useIsDesktop();
  const onOpenChange = (open: boolean) => {
    if (!open) {
      void navigate({
        search: (prev) => validateCardsSearch({ ...prev, panel: undefined }),
        replace: true,
        viewTransition: false,
      });
    }
  };

  const body = <Body key={search.panel} initial={search.panel ?? "type"} isDesktop={isDesktop} />;
  return isDesktop ? (
    <Popover
      isOpen
      onOpenChange={onOpenChange}
      triggerRef={triggerRef}
      placement="bottom start"
      isNonModal
      shouldCloseOnInteractOutside={(element) => !element.closest("[data-panel-chip]")}
      className="z-50 flex w-[400px] flex-col rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black"
    >
      {body}
    </Popover>
  ) : (
    <ModalOverlay
      isOpen
      onOpenChange={onOpenChange}
      isDismissable
      className="fixed inset-0 z-50 bg-black/60"
    >
      <Modal className="fixed inset-x-0 bottom-0 flex max-h-[78vh] flex-col rounded-t-3xl border-t border-zinc-800 bg-zinc-900">
        {body}
      </Modal>
    </ModalOverlay>
  );
}

function Body({ initial, isDesktop }: { initial: Panel; isDesktop: boolean }) {
  const search = useSearch({ from: "/cards" });
  const navigate = useNavigate({ from: "/cards" });
  const facets = useFacets();
  const [section, setSection] = useState(initial);
  const [draft, setDraft] = useState<Draft>(() => ({
    type: search.type ?? [],
    rarity: search.rarity ?? [],
    set: search.set ?? [],
    sort: search.sort ?? "collection",
  }));
  const next = useMemo(() => validateCardsSearch({ q: search.q, ...draft }), [search.q, draft]);
  const filter = useMemo(() => toCardFilter(next), [next]);
  const count = useFilteredCards(filter)?.length ?? 0;
  const options = {
    type: byCount(facets?.types),
    rarity: byCount(facets?.rarities),
    set: byCount(facets?.sets),
  };

  return (
    <Dialog
      aria-label="Filters"
      data-testid="filter-panel"
      className={`flex min-h-0 flex-1 flex-col outline-none ${isDesktop ? "max-h-[460px]" : ""}`}
    >
      {!isDesktop && <div className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-zinc-700" />}
      <div className="flex items-center justify-between px-5 py-3">
        <h2 className="font-bold">{isDesktop ? panelLabels[section] : "Filters"}</h2>
        <Button
          slot="close"
          aria-label="Close"
          data-testid="filter-close"
          className="grid size-8 cursor-pointer place-items-center rounded-full text-zinc-400 hover:bg-zinc-800"
        >
          ✕
        </Button>
      </div>
      <div className="flex min-h-0 flex-1 border-t border-zinc-800">
        {!isDesktop && (
          <ToggleButtonGroup
            aria-label="Filter sections"
            orientation="vertical"
            selectionMode="single"
            disallowEmptySelection
            selectedKeys={[section]}
            onSelectionChange={(keys) => setSection(panels.find((p) => keys.has(p)) ?? section)}
            className="w-28 shrink-0 bg-zinc-950/50 py-2"
          >
            {panels.map((panel) => (
              <ToggleButton
                key={panel}
                id={panel}
                data-testid={`filter-section-${panel}`}
                className={({ isSelected }) =>
                  `flex h-12 w-full cursor-pointer items-center justify-between border-l-2 px-4 text-left text-sm ${isSelected ? "border-accent bg-zinc-900 font-semibold text-white" : "border-transparent text-muted"}`
                }
              >
                {panelLabels[panel]}
                {panel !== "sort" && draft[panel].length > 0 && (
                  <span className="text-xs text-accent">{draft[panel].length}</span>
                )}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        )}
        <div className="flex-1 overflow-y-auto p-4">
          {section === "sort" ? (
            <Options
              label="Sort"
              mode="single"
              selected={[draft.sort]}
              onChange={(keys) =>
                setDraft({
                  ...draft,
                  sort: sortOptions.find((o) => keys.has(o.id))?.id ?? draft.sort,
                })
              }
            >
              {sortOptions.map(({ id, label }) => (
                <ToggleButton key={id} id={id} data-testid="filter-option" className={optionClass}>
                  {label}
                </ToggleButton>
              ))}
            </Options>
          ) : (
            <Options
              label={panelLabels[section]}
              mode="multiple"
              selected={draft[section]}
              onChange={(keys) => setDraft({ ...draft, [section]: [...keys].map(String) })}
            >
              {options[section].map(({ value, count: n }) => (
                <ToggleButton
                  key={value}
                  id={value}
                  data-testid="filter-option"
                  className={optionClass}
                >
                  {section === "type" && <TypeDot type={value} />}
                  <span className={section === "set" ? "font-mono" : ""}>{value}</span>
                  <span className="text-xs tabular-nums opacity-60">{n}</span>
                </ToggleButton>
              ))}
            </Options>
          )}
        </div>
      </div>
      <div
        className="flex gap-3 border-t border-zinc-800 p-4"
        style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
      >
        <Button
          data-testid="filter-reset"
          onPress={() => setDraft({ type: [], rarity: [], set: [], sort: "collection" })}
          className="h-11 flex-1 cursor-pointer rounded-xl border border-zinc-700 text-sm font-medium"
        >
          Reset
        </Button>
        <Button
          data-testid="filter-apply"
          onPress={() => void navigate({ search: next, replace: true, viewTransition: false })}
          className="h-11 flex-[2] cursor-pointer rounded-xl bg-accent text-sm font-bold text-zinc-950"
        >
          Show {count.toLocaleString("en")} {count === 1 ? "result" : "results"}
        </Button>
      </div>
    </Dialog>
  );
}

function Options({
  label,
  mode,
  selected,
  onChange,
  children,
}: {
  label: string;
  mode: "single" | "multiple";
  selected: string[];
  onChange: (keys: Set<Key>) => void;
  children: ReactNode;
}) {
  return (
    <ToggleButtonGroup
      aria-label={label}
      selectionMode={mode}
      disallowEmptySelection={mode === "single"}
      selectedKeys={selected}
      onSelectionChange={onChange}
      className="flex flex-wrap content-start gap-2"
    >
      {children}
    </ToggleButtonGroup>
  );
}
