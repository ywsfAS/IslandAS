import type { WaterStateOptions } from './types';
import { vec2, vec3 } from 'gl-matrix';

export const DEFAULT_WATER_OPTIONS: WaterStateOptions = {

    position: vec3.fromValues(0, 5, 0),
    width: 40,
    height: 40,

    widthSegments: 80,
    heightSegments: 80,

    spatialFrequency: vec3.fromValues(0.8354, 0.3445, 0.5234),
    angularFrequency: vec3.fromValues(1.2, 0.4, 1.5),
    waveAmplitude: vec3.fromValues(0.5, 0.3, 0.6),
    randomizationInterval: 5,
    transitionDuration: 2,
    directions: [vec2.fromValues(1, 0), vec2.fromValues(0.845, 0.567), vec2.fromValues(-0.463, 0.765)]

}