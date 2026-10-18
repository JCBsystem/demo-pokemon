import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useCopies } from "../../data/copies";
import type { Card } from "../../data/schema";
import { useCards } from "../../data/useCards";
import { useStore } from "../../store";
import { CardImage } from "../../ui/CardImage";
import { CardMeta } from "../../ui/CardMeta";
import { FavouriteButton } from "../../ui/FavouriteButton";

const HERO = { viewTransitionName: "card-hero" };

export function Favourites() {
  const { data } = useCards();
  const favourites = useStore((s) => s.favourites);
  const [leaving, setLeaving] = useState<string>();

  const copies = useCopies();
  const firstById = useMemo(() => {
    const map = new Map<string, Card>();
    for (const card of data ?? []) if (!map.has(card.id)) map.set(card.id, card);
    return map;
  }, [data]);

  const pinned = favourites.flatMap((id) => firstById.get(id) ?? []);
  const [lead, ...rest] = pinned;

  const opening = (key: string) => ({
    onPointerDown: () => setLeaving(key),
    onClick: () => setLeaving(key),
  });
  const heroStyle = (key: string) => (leaving === key ? HERO : {});

  return (
    <section data-testid="favourites" className="mt-14 lg:mt-20">
      <div className="flex items-baseline justify-between border-t-2 border-ink pt-3">
        <h2 className="kicker text-ink!">No. 1 — Pinned favourites</h2>
        <span data-testid="fav-count" className="text-sm text-mute">
          {pinned.length} pinned
        </span>
      </div>
      <div className="mt-6">
        {lead ? (
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
            <article
              data-testid="favourite-item"
              className="lg:col-span-7 grid sm:grid-cols-[minmax(0,15rem)_1fr] gap-6 items-end"
            >
              <Link to="/card/$id" params={{ id: lead.id }} {...opening(`${lead.id}-0`)}>
                <CardImage
                  src={lead.images.small}
                  alt={lead.name}
                  priority
                  className="w-44 sm:w-full max-w-[15rem]"
                  style={heroStyle(`${lead.id}-0`)}
                />
              </Link>
              <div>
                <CardMeta card={lead} copies={copies.get(lead.id) ?? 1} className="kicker" />
                <div className="flex items-start justify-between gap-3">
                  <Link
                    to="/card/$id"
                    params={{ id: lead.id }}
                    className="mt-2 block font-serif text-5xl lg:text-6xl font-light tracking-tight leading-none hover:text-accent"
                  >
                    {lead.name}
                  </Link>
                  <FavouriteButton
                    id={lead.id}
                    name={lead.name}
                    className="shrink-0 mt-2 p-2 border border-rule rounded-full"
                  />
                </div>
                {lead.flavorText && (
                  <p className="mt-4 font-serif italic text-lg leading-snug text-mute">
                    “{lead.flavorText}”
                  </p>
                )}
              </div>
            </article>
            {rest.length > 0 && (
              <ol className="lg:col-span-5 lg:border-l lg:border-rule lg:pl-10">
                {rest.map((card, i) => {
                  const key = `${card.id}-${i + 1}`;
                  return (
                    <li
                      key={key}
                      data-testid="favourite-item"
                      className={`flex items-center gap-4 py-4 ${i ? "border-t border-rule" : ""}`}
                    >
                      <span className="font-serif text-mute text-sm w-5">
                        {String(i + 2).padStart(2, "0")}
                      </span>
                      <Link
                        to="/card/$id"
                        params={{ id: card.id }}
                        {...opening(key)}
                        className="group flex flex-1 min-w-0 items-center gap-4"
                      >
                        <CardImage
                          src={card.images.small}
                          alt=""
                          className="shrink-0 w-14"
                          style={heroStyle(key)}
                        />
                        <span className="min-w-0">
                          <span className="block font-serif text-2xl leading-tight group-hover:text-accent">
                            {card.name}
                          </span>
                          <CardMeta
                            card={card}
                            copies={copies.get(card.id) ?? 1}
                            className="mt-1 text-xs"
                          />
                        </span>
                      </Link>
                      <FavouriteButton id={card.id} name={card.name} className="shrink-0 p-2" />
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        ) : (
          <p className="font-serif text-2xl font-light text-mute py-6">
            Nothing pinned yet. Tap the heart on any card to keep it here.
          </p>
        )}
      </div>
    </section>
  );
}
