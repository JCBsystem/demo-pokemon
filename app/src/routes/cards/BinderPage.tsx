import type { ReactNode } from "react";
import type { Card } from "../../data/schema";
import { PAGE_SIZE } from "../../data/paging";
import { EmptyPocket } from "../../ui/EmptyPocket";
import { Pocket } from "../../ui/Pocket";

type Props = {
  cards: Card[];
  firstIndex: number;
  className?: string;
  children?: ReactNode;
};

export function BinderPage({ cards, firstIndex, className = "grid", children }: Props) {
  return (
    <div data-testid="binder-page" className={`paper relative grid-cols-3 gap-2.5 ${className}`}>
      {cards.map((card, offset) => {
        const key = `${card.id}-${firstIndex + offset}`;
        return <Pocket key={key} card={card} heroKey={key} />;
      })}
      {Array.from({ length: PAGE_SIZE - cards.length }, (_, slot) => (
        <EmptyPocket key={`empty-${slot}`} />
      ))}
      {children}
    </div>
  );
}
