import { vec3 } from 'gl-matrix';
import type { PathStateOptions } from './types';

export const DEFAULT_PATH_CONFIG: PathStateOptions = {
    points: [
        vec3.fromValues(0, 0, 0),
        vec3.fromValues(3, 0, 20),
        vec3.fromValues(-3, 0, 40),
        vec3.fromValues(4, 0, 60),
        vec3.fromValues(1, 0, 80),
        vec3.fromValues(0, 0, 90),
    ],
    width: 10,
    closed: false,
    curveType: 'centripetal',
    tension: 0.5,
    samples: 200,
    widthSegments: 4,
    uvScale: 4,
    yOffset: 0.3,
    smoothness: 0.2
};