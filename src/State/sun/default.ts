import { vec3 } from "gl-matrix";
import type { SunStateOptions } from "./types";


export const DEFAULT_SUN_CONFIG: SunStateOptions = {

    initPosition: vec3.fromValues(0, 0, 0),
    initDirection: vec3.fromValues(1, 0, 1),
    initColor: vec3.fromValues(1, 1, 1),

    intensity: 4,
    radius: 60,
    initAngle: 0,
    initOrbitSpeed: .4,
    orbitRadius: 500,
    center: vec3.fromValues(0, 0, 0)


}