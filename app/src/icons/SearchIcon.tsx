import { motion } from "motion/react";

type Props = { active: boolean; size?: number };

export function SearchIcon({ active, size = 18 }: Props) {
  return (
    <motion.svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transformOrigin: "bottom right" }}
      initial={false}
      animate={{ rotate: active ? [0, 17, -10, 5, -1, 0] : 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <path d="m21 21-4.34-4.34" />
      <circle cx={11} cy={11} r={8} />
    </motion.svg>
  );
}
