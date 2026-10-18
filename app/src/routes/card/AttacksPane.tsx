import { TypeDot } from "../../components/TypeDot";
import type { Card } from "../../data/schema";

export function AttacksPane({ card }: { card: Card }) {
  if (!card.attacks?.length) return <p className="py-4 text-sm text-muted">No attacks.</p>;
  return card.attacks.map((attack) => (
    <div key={attack.name} className="border-b border-zinc-800/70 py-4">
      <div className="flex items-center gap-3">
        {attack.cost.length > 0 && (
          <span className="flex gap-1">
            <span className="sr-only">Cost: {attack.cost.join(", ")}</span>
            {attack.cost.map((type, i) => (
              <TypeDot key={i} type={type} />
            ))}
          </span>
        )}
        <span className="font-semibold">{attack.name}</span>
        <span className="ml-auto text-2xl font-black tabular-nums">{attack.damage}</span>
      </div>
      {attack.text && <p className="mt-1.5 text-sm leading-relaxed text-muted">{attack.text}</p>}
    </div>
  ));
}
