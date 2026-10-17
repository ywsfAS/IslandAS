import * as THREE from 'three';
import github from '../../../assets/github.svg';
import type { LogoOptions } from '../types';

export const DEFAULT_GITHUB_OPTIONS: LogoOptions = {
    asset: github,
    position: new THREE.Vector3(-12, 1.5, 0),
    height: 2.4,
    depth: 0.6,
    layerSpacing: 0.015,
};
