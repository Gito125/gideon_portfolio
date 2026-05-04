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
    gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin, SplitText);
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

registerGsapPlugins();
