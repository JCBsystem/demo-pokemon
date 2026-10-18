import { Link, useParams } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { useCopies } from "../../data/copies";
import type { Card } from "../../data/schema";
import { useCardById } from "../../data/useCards";
import { CardImage } from "../../ui/CardImage";
import { CardMeta } from "../../ui/CardMeta";
import { FavouriteButton } from "../../ui/FavouriteButton";
import { TypeDot } from "../../ui/TypeDot";
import { CardTabs } from "./CardTabs";

const MAIN = "max-w-6xl mx-auto px-4 lg:px-8 pb-24 pt-6 lg:pt-10";

function BackLink() {
  return (
    <Link to="/cards" data-testid="back-to-cards" className="kicker hover:text-ink">
      ← Cards
    </Link>
  );
}

function facts(card: Card): ReactNode[] {
  const items: ReactNode[] = [];
  if (card.hp)
    items.push(
      <span key="hp">
        <span className="kicker">HP</span>{" "}
        <span className="font-serif text-xl text-ink tabular-nums">{card.hp}</span>
      </span>,
    );
  if (card.types?.length)
    items.push(
      <span key="types" className="flex items-center gap-3">
        {card.types.map((type) => (
          <TypeDot key={type} type={type} label />
        ))}
      </span>,
    );
  if (card.subtypes?.length) items.push(<span key="subtypes">{card.subtypes.join(", ")}</span>);
  if (card.artist) items.push(<span key="artist">Illus. {card.artist}</span>);
  return items.flatMap((item, i) =>
    i === 0
      ? [item]
      : [
          <span key={`sep-${i}`} aria-hidden="true">
            ·
          </span>,
          item,
        ],
  );
}

export function CardPage() {
  const { id } = useParams({ from: "/card/$id" });
  const card = useCardById(id);
  const copies = useCopies().get(id) ?? 1;

  useEffect(() => {
    document.title = `${card?.name ?? "Card not found"} · Ash's Pokémon Card Collection`;
  }, [card]);

  if (!card)
    return (
      <main data-testid="page-card" className={MAIN}>
        <BackLink />
        <div data-testid="not-found" className="py-16 lg:py-24">
          <p className="kicker">Not in the guide</p>
          <h1 className="mt-3 font-serif text-4xl lg:text-6xl font-light tracking-tight">
            Card not found.
          </h1>
          <p className="mt-4 text-mute">No card with id {id}.</p>
        </div>
      </main>
    );

  return (
    <main data-testid="page-card" className={MAIN}>
      <BackLink />
      <header className="mt-6 border-b-2 border-ink pb-6">
        <CardMeta card={card} className="kicker" testId="card-meta" />
        <div className="mt-2 flex items-start justify-between gap-4">
          <h1
            data-testid="card-title"
            className="font-serif font-light text-6xl lg:text-8xl tracking-tight leading-[.9]"
          >
            {card.name}
          </h1>
          <FavouriteButton
            id={card.id}
            name={card.name}
            className="shrink-0 mt-1 lg:mt-3 p-3 border border-ink rounded-full"
          />
        </div>
        <p className="mt-4 text-mute text-[15px] flex flex-wrap items-center gap-x-3 gap-y-1">
          {facts(card)}
        </p>
        {copies > 1 && (
          <p className="mt-2 text-sm text-mute tabular-nums">×{copies} in the collection</p>
        )}
      </header>
      <div className="mt-8 lg:mt-12 grid lg:grid-cols-12 gap-10 lg:gap-14">
        <figure className="lg:col-span-5">
          <div data-testid="card-hero" className="max-w-[18rem] mx-auto lg:max-w-sm lg:mx-0">
            <CardImage
              src={card.images.large}
              alt={card.name}
              priority
              className="w-full"
              style={{ viewTransitionName: "card-hero" }}
            />
          </div>
          {card.flavorText && (
            <figcaption className="mt-6 font-serif italic text-lg leading-snug text-mute">
              “{card.flavorText}”
            </figcaption>
          )}
        </figure>
        <div className="lg:col-span-7">
          <CardTabs card={card} />
        </div>
      </div>
    </main>
  );
}
