import * as THREE from 'three';
import typescript from '../../../assets/typescript.svg';
import type { LogoOptions } from '../types';

export const DEFAULT_TYPESCRIPT_OPTIONS: LogoOptions = {
    asset: typescript,
    position: new THREE.Vector3(12, 1.5, 5),
    height: 2.4,
    depth: 0.6,
    layerSpacing: 0.015,
    interaction: {
        id: 'typescript',
        message: 'Learn more about TypeScript.',
        linkText: 'Visit TypeScript',
        url: 'https://www.typescriptlang.org/',
    },
};
