import { memo, useEffect, useMemo, useRef, useState } from "react";
import { GridList, GridListItem } from "react-aria-components";
import { CardImage } from "../../components/CardImage";
import { FavouriteButton } from "../../components/FavouriteButton";
import { TypeDot } from "../../components/TypeDot";
import { countIds } from "../../data/counts";
import type { Card } from "../../data/schema";
import type { CardsSearch } from "../../data/urlFilter";
import { useCards } from "../../data/useCards";
import { useIsWide } from "../../hooks/useIsWide";

const columns =
  "grid grid-cols-[3rem_minmax(0,1fr)_2.5rem] items-center sm:grid-cols-[3rem_minmax(0,1fr)_7rem_3rem_2.5rem] md:grid-cols-[3rem_minmax(0,1fr)_7rem_6rem_3rem_2.5rem] xl:grid-cols-[3rem_minmax(0,1fr)_7rem_6rem_7rem_3rem_2.5rem]";

const PAGE = 100;

type Props = { cards: Card[]; selectedId: string | undefined };

export function CardList({ cards, selectedId }: Props) {
  const isWide = useIsWide();
  const all = useCards().data;
  const counts = useMemo(() => countIds(all ?? []), [all]);
  const [limit, setLimit] = useState(PAGE);
  const [pressedKey, setPressedKey] = useState<string>();
  const sentinel = useRef<HTMLDivElement>(null);
  const selectedIndex = cards.findIndex((card) => card.id === selectedId);
  const shown = Math.max(limit, selectedIndex + 1);
  const hasMore = shown < cards.length;

  useEffect(() => {
    const element = sentinel.current;
    if (!hasMore || element === null) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setLimit((current) => current + PAGE);
      },
      { rootMargin: "0px 0px 100% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [hasMore, limit]);

  return (
    <div className="bg-white">
      <div
        aria-hidden
        className={`${columns} h-7 border-b border-zinc-200 bg-zinc-50 text-[11px] font-medium tracking-wider text-zinc-500 uppercase`}
      >
        <span />
        <span className="pl-2">Name</span>
        <span className="hidden sm:block">Set · No.</span>
        <span className="hidden md:block">Type</span>
        <span className="hidden xl:block">Rarity</span>
        <span className="hidden text-right sm:block">HP</span>
        <span />
      </div>
      <GridList aria-label="Cards" selectionMode="none" layout="stack">
        {cards.slice(0, shown).map((card, index) => {
          const key = `${card.id}-${index}`;
          return (
            <CardRow
              key={key}
              rowKey={key}
              card={card}
              count={counts.get(card.id) ?? 1}
              isWide={isWide}
              isSelected={isWide && index === selectedIndex}
              isActive={!isWide && key === pressedKey}
              onActivate={setPressedKey}
            />
          );
        })}
      </GridList>
      {hasMore && <div ref={sentinel} />}
    </div>
  );
}

type RowProps = {
  rowKey: string;
  card: Card;
  count: number;
  isWide: boolean;
  isSelected: boolean;
  isActive: boolean;
  onActivate: (key: string) => void;
};

const CardRow = memo(function CardRow({
  rowKey,
  card,
  count,
  isWide,
  isSelected,
  isActive,
  onActivate,
}: RowProps) {
  const type = card.types?.[0];
  const activate = () => {
    if (!isWide) onActivate(rowKey);
  };

  return (
    <GridListItem
      id={rowKey}
      textValue={card.name}
      data-testid="card-row"
      data-card-id={card.id}
      {...(isWide
        ? {
            href: {
              from: "/cards",
              to: "/cards",
              search: (prev: CardsSearch) => ({ ...prev, card: card.id }),
            },
            routerOptions: { replace: true, viewTransition: false, resetScroll: false },
          }
        : { href: { to: "/card/$id", params: { id: card.id } } })}
      onHoverStart={activate}
      onPressStart={activate}
      className={({ isHovered }) =>
        `content-auto ${columns} h-13 cursor-pointer border-b border-zinc-100 -outline-offset-2 ${
          isSelected ? "bg-indigo-50" : isHovered ? "bg-zinc-50" : ""
        }`
      }
    >
      <CardImage
        card={card}
        size="thumb"
        className="ml-3 w-8 border border-zinc-200"
        {...(isActive ? { transitionName: "card-image" } : {})}
      />
      <div className="min-w-0 pl-2">
        <div className="flex items-baseline gap-1.5">
          <span className="truncate font-medium">{card.name}</span>
          {count > 1 && (
            <span data-testid="row-count" className="font-mono text-[10px] text-zinc-600">
              ×{count}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 truncate text-xs text-zinc-600 sm:hidden">
          {type !== undefined && <TypeDot type={type} size={8} />}
          <span className="font-mono">
            {card.setCode} · {card.number}
          </span>
          {card.rarity !== undefined && <span className="truncate">· {card.rarity}</span>}
        </div>
      </div>
      <span className="hidden truncate font-mono text-xs text-zinc-600 sm:block">
        {card.setCode} · {card.number}
      </span>
      <span className="hidden min-w-0 items-center gap-1.5 text-xs md:flex">
        {card.types?.map((t) => (
          <TypeDot key={t} type={t} />
        ))}
        <span className="truncate">{card.types?.join(", ")}</span>
      </span>
      <span className="hidden truncate text-xs text-zinc-600 xl:block">{card.rarity}</span>
      <span className="hidden text-right font-mono text-xs sm:block">{card.hp}</span>
      <span className="grid place-items-center">
        <FavouriteButton id={card.id} />
      </span>
    </GridListItem>
  );
});
