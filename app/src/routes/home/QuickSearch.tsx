import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Input, SearchField } from "react-aria-components";
import { SearchIcon } from "../../icons/SearchIcon";
import { useStore } from "../../store";

const PLACEHOLDER = "Search Ash's cards";

export function QuickSearch() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  function submit(raw: string) {
    const q = raw.trim();
    useStore.getState().addRecentSearch(q);
    void navigate({ to: "/cards", search: q === "" ? {} : { q } });
  }

  return (
    <SearchField
      aria-label={PLACEHOLDER}
      value={value}
      onChange={setValue}
      onFocusChange={setFocused}
      onSubmit={submit}
      className="flex items-center gap-2 rounded-full bg-white px-4 py-3 text-muted shadow-[inset_0_0_0_2px_var(--color-line)] focus-within:ring-2 focus-within:ring-ink"
    >
      <SearchIcon active={focused || value !== ""} />
      <Input
        data-testid="quick-search"
        placeholder={PLACEHOLDER}
        className="min-w-0 flex-1 bg-transparent font-semibold text-ink outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:appearance-none"
      />
    </SearchField>
  );
}
