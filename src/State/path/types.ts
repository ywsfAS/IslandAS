import type { vec3 } from 'gl-matrix';

export interface PathStateOptions {
    samples: number;
    widthSegments: number;
    uvScale: number;
    yOffset: number;
    points: vec3[];
    width: number;
    closed: boolean;
    curveType: 'centripetal' | 'chordal' | 'catmullrom';
    tension: number;
    smoothness: number;
}