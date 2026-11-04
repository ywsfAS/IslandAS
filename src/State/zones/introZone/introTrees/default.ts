import type { IntroTreesConfig } from "./types";

export const DEFAULT_INTRO_TREES_CONFIG: IntroTreesConfig = {
    count: 80,
    innerRadiusRatio: 0.55,
    outerRadiusRatio: 0.92,
    variants: [
        { type: "tree", minScale: 2, maxScale: 10 },
        { type: "tree-trunk", minScale: 8, maxScale: 14 },
    ],
};
