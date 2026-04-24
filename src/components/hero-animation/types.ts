import { type ComponentType } from "react";

export interface HeroAnimationProps {
  width: number;
  height: number;
  className?: string;
}

export interface HeroAnimationEntry {
  key: string;
  name: string;
  component: ComponentType<HeroAnimationProps>;
}

export const heroAnimationRegistry: Map<string, HeroAnimationEntry> = new Map();

export function registerHeroAnimation(entry: HeroAnimationEntry) {
  heroAnimationRegistry.set(entry.key, entry);
}

export function getHeroAnimation(key: string): HeroAnimationEntry | undefined {
  return heroAnimationRegistry.get(key);
}
