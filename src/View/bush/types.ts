import type { vec3 } from "gl-matrix";

export interface BushViewOptions {
    color: vec3;
    roughness: number;
    subdivisions: number;
    minVertexVariation: number;
    radius: number;
    maxVertexVariation: number;
    castShadow: boolean;
    receiveShadow: boolean;
}