import { Outlet } from "@tanstack/react-router";
import { MotionConfig } from "motion/react";
import { useCards } from "../../data/useCards";
import { Dock } from "./Dock";
import { ErrorState } from "./ErrorState";
import { Header } from "./Header";
import { IndexTabs } from "./IndexTabs";
import { SkipLink } from "./SkipLink";
import { Splash } from "./Splash";

function DataGate() {
  const cards = useCards();
  if (cards.isPending) return <Splash />;
  if (cards.isError) {
    return (
      <ErrorState
        message={cards.error.message}
        retrying={cards.isFetching}
        onRetry={() => void cards.refetch()}
      />
    );
  }
  return <Outlet />;
}

export function Layout() {
  return (
    <MotionConfig reducedMotion="user">
      <SkipLink />
      <Header />
      <main
        id="content"
        tabIndex={-1}
        className="mx-auto max-w-[1080px] px-4 outline-none lg:max-w-[980px] lg:pr-24 lg:pl-10"
      >
        <div className="cover">
          <IndexTabs />
          <DataGate />
        </div>
      </main>
      <Dock />
    </MotionConfig>
  );
}
