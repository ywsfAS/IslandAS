import type { IntroTreesConfig } from "./types";

export const DEFAULT_INTRO_TREES_CONFIG: IntroTreesConfig = {
    count: 40,
    innerRadiusRatio: 0.65,
    outerRadiusRatio: 0.92,
    variants: [
        { type: "tree", minScale: 2, maxScale: 3 },
        { type: "tree-trunk", minScale: 8, maxScale: 14 },
    ],
};
