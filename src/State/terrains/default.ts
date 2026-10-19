import type { TerrainsOptions, ChunksPosition } from "./types";

export const DEFAULT_TERRAINS_CONFIGS: TerrainsOptions = {
    subdivisions: 50,
    lacunarity: 2.05,
    persistence: 0.45,
    frequency: 0.003,
    baseEmplitude: 30,
    power: 2,

    maxIteration: 10,

    verticalOffset: 0,

}
export const CHUNKS_POS: ChunksPosition[] = [
    [-1, 1], [0, 1], [1, 1], [-1, 0], [0, 0], [1, 0], [-1, -1], [0, -1], [1, -1]
] as const;