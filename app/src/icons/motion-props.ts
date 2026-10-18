import type { LegacyAnimationControls, Variants } from "motion/react";

export function motionProps(
  variants: Variants | undefined,
  controls: LegacyAnimationControls | undefined,
) {
  return { variants: variants ?? {}, initial: "initial", animate: controls ?? "initial" } as const;
}
