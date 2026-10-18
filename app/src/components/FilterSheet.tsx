import { useMemo } from "react";
import { Button, Dialog, Heading, Modal, ModalOverlay } from "react-aria-components";
import { useFilteredCards } from "../data/useCards";
import { clearFacets, filterFromSearch, toggleFacet, type CardsSearch } from "../data/urlFilter";
import { useUpdateCardsSearch } from "../hooks/useCardsSearch";
import { FacetList } from "./FacetList";

type Props = {
  search: CardsSearch;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function FilterSheet({ search, isOpen, onOpenChange }: Props) {
  const updateSearch = useUpdateCardsSearch();
  const filter = useMemo(() => filterFromSearch(search), [search]);
  const count = useFilteredCards(filter)?.length ?? 0;

  return (
    <ModalOverlay isOpen={isOpen} onOpenChange={onOpenChange} className="fixed inset-0 z-50">
      <Modal className="size-full bg-white motion-safe:data-entering:animate-sheet-in motion-safe:data-exiting:animate-sheet-out">
        <Dialog data-testid="filter-sheet" className="flex h-full flex-col outline-none">
          {({ close }) => (
            <>
              <div className="flex h-14 shrink-0 items-center justify-between border-b border-zinc-200 px-4">
                <Button onPress={close} className="text-xs text-zinc-500">
                  Close
                </Button>
                <Heading slot="title" className="font-semibold">
                  Filters
                </Heading>
                <Button
                  data-testid="sheet-reset"
                  onPress={() => updateSearch(clearFacets)}
                  className="text-xs font-medium text-indigo-600"
                >
                  Reset
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto px-2">
                <FacetList
                  search={search}
                  onToggle={(key, value) =>
                    updateSearch((current) => toggleFacet(current, key, value))
                  }
                />
              </div>
              <div className="shrink-0 border-t border-zinc-200 p-3">
                <Button
                  data-testid="sheet-apply"
                  onPress={close}
                  className="h-11 w-full rounded-md bg-zinc-900 font-medium text-white"
                >
                  Show {count.toLocaleString("en")} {count === 1 ? "card" : "cards"}
                </Button>
              </div>
            </>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
