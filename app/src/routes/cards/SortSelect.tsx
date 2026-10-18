import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";
import type { CardsSearch } from "./search";

const OPTIONS = [
  { id: "binder", label: "Binder order" },
  { id: "name", label: "Name" },
  { id: "set", label: "Set" },
] as const;

type Props = { sort: CardsSearch["sort"]; onChange: (sort: CardsSearch["sort"]) => void };

export function SortSelect({ sort, onChange }: Props) {
  return (
    <Select
      value={sort ?? "binder"}
      onChange={(key) => onChange(key === "name" || key === "set" ? key : undefined)}
      className="ml-auto flex items-center gap-1.5 text-[13px] font-bold text-muted"
    >
      <Label>Sort</Label>
      <Button data-testid="sort" className="chip">
        <SelectValue /> <span aria-hidden="true">▾</span>
      </Button>
      <Popover className="min-w-(--trigger-width) rounded-2xl bg-paper p-1.5 shadow-xl">
        <ListBox items={OPTIONS} className="outline-none">
          {(option) => (
            <ListBoxItem
              id={option.id}
              className="cursor-default rounded-xl px-3 py-2 text-sm font-bold outline-none data-focused:bg-sand data-selected:bg-ink data-selected:text-white"
            >
              {option.label}
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </Select>
  );
}
