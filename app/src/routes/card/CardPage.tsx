import { getRouteApi } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { useCardById, useCards } from "../../data/useCards";
import { CardFacts } from "./CardFacts";
import { CardHero } from "./CardHero";
import { CardTabs } from "./CardTabs";
import { NotFound } from "./NotFound";
import { Rings } from "../../ui/Rings";
import type { Tab } from "./search";

const route = getRouteApi("/card/$id");

export function CardPage() {
  const { id } = route.useParams();
  const { tab = "attacks" } = route.useSearch();
  const navigate = route.useNavigate();
  const onTabChange = (next: Tab) =>
    navigate({ search: { tab: next }, replace: true, viewTransition: false });
  const { data } = useCards();
  const card = useCardById(id);
  const copies = useMemo(() => data?.filter((row) => row.id === id).length ?? 0, [data, id]);

  useEffect(() => {
    if (card === undefined) return;
    const previous = document.title;
    document.title = `${card.name} · Ash's binder`;
    return () => {
      document.title = previous;
    };
  }, [card]);

  return (
    <div
      data-testid="page-card"
      className="relative flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-[22px]"
    >
      <Rings />
      <CardHero card={card} />
      <div className="paper">
        {card !== undefined && (
          <>
            <CardFacts card={card} copies={copies} />
            <CardTabs card={card} tab={tab} onTabChange={onTabChange} />
          </>
        )}
        {card === undefined && data !== undefined && <NotFound id={id} />}
      </div>
    </div>
  );
}
