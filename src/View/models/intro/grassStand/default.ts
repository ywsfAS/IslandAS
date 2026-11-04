import * as THREE from 'three';
import type { ModelOptions } from '../../types';

export const DEFAULT_GRASS_STAND_OPTIONS: ModelOptions = {
    asset: "models/intro/rock-flat-grass.glb",
    position: new THREE.Vector3(),
    rotation: new THREE.Euler(),
    scale: new THREE.Vector3(20, 20, 20),
};