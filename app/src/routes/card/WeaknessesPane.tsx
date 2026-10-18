import { TypeDot } from "../../components/TypeDot";
import type { Card } from "../../data/schema";

const row = "flex items-center gap-3 border-b border-zinc-800/70 py-3.5";

function TypeRows({ items }: { items: { type: string; value: string }[] }) {
  return items.map(({ type, value }) => (
    <div key={type} className={row}>
      <TypeDot type={type} />
      <span>{type}</span>
      <b className="ml-auto text-xl font-black tabular-nums">{value}</b>
    </div>
  ));
}

export function WeaknessesPane({ card }: { card: Card }) {
  return (
    <>
      {card.weaknesses?.length ? (
        <TypeRows items={card.weaknesses} />
      ) : (
        <p className="py-4 text-sm text-muted">No weaknesses.</p>
      )}
      {card.resistances?.length ? (
        <>
          <p className="pt-5 text-xs tracking-[.18em] text-muted uppercase">Resistances</p>
          <TypeRows items={card.resistances} />
        </>
      ) : null}
      {card.retreatCost?.length ? (
        <div className={row}>
          <span>Retreat</span>
          <span className="ml-auto flex gap-1">
            <span className="sr-only">{card.retreatCost.join(", ")}</span>
            {card.retreatCost.map((type, i) => (
              <TypeDot key={i} type={type} />
            ))}
          </span>
        </div>
      ) : null}
    </>
  );
}
