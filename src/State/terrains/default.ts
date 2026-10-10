import type { TerrainsOptions } from "./types";

export const DEFAULT_TERRAINS_CONFIGS: TerrainsOptions = {
    subdivisions: 50,
    lacunarity: 1,
    persistence: 2,
    frequency: 0.06,
    baseEmplitude: 5.2,
    power: 1,

    maxIteration: 50,

    verticalOffset: 5,

}