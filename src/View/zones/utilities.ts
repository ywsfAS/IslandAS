import type { vec2 } from "gl-matrix";
import * as THREE from 'three';

export const setPosition = (center: vec2, offsetX: number, offsetZ: number, offsetY = 0) => new THREE.Vector3(
    center[0] + offsetX,
    offsetY,
    center[1] + offsetZ,
);