import type { vec3 } from 'gl-matrix';

export interface PathStateOptions {
    points: vec3[];
    width: number;
    closed: boolean;
    curveType: 'centripetal' | 'chordal' | 'catmullrom';
    tension: number;
}