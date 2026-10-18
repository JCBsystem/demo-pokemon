import { getRouteApi, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { FavouriteButton } from "../../components/FavouriteButton";
import { typeColor } from "../../components/typeColor";
import { countById } from "../../data/countById";
import type { Card } from "../../data/schema";
import { useCardById, useCards } from "../../data/useCards";
import { DetailTabs } from "./DetailTabs";
import { Hero } from "./Hero";

const route = getRouteApi("/card/$id");

function Missing({ id }: { id: string }) {
  return (
    <main data-testid="page-card" className="mx-auto max-w-6xl px-4 py-16 text-center lg:px-6">
      <h1 data-testid="card-missing" className="text-3xl font-black tracking-tight">
        Card not found
      </h1>
      <p className="mt-3 text-sm text-muted">
        No card with id <code className="font-mono text-zinc-300">{id}</code> in the collection.
      </p>
      <Link
        to="/cards"
        className="mt-6 inline-flex h-10 items-center rounded-full bg-zinc-100 px-5 text-sm font-semibold text-zinc-950"
      >
        Browse all cards
      </Link>
    </main>
  );
}

function Title({ card, copies }: { card: Card; copies: number }) {
  return (
    <div className="flex items-start gap-3">
      <div className="min-w-0 flex-1">
        <p className="text-[11px] tracking-[.18em] text-muted uppercase">
          <span className="font-mono text-zinc-300 normal-case">{card.setCode}</span> · #
          {card.number}
          {card.rarity && ` · ${card.rarity}`}
        </p>
        <h1 data-testid="card-name" className="mt-1 text-3xl font-black tracking-tight lg:text-5xl">
          {card.name}
        </h1>
        <p className="mt-3 flex flex-wrap items-center gap-2 text-sm text-zinc-300">
          {card.supertype !== "Pokémon" && (
            <span className="inline-flex h-6 items-center rounded-full bg-zinc-800 px-2.5 text-xs font-bold text-zinc-100">
              {card.supertype}
            </span>
          )}
          {card.types?.map((type) => (
            <span
              key={type}
              className="inline-flex h-6 items-center rounded-full px-2.5 text-xs font-bold text-zinc-950"
              style={{ background: typeColor(type) }}
            >
              {type}
            </span>
          ))}
          {card.hp && (
            <span>
              HP <b>{card.hp}</b>
            </span>
          )}
          {card.hp && card.subtypes && (
            <span aria-hidden className="text-muted">
              ·
            </span>
          )}
          {card.subtypes && <span>{card.subtypes.join(", ")}</span>}
        </p>
        {copies >= 2 && (
          <p data-testid="card-copies" className="mt-2 text-xs text-muted tabular-nums">
            ×{copies} in collection
          </p>
        )}
      </div>
      <FavouriteButton
        id={card.id}
        className="size-11 shrink-0 border border-zinc-800 bg-zinc-900"
      />
    </div>
  );
}

function CardText({ card }: { card: Card }) {
  return (
    <div className="space-y-3 text-sm leading-relaxed text-muted lg:max-w-xl">
      {card.flavorText && <p>{card.flavorText}</p>}
      {card.abilities?.map((ability) => (
        <p key={ability.name}>
          <b className="text-zinc-100">{ability.name}</b> {ability.text}
        </p>
      ))}
      {card.rules?.map((rule) => (
        <p key={rule}>{rule}</p>
      ))}
    </div>
  );
}

export function CardPage() {
  const { id } = route.useParams();
  const { tab } = route.useSearch();
  const card = useCardById(id);
  const { data } = useCards();
  const copies = useMemo(() => countById(data ?? []).get(id) ?? 0, [data, id]);

  if (!card) return <Missing id={id} />;

  const color = typeColor(card.types?.[0]);
  return (
    <main
      data-testid="page-card"
      className="lg:mx-auto lg:grid lg:max-w-6xl lg:grid-cols-[420px_1fr] lg:items-start lg:gap-14 lg:px-6 lg:py-10"
    >
      <Hero key={card.id} card={card} color={color} />
      <div className="space-y-4 px-4 pt-5 lg:px-0 lg:pt-2">
        <Title card={card} copies={copies} />
        <CardText card={card} />
        <DetailTabs card={card} color={color} tab={tab ?? "attacks"} />
        {card.artist && <p className="pb-10 text-xs text-muted">Illus. {card.artist}</p>}
      </div>
    </main>
  );
}
