import type { vec3 } from 'gl-matrix';

export interface TreesOptions {
    trunkColor: string;
    leafColor: string;
    castShadow: boolean;
    geometryOptions: TreeGeometryOptions;
}
export interface TreeGeometryOptions {
    cylindre: {
        radiusTop: number;
        radiusBottom: number;
        height: number;
        translation: vec3;


    },
    lowCone: {
        radius: number;
        height: number;
        radialSegments: number;
        translation: vec3;
    },

    topCone: {
        radius: number;
        height: number;
        radialSegments: number;
        translation: vec3;
    }
}