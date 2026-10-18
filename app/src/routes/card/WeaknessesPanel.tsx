import type { Card } from "../../data/schema";
import { TypeDot } from "../../ui/TypeDot";
import { infoCard } from "./styles";

type Row = { type: string; value: string };

function Rows({ rows }: { rows: Row[] }) {
  return rows.map((row) => (
    <div key={row.type} className={`${infoCard} flex items-center gap-3`}>
      <TypeDot type={row.type} className="size-5" />
      <p className="flex-1 font-display font-semibold">{row.type}</p>
      <p className="font-display text-xl font-semibold">{row.value}</p>
    </div>
  ));
}

const heading = "mt-3 text-xs font-extrabold tracking-wider text-muted uppercase";

export function WeaknessesPanel({ card }: { card: Card }) {
  const weaknesses = card.weaknesses ?? [];
  const resistances = card.resistances ?? [];
  const retreat = card.retreatCost ?? [];
  return (
    <div className="flex flex-col gap-2">
      {weaknesses.length > 0 ? (
        <Rows rows={weaknesses} />
      ) : (
        <p className={`${infoCard} text-center text-sm font-semibold text-muted`}>
          No weaknesses listed.
        </p>
      )}
      {resistances.length > 0 && (
        <>
          <h3 className={heading}>Resistances</h3>
          <Rows rows={resistances} />
        </>
      )}
      {retreat.length > 0 && (
        <>
          <h3 className={heading}>Retreat cost</h3>
          <div className={`${infoCard} flex items-center gap-1.5`}>
            {retreat.map((type, index) => (
              <TypeDot key={`${type}-${index}`} type={type} className="size-5" />
            ))}
            <span className="sr-only">{retreat.join(", ")}</span>
          </div>
        </>
      )}
    </div>
  );
}
