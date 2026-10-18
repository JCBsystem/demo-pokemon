import {
  Button,
  Dialog,
  DialogTrigger,
  ListBox,
  ListBoxItem,
  Popover,
  Text,
} from "react-aria-components";
import type { Facet } from "../../data/selectors";
import { CHIP, CHIP_ON, picked } from "./chips";

type PickerProps = {
  label: string;
  testId: string;
  facets: Facet[];
  selected: string[] | undefined;
  onChange: (values: string[] | undefined) => void;
};

export function FacetPicker({ label, testId, facets, selected, onChange }: PickerProps) {
  const count = selected?.length ?? 0;

  return (
    <DialogTrigger>
      <Button data-testid={testId} className={`${CHIP} ${count > 0 ? CHIP_ON : ""}`}>
        {count > 0 ? `${label} · ${count}` : label} <span aria-hidden="true">▾</span>
      </Button>
      <Popover
        placement="bottom start"
        className="bg-white border border-rule shadow-xl p-2 max-h-80 overflow-auto w-64"
      >
        <Dialog aria-label={label} className="outline-none">
          <ListBox
            data-testid={`${testId}-list`}
            escapeKeyBehavior="none"
            aria-label={label}
            selectionMode="multiple"
            selectedKeys={selected ?? []}
            onSelectionChange={(keys) => onChange(picked(facets, keys))}
            className="outline-none"
          >
            {facets.map(({ value, count: n }) => (
              <ListBoxItem
                key={value}
                id={value}
                textValue={value}
                className="cursor-pointer flex items-baseline gap-2 px-2 py-1.5 text-sm outline-none data-focused:bg-wash"
              >
                {({ isSelected }) => (
                  <>
                    <span aria-hidden="true" className="w-3 text-accent">
                      {isSelected ? "✓" : ""}
                    </span>
                    <Text slot="label" className="flex-1">
                      {value}
                    </Text>
                    <Text slot="description" className="tabular-nums text-mute">
                      {n.toLocaleString("en")}
                    </Text>
                  </>
                )}
              </ListBoxItem>
            ))}
          </ListBox>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
