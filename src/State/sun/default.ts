import { vec3 } from "gl-matrix";
import type { SunStateOptions } from "./types";
import { vec2 } from "three/tsl";


export const DEFAULT_SUN_CONFIG: SunStateOptions = {

    initPosition: vec3.fromValues(0, 0, 0),
    initDirection: vec3.fromValues(1, 0, 1),
    initColor: vec3.fromValues(1, 1, 1),

    intensity: 10,
    radius: 60,
    initAngle: 0,
    initOrbitSpeed: .4,
    orbitRadius: 200,
    center: vec3.fromValues(0, 0, 0)


}