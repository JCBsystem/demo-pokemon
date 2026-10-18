import type { Card } from "../../data/schema";
import { TypeDot } from "../../ui/TypeDot";
import { infoCard } from "./styles";

export function AttacksPanel({ card }: { card: Card }) {
  const abilities = card.abilities ?? [];
  const attacks = card.attacks ?? [];
  const empty = abilities.length === 0 && attacks.length === 0;
  return (
    <div className="flex flex-col gap-2">
      {abilities.map((ability, index) => (
        <div key={`${ability.name}-${index}`} className={infoCard}>
          <p className="text-xs font-extrabold tracking-wider text-cover uppercase">
            {ability.type}
          </p>
          <p className="font-display font-semibold">{ability.name}</p>
          <p className="mt-2 text-sm text-muted">{ability.text}</p>
        </div>
      ))}
      {attacks.map((attack, index) => (
        <div key={`${attack.name}-${index}`} className={infoCard}>
          <div className="flex items-center gap-2">
            {attack.cost.map((type, slot) => (
              <TypeDot key={`${type}-${slot}`} type={type} className="size-4" />
            ))}
            {attack.cost.length > 0 && (
              <span className="sr-only">Cost: {attack.cost.join(", ")}.</span>
            )}
            <p className="flex-1 font-display font-semibold">{attack.name}</p>
            {attack.damage !== "" && (
              <p className="font-display text-xl font-semibold">{attack.damage}</p>
            )}
          </div>
          {attack.text !== "" && <p className="mt-2 text-sm text-muted">{attack.text}</p>}
        </div>
      ))}
      {empty && (
        <p className={`${infoCard} text-center text-sm font-semibold text-muted`}>
          {card.supertype === "Pokémon"
            ? "No attacks."
            : `No attacks. ${card.supertype} cards don't attack.`}
        </p>
      )}
      {card.rules?.map((rule) => (
        <p key={rule} className="text-sm text-muted">
          {rule}
        </p>
      ))}
    </div>
  );
}
