import type { ReactNode } from "react";
import { formatCount } from "../../ui/format";

type Props = {
  title: string;
  swatch: "bg-sun" | "bg-teal" | "bg-sky";
  count: number;
  className?: string;
  children: ReactNode;
};

export function IndexSection({ title, swatch, count, className = "", children }: Props) {
  return (
    <details open className={className}>
      <summary className="flex cursor-pointer list-none items-center justify-between rounded-sm border-b-2 border-dashed border-line py-2 outline-none focus-visible:ring-2 focus-visible:ring-ink [&::-webkit-details-marker]:hidden">
        <span className="font-display font-semibold">
          <span className={`mr-2 inline-block size-3 rounded-sm ${swatch}`} />
          {title}
        </span>
        <b className="text-muted">{formatCount(count)}</b>
      </summary>
      <div className="flex flex-wrap gap-2 py-3">{children}</div>
    </details>
  );
}
