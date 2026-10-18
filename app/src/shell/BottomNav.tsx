import { Link, useMatchRoute, useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Button } from "react-aria-components";
import { Search } from "../icons/search";

const item = "flex cursor-pointer flex-col items-center gap-1 pt-2.5 pb-2";

function Tab({
  to,
  active,
  testId,
  children,
}: {
  to: "/" | "/cards";
  active: boolean;
  testId: string;
  children: ReactNode;
}) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: true }}
      aria-current={active ? "page" : undefined}
      data-testid={testId}
      className={`${item} ${active ? "text-white" : ""}`}
    >
      {children}
    </Link>
  );
}

export function BottomNav() {
  const matchRoute = useMatchRoute();
  const navigate = useNavigate();
  const onCards = Boolean(matchRoute({ to: "/cards" }) || matchRoute({ to: "/card/$id" }));

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t border-zinc-800 bg-zinc-950/95 pb-[env(safe-area-inset-bottom)] text-[11px] font-medium text-muted backdrop-blur lg:hidden"
    >
      <Tab to="/" active={Boolean(matchRoute({ to: "/" }))} testId="tab-home">
        <svg
          aria-hidden
          className="size-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
        </svg>
        Home
      </Tab>
      <Tab to="/cards" active={onCards} testId="tab-cards">
        <svg
          aria-hidden
          className="size-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="7" height="9" rx="1" />
          <rect x="14" y="3" width="7" height="9" rx="1" />
          <rect x="3" y="15" width="7" height="6" rx="1" />
          <rect x="14" y="15" width="7" height="6" rx="1" />
        </svg>
        Cards
      </Tab>
      <Button
        data-testid="tab-search"
        className={item}
        onPress={() =>
          void navigate({ to: "/cards" }).then(() =>
            document.getElementById("cards-search")?.focus(),
          )
        }
      >
        <Search aria-hidden size={24} />
        Search
      </Button>
    </nav>
  );
}
