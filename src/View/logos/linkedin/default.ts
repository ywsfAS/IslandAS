import * as THREE from 'three';
import linkedin from '../../../assets/linkedin.svg';
import type { LogoOptions } from '../types';

export const DEFAULT_LINKEDIN_OPTIONS: LogoOptions = {
    asset: linkedin,
    position: new THREE.Vector3(0, 3, 5),
    height: 2.4,
    depth: 0.6,
    layerSpacing: 0.015,
    interaction: {
        id: 'linkedin',
        intro: 'Ah yes, the professional social network.',
        message: 'Where everyone is passionate, every small achievement is a major milestone. Anyway, here is my LinkedIn.',
        linkText: 'Enter the cringe',
        url: 'https://www.linkedin.com/in/youssef-akhroub-329595378/'
    },
};
