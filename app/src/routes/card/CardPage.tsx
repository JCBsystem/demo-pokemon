import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { Link } from "react-aria-components";
import { useCardById } from "../../data/useCards";
import { CardDetail } from "./CardDetail";

export function CardPage() {
  const { id } = useParams({ from: "/card/$id" });
  const { tab } = useSearch({ from: "/card/$id" });
  const navigate = useNavigate();
  const card = useCardById(id);

  return (
    <main data-testid="page-card" className="min-w-0 p-3 lg:p-6">
      <Link
        href={{ to: "/cards" }}
        data-testid="back-link"
        className="mb-3 inline-block rounded text-xs text-zinc-600 hover:text-zinc-900"
      >
        ← Cards
      </Link>
      {card === undefined ? (
        <div data-testid="card-not-found">
          <h1 className="text-2xl font-semibold tracking-tight">Card not found</h1>
          <p className="mt-1 break-words text-zinc-600">
            No card with id “{id}” in the collection.
          </p>
        </div>
      ) : (
        <div className="max-w-4xl">
          <CardDetail
            card={card}
            variant="full"
            tab={tab ?? "attacks"}
            onTabChange={(next) =>
              void navigate({
                to: "/card/$id",
                params: { id },
                search: { tab: next },
                replace: true,
                viewTransition: false,
                resetScroll: false,
              })
            }
          />
        </div>
      )}
    </main>
  );
}
