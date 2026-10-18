import { useEffect } from "react";
import { Button } from "react-aria-components";

type Props = {
  page: number;
  total: number;
  step: number;
  keysEnabled: boolean;
  onTurn: (page: number) => void;
};

const TYPING_TARGETS = "input, textarea, select, [contenteditable], [role=listbox], [role=dialog]";

const turnerClass =
  "grid size-10 place-items-center rounded-full bg-[#ffffff22] text-xl outline-none data-disabled:opacity-40 data-focus-visible:ring-2 data-focus-visible:ring-white data-hovered:bg-[#ffffff33]";

export function PageTurner({ page, total, step, keysEnabled, onTurn }: Props) {
  useEffect(() => {
    if (!keysEnabled) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.target instanceof Element && event.target.closest(TYPING_TARGETS)) return;
      const targets: Record<string, number> = {
        ArrowLeft: page - step,
        PageUp: page - step,
        ArrowRight: page + step,
        PageDown: page + step,
        Home: 1,
        End: total,
      };
      const target = targets[event.key];
      if (target === undefined) return;
      event.preventDefault();
      onTurn(target);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [keysEnabled, page, step, total, onTurn]);

  const spreadEnd = Math.min(page + 1, total);

  return (
    <div className="mt-3 flex items-center justify-between font-bold text-white">
      <Button
        data-testid="page-prev"
        aria-label="Previous page"
        isDisabled={page <= 1}
        onPress={() => onTurn(page - step)}
        className={turnerClass}
      >
        ‹
      </Button>
      <span data-testid="page-indicator">
        <span className="lg:hidden">Page {page}</span>
        <span className="hidden lg:inline">
          {spreadEnd > page ? `Pages ${page}–${spreadEnd}` : `Page ${page}`}
        </span>{" "}
        of {total}
      </span>
      <Button
        data-testid="page-next"
        aria-label="Next page"
        isDisabled={page + step > total}
        onPress={() => onTurn(page + step)}
        className={turnerClass}
      >
        ›
      </Button>
    </div>
  );
}
