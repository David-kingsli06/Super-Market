export interface SceneConfig {
  id: string;
  stageNumber: string;
  stageTitle: string;
  timeCode: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  alignment: "left" | "center" | "right";
  badges?: string[];
  subProgression?: string[];
}

export const SCENES: SceneConfig[] = [
  {
    id: "scene-enter-fresh",
    stageNumber: "01",
    stageTitle: "FRESH",
    timeCode: "00:00 — 00:08",
    eyebrow: "01 / FRESH PRODUCE",
    title: "FRESH, FROM THE START",
    subtitle: "Orchard crisp, farm direct, harvested at first light.",
    description: "Step inside and discover a world of freshness. Hand-selected organic greens, heirloom citrus, and seasonal harvests curated daily from sustainable family growers.",
    tag: "ENTRANCE & PRODUCE",
    alignment: "left",
    badges: ["Daily Morning Arrival", "Certified Organic", "Zero Cold-Storage Delay"],
    subProgression: ["Approach", "Glass Portals", "Atmospheric Mist", "Heirloom Baskets"]
  },
  {
    id: "scene-juice-toys",
    stageNumber: "02",
    stageTitle: "DISCOVER",
    timeCode: "00:08 — 00:16",
    eyebrow: "02 / DISCOVER MORE",
    title: "DISCOVER MORE",
    subtitle: "From cold-pressed elixirs to moments crafted for family delight.",
    description: "From refreshing favorites to moments made for every family. Wander through artisan cold-pressed juices, pure botanicals, and thoughtfully chosen playtime discoveries.",
    tag: "BEVERAGES & FAMILY AISLE",
    alignment: "right",
    badges: ["Small-Batch Botanical", "Pure Natural Infusions", "Creative Living"],
    subProgression: ["Juice Bar Vault", "Cold Pressed Blends", "Wooden Toys & Games", "Family Comfort"]
  },
  {
    id: "scene-checkout",
    stageNumber: "03",
    stageTitle: "CHECKOUT",
    timeCode: "00:16 — 00:24",
    eyebrow: "03 / READY WHEN YOU ARE",
    title: "READY WHEN YOU ARE",
    subtitle: "Everything you need, gathered effortlessly in one place.",
    description: "Everything you need, all in one place. Frictionless checkout, paper-wrapped parcels, and gracious hospitality welcoming you back each week.",
    tag: "CONCIERGE CHECKOUT",
    alignment: "left",
    badges: ["Seamless Contactless Pay", "Biodegradable Packaging", "Concierge Valet Pack"],
    subProgression: ["Aisle Exit", "Open Registers", "Warm Welcome", "Complete Experience"]
  }
];

export const TOTAL_FRAMES = 570; // 190 frames * 3 clips

export function getFrameUrl(index: number): string {
  const clamped = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(index)));
  
  if (clamped <= 190) {
    const padded = String(clamped).padStart(3, "0");
    return `/frames/entering/frame_${padded}.webp`;
  } else if (clamped <= 380) {
    const subIndex = clamped - 190;
    const padded = String(subIndex).padStart(3, "0");
    return `/frames/aisles/frame_${padded}.webp`;
  } else {
    const subIndex = clamped - 380;
    const padded = String(subIndex).padStart(3, "0");
    return `/frames/checkout/frame_${padded}.webp`;
  }
}

/**
 * Maps scroll progress (0..1 across 1400vh) to video frame.
 * Each reading section holds the camera virtually stationary for ~2 full screen scrolls (~200vh each),
 * so the user can easily read everything without the scene moving away.
 */
export function mapProgressToVideoFrame(scrollProgress: number): number {
  const p = Math.max(0, Math.min(1, scrollProgress));

  // Timeline breakdown (across 1400vh):
  // 0.00 - 0.07: Camera approaches entrance (frames 1 -> 155)
  // 0.07 - 0.23: STOP 1 (Produce Text in full view) -> Camera holds almost stationary (~155 -> 175)
  // 0.23 - 0.38: Travel to Juice & Toys aisle (frames 175 -> 320)
  // 0.38 - 0.54: STOP 2 (Juice & Toys Text in full view) -> Camera holds almost stationary (~320 -> 340)
  // 0.54 - 0.69: Travel through main aisle towards checkout (frames 340 -> 485)
  // 0.69 - 0.85: STOP 3 (Checkout Text in full view) -> Camera holds almost stationary (~485 -> 505)
  // 0.85 - 1.00: Final approach to cashier & completion CTA (frames 505 -> 570)

  let frameNumber: number;

  if (p < 0.07) {
    // Fast approach to produce entrance
    const sub = p / 0.07;
    frameNumber = 1 + sub * 154;
  } else if (p < 0.23) {
    // Reading Stop 1: Produce section holds almost still (~20 frames over 16% of scroll = ~224vh)
    const sub = (p - 0.07) / (0.23 - 0.07);
    frameNumber = 155 + sub * 20;
  } else if (p < 0.38) {
    // Travel to next section
    const sub = (p - 0.23) / (0.38 - 0.23);
    frameNumber = 175 + sub * 145;
  } else if (p < 0.54) {
    // Reading Stop 2: Juice & Toys holds almost still (~20 frames over 16% of scroll = ~224vh)
    const sub = (p - 0.38) / (0.54 - 0.38);
    frameNumber = 320 + sub * 20;
  } else if (p < 0.69) {
    // Travel towards checkout
    const sub = (p - 0.54) / (0.69 - 0.54);
    frameNumber = 340 + sub * 145;
  } else if (p < 0.85) {
    // Reading Stop 3: Checkout holds almost still (~20 frames over 16% of scroll = ~224vh)
    const sub = (p - 0.69) / (0.85 - 0.69);
    frameNumber = 485 + sub * 20;
  } else {
    // Final exit to register and CTA
    const sub = (p - 0.85) / (1.00 - 0.85);
    frameNumber = 505 + sub * 65;
  }

  return Math.max(1, Math.min(TOTAL_FRAMES, Math.round(frameNumber)));
}
