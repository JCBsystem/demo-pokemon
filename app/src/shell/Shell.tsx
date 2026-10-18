import { Outlet } from "@tanstack/react-router";
import { Button } from "react-aria-components";
import { useCards } from "../data/useCards";
import { BottomNav } from "./BottomNav";
import { TopBar } from "./TopBar";

function Splash() {
  return (
    <main data-testid="splash" className="grid min-h-[70dvh] place-items-center">
      <p className="text-3xl font-black tracking-tight motion-safe:animate-pulse">
        Ash<span className="text-accent">.</span>cards
      </p>
    </main>
  );
}

function LoadError({ onRetry }: { onRetry: () => void }) {
  return (
    <main
      data-testid="load-error"
      className="grid min-h-[70dvh] place-content-center justify-items-center gap-2 px-6 text-center"
    >
      <h1 className="text-lg font-bold">Couldn't load the cards</h1>
      <p className="text-sm text-muted">Check your connection and try again.</p>
      <Button
        onPress={onRetry}
        data-testid="load-retry"
        className="mt-4 h-10 cursor-pointer rounded-full bg-zinc-100 px-5 text-sm font-semibold text-zinc-950"
      >
        Try again
      </Button>
    </main>
  );
}

export function Shell() {
  const { isPending, isError, refetch } = useCards();
  return (
    <>
      <TopBar />
      {isPending ? <Splash /> : isError ? <LoadError onRetry={() => void refetch()} /> : <Outlet />}
      <BottomNav />
    </>
  );
}
