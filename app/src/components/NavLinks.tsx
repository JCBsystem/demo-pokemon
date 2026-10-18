import { useLocation, type ToOptions } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Link } from "react-aria-components";
import { useCards } from "../data/useCards";

export function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const isHome = useLocation({ select: (location) => location.pathname === "/" });
  const total = useCards().data?.length ?? 0;

  return (
    <nav aria-label="Main" className="px-2">
      <NavLink href={{ to: "/" }} active={isHome} testId="nav-home" onNavigate={onNavigate}>
        Home
      </NavLink>
      <NavLink href={{ to: "/cards" }} active={!isHome} testId="nav-cards" onNavigate={onNavigate}>
        All cards
        <span className="font-mono text-xs text-zinc-600">{total.toLocaleString("en")}</span>
      </NavLink>
    </nav>
  );
}

type NavLinkProps = {
  href: ToOptions;
  active: boolean;
  testId: string;
  onNavigate: (() => void) | undefined;
  children: ReactNode;
};

function NavLink({ href, active, testId, onNavigate, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      data-testid={testId}
      aria-current={active ? "page" : false}
      onPress={() => onNavigate?.()}
      className={`flex h-8 items-center justify-between rounded-md px-2 ${active ? "bg-zinc-100 font-medium text-zinc-900" : "text-zinc-600 hover:bg-zinc-50"}`}
    >
      {children}
    </Link>
  );
}
