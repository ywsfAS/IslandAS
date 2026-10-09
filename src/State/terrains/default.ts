import type { TerrainsOptions } from "./types";

export const DEFAULT_TERRAINS_CONFIGS: TerrainsOptions = {
    subdivisions: 30,
    lacunarity: 1,
    persistence: 2,

    maxIteration: 200,
    minIteration: 50

}