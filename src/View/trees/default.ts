import { vec3 } from 'gl-matrix';
import type { TreeGeometryOptions, TreesOptions } from './types';

export const DEFAULT_TREE_GEOMETRY_OPTIONS: TreeGeometryOptions = {
    cylindre: {
        radiusTop: 0.13,
        radiusBottom: 0.18,
        height: 1.2,
        translation: vec3.fromValues(0, 0.6, 0),
    },
    lowCone: {
        radius: 1.15,
        height: 1.8,
        radialSegments: 7,
        translation: vec3.fromValues(0, 1.55, 0),
    },
    topCone: {
        radius: 0.78,
        height: 1.55,
        radialSegments: 7,
        translation: vec3.fromValues(0, 2.65, 0),
    },

};

export const DEFAULT_TREES_CONFIG: TreesOptions = {
    trunkColor: '#a24d07',
    leafColor: '#309c02',
    castShadow: true,
    geometryOptions: DEFAULT_TREE_GEOMETRY_OPTIONS
};
