import type { ComponentType } from "react";
import type { HeroAnimationProps } from "./types";

interface HeroAnimationSlotProps extends HeroAnimationProps {
  animation: ComponentType<HeroAnimationProps>;
}

export function HeroAnimationSlot({ animation: Animation, ...props }: HeroAnimationSlotProps) {
  return <Animation {...props} />;
}
