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
        intro: 'The language that brought this island to life.',
        message: 'A little type safety goes a long way. Explore the language that makes building large JavaScript applications more enjoyable.',
        linkText: 'Discover TypeScript',
        url: 'https://www.typescriptlang.org/'
    },
};
