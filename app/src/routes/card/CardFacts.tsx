import type { Card } from "../../data/schema";
import { FavouriteButton } from "../../ui/FavouriteButton";
import { TypeDot } from "../../ui/TypeDot";

export function CardFacts({ card, copies }: { card: Card; copies: number }) {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p data-testid="card-set" className="text-xs font-extrabold tracking-wider text-muted">
            {card.setCode} · #{card.number}
          </p>
          <h2 data-testid="card-name" className="font-display text-3xl font-semibold">
            {card.name}
          </h2>
        </div>
        <FavouriteButton id={card.id} name={card.name} size="lg" />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {card.hp !== undefined && (
          <span className="chip">
            HP <b>{card.hp}</b>
          </span>
        )}
        {card.types?.map((type) => (
          <span key={type} className="chip">
            <TypeDot type={type} />
            {type}
          </span>
        ))}
        {card.subtypes?.map((subtype) => (
          <span key={subtype} className="chip">
            {subtype}
          </span>
        ))}
        {card.rarity !== undefined && <span className="chip">{card.rarity}</span>}
        {card.artist !== undefined && <span className="chip">Illus. {card.artist}</span>}
        {copies > 1 && (
          <span data-testid="copies" className="chip">
            ×{copies} in binder
          </span>
        )}
        {card.evolvesFrom !== undefined && (
          <span className="chip">Evolves from {card.evolvesFrom}</span>
        )}
      </div>
    </>
  );
}
