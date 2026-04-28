export type PreloaderPhase =
  | "IDLE"
  | "COUNTING"
  | "LOCKING"
  | "CRACKING"
  | "REVEALING"
  | "COMPLETE";

export type CursorVariant = "default" | "view" | "cta" | "link" | "click";
