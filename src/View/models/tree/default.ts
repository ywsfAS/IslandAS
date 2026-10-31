import type { ModelOptions } from "../types";
import type { TreeOptions } from "./types";
import * as THREE from 'three';

export const DEFAULT_TREE_OPTIONS: ModelOptions = {
    asset: 'models/tree.glb',
    position: new THREE.Vector3(20, 1, 0),
    rotation: new THREE.Euler(0, 0, 0),
    scale: new THREE.Vector3(2, 2, 2),
}