import { useLocation } from "@tanstack/react-router";

export type Section = "home" | "cards" | null;

export function useSection(): Section {
  return useLocation({
    select: ({ pathname }) =>
      pathname === "/" ? "home" : pathname.startsWith("/card") ? "cards" : null,
  });
}
