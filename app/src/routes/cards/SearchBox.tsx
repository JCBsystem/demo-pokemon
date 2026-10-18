import { useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Input, SearchField } from "react-aria-components";
import { SearchIcon } from "../../icons/SearchIcon";
import { useStore } from "../../store";
import { SEARCH_HASH } from "./search";

const DEBOUNCE_MS = 150;

type Props = { query: string; onCommit: (query: string) => void };

export function SearchBox({ query, onCommit }: Props) {
  const [value, setValue] = useState(query);
  const [focused, setFocused] = useState(false);
  const written = useRef(query);
  const timer = useRef<number | undefined>(undefined);
  const input = useRef<HTMLInputElement>(null);
  const hash = useLocation({ select: (location) => location.hash });

  useEffect(() => {
    if (query === written.current) return;
    written.current = query;
    setValue(query);
  }, [query]);

  useEffect(() => {
    if (hash === SEARCH_HASH) input.current?.focus();
  }, [hash]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const commit = (next: string) => {
    window.clearTimeout(timer.current);
    written.current = next;
    onCommit(next);
  };

  return (
    <SearchField
      aria-label="Search by name"
      value={value}
      onChange={(next) => {
        setValue(next);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => commit(next), DEBOUNCE_MS);
      }}
      onSubmit={(next) => {
        commit(next);
        useStore.getState().addRecentSearch(next);
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => {
        setFocused(false);
        if (value.trim() !== "") useStore.getState().addRecentSearch(value);
      }}
      className="flex min-w-[160px] flex-1 items-center gap-2 rounded-full bg-white px-3 py-2 text-muted shadow-[inset_0_0_0_2px_#ead9bb] has-[input[data-focus-visible]]:ring-2 has-[input[data-focus-visible]]:ring-ink"
    >
      <SearchIcon active={focused || value !== ""} size={16} />
      <Input
        ref={input}
        data-testid="binder-search"
        placeholder="Search by name"
        className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-ink outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
      />
    </SearchField>
  );
}
