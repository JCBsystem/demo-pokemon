import { Button } from "react-aria-components";
import { FolderOpenIcon } from "../../icons/FolderOpenIcon";
import { BinderPage } from "./BinderPage";

type Props = { query: string | undefined; onClear: () => void };

export function EmptyState({ query, onClear }: Props) {
  return (
    <div data-testid="empty-state" className="relative lg:grid lg:grid-cols-2 lg:gap-[22px]">
      <BinderPage cards={[]} firstIndex={0}>
        <div className="absolute inset-0 grid place-items-center p-6 text-center">
          <div className="max-w-[280px] rounded-3xl bg-paper p-5 shadow-lg">
            <span className="flex justify-center text-muted">
              <FolderOpenIcon />
            </span>
            <p className="mt-2 font-display text-xl font-semibold">
              {query === undefined ? "No cards match these filters" : `No cards match “${query}”`}
            </p>
            <p className="mt-1 text-sm text-muted">
              {query === undefined
                ? "This page of the binder is empty. Clear the filters to fill it again."
                : "This page of the binder is empty. Check the spelling or clear the search."}
            </p>
            <Button
              data-testid="empty-clear"
              onPress={onClear}
              className="mt-4 inline-block rounded-full bg-cover px-5 py-2.5 font-extrabold text-white outline-none data-focus-visible:ring-2 data-focus-visible:ring-ink data-focus-visible:ring-offset-2 data-hovered:bg-cover-dark"
            >
              {query === undefined ? "Clear filters" : "Clear search"}
            </Button>
          </div>
        </div>
      </BinderPage>
      <BinderPage cards={[]} firstIndex={0} className="hidden lg:grid" />
    </div>
  );
}
