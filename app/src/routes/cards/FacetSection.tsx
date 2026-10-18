import { useEffect, useRef, useState } from "react";
import { Button, Checkbox, CheckboxGroup, Label } from "react-aria-components";
import type { Facet } from "../../data/selectors";
import { TypeDot } from "../../ui/TypeDot";
import type { FacetKey } from "./search";

type Props = {
  name: FacetKey;
  label: string;
  facets: Facet[];
  limit: number;
  selected: string[];
  focusOnOpen: boolean;
  onChange: (values: string[]) => void;
};

export function FacetSection({
  name,
  label,
  facets,
  limit,
  selected,
  focusOnOpen,
  onChange,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const firstInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focusOnOpen) firstInput.current?.focus();
  }, [focusOnOpen]);

  const byCount = facets.toSorted((a, b) => b.count - a.count);
  const shown = byCount.filter(
    (facet, index) => expanded || index < limit || selected.includes(facet.value),
  );
  const hidden = byCount.length - shown.length;

  return (
    <CheckboxGroup value={selected} onChange={onChange} className="mt-4 first-of-type:mt-3">
      <Label className="text-xs font-extrabold tracking-wider text-muted uppercase">{label}</Label>
      <div className="mt-2 flex flex-wrap gap-2">
        {shown.map((facet, index) => (
          <Checkbox
            key={facet.value}
            value={facet.value}
            {...(index === 0 && { inputRef: firstInput })}
            data-testid={`facet-${name}-${facet.value}`}
            className={({ isSelected }) => (isSelected ? "chip chip-on" : "chip")}
          >
            {({ isSelected }) => (
              <>
                {isSelected && "✓ "}
                {name === "type" && <TypeDot type={facet.value} />}
                {facet.value} <b>{facet.count}</b>
              </>
            )}
          </Checkbox>
        ))}
        {hidden > 0 && (
          <Button onPress={() => setExpanded(true)} className="chip bg-transparent">
            +{hidden} more
          </Button>
        )}
      </div>
    </CheckboxGroup>
  );
}
