import { CardImage } from "../../components/CardImage";
import { FavouriteButton } from "../../components/FavouriteButton";
import { TypeDot } from "../../components/TypeDot";
import type { Card } from "../../data/schema";
import type { CardTab } from "../../data/urlFilter";
import { DetailTabs } from "./DetailTabs";
import { StatRow } from "./StatRow";

type Props = {
  card: Card;
  variant: "pane" | "full";
  tab: CardTab;
  onTabChange: (tab: CardTab) => void;
};

export function CardDetail({ card, variant, tab, onTabChange }: Props) {
  const full = variant === "full";
  const Title = full ? "h1" : "h2";
  const meta = [card.rarity, card.subtypes?.join(", ")].filter(
    (part): part is string => part !== undefined && part !== "",
  );

  return (
    <article
      data-testid="card-detail"
      className={full ? "md:grid md:grid-cols-[300px_minmax(0,1fr)] md:gap-8" : ""}
    >
      <CardImage
        card={card}
        size={variant}
        transitionName="card-image"
        testId="card-image"
        className={`mx-auto mb-4 shadow-md ${full ? "w-full max-w-[300px] md:mb-0" : "w-44"}`}
      />
      <div className="min-w-0 break-words">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Title
              data-testid="detail-title"
              className={`font-semibold tracking-tight ${full ? "text-2xl" : "text-lg"}`}
            >
              {card.name}
            </Title>
            <p className="mt-0.5 text-xs text-zinc-600">
              <span className="font-mono">
                {card.setCode} · {card.number}
              </span>
              {meta.map((part) => ` · ${part}`)}
            </p>
          </div>
          <FavouriteButton id={card.id} size="md" />
        </div>
        <dl className="mt-3 divide-y divide-zinc-200 border-y border-zinc-200">
          <StatRow label="HP">{card.hp ?? "—"}</StatRow>
          <StatRow label="Type">
            {card.types?.length ? (
              <span className="inline-flex items-center gap-1.5">
                {card.types.map((type) => (
                  <TypeDot key={type} type={type} />
                ))}
                {card.types.join(", ")}
              </span>
            ) : (
              "—"
            )}
          </StatRow>
          {card.evolvesFrom !== undefined && (
            <StatRow label="Evolves from">{card.evolvesFrom}</StatRow>
          )}
          <StatRow label="Artist">{card.artist ?? "—"}</StatRow>
        </dl>
        <DetailTabs card={card} tab={tab} onTabChange={onTabChange} />
        {full && card.flavorText !== undefined && (
          <p className="mt-6 text-xs leading-relaxed text-zinc-600 italic">{card.flavorText}</p>
        )}
      </div>
    </article>
  );
}
