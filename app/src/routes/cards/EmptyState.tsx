import { Button } from "react-aria-components";
import { FolderOpen } from "../../ui/icons/folder-open";

export function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div data-testid="empty-state" className="py-20 lg:py-28 text-center max-w-md mx-auto">
      <FolderOpen size={40} animateOnView aria-hidden className="mx-auto text-mute" />
      <p className="mt-4 kicker">Nothing filed here</p>
      <p className="mt-3 font-serif text-4xl lg:text-5xl font-light leading-tight">
        No cards match <em>these filters.</em>
      </p>
      <p className="mt-4 text-mute">Try a shorter name, or remove a filter.</p>
      <Button
        data-testid="clear-filters"
        onPress={onClear}
        className="mt-8 cursor-pointer border-b-2 border-ink pb-1 font-medium hover:text-accent hover:border-accent"
      >
        Clear all filters
      </Button>
    </div>
  );
}
