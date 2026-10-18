import type { Card } from "../data/schema";

type Props = { card: Card; copies?: number; className?: string; testId?: string };

export function CardMeta({ card, copies = 1, className = "", testId }: Props) {
  return (
    <p className={`text-mute ${className}`} data-testid={testId}>
      <span className="normal-case">{card.setCode}</span> · {card.number}
      {card.rarity && ` · ${card.rarity}`}
      {copies > 1 && <span className="tabular-nums"> · ×{copies}</span>}
    </p>
  );
}
