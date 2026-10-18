import * as THREE from 'three';
import type { ModelOptions } from '../types';

export const DEFAULT_KEYBOARD_OPTIONS: ModelOptions = {
    asset: 'models/keyboard.glb',
    position: new THREE.Vector3(0, 1, 0),
    rotation: new THREE.Euler(0, 0, 0),
    scale: new THREE.Vector3(1, 1, 1),
};
