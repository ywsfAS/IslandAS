import type * as THREE from 'three';

export interface LogoOptions {
    asset: string;
    position: THREE.Vector3;
    height: number;
    depth: number;
    layerSpacing: number;
}
