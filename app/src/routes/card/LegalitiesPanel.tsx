import type { Card } from "../../data/schema";

const formats = [
  ["standard", "Standard"],
  ["expanded", "Expanded"],
  ["unlimited", "Unlimited"],
] as const;

const tone: Record<string, string> = { Legal: "text-legal", Banned: "text-heart" };

export function LegalitiesPanel({ card }: { card: Card }) {
  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {formats.map(([key, label]) => {
          const value = card.legalities[key];
          return (
            <div
              key={key}
              className="rounded-2xl bg-white p-3 text-center shadow-[inset_0_0_0_1px_#ead9bb]"
            >
              <p className="text-xs font-extrabold text-muted uppercase">{label}</p>
              <p className={`mt-1 font-extrabold ${tone[value ?? ""] ?? "text-muted"}`}>
                {value ?? "—"}
              </p>
            </div>
          );
        })}
      </div>
      {card.regulationMark !== undefined && (
        <span className="chip mt-3">
          Regulation mark <b>{card.regulationMark}</b>
        </span>
      )}
    </>
  );
}
