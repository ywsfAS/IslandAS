import { DoubleSide } from "three";
import type { ZoneParams } from "./types";

export const DEFAULT_ZONE_CONFIGS: ZoneParams = {
    geometry: {
        outerRadius: 1,
        thetaSegments: 30,
        phiSegments: 1
    },
    matrial: {
        side: DoubleSide,
    }
}