import type { ReactNode } from "react";

export function EmptyPocket({ children }: { children?: ReactNode }) {
  return (
    <div className="pocket-empty grid place-items-center p-2 text-center text-[11px] font-bold text-muted">
      {children}
    </div>
  );
}
