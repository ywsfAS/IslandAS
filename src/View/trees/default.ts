import { vec3 } from 'gl-matrix';
import type { TreeGeometryOptions, TreesOptions } from './types';

export const DEFAULT_TREE_GEOMETRY_OPTIONS: TreeGeometryOptions = {
    cylindre: {
        radiusTop: 0.12,
        radiusBottom: 0.2,
        height: 1,
        translation: vec3.fromValues(0, 0.5, 0)


    },
    lowCone: {
        radius: 1.0,
        height: 1.7,
        radialSegments: 7,
        translation: vec3.fromValues(0, 1.7, 0)

    },
    topCone: {
        radius: 0.7,
        height: 1.4,
        radialSegments: 7,
        translation: vec3.fromValues(0, 2.5, 0)

    }

};

export const DEFAULT_TREES_CONFIG: TreesOptions = {
    trunkColor: '#79502F',
    leafColor: '#5F9E45',
    castShadow: true,
    geometryOptions: DEFAULT_TREE_GEOMETRY_OPTIONS
};
