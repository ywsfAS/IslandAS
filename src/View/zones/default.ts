import { DoubleSide } from "three";
import type { ZoneParams } from "./types";

export const DEFAULT_ZONE_CONFIGS: ZoneParams = {
    geometry: {
        outerRadius: 2,
        thetaSegments: 30,
    },
    matrial: {
        side: DoubleSide,
    }
}