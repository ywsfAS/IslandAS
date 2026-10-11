import { vec3 } from 'gl-matrix';

export interface SunStateOptions {

    initPosition: vec3;
    initColor: vec3;
    initDirection: vec3;

    intensity: number;
    distance: number;

    radius: number;

}