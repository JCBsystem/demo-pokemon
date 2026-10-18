import { useNavigate } from "@tanstack/react-router";
import { Button } from "react-aria-components";
import { Ghost } from "../../icons/ghost";

export function EmptyState() {
  const navigate = useNavigate();
  return (
    <div data-testid="cards-empty" className="px-6 py-24 text-center">
      <Ghost
        size={56}
        animateOnView
        animateOnViewOnce
        aria-hidden
        className="mx-auto text-zinc-700"
      />
      <p className="mt-4 text-lg font-bold">No cards match</p>
      <p className="mt-1 text-sm text-muted">Try another name or remove a filter.</p>
      <Button
        data-testid="empty-clear"
        onPress={() => void navigate({ to: "/cards", search: {}, viewTransition: false })}
        className="mt-6 h-10 cursor-pointer rounded-full bg-zinc-100 px-5 text-sm font-semibold text-zinc-950"
      >
        Clear search and filters
      </Button>
    </div>
  );
}
