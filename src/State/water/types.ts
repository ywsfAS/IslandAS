import type { vec3 } from "gl-matrix";

export interface WaterStateOptions {
    position : vec3;
    width: number;
    height: number;

    widthSegments: number;
    heightSegments: number

    spatialFrequency: number;
    waveAmplitude: number;
    angularFrequency: number;

}