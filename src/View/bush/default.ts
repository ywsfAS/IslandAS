import { vec3 } from 'gl-matrix';
import type { BushViewOptions } from './types';

export const DEFAULT_BUSH_VIEW_OPTIONS: BushViewOptions = {
    color: vec3.fromValues(1, 1, 1),
    roughness: 1,
    subdivisions: 1,
    minVertexVariation: 0.45,
    radius: 5,
    maxVertexVariation: 0.55,
    castShadow: true,
    receiveShadow: true,
};