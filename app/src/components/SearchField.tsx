import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SearchField as AriaSearchField, Button, Input } from "react-aria-components";
import { setQuery } from "../data/urlFilter";
import { useCards } from "../data/useCards";
import { useCardsSearch, useUpdateCardsSearch } from "../hooks/useCardsSearch";
import { useStore } from "../store";
import { Search } from "./icons/Search";

export function SearchField() {
  const total = useCards().data?.length ?? 0;
  const search = useCardsSearch();
  const updateSearch = useUpdateCardsSearch();
  const navigate = useNavigate();
  const addRecentSearch = useStore((state) => state.addRecentSearch);
  const [draft, setDraft] = useState("");
  const [focused, setFocused] = useState(false);

  function change(q: string) {
    if (search === undefined) setDraft(q);
    else updateSearch((current) => setQuery(current, q));
  }

  function submit(q: string) {
    addRecentSearch(q);
    if (search !== undefined) return;
    setDraft("");
    void navigate({ to: "/cards", search: setQuery({}, q.trim()) });
  }

  return (
    <AriaSearchField
      aria-label="Search cards"
      value={search === undefined ? draft : (search.q ?? "")}
      onChange={change}
      onSubmit={submit}
      onFocusChange={setFocused}
      className="group flex h-9 min-w-0 flex-1 items-center gap-2 rounded-md bg-zinc-100 px-3 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-500"
    >
      <Search size={16} animate={focused} className="shrink-0 text-zinc-400" />
      <Input
        data-testid="search-input"
        placeholder={`Search ${total.toLocaleString("en")} cards by name`}
        className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-zinc-400 [&::-webkit-search-cancel-button]:hidden"
      />
      <Button className="grid size-6 shrink-0 place-items-center rounded text-zinc-500 group-data-empty:hidden hover:text-zinc-800">
        <svg aria-hidden viewBox="0 0 12 12" className="size-3">
          <path d="m3 3 6 6M9 3 3 9" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </Button>
    </AriaSearchField>
  );
}
