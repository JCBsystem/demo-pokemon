import { useSyncExternalStore } from "react";

const LAPTOP_QUERY = "(min-width: 1024px)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(LAPTOP_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

export function useIsLaptop(): boolean {
  return useSyncExternalStore(subscribe, () => window.matchMedia(LAPTOP_QUERY).matches);
}
