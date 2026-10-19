import type { vec2 } from "gl-matrix";

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
export type ChunksPosition = [number, number];


export interface TerrainEvent {
    id: ChunksPosition;
    center: vec2;
    size: number;
    subdivisions: number;
    precision: number;
    lacunarity: number;


    iterations: number,
    persistence: number,
    baseEmplitude: number,
    frequency: number,
    power: number,
    terrainOffsets: number[][],

    verticalOffset: number,

}
export interface TerrainResult {
    id: ChunksPosition;
    positions: Float32Array;
    normals: Float32Array;
    uv: Float32Array;
    indices: Uint16Array | Uint32Array;
    textures: Float32Array;
    resolution: number;
}

export class TupleMap<T> {

    private _map: Map<string, T> = new Map();

    private serialize(pos: ChunksPosition) {
        return `${pos[0]},${pos[1]}`;
    }
    public set(pos: ChunksPosition, value: T) {
        this._map.set(this.serialize(pos), value);
    }
    public get(pos: ChunksPosition) {
        return this._map.get(this.serialize(pos));
    }
    public delete(pos: ChunksPosition) {
        this._map.delete(this.serialize(pos));
    }
    public has(pos: ChunksPosition) {
        return this._map.has(this.serialize(pos));
    }

    public values() {
        return this._map.values();
    }

}