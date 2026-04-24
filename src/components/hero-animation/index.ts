import { registerHeroAnimation } from "./types";
import { TorusKnotAnimation } from "./TorusKnotAnimation";
import { PulseRingAnimation } from "./PulseRingAnimation";
import { ParticleNetworkSphereAnimation } from "./ParticleNetworkSphereAnimation";

registerHeroAnimation({
  key: "torus-knot",
  name: "莫比乌斯环",
  component: TorusKnotAnimation,
});

registerHeroAnimation({
  key: "pulse-ring",
  name: "脉冲波",
  component: PulseRingAnimation,
});

registerHeroAnimation({
  key: "particle-network",
  name: "粒子网络球",
  component: ParticleNetworkSphereAnimation,
});

export { HeroAnimationSlot } from "./HeroAnimationSlot";
export { TorusKnotAnimation } from "./TorusKnotAnimation";
export { PulseRingAnimation } from "./PulseRingAnimation";
export { ParticleNetworkSphereAnimation } from "./ParticleNetworkSphereAnimation";
export { getHeroAnimation, heroAnimationRegistry, registerHeroAnimation } from "./types";
export type { HeroAnimationEntry, HeroAnimationProps } from "./types";
