import { Button, Dialog, Modal, ModalOverlay } from "react-aria-components";
import { toggleFacet } from "../data/urlFilter";
import { useCardsSearch, useUpdateCardsSearch } from "../hooks/useCardsSearch";
import { FacetList } from "./FacetList";
import { NavLinks } from "./NavLinks";

type Props = { isOpen: boolean; onOpenChange: (isOpen: boolean) => void };

export function Drawer({ isOpen, onOpenChange }: Props) {
  const search = useCardsSearch();
  const updateSearch = useUpdateCardsSearch();

  return (
    <ModalOverlay
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable
      className="fixed inset-0 z-40 bg-black/30 motion-safe:data-entering:animate-fade-in motion-safe:data-exiting:animate-fade-out"
    >
      <Modal className="fixed inset-y-0 left-0 w-[280px] overflow-y-auto bg-white shadow-xl motion-safe:data-entering:animate-drawer-in motion-safe:data-exiting:animate-drawer-out">
        <Dialog aria-label="Menu" data-testid="drawer" className="outline-none">
          {({ close }) => (
            <>
              <div className="flex h-14 items-center justify-between border-b border-zinc-200 px-4">
                <span className="font-semibold tracking-tight">Ash's Index</span>
                <Button
                  aria-label="Close menu"
                  onPress={close}
                  className="grid size-9 place-items-center rounded text-zinc-500 hover:bg-zinc-100"
                >
                  <svg aria-hidden viewBox="0 0 12 12" className="size-3">
                    <path d="m2 2 8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </Button>
              </div>
              <div className="pt-2">
                <NavLinks onNavigate={close} />
              </div>
              <div className="px-2">
                <FacetList
                  search={search ?? {}}
                  onToggle={(key, value) => {
                    close();
                    updateSearch((current) => toggleFacet(current, key, value));
                  }}
                />
              </div>
            </>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
