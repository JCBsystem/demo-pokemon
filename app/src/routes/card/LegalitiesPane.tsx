import type { Card } from "../../data/schema";

const formats = ["unlimited", "expanded", "standard"] as const;

export function LegalitiesPane({ card }: { card: Card }) {
  return formats.map((format) => {
    const value = card.legalities[format];
    return (
      <div key={format} className="flex items-center gap-3 border-b border-zinc-800/70 py-3.5">
        <span className="capitalize">{format}</span>
        <span
          className={`ml-auto rounded-full px-2.5 py-1 text-xs font-semibold ${value === "Legal" ? "bg-emerald-400/15 text-emerald-300" : "bg-zinc-800 text-zinc-400"}`}
        >
          {value ?? "Not legal"}
        </span>
      </div>
    );
  });
}
