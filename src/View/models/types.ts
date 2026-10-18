import type * as THREE from 'three';

export interface ModelOptions {
    asset: string;
    position: THREE.Vector3;
    rotation: THREE.Euler;
    scale: THREE.Vector3;
}
