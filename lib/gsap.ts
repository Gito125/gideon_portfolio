import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let pluginsRegistered = false;

/**
 * Registers GSAP plugins one time for the entire app runtime.
 */
export function registerGsapPlugins(): typeof gsap {
  if (!pluginsRegistered) {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
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

/**
 * Club plugins are deferred until license files are added to the project.
 */
export const CLUB_PLUGIN_TODO = Object.freeze({
  splitText: "Add licensed SplitText plugin and register in registerGsapPlugins().",
  drawSvg: "Add licensed DrawSVG plugin and register in registerGsapPlugins().",
});

export { gsap, ScrollTrigger, useGSAP };
