import * as THREE from 'three';
import type { ModelOptions } from '../types';
import type { RocksOptions } from './types';

export const DEFAULT_ROCKS_MODEL_OPTIONS: ModelOptions = {
    asset: 'models/stones.glb',
    position: new THREE.Vector3(),
    rotation: new THREE.Euler(),
    scale: new THREE.Vector3(1, 1, 1),
};

export const DEFAULT_ROCKS_OPTIONS: RocksOptions = {
    minScale: 2.0,
    maxScale: 3.55,
};
