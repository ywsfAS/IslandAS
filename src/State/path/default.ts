import { vec3 } from 'gl-matrix';
import type { PathStateOptions } from './types';

export const DEFAULT_PATH_CONFIG: PathStateOptions = {
    points: [
        vec3.fromValues(-40, 0, -30),
        vec3.fromValues(-20, 0, -10),
        vec3.fromValues(0, 0, -15),
        vec3.fromValues(20, 0, 5),
        vec3.fromValues(100, 0, 25),
    ],
    width: 10,
    closed: false,
    curveType: 'centripetal',
    tension: 0.5,
    samples: 200,
    widthSegments: 4,
    uvScale: 4,
    yOffset: 0.3,
    smoothness : 0.2,
};