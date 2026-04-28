import gsap from "gsap";

interface SplitResult {
  elements: HTMLElement[];
  revert: () => void;
}

interface DrawLineOptions {
  gsap: typeof gsap;
  path: SVGGeometryElement;
  duration?: number;
  ease?: string;
  timeline?: gsap.core.Timeline;
  position?: number | string;
  from?: number;
  to?: number;
}

type GsapWithPlugins = typeof gsap & {
  plugins?: Record<string, unknown>;
};

export function hasDrawSvgPlugin(gsapInstance: typeof gsap): boolean {
  const plugins = (gsapInstance as GsapWithPlugins).plugins;

  return Boolean(plugins?.drawSVG || plugins?.DrawSVGPlugin);
}

export function splitTextFallback(
  element: HTMLElement,
  mode: "chars" | "words",
): SplitResult {
  const originalText = element.textContent ?? "";
  element.textContent = "";

  const elements: HTMLElement[] = [];

  if (mode === "chars") {
    for (const char of Array.from(originalText)) {
      const span = document.createElement("span");
      span.className = "split-char";
      span.style.display = "inline-block";
      span.style.willChange = "transform, opacity";
      span.textContent = char === " " ? "\u00A0" : char;
      elements.push(span);
      element.append(span);
    }
  } else {
    const tokens = originalText.split(/(\s+)/).filter((token) => token.length > 0);

    for (const token of tokens) {
      if (/^\s+$/.test(token)) {
        element.append(document.createTextNode(token));
        continue;
      }

      const span = document.createElement("span");
      span.className = "split-word";
      span.style.display = "inline-block";
      span.style.willChange = "transform, opacity";
      span.textContent = token;
      elements.push(span);
      element.append(span);
    }
  }

  return {
    elements,
    revert: () => {
      element.textContent = originalText;
    },
  };
}

export function primeStrokePath(path: SVGGeometryElement): number {
  const length = path.getTotalLength();
  path.style.strokeDasharray = `${length}`;
  path.style.strokeDashoffset = `${length}`;

  return length;
}

export function drawLineFallback({
  gsap: gsapInstance,
  path,
  duration = 0.45,
  ease = "power2.out",
  timeline,
  position,
  from = 1,
  to = 0,
}: DrawLineOptions) {
  const length = primeStrokePath(path);
  const vars = {
    strokeDashoffset: length * to,
    duration,
    ease,
  };

  if (timeline) {
    return timeline.fromTo(
      path,
      { strokeDashoffset: length * from },
      vars,
      position,
    );
  }

  return gsapInstance.fromTo(path, { strokeDashoffset: length * from }, vars);
}
