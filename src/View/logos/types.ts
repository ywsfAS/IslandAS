import type * as THREE from 'three';

export interface LogoOptions {
    asset: string;
    position: THREE.Vector3;
    height: number;
    depth: number;
    layerSpacing: number;
    interaction: LogoInteractionOptions;
}

export interface LogoInteractionOptions {
    id: string;
    intro: string;
    message: string;
    linkText: string;
    url: string;
}
