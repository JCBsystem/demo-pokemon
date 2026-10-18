import { useMatchRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { Input, SearchField } from "react-aria-components";
import { useCards } from "../data/useCards";
import { Search } from "../icons/search";
import { validateCardsSearch } from "../routes/cards/cardsSearch";
import { useStore } from "../store";

type Props = {
  id?: string;
  size: "compact" | "large";
  className?: string;
  "data-testid"?: string;
};

const styles = {
  compact: {
    icon: "left-3 size-4",
    input: "h-9 rounded-full pr-3 pl-9 text-sm",
  },
  large: {
    icon: "left-4 size-5",
    input: "h-12 rounded-2xl pr-4 pl-12",
  },
};

export function CardSearchField({ id, size, className = "", "data-testid": testId }: Props) {
  const search = useSearch({ strict: false });
  const onCards = Boolean(useMatchRoute()({ to: "/cards" }));
  const navigate = useNavigate();
  const count = useCards().data?.length.toLocaleString("en");
  const [isFocused, setFocused] = useState(false);
  // The router commits a tick after each keystroke; a local draft while focused keeps the caret in place.
  const [draft, setDraft] = useState<string>();

  return (
    <SearchField
      aria-label="Search cards"
      value={draft ?? search.q ?? ""}
      onChange={(q) => {
        setDraft(q);
        if (onCards)
          void navigate({
            to: "/cards",
            search: validateCardsSearch({ ...search, q }),
            replace: true,
            viewTransition: false,
          });
      }}
      onSubmit={(q) => {
        useStore.getState().addRecentSearch(q);
        if (!onCards)
          void navigate({
            to: "/cards",
            search: validateCardsSearch({ q }),
            viewTransition: false,
          });
      }}
      onFocusChange={(focused) => {
        setFocused(focused);
        if (!focused && onCards) {
          if (draft) useStore.getState().addRecentSearch(draft);
          setDraft(undefined);
        }
      }}
      className={`relative block ${className}`}
    >
      <Search
        animate={isFocused}
        aria-hidden
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted ${styles[size].icon}`}
      />
      <Input
        id={id}
        data-testid={testId}
        placeholder={count ? `Search ${count} cards by name` : "Search cards by name"}
        className={`w-full border border-zinc-800 bg-zinc-900 placeholder:text-muted ${styles[size].input}`}
      />
    </SearchField>
  );
}
