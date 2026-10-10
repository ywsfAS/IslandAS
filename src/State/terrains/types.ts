export enum IterationMode {
    MAX_INTERATION_MODE = 0,
    MIN_INTERATION_MODE = 1
}
export interface TerrainsOptions {

    subdivisions: number;
    lacunarity: number;
    persistence: number;
    baseEmplitude: number;
    power: number;
    frequency: number;

    maxIteration: number;
    verticalOffset: number;

}