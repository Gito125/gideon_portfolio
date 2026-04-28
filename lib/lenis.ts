import Lenis from "lenis";

import { ScrollTrigger, getGsap } from "./gsap";

type LenisOptions = ConstructorParameters<typeof Lenis>[0];
type LenisInstance = InstanceType<typeof Lenis>;

let lenisInstance: LenisInstance | null = null;
let isSyncedWithGsapTicker = false;

const onGsapTick = (time: number): void => {
  if (!lenisInstance) {
    return;
  }

  // GSAP ticker time is in seconds; Lenis raf expects milliseconds.
  lenisInstance.raf(time * 1000);
  ScrollTrigger.update();
};

export function initLenis(options: LenisOptions = {}): LenisInstance {
  if (lenisInstance) {
    return lenisInstance;
  }

  lenisInstance = new Lenis({
    autoRaf: false,
    ...options,
  });

  return lenisInstance;
}

export function getLenis(): LenisInstance | null {
  return lenisInstance;
}

export function syncLenisWithGsapTicker(): LenisInstance | null {
  if (!lenisInstance) {
    return null;
  }

  if (!isSyncedWithGsapTicker) {
    const gsap = getGsap();
    gsap.ticker.add(onGsapTick);
    gsap.ticker.lagSmoothing(0);
    isSyncedWithGsapTicker = true;
  }

  return lenisInstance;
}

export function unsyncLenisFromGsapTicker(): void {
  if (!isSyncedWithGsapTicker) {
    return;
  }

  const gsap = getGsap();
  gsap.ticker.remove(onGsapTick);
  isSyncedWithGsapTicker = false;
}

export function startLenis(): void {
  lenisInstance?.start();
}

export function stopLenis(): void {
  lenisInstance?.stop();
}

export function destroyLenis(): void {
  unsyncLenisFromGsapTicker();
  lenisInstance?.destroy();
  lenisInstance = null;
}
