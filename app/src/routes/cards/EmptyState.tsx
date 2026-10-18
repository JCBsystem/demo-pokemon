import { Button } from "react-aria-components";
import { Ghost } from "../../components/icons/Ghost";
import { clearFilters, type CardsSearch } from "../../data/urlFilter";
import { useUpdateCardsSearch } from "../../hooks/useCardsSearch";

export function EmptyState({ search }: { search: CardsSearch }) {
  const update = useUpdateCardsSearch();

  return (
    <div data-testid="empty-state" className="flex flex-col items-center px-6 py-16 text-center">
      <Ghost size={32} animateOnView className="text-zinc-400" />
      <p className="mt-3 font-medium">No cards match</p>
      <p className="mt-1 text-zinc-600">
        {search.q ? `Nothing named “${search.q}” with these filters.` : "Try removing a filter."}
      </p>
      <Button
        onPress={() => update(clearFilters)}
        className="mt-4 h-9 rounded-md bg-zinc-900 px-4 text-xs font-medium text-white data-hovered:bg-zinc-700"
      >
        Clear search and filters
      </Button>
    </div>
  );
}
