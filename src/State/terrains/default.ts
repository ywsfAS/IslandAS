import type { TerrainsOptions } from "./types";

export const DEFAULT_TERRAINS_CONFIGS: TerrainsOptions = {
    subdivisions: 200,
    lacunarity: 1,
    persistence: 1,
    frequency: 0.06,
    baseEmplitude: 3,
    power: 1,

    maxIteration: 10,

    verticalOffset: 0,

}