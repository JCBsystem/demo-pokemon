import { Link, useMatchRoute } from "@tanstack/react-router";
import { CardSearchField } from "../components/CardSearchField";
import { useCards, useFacets } from "../data/useCards";

function Tab({
  to,
  active,
  testId,
  label,
}: {
  to: "/" | "/cards";
  active: boolean;
  testId: string;
  label: string;
}) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: true }}
      aria-current={active ? "page" : undefined}
      data-testid={testId}
      className={`relative py-4 hover:text-white ${active ? "text-white" : ""}`}
    >
      {label}
      <span
        className={`absolute inset-x-0 bottom-0 h-0.5 bg-accent ${active ? "" : "opacity-0"}`}
      />
    </Link>
  );
}

export function TopBar() {
  const matchRoute = useMatchRoute();
  const onCards = Boolean(matchRoute({ to: "/cards" }) || matchRoute({ to: "/card/$id" }));
  const cardCount = useCards().data?.length;
  const setCount = useFacets()?.sets.length;

  return (
    <header className="sticky top-0 z-30 hidden border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur lg:block">
      <div className="grid h-14 grid-cols-[1fr_minmax(0,480px)_1fr] items-center gap-6 px-6">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-lg font-black tracking-tight">
            Ash<span className="text-accent">.</span>cards
          </Link>
          <nav aria-label="Main" className="flex gap-6 text-sm font-medium text-muted">
            <Tab to="/" active={Boolean(matchRoute({ to: "/" }))} testId="nav-home" label="Home" />
            <Tab to="/cards" active={onCards} testId="nav-cards" label="Cards" />
          </nav>
        </div>
        <CardSearchField size="compact" data-testid="topbar-search" />
        <p className="text-right text-xs text-muted tabular-nums">
          {cardCount !== undefined &&
            setCount !== undefined &&
            `${cardCount.toLocaleString("en")} cards · ${setCount.toLocaleString("en")} sets`}
        </p>
      </div>
    </header>
  );
}
