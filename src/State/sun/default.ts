import { vec3 } from "gl-matrix";
import type { SunStateOptions } from "./types";
import { mx_bilerp_0 } from "three/src/nodes/materialx/MaterialXNoise.js";


export const DEFAULT_SUN_CONFIG: SunStateOptions = {

    initPosition: vec3.fromValues(0, 0, 0),
    initDirection: vec3.fromValues(1, 0, 1),
    initColor: vec3.fromValues(1, 1, 1),

    distance: 20,
    intensity: 5,

    radius: 10

}