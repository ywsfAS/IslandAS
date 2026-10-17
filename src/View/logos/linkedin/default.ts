import * as THREE from 'three';
import linkedin from '../../../assets/linkedin.svg';
import type { LogoOptions } from '../types';

export const DEFAULT_LINKEDIN_OPTIONS: LogoOptions = {
    asset: linkedin,
    position: new THREE.Vector3(0, 1.5, 0),
    height: 2.4,
    depth: 0.6,
    layerSpacing: 0.015,
};
