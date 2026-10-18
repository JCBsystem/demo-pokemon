import { motion } from "motion/react";

type Props = { size?: number };

export function FolderOpenIcon({ size = 40 }: Props) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18.45 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
      <motion.path
        d="M6 14l1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5"
        style={{ transformOrigin: "50% 100%" }}
        animate={{ scaleY: [1, 0.8, 1.04, 1], skewX: [0, -6, 1.5, 0] }}
        transition={{
          duration: 0.6,
          times: [0, 0.45, 0.8, 1],
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 2,
        }}
      />
    </svg>
  );
}
