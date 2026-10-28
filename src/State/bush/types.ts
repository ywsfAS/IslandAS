import type { vec3 } from 'gl-matrix';

export interface BushOptions {
    count: number;
    areaRadius: number;
    minDistance: number;
    minScale: number;
    maxScale: number;
}

export interface BushPlacement {
    position: vec3;
    scale: number;
    rotation: number;
}