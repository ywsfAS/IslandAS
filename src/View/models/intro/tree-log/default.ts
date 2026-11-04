import * as THREE from 'three';
import type { ModelOptions } from '../../types';

const DEFAULT_TREE_LOG_OPTIONS = {
    position: new THREE.Vector3(),
    rotation: new THREE.Euler(),
    scale: new THREE.Vector3(12, 12, 12),
};

export const DEFAULT_SMALL_TREE_LOG_OPTIONS: ModelOptions = { ...DEFAULT_TREE_LOG_OPTIONS, asset: "models/intro/tree-log-small.glb" };
export const DEFAULT_NORMAL_TREE_LOG_OPTIONS: ModelOptions = { ...DEFAULT_TREE_LOG_OPTIONS, asset: "models/intro/tree-log.glb" };