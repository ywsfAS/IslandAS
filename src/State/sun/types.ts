import { vec3 } from 'gl-matrix';

export interface SunStateOptions {

    initPosition: vec3;
    initColor: vec3;
    initDirection: vec3;

    intensity: number;

    radius: number;
    initOrbitSpeed: number;
    initAngle: number;
    orbitRadius : number;
    center : vec3

}