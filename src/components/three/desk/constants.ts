export const CM = 0.1;

export const DESK = {
  width: 78 * CM,
  depth: 55 * CM,
  height: 55 * CM,
  topThickness: 3.5 * CM,
} as const;

export const DESK_TOP_Y = DESK.height;

export const COLORS = {
  ink: "#0d1220",
  panel: "#1a2136",
  slate: "#232c42",
  slateLight: "#3a4560",
  metal: "#4a5573",
  screen: "#05030d",
  primary: "#6d28d9",
  violet: "#8b5cf6",
  violetSoft: "#a78bfa",
  indigo: "#4f46e5",
  line: "#7264e0",
} as const;
