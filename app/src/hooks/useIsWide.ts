import { useSyncExternalStore } from "react";

const query = "(min-width: 64rem)";

function subscribe(onChange: () => void): () => void {
  const media = matchMedia(query);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

export function useIsWide(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => matchMedia(query).matches,
    () => false,
  );
}
