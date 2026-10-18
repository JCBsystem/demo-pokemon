import { HeadContent, Outlet } from "@tanstack/react-router";
import { MotionConfig } from "motion/react";
import { useCards } from "../data/useCards";
import { LoadError, Splash } from "./LoadStates";
import { Masthead } from "./Masthead";

export function Shell() {
  const { isPending, error, refetch } = useCards();

  return (
    <MotionConfig reducedMotion="user">
      <HeadContent />
      <Masthead />
      {isPending ? (
        <Splash />
      ) : error ? (
        <LoadError message={error.message} onRetry={() => void refetch()} />
      ) : (
        <Outlet />
      )}
    </MotionConfig>
  );
}
