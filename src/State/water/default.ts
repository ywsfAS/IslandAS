import { vec3 } from 'gl-matrix';
import type { WaterStateOptions } from './types';

export const DEFAULT_WATER_OPTIONS: WaterStateOptions = {

    position: vec3.fromValues(0, 5, 0),
    width: 40,
    height: 40,

    widthSegments: 80,
    heightSegments: 80,

    spatialFrequency: 1,
    angularFrequency: 1,
    waveAmplitude: 1

}