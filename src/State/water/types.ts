import type { vec2 , vec3 } from "gl-matrix";

export interface WaterStateOptions {
    position: vec3;
    width: number;
    height: number;

    widthSegments: number;
    heightSegments: number

    spatialFrequency: vec3;
    waveAmplitude: vec3;
    angularFrequency: vec3;
    directions: vec2[];
    randomizationInterval: number;
    transitionDuration: number;

}