import type { CSSProperties } from "react";
import { Button, Dialog, Modal, ModalOverlay } from "react-aria-components";
import type { useFacets } from "../../data/useCards";
import { FacetSection } from "./FacetSection";
import { formatCount } from "../../ui/format";
import { type CardsSearch, FACET_LABELS, type FacetKey, selectedValues } from "./search";

export type SheetAnchor = { section: FacetKey | null; top: number; right: number };

type Props = {
  anchor: SheetAnchor;
  search: CardsSearch;
  facets: ReturnType<typeof useFacets>;
  resultCount: number;
  onChange: (patch: CardsSearch) => void;
  onClose: () => void;
};

export function FilterSheet({ anchor, search, facets, resultCount, onChange, onClose }: Props) {
  const sections = [
    { key: "set", facets: facets?.sets ?? [], limit: 12 },
    { key: "type", facets: facets?.types ?? [], limit: Infinity },
    { key: "rarity", facets: facets?.rarities ?? [], limit: Infinity },
  ] as const;
  const position = { "--sheet-top": `${anchor.top}px`, "--sheet-right": `${anchor.right}px` };

  return (
    <ModalOverlay
      isOpen
      isDismissable
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
      className="fixed inset-0 z-40 bg-[#3a2a2066] lg:bg-transparent"
    >
      <Modal
        style={position as CSSProperties}
        className="fixed inset-x-0 bottom-0 z-50 max-h-[85dvh] overflow-y-auto rounded-t-3xl bg-paper p-5 pb-6 shadow-2xl lg:inset-x-auto lg:top-(--sheet-top) lg:right-(--sheet-right) lg:bottom-auto lg:max-h-[calc(100dvh-var(--sheet-top)-16px)] lg:w-[440px] lg:rounded-3xl"
      >
        <Dialog data-testid="filter-sheet" aria-label="Filters" className="outline-none">
          <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-[#dcc9a8] lg:hidden" />
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Filters</h3>
            <Button
              onPress={onClose}
              className="rounded text-sm font-bold text-muted outline-none data-focus-visible:ring-2 data-focus-visible:ring-ink"
            >
              Close
            </Button>
          </div>
          {sections.map((section) => (
            <FacetSection
              key={section.key}
              name={section.key}
              label={FACET_LABELS[section.key]}
              facets={section.facets}
              limit={section.limit}
              selected={selectedValues(search, section.key)}
              focusOnOpen={anchor.section === section.key}
              onChange={(values) => onChange({ [section.key]: values.join(",") || undefined })}
            />
          ))}
          <div className="mt-5 flex gap-3">
            <Button
              data-testid="filters-reset"
              onPress={() => onChange({ set: undefined, type: undefined, rarity: undefined })}
              className="flex-1 rounded-full py-3 font-extrabold shadow-[inset_0_0_0_2px_#dcc9a8] outline-none data-focus-visible:ring-2 data-focus-visible:ring-ink data-hovered:bg-sand"
            >
              Reset
            </Button>
            <Button
              data-testid="filters-done"
              onPress={onClose}
              className="flex-[2] rounded-full bg-cover py-3 font-extrabold text-white outline-none data-focus-visible:ring-2 data-focus-visible:ring-ink data-focus-visible:ring-offset-2 data-hovered:bg-cover-dark"
            >
              View {formatCount(resultCount)}
            </Button>
          </div>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
