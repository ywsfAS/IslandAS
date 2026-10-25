import type { ModelOptions } from "../types";
import * as THREE from 'three';

export const DEFAULT_KEYBOARD_OPTIONS: ModelOptions = {
    asset: 'models/headphone.glb',
    position: new THREE.Vector3(0, 3, 30),
    rotation: new THREE.Euler(Math.PI / 2, 0, 0),
    scale: new THREE.Vector3(2, 2, 2),

}