import { motion, type Variants } from "motion/react";
import { motionProps } from "./motion-props";

import {
  getVariants,
  useAnimateIconContext,
  IconWrapper,
  type IconProps,
} from "@animate-ui/react/icons";

type SearchProps = IconProps<keyof typeof animations>;

const animations = {
  default: {
    group: {
      initial: {
        rotate: 0,
      },
      animate: {
        transformOrigin: "bottom right",
        rotate: [0, 17, -10, 5, -1, 0],
        transition: { duration: 0.8, ease: "easeInOut" },
      },
    },
    path: {},
    circle: {},
  } satisfies Record<string, Variants>,
  find: {
    group: {
      initial: {
        x: 0,
        y: 0,
      },
      animate: {
        x: [0, "-15%", 0, 0],
        y: [0, 0, "-15%", 0],
        transition: { duration: 1, ease: "easeInOut" },
      },
    },
    path: {},
    circle: {},
  } satisfies Record<string, Variants>,
} as const;

function IconComponent({ size, ...props }: SearchProps) {
  const { controls } = useAnimateIconContext();
  const variants = getVariants(animations);

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...motionProps(variants.group, controls)}
      {...props}
    >
      <motion.path d="m21 21-4.34-4.34" {...motionProps(variants.path, controls)} />
      <motion.circle cx={11} cy={11} r={8} {...motionProps(variants.circle, controls)} />
    </motion.svg>
  );
}

export function Search(props: SearchProps) {
  return <IconWrapper icon={IconComponent} {...props} />;
}
