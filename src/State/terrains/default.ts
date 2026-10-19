import type { TerrainsOptions, ChunksPosition } from "./types";

export const DEFAULT_TERRAINS_CONFIGS: TerrainsOptions = {
    subdivisions: 30,
    lacunarity: 1,
    persistence: 1,
    frequency: 0.06,
    baseEmplitude: 3,
    power: 1,

    maxIteration: 10,

    verticalOffset: 0,

}
export const CHUNKS_POS: ChunksPosition[] = [
    [-1, 1], [0, 1], [1, 1], [-1, 0], [0, 0], [1, 0], [-1, -1], [0, -1], [1, -1]
] as const;