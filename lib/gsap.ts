import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { SplitText } from "gsap/SplitText";

let pluginsRegistered = false;

/**
 * Registers GSAP plugins one time for the entire app runtime.
 */
export function registerGsapPlugins(): typeof gsap {
  if (!pluginsRegistered) {
    // Register only GSAP plugins. `useGSAP` is a React hook (from @gsap/react)
    // and must NOT be passed to `gsap.registerPlugin`.
    gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText);
    pluginsRegistered = true;
  }

  return gsap;
}

/**
 * Returns GSAP after ensuring plugin registration.
 */
export function getGsap(): typeof gsap {
  return registerGsapPlugins();
}

export { gsap, ScrollTrigger, useGSAP, DrawSVGPlugin, SplitText };

// Ensure plugins are registered when this module is imported on the client.
// Keep the call idempotent via the `pluginsRegistered` guard above.
registerGsapPlugins();
