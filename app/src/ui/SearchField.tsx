import { AnimateIcon } from "@animate-ui/react/icons";
import { useRef, useState } from "react";
import { Button, Input, SearchField as AriaSearchField } from "react-aria-components";
import { useStore } from "../store";
import { Search } from "./icons/search";

type Props = {
  size: "lg" | "sm" | "live";
  testId: string;
  value?: string;
  onChange?: (q: string) => void;
  onSubmit: (q: string) => void;
  placeholder?: string;
};

const SIZES = {
  lg: { row: "py-3", input: "font-serif text-2xl lg:text-3xl font-light", icon: 24 },
  sm: { row: "py-1.5", input: "text-[15px]", icon: 16 },
  live: { row: "py-1.5", input: "text-lg", icon: 16 },
};

export function SearchField({
  size,
  testId,
  value,
  onChange,
  onSubmit,
  placeholder = "Search by name",
}: Props) {
  const recentSearches = useStore((s) => s.recentSearches);
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const style = SIZES[size];

  const submit = (q: string) => {
    if (value === undefined) setText("");
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    onSubmit(q.trim());
  };

  return (
    <div className="group relative">
      <AriaSearchField
        aria-label="Search cards"
        value={value ?? text}
        onChange={(q) => (onChange ? onChange(q) : setText(q))}
        onSubmit={submit}
        onFocusChange={setFocused}
      >
        <AnimateIcon animate={focused} animateOnHover asChild>
          <div
            className={`flex items-center gap-3 border-b-2 border-ink has-[input:focus]:border-accent ${style.row}`}
          >
            <Search size={style.icon} aria-hidden className="shrink-0" />
            <Input
              ref={inputRef}
              data-testid={testId}
              placeholder={placeholder}
              autoComplete="off"
              className={`w-full min-w-0 bg-transparent outline-none placeholder:text-mute [&::-webkit-search-cancel-button]:hidden ${style.input}`}
            />
          </div>
        </AnimateIcon>
      </AriaSearchField>
      <div
        data-testid="recent-searches"
        role="presentation"
        onMouseDown={(e) => e.preventDefault()}
        className="hidden group-focus-within:block absolute left-0 right-0 top-full mt-2 bg-white border border-rule shadow-xl z-30 p-4 text-left"
      >
        <div className="flex items-baseline justify-between">
          <span className="kicker">Recent searches</span>
          {recentSearches.length > 0 && (
            <Button
              data-testid="clear-recent"
              preventFocusOnPress
              onPress={() => {
                useStore.setState({ recentSearches: [] });
                inputRef.current?.focus();
              }}
              className="cursor-pointer text-xs text-mute underline hover:text-accent"
            >
              Clear
            </Button>
          )}
        </div>
        {recentSearches.length > 0 ? (
          <ol className="mt-2">
            {recentSearches.map((q, i) => (
              <li key={q}>
                <Button
                  data-testid="recent-search"
                  preventFocusOnPress
                  onPress={() => submit(q)}
                  className="cursor-pointer w-full text-left flex gap-3 py-1.5 hover:text-accent"
                >
                  <span className="w-5 text-right text-xs text-mute tabular-nums pt-1.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-lg">{q}</span>
                </Button>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-2 text-sm text-mute">No recent searches.</p>
        )}
      </div>
    </div>
  );
}
