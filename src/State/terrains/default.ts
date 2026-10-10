import type { TerrainsOptions } from "./types";

export const DEFAULT_TERRAINS_CONFIGS: TerrainsOptions = {
    subdivisions: 100,
    lacunarity: 1,
    persistence: 2,
    frequency: 0.06,
    baseEmplitude: 5.2,
    power: 1,

    maxIteration: 10,

    verticalOffset: 0,

}